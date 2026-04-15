import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft, RotateCw, AlertTriangle } from "lucide-react";
import type { Service } from "@/lib/services";
import { openPopup } from "@/lib/popup";

interface EmbedViewerProps {
  service: Service | null;
  onClose: () => void;
}

export function EmbedViewer({ service, onClose }: EmbedViewerProps) {
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Reset state when service changes
  useEffect(() => {
    setIframeError(false);
    setLoading(true);

    // Timeout: if iframe doesn't load in 8s, treat as error
    timerRef.current = setTimeout(() => {
      if (loading) setIframeError(true);
    }, 8000);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.id]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
    clearTimeout(timerRef.current);
  }, []);

  const handleIframeError = useCallback(() => {
    setIframeError(true);
    setLoading(false);
    clearTimeout(timerRef.current);
  }, []);

  const handleReload = useCallback(() => {
    setIframeError(false);
    setLoading(true);
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      }, 50);
    }
  }, []);

  const handleOpenExternal = useCallback(() => {
    if (!service) return;
    openPopup(service.url);
  }, [service]);

  if (!service) return null;

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
              onClick={handleOpenExternal}
              className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Abrir externamente"
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
          {!iframeError ? (
            <>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={service.url}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={service.nome}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">
                  Não foi possível carregar este conteúdo
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  O site pode estar bloqueando acesso embutido.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReload}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Tentar novamente
                </button>
                <button
                  onClick={handleOpenExternal}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Abrir externamente
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
