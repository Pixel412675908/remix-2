import {
  Zap,
  CheckSquare,
  GraduationCap,
  BookOpen,
  Languages,
  FileText,
  Moon,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  zap: Zap,
  "check-square": CheckSquare,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  languages: Languages,
  "file-text": FileText,
  moon: Moon,
};

export function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = iconMap[icon] || Zap;
  return <Icon className={className} />;
}
