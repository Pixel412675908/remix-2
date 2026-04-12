import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon as MoonIcon } from "lucide-react";
import { services, categoryLabels, type ServiceCategory, type Service } from "@/lib/services";
import { useTheme } from "@/hooks/use-theme";
import { LumiLogo } from "@/components/LumiLogo";
import { ServiceCard } from "@/components/ServiceCard";
import { EmbedViewer } from "@/components/EmbedViewer";
import { ServiceModal } from "@/components/ServiceModal";

const categories: ServiceCategory[] = ["scripts", "apostila", "plataforma"];

export default function Index() {
  const { theme, toggle } = useTheme();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [embedService, setEmbedService] = useState<Service | null>(null);
  const [modalService, setModalService] = useState<Service | null>(null);

  const filtered = activeCategory === "all"
    ? services
    : services.filter((s) => s.categoria === activeCategory);

  if (embedService) {
    return <EmbedViewer service={embedService} onClose={() => setEmbedService(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <LumiLogo />
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Seu hub central
          </h1>
          <p className="text-muted-foreground mt-2 text-[15px] max-w-md">
            Acesse todos os seus serviços em um só lugar, de forma organizada e rápida.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-5 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <FilterPill
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            label="Todos"
            count={services.length}
          />
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              label={categoryLabels[cat]}
              count={services.filter((s) => s.categoria === cat).length}
            />
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-6xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onEmbed={setEmbedService}
              onModal={setModalService}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LUMI
          </span>
          <span className="text-xs text-muted-foreground">
            Hub de produtividade
          </span>
        </div>
      </footer>

      {/* Modal */}
      {modalService && (
        <ServiceModal service={modalService} onClose={() => setModalService(null)} />
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 h-9 rounded-xl text-xs font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <span className={`ml-1.5 ${active ? "opacity-80" : "opacity-50"}`}>
        {count}
      </span>
    </button>
  );
}
