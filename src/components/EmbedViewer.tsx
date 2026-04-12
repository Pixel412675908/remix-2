import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Service } from "@/lib/services";

interface EmbedViewerProps {
  service: Service | null;
  onClose: () => void;
}

export function EmbedViewer({ service, onClose }: EmbedViewerProps) {
  const [iframeError, setIframeError] = useState(false);

  const handleIframeError = useCallback(() => {
    setIframeError(true);
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
        <div className="flex items-center justify-between px-5 py-3 border-b border-border glass-strong">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">{service.nome}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">{service.url}</span>
          </div>
          <div className="flex items-center gap-2">
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
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {shouldEmbed ? (
            <iframe
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
