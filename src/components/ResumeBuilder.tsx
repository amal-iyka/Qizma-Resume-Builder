import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ResumeData, ResumeTemplate, ColorTheme } from '@/types/resume';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from './TemplateSelector';
import { AISuggestionsDialog } from './AISuggestionsDialog';
import { FileText, Download, Palette, Wand2 } from 'lucide-react';
import { exportToPDF, exportToDOCX, exportToTXT } from '@/utils/exportUtils';
import { generateAISuggestions } from '@/utils/aiUtils';
import { toast } from 'sonner';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

const colorThemes: ColorTheme[] = [
  { id: 'magenta', name: 'Electric Magenta', primary: '#FF6EC7', secondary: '#8B5CF6', accent: '#F472B6' },
  { id: 'purple', name: 'Royal Purple', primary: '#A855F7', secondary: '#7C3AED', accent: '#C084FC' },
  { id: 'pink', name: 'Hot Pink', primary: '#EC4899', secondary: '#DB2777', accent: '#F9A8D4' },
  { id: 'violet', name: 'Deep Violet', primary: '#8B5CF6', secondary: '#6D28D9', accent: '#A78BFA' }
];

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(colorThemes[0]);
  const [currentStep, setCurrentStep] = useState('build');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleDataChange = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const handleGenerateAISuggestions = async () => {
    setIsGeneratingAI(true);
    try {
      const suggestions = await generateAISuggestions(resumeData);
      setAiSuggestions(suggestions);
      setShowAISuggestions(true);
      toast.success('AI suggestions generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI suggestions. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleExportResume = async (format: 'pdf' | 'docx' | 'txt') => {
    setIsExporting(true);
    try {
      let result;
      
      if (format === 'pdf') {
        result = await exportToPDF('resume-preview', `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      } else if (format === 'docx') {
        result = await exportToDOCX(resumeData, `${resumeData.personalInfo.fullName || 'resume'}.docx`);
      } else {
        result = exportToTXT(resumeData, `${resumeData.personalInfo.fullName || 'resume'}.txt`);
      }

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(`Failed to export ${format.toUpperCase()}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-dark opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Qizma instant resume builder</h1>
                <p className="text-sm text-muted-foreground">Create professional, ATS-friendly resumes instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={handleGenerateAISuggestions} 
                className="shadow-button"
                disabled={isGeneratingAI}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGeneratingAI ? 'Analyzing...' : 'AI Optimize'}
              </Button>
              <Button 
                onClick={() => handleExportResume('pdf')} 
                className="bg-gradient-primary shadow-button"
                disabled={isExporting}
              >
                <Download className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card shadow-card">
            <TabsTrigger value="build" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Build Resume
            </TabsTrigger>
            <TabsTrigger value="customize" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-2" />
              Customize
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Preview & Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Resume Information</h2>
                  <Badge variant="secondary">Step 1</Badge>
                </div>
                <ResumeForm data={resumeData} onChange={handleDataChange} />
              </Card>
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Live Preview</h2>
                  <Badge variant="outline">{selectedTemplate} Template</Badge>
                </div>
                <div id="resume-preview">
                  <ResumePreview data={resumeData} template={selectedTemplate} theme={selectedTheme} />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
              colorThemes={colorThemes}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 shadow-card">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Final Preview</h2>
                  <div id="resume-preview">
                    <ResumePreview data={resumeData} template={selectedTemplate} theme={selectedTheme} />
                  </div>
                </Card>
              </div>
              <div className="space-y-4">
                <Card className="p-4 shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">Export Options</h3>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => handleExportResume('pdf')} 
                      className="w-full bg-gradient-primary"
                      disabled={isExporting}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Download PDF'}
                    </Button>
                    <Button 
                      onClick={() => handleExportResume('docx')} 
                      variant="outline" 
                      className="w-full"
                      disabled={isExporting}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Download DOCX'}
                    </Button>
                    <Button 
                      onClick={() => handleExportResume('txt')} 
                      variant="outline" 
                      className="w-full"
                      disabled={isExporting}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isExporting ? 'Exporting...' : 'Export Text'}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>

      <AISuggestionsDialog
        open={showAISuggestions}
        onOpenChange={setShowAISuggestions}
        suggestions={aiSuggestions}
        isLoading={isGeneratingAI}
      />
    </div>
  );
}