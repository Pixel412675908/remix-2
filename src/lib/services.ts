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
}

export const services: Service[] = [
  {
    id: "platform-destroyer",
    nome: "Platform Destroyer",
    descricao: "Automatize ações em plataformas com scripts avançados.",
    categoria: "scripts",
    url: "",
    tipo: "external",
    icon: "zap",
  },
  {
    id: "taskitos",
    nome: "Taskitos",
    descricao: "Gerencie tarefas e produtividade de forma inteligente.",
    categoria: "plataforma",
    url: "https://taskitos.cupiditys.lol/",
    tipo: "embed",
    icon: "check-square",
  },
  {
    id: "kanto",
    nome: "Kanto",
    descricao: "Acesso direto ao Khan Academy em português.",
    categoria: "plataforma",
    url: "https://khan.cupiditys.lol/pt-br/",
    tipo: "embed",
    icon: "graduation-cap",
  },
  {
    id: "leia-sp",
    nome: "Leia SP",
    descricao: "Biblioteca digital com acervo de leitura acessível.",
    categoria: "apostila",
    url: "https://leiasp.cupiditys.lol/",
    tipo: "embed",
    icon: "book-open",
  },
  {
    id: "speaki",
    nome: "Speaki",
    descricao: "Pratique idiomas com ferramentas de conversação.",
    categoria: "plataforma",
    url: "https://speakify.cupiditys.lol/",
    tipo: "embed",
    icon: "languages",
  },
  {
    id: "apostilas",
    nome: "Apostilas",
    descricao: "Apostilas organizadas por disciplina e tema.",
    categoria: "apostila",
    url: "https://apostilas.cupiditys.lol/",
    tipo: "embed",
    icon: "file-text",
  },
  {
    id: "eclipse-lunar",
    nome: "Eclipse Lunar",
    descricao: "Hub independente com acesso isolado e login próprio.",
    categoria: "plataforma",
    url: "https://crimsonzerohub.xyz/",
    tipo: "external",
    icon: "moon",
  },
];

export const categoryLabels: Record<ServiceCategory, string> = {
  scripts: "Scripts",
  apostila: "Apostilas",
  plataforma: "Plataformas",
};
