import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft, RotateCw } from "lucide-react";
import type { Service } from "@/lib/services";

interface EmbedViewerProps {
  service: Service | null;
  onClose: () => void;
}

export function EmbedViewer({ service, onClose }: EmbedViewerProps) {
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeError = useCallback(() => {
    setIframeError(true);
  }, []);

  const handleReload = useCallback(() => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      }, 50);
    }
  }, []);

  if (!service) return null;

  const shouldEmbed = service.tipo === "embed" && !iframeError;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-background"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-border glass-strong">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground shrink-0"
              title="Voltar"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-foreground truncate">{service.nome}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[200px] hidden sm:inline">{service.url}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleReload}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Recarregar"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.open(service.url, "_blank")}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Abrir no navegador"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {shouldEmbed ? (
            <iframe
              ref={iframeRef}
              src={service.url}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
              onError={handleIframeError}
              title={service.nome}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-6">
              <p className="text-muted-foreground text-sm">
                Não foi possível abrir em modo embutido.
              </p>
              <button
                onClick={() => window.open(service.url, "_blank")}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Abrir no navegador
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
