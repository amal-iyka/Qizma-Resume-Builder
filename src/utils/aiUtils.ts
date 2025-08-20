import { ResumeData } from '@/types/resume';

interface AISuggestion {
  type: 'summary' | 'experience' | 'skills' | 'general';
  title: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
}

export const generateAISuggestions = async (data: ResumeData): Promise<AISuggestion[]> => {
  const suggestions: AISuggestion[] = [];

  try {
    // Analyze the resume data and generate suggestions
    
    // Summary suggestions
    if (!data.summary || data.summary.length < 50) {
      suggestions.push({
        type: 'summary',
        title: 'Professional Summary Missing or Too Short',
        suggestion: 'Add a compelling 2-3 sentence professional summary that highlights your key achievements, years of experience, and unique value proposition. This helps recruiters quickly understand your profile.',
        priority: 'high'
      });
    }

    // Work experience suggestions
    if (data.workExperience.length === 0) {
      suggestions.push({
        type: 'experience',
        title: 'Add Work Experience',
        suggestion: 'Include your work experience with specific achievements and quantifiable results. Use action verbs and focus on impact rather than just responsibilities.',
        priority: 'high'
      });
    } else {
      // Check for weak descriptions
      const hasWeakDescriptions = data.workExperience.some(exp => 
        exp.description.length === 0 || exp.description.some(desc => desc.length < 20)
      );
      
      if (hasWeakDescriptions) {
        suggestions.push({
          type: 'experience',
          title: 'Strengthen Experience Descriptions',
          suggestion: 'Use the STAR method (Situation, Task, Action, Result) to describe your achievements. Include specific metrics and quantifiable results whenever possible.',
          priority: 'medium'
        });
      }
    }

    // Skills suggestions
    if (data.skills.length < 5) {
      suggestions.push({
        type: 'skills',
        title: 'Add More Relevant Skills',
        suggestion: 'Include both technical and soft skills relevant to your target role. Aim for 8-12 skills including programming languages, tools, frameworks, and soft skills.',
        priority: 'medium'
      });
    }

    // Contact information
    const contactIssues = [];
    if (!data.personalInfo.email) contactIssues.push('email');
    if (!data.personalInfo.phone) contactIssues.push('phone');
    if (!data.personalInfo.location) contactIssues.push('location');

    if (contactIssues.length > 0) {
      suggestions.push({
        type: 'general',
        title: 'Complete Contact Information',
        suggestion: `Add missing contact details: ${contactIssues.join(', ')}. Complete contact information makes it easy for employers to reach you.`,
        priority: 'high'
      });
    }

    // LinkedIn/GitHub suggestions
    if (!data.personalInfo.linkedin && !data.personalInfo.github) {
      suggestions.push({
        type: 'general',
        title: 'Add Professional Profiles',
        suggestion: 'Include your LinkedIn profile and GitHub (for technical roles) to showcase your professional network and projects.',
        priority: 'low'
      });
    }

    // Education suggestions
    if (data.education.length === 0) {
      suggestions.push({
        type: 'general',
        title: 'Add Education Information',
        suggestion: 'Include your educational background, including degree, institution, and graduation year. This information is often required by employers.',
        priority: 'medium'
      });
    }

    // Generic improvement suggestions if resume looks good
    if (suggestions.length === 0) {
      suggestions.push({
        type: 'general',
        title: 'Great Resume Foundation!',
        suggestion: 'Your resume has all the essential elements. Consider adding specific metrics to your achievements, ensuring consistent formatting, and tailoring content for each job application.',
        priority: 'low'
      });
    }

    return suggestions;

  } catch (error) {
    console.error('AI suggestions error:', error);
    return [{
      type: 'general',
      title: 'AI Analysis Unavailable',
      suggestion: 'Unable to generate AI suggestions at this time. Please ensure all sections are filled out and try again.',
      priority: 'low'
    }];
  }
};

export const improveResumeSection = async (section: string, content: string): Promise<string> => {
  try {
    // This would typically call an AI service like OpenAI
    // For now, we'll provide some basic improvements based on rules
    
    if (section === 'summary') {
      if (content.length < 100) {
        return `${content} Consider expanding this summary to 2-3 sentences that highlight your key achievements, years of experience, and unique value proposition to make a stronger first impression.`;
      }
    }

    if (section === 'experience') {
      // Add action verbs if missing
      const actionVerbs = ['Led', 'Managed', 'Developed', 'Implemented', 'Achieved', 'Improved', 'Created', 'Delivered'];
      const hasActionVerb = actionVerbs.some(verb => content.includes(verb));
      
      if (!hasActionVerb) {
        return `Consider starting with action verbs like "Led," "Developed," or "Achieved" to make your accomplishments more impactful. Example: "${content}"`;
      }
    }

    return content;
  } catch (error) {
    console.error('Section improvement error:', error);
    return content;
  }
};