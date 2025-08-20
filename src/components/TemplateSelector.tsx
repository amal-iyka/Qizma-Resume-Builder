import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumeTemplate, ColorTheme } from '@/types/resume';
import { Check, Palette, Filter } from 'lucide-react';
import { TemplatePreview } from './TemplatePreview';
import { useState } from 'react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  colorThemes: ColorTheme[];
}

const templates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean design with colored header, perfect for tech and creative roles',
    preview: '/template-modern.png',
    category: 'modern'
  },
  {
    id: 'classic',
    name: 'Classic Minimalist',
    description: 'Traditional layout optimized for ATS systems',
    preview: '/template-classic.png',
    category: 'classic'
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Eye-catching design for designers and creative professionals',
    preview: '/template-creative.png',
    category: 'creative'
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated layout for senior leadership positions',
    preview: '/template-executive.png',
    category: 'executive'
  },
  {
    id: 'tech',
    name: 'Tech Innovator',
    description: 'Modern tech-focused design with skill highlights',
    preview: '/template-tech.png',
    category: 'modern'
  },
  {
    id: 'compact',
    name: 'Compact Pro',
    description: 'Space-efficient design that fits more content',
    preview: '/template-compact.png',
    category: 'classic'
  },
  {
    id: 'artistic',
    name: 'Artistic Vision',
    description: 'Bold creative design for artists and designers',
    preview: '/template-artistic.png',
    category: 'creative'
  },
  {
    id: 'corporate',
    name: 'Corporate Standard',
    description: 'Professional corporate design for business roles',
    preview: '/template-corporate.png',
    category: 'executive'
  }
];

export function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
  selectedTheme,
  onThemeChange,
  colorThemes
}: TemplateSelectorProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const categories = ['all', 'modern', 'classic', 'creative', 'executive'];
  const filteredTemplates = categoryFilter === 'all' 
    ? templates 
    : templates.filter(template => template.category === categoryFilter);

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Choose Template</h2>
              <p className="text-sm text-muted-foreground">Select from {templates.length} professional resume templates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-1 text-sm text-foreground"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Templates' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'transform scale-[1.02] z-10'
                  : 'hover:transform hover:scale-[1.01]'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              <Card className={`p-4 shadow-card hover:shadow-button transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-primary shadow-glow bg-card/80 backdrop-blur-sm'
                  : 'hover:shadow-elegant'
              }`}>
                <TemplatePreview 
                  template={template} 
                  isSelected={selectedTemplate === template.id}
                />
              </Card>
            </div>
          ))}
        </div>
      </Card>

      {/* Color Theme Selection */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Color Theme</h2>
            <p className="text-sm text-muted-foreground">Customize your resume colors to match your personal brand</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorThemes.map((theme) => (
            <div
              key={theme.id}
              className="cursor-pointer transition-all duration-300 hover:transform hover:scale-105"
              onClick={() => onThemeChange(theme)}
            >
              <Card className={`p-4 shadow-card ${
                selectedTheme.id === theme.id
                  ? 'ring-2 ring-primary shadow-button'
                  : ''
              }`}>
                {selectedTheme.id === theme.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                </div>
                <h3 className="font-medium text-sm text-foreground">{theme.name}</h3>
              </Card>
            </div>
          ))}
        </div>
      </Card>

      {/* Selected Theme Preview */}
      <Card className="p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Theme Preview</h3>
        <div
          className="p-6 rounded-lg text-white"
          style={{ background: `linear-gradient(135deg, ${selectedTheme.primary}, ${selectedTheme.secondary})` }}
        >
          <h4 className="text-xl font-bold mb-2">Your Name</h4>
          <p className="opacity-90">Software Engineer</p>
          <div className="mt-4 flex gap-4">
            <span 
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: selectedTheme.accent }}
            >
              JavaScript
            </span>
            <span 
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: selectedTheme.accent }}
            >
              React
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}