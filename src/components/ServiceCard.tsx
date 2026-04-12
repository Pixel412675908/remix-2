import { motion } from "framer-motion";
import { ExternalLink, Maximize2, ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  onEmbed: (service: Service) => void;
  onModal: (service: Service) => void;
}

export function ServiceCard({ service, index, onEmbed, onModal }: ServiceCardProps) {
  const handleOpen = () => {
    if (service.tipo === "external" || !service.url) {
      if (service.url) window.open(service.url, "_blank");
      return;
    }
    onEmbed(service);
  };

  const handlePopup = () => {
    if (!service.url) return;
    if (service.tipo === "external") {
      window.open(service.url, "_blank");
      return;
    }
    onModal(service);
  };

  const handleExternal = () => {
    if (service.url) window.open(service.url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative glass rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20"
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <ServiceIcon icon={service.icon} className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground text-[15px] leading-tight">{service.nome}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{service.descricao}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={handleOpen}
          disabled={!service.url}
          className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          Abrir
        </button>
        <button
          onClick={handlePopup}
          disabled={!service.url}
          className="h-9 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Pop-up
        </button>
        <button
          onClick={handleExternal}
          disabled={!service.url}
          className="h-9 w-9 rounded-xl border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          title="Abrir no navegador"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
