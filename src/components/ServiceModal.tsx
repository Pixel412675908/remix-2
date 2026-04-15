import { useCallback, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowLeft, RotateCw, AlertTriangle } from "lucide-react";
import type { Service } from "@/lib/services";
import { openPopup } from "@/lib/popup";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIframeError(false);
    setLoading(true);
    timerRef.current = setTimeout(() => {
      if (loading) setIframeError(true);
    }, 8000);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.id]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    clearTimeout(timerRef.current);
  }, []);

  const handleError = useCallback(() => {
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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-4xl h-[85vh] sm:h-[80vh] glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 min-w-0">
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
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={service.url}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                  onLoad={handleLoad}
                  onError={handleError}
                  title={service.nome}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Não foi possível carregar este conteúdo.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReload}
                    className="px-4 py-2 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    Tentar novamente
                  </button>
                  <button
                    onClick={handleOpenExternal}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                  >
                    Abrir externamente
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
