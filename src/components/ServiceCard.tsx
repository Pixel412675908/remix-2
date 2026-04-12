import { motion } from "framer-motion";
import { ExternalLink, Maximize2, ArrowUpRight, Clock } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  onEmbed: (service: Service) => void;
  onModal: (service: Service) => void;
}

export function ServiceCard({ service, index, onEmbed, onModal }: ServiceCardProps) {
  const isComingSoon = service.status === "coming-soon";

  const handleOpen = () => {
    if (isComingSoon || !service.url) return;
    if (service.tipo === "external") {
      window.open(service.url, "_blank");
      return;
    }
    onEmbed(service);
  };

  const handlePopup = () => {
    if (isComingSoon || !service.url) return;
    if (service.tipo === "external") {
      window.open(service.url, "_blank");
      return;
    }
    onModal(service);
  };

  const handleExternal = () => {
    if (isComingSoon || !service.url) return;
    window.open(service.url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative glass rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/20 ${isComingSoon ? "opacity-60" : ""}`}
    >
      {/* Coming soon badge */}
      {isComingSoon && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
          <Clock className="w-3 h-3" />
          Em breve
        </div>
      )}

      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={service.logo}
          alt={service.nome}
          className="h-12 w-auto max-w-[120px] shrink-0 object-contain sm:h-14 md:h-16"
          loading="lazy"
          draggable={false}
        />
        <div className="min-w-0 pt-0.5">
          <h3 className="font-semibold text-foreground text-[15px] leading-tight">{service.nome}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{service.descricao}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={handleOpen}
          disabled={isComingSoon}
          className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          Abrir
        </button>
        <button
          onClick={handlePopup}
          disabled={isComingSoon}
          className="h-9 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Pop-up
        </button>
        <button
          onClick={handleExternal}
          disabled={isComingSoon}
          className="h-9 w-9 rounded-xl border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          title="Abrir no navegador"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
