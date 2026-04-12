import taskitosIcon from "@/assets/icons/taskitos.png";
import khanIcon from "@/assets/icons/khan.png";
import leiaspIcon from "@/assets/icons/leiasp.png";
import speakIcon from "@/assets/icons/speak.png";
import apostilasIcon from "@/assets/icons/apostilas.png";
import destroyerIcon from "@/assets/icons/destroyer.png";
import eclipseLunarIcon from "@/assets/icons/eclipse-lunar.png";

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
    logo: taskitosIcon,
  },
  {
    id: "khan-academy",
    nome: "Khan Academy",
    descricao: "Acesso direto ao Khan Academy em português.",
    categoria: "scripts",
    url: "https://khan.cupiditys.lol/pt-br/",
    tipo: "embed",
    icon: "graduation-cap",
    logo: khanIcon,
  },
  {
    id: "leia-sp",
    nome: "Leia SP",
    descricao: "Ferramenta educacional leve com acervo de leitura acessível.",
    categoria: "scripts",
    url: "https://leiasp.cupiditys.lol/",
    tipo: "embed",
    icon: "book-open",
    logo: leiaspIcon,
  },
  {
    id: "speak",
    nome: "Speak",
    descricao: "Pratique idiomas com ferramentas de conversação.",
    categoria: "scripts",
    url: "https://speakify.cupiditys.lol/",
    tipo: "embed",
    icon: "languages",
    logo: speakIcon,
  },
  {
    id: "apostilas",
    nome: "Apostilas",
    descricao: "Apostilas organizadas por disciplina e tema.",
    categoria: "apostila",
    url: "https://apostilas.cupiditys.lol/",
    tipo: "embed",
    icon: "file-text",
    logo: apostilasIcon,
  },
  {
    id: "platform-destroyer",
    nome: "Destroyer",
    descricao: "Automatize ações em plataformas com scripts avançados.",
    categoria: "plataforma",
    url: "https://cmsphacks.xyz/",
    tipo: "external",
    icon: "zap",
    logo: destroyerIcon,
  },
  {
    id: "eclipse-lunar",
    nome: "Eclipse Lunar",
    descricao: "Hub independente com acesso isolado e login próprio.",
    categoria: "plataforma",
    url: "https://crimsonzerohub.xyz/",
    tipo: "external",
    icon: "moon",
    logo: eclipseLunarIcon,
  },
];
export const categoryLabels: Record<ServiceCategory, string> = {
  scripts: "Scripts",
  apostila: "Apostilas",
  plataforma: "Plataformas",
};
