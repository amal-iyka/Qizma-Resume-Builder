import { ResumeTemplate } from '@/types/resume';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Star, 
  Layout,
  Palette,
  Building
} from 'lucide-react';

interface TemplatePreviewProps {
  template: ResumeTemplate;
  isSelected: boolean;
}

const getTemplateIcon = (templateId: string) => {
  const iconMap = {
    modern: Layout,
    classic: User,
    creative: Palette,
    executive: Building,
    tech: Code,
    compact: Briefcase,
    artistic: Star,
    corporate: GraduationCap
  };
  return iconMap[templateId as keyof typeof iconMap] || User;
};

const getTemplatePreview = (templateId: string) => {
  switch (templateId) {
    case 'modern':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50">
          {/* Header */}
          <div className="h-8 bg-gradient-primary"></div>
          {/* Content */}
          <div className="p-2 space-y-1">
            <div className="h-2 bg-primary/30 rounded w-3/4"></div>
            <div className="h-1 bg-muted rounded w-1/2"></div>
            <div className="space-y-0.5 mt-2">
              <div className="h-1 bg-muted rounded w-full"></div>
              <div className="h-1 bg-muted rounded w-4/5"></div>
              <div className="h-1 bg-muted rounded w-3/5"></div>
            </div>
            <div className="flex gap-1 mt-2">
              <div className="w-4 h-3 bg-primary/20 rounded text-[6px] flex items-center justify-center">JS</div>
              <div className="w-4 h-3 bg-primary/20 rounded text-[6px] flex items-center justify-center">RCT</div>
            </div>
          </div>
        </div>
      );

    case 'classic':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50">
          <div className="p-2 space-y-1">
            <div className="text-center border-b border-border/30 pb-1">
              <div className="h-2 bg-foreground/80 rounded w-2/3 mx-auto mb-0.5"></div>
              <div className="h-0.5 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-foreground/60 rounded w-1/3 mb-0.5"></div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-4/5"></div>
                <div className="h-0.5 bg-muted rounded w-3/5"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-foreground/60 rounded w-1/4 mb-0.5"></div>
              <div className="h-0.5 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      );

    case 'creative':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50 relative">
          <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-primary rounded-bl-lg"></div>
          <div className="p-2 space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-primary rounded-full"></div>
              <div className="h-1.5 bg-primary/40 rounded w-1/2"></div>
            </div>
            <div className="h-0.5 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="space-y-0.5">
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-4/5"></div>
                <div className="h-0.5 bg-muted rounded w-3/5"></div>
              </div>
              <div className="space-y-0.5">
                <div className="h-4 bg-gradient-secondary rounded"></div>
                <div className="flex gap-0.5">
                  <div className="w-2 h-1 bg-primary/30 rounded"></div>
                  <div className="w-2 h-1 bg-secondary/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'executive':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border-2 border-primary/20">
          <div className="p-2 space-y-1">
            <div className="text-center pb-1">
              <div className="h-2 bg-foreground/90 rounded w-2/3 mx-auto mb-0.5 font-bold"></div>
              <div className="h-0.5 bg-primary/40 rounded w-1/3 mx-auto"></div>
            </div>
            <div className="border-l-2 border-primary/30 pl-1 space-y-1">
              <div className="h-1 bg-foreground/70 rounded w-1/2 mb-0.5"></div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-5/6"></div>
              </div>
            </div>
            <div className="border-l-2 border-primary/30 pl-1 space-y-0.5">
              <div className="h-1 bg-foreground/70 rounded w-2/5"></div>
              <div className="h-0.5 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>
      );

    case 'tech':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-primary/30 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-primary"></div>
          <div className="p-2 pl-3 space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-primary rounded-full"></div>
              <div className="h-1.5 bg-foreground/80 rounded w-1/2"></div>
            </div>
            <div className="h-0.5 bg-primary/40 rounded w-1/3"></div>
            <div className="space-y-0.5 mt-2">
              <div className="flex gap-1">
                <div className="w-6 h-2 bg-gradient-primary rounded text-[6px] text-white flex items-center justify-center">CODE</div>
                <div className="w-6 h-2 bg-gradient-secondary rounded text-[6px] text-white flex items-center justify-center">API</div>
              </div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'compact':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50">
          <div className="p-1.5 space-y-0.5">
            <div className="h-1.5 bg-foreground/80 rounded w-2/3"></div>
            <div className="h-0.5 bg-muted rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-1 text-[6px]">
              <div className="space-y-0.5">
                <div className="h-0.5 bg-foreground/60 rounded w-3/4"></div>
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-4/5"></div>
              </div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-foreground/60 rounded w-2/3"></div>
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-3/5"></div>
              </div>
            </div>
            <div className="flex gap-0.5 flex-wrap">
              <div className="w-3 h-1 bg-primary/20 rounded text-[5px]"></div>
              <div className="w-3 h-1 bg-primary/20 rounded text-[5px]"></div>
              <div className="w-3 h-1 bg-primary/20 rounded text-[5px]"></div>
            </div>
          </div>
        </div>
      );

    case 'artistic':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50 relative">
          <div className="absolute inset-0 bg-gradient-primary/5"></div>
          <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-primary rounded-full opacity-60"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-gradient-secondary rounded-full opacity-40"></div>
          <div className="relative p-2 space-y-1">
            <div className="text-center">
              <div className="h-2 bg-gradient-primary rounded w-2/3 mx-auto mb-0.5"></div>
              <div className="h-0.5 bg-primary/60 rounded w-1/3 mx-auto"></div>
            </div>
            <div className="space-y-0.5 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-1 h-4 bg-gradient-primary rounded"></div>
                <div className="space-y-0.5 flex-1">
                  <div className="h-0.5 bg-muted rounded w-full"></div>
                  <div className="h-0.5 bg-muted rounded w-4/5"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-0.5">
              <div className="w-3 h-1.5 bg-gradient-secondary rounded"></div>
              <div className="w-3 h-1.5 bg-gradient-primary rounded"></div>
            </div>
          </div>
        </div>
      );

    case 'corporate':
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border-2 border-foreground/20">
          <div className="bg-foreground/5 h-2"></div>
          <div className="p-2 space-y-1">
            <div className="text-center border-b border-foreground/20 pb-1">
              <div className="h-1.5 bg-foreground/90 rounded w-2/3 mx-auto mb-0.5"></div>
              <div className="h-0.5 bg-foreground/50 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="h-0.5 bg-foreground/70 rounded w-1/3"></div>
                <div className="h-0.5 bg-muted rounded w-1/4"></div>
              </div>
              <div className="space-y-0.5">
                <div className="h-0.5 bg-muted rounded w-full"></div>
                <div className="h-0.5 bg-muted rounded w-4/5"></div>
              </div>
            </div>
            <div className="h-0.5 bg-foreground/70 rounded w-1/4"></div>
            <div className="h-0.5 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-card rounded-lg overflow-hidden border border-border/50">
          <div className="p-2 space-y-1">
            <div className="h-2 bg-primary/30 rounded w-3/4"></div>
            <div className="h-1 bg-muted rounded w-1/2"></div>
            <div className="space-y-0.5 mt-2">
              <div className="h-1 bg-muted rounded w-full"></div>
              <div className="h-1 bg-muted rounded w-4/5"></div>
            </div>
          </div>
        </div>
      );
  }
};

export function TemplatePreview({ template, isSelected }: TemplatePreviewProps) {
  const IconComponent = getTemplateIcon(template.id);

  return (
    <div className="relative">
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center z-10 shadow-glow">
          <IconComponent className="w-3 h-3 text-white" />
        </div>
      )}
      
      {/* Template preview */}
      <div className="aspect-[3/4] bg-gradient-dark rounded-lg mb-4 p-2 shadow-card">
        {getTemplatePreview(template.id)}
      </div>

      {/* Template info */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
          <div className="flex items-center gap-1">
            <IconComponent className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary capitalize font-medium">
              {template.category}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
      </div>
    </div>
  );
}