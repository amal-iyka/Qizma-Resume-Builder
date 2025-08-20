import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ResumeData, WorkExperience, Education, Skill } from '@/types/resume';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Award } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState('personal');

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    };
    onChange({
      workExperience: [...data.workExperience, newExp]
    });
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    const updated = data.workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ workExperience: updated });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      workExperience: data.workExperience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    onChange({
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    onChange({
      skills: [...data.skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: string, value: any) => {
    const updated = data.skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onChange({ skills: updated });
  };

  const removeSkill = (id: string) => {
    onChange({
      skills: data.skills.filter(skill => skill.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="personal" className="text-xs">
            <User className="w-3 h-3 mr-1" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs">
            <Briefcase className="w-3 h-3 mr-1" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs">
            <GraduationCap className="w-3 h-3 mr-1" />
            Education
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">
            <Code className="w-3 h-3 mr-1" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">
            <Award className="w-3 h-3 mr-1" />
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={data.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                placeholder="github.com/johndoe"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button onClick={addWorkExperience} size="sm" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </Button>
          </div>
          {data.workExperience.map((exp, index) => (
            <Card key={exp.id} className="p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">Experience {index + 1}</Badge>
                <Button
                  onClick={() => removeWorkExperience(exp.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <Label htmlFor={`current-${exp.id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>
              </div>
              <div className="mt-4">
                <Label>Description</Label>
                <Textarea
                  value={exp.description.join('\n')}
                  onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value.split('\n'))}
                  placeholder="• Led team of 5 developers to deliver project 2 weeks ahead of schedule&#10;• Improved system performance by 40% through code optimization"
                  rows={4}
                />
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Education</h3>
            <Button onClick={addEducation} size="sm" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Education
            </Button>
          </div>
          {data.education.map((edu, index) => (
            <Card key={edu.id} className="p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">Education {index + 1}</Badge>
                <Button
                  onClick={() => removeEducation(edu.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="Harvard University"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Skills</h3>
            <Button onClick={addSkill} size="sm" className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Skill
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <Card key={skill.id} className="p-4 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">Skill {index + 1}</Badge>
                  <Button
                    onClick={() => removeSkill(skill.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="JavaScript"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => onChange({ summary: e.target.value })}
              placeholder="Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of leading teams and delivering high-quality solutions that increase efficiency by 40%."
              rows={6}
            />
            <p className="text-sm text-muted-foreground mt-2">
              Write a compelling summary that highlights your key achievements and value proposition.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}