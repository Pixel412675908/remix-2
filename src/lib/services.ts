import taskitosLogo from "@/assets/logos/taskitos.png";
import kantoLogo from "@/assets/logos/kanto.png";
import leiaspLogo from "@/assets/logos/leiasp.png";
import speakiLogo from "@/assets/logos/speaki.png";
import apostilasLogo from "@/assets/logos/apostilas.png";
import destroyerLogo from "@/assets/logos/destroyer.png";
import eclipseLunarLogo from "@/assets/logos/eclipse-lunar.png";

export type ServiceCategory = "scripts" | "apostila" | "plataforma";
export type OpenType = "embed" | "modal" | "external";

export interface Service {
  id: string;
  nome: string;
  descricao: string;
  categoria: ServiceCategory;
  url: string;
  tipo: OpenType;
  icon: string;
  logo: string;
  status?: "active" | "coming-soon";
}

export const services: Service[] = [
  {
    id: "taskitos",
    nome: "Taskitos",
    descricao: "Gerencie tarefas e produtividade de forma inteligente.",
    categoria: "scripts",
    url: "https://taskitos.cupiditys.lol/",
    tipo: "embed",
    icon: "check-square",
    logo: taskitosLogo,
  },
  {
    id: "kanto",
    nome: "Kanto",
    descricao: "Acesso direto ao Khan Academy em português.",
    categoria: "scripts",
    url: "https://khan.cupiditys.lol/pt-br/",
    tipo: "embed",
    icon: "graduation-cap",
    logo: kantoLogo,
  },
  {
    id: "leia-sp",
    nome: "Leia SP",
    descricao: "Ferramenta educacional leve com acervo de leitura acessível.",
    categoria: "scripts",
    url: "https://leiasp.cupiditys.lol/",
    tipo: "embed",
    icon: "book-open",
    logo: leiaspLogo,
  },
  {
    id: "speaki",
    nome: "Speaki",
    descricao: "Pratique idiomas com ferramentas de conversação.",
    categoria: "scripts",
    url: "https://speakify.cupiditys.lol/",
    tipo: "embed",
    icon: "languages",
    logo: speakiLogo,
  },
  {
    id: "apostilas",
    nome: "Apostilas",
    descricao: "Apostilas organizadas por disciplina e tema.",
    categoria: "apostila",
    url: "https://apostilas.cupiditys.lol/",
    tipo: "embed",
    icon: "file-text",
    logo: apostilasLogo,
  },
  {
    id: "platform-destroyer",
    nome: "Destroyer",
    descricao: "Automatize ações em plataformas com scripts avançados.",
    categoria: "plataforma",
    url: "",
    tipo: "external",
    icon: "zap",
    logo: destroyerLogo,
    status: "coming-soon",
  },
  {
    id: "eclipse-lunar",
    nome: "Eclipse Lunar",
    descricao: "Hub independente com acesso isolado e login próprio.",
    categoria: "plataforma",
    url: "https://crimsonzerohub.xyz/",
    tipo: "external",
    icon: "moon",
    logo: eclipseLunarLogo,
  },
];
export const categoryLabels: Record<ServiceCategory, string> = {
  scripts: "Scripts",
  apostila: "Apostilas",
  plataforma: "Plataformas",
};
