import { ResumeData, ColorTheme } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  theme: ColorTheme;
}

export function ResumePreview({ data, template, theme }: ResumePreviewProps) {
  const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Modern Professional Template
  if (template === 'modern') {
    return (
      <div className="bg-white shadow-elegant rounded-lg overflow-hidden max-w-2xl mx-auto">
        <div 
          className="p-6 text-white"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
        >
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.location}
              </div>
            )}
          </div>
          {(data.personalInfo.linkedin || data.personalInfo.github) && (
            <div className="flex gap-4 mt-3 text-sm">
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  GitHub
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          {data.summary && (
            <section>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b-2" style={{ borderColor: theme.accent }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b-2" style={{ borderColor: theme.accent }}>
                Work Experience
              </h2>
              <div className="space-y-4">
                {data.workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company} • {exp.location}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {exp.description.map((item, index) => (
                          item.trim() && (
                            <li key={index} className="flex items-start">
                              <span className="text-gray-400 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b-2" style={{ borderColor: theme.accent }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 pb-1 border-b-2" style={{ borderColor: theme.accent }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 text-sm rounded-full text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Classic Minimalist Template
  if (template === 'classic') {
    return (
      <div className="bg-white shadow-elegant rounded-lg p-8 max-w-2xl mx-auto border-l-4" style={{ borderLeftColor: theme.primary }}>
        <header className="text-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-wide">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>•</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
        </header>

        <div className="space-y-8">
          {data.summary && (
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-widest" style={{ color: theme.primary }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed italic">{data.summary}</p>
            </section>
          )}

          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-widest" style={{ color: theme.primary }}>
                Experience
              </h2>
              <div className="space-y-6">
                {data.workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600 text-sm">{exp.company} • {exp.location}</p>
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-sm text-gray-700 space-y-1 mt-3">
                        {exp.description.map((item, index) => (
                          item.trim() && (
                            <li key={index} className="leading-relaxed">{item}</li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-widest" style={{ color: theme.primary }}>
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                      {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-widest" style={{ color: theme.primary }}>
                Skills
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-sm text-gray-700 py-1">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Creative Portfolio Template
  if (template === 'creative') {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-elegant rounded-2xl overflow-hidden max-w-2xl mx-auto">
        <div className="relative">
          <div 
            className="h-32 bg-gradient-to-r"
            style={{ background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
          />
          <div className="absolute -bottom-8 left-8">
            <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                {data.personalInfo.fullName?.charAt(0) || 'Y'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-12 p-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" style={{ color: theme.primary }} />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" style={{ color: theme.primary }} />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" style={{ color: theme.primary }} />
                  {data.personalInfo.location}
                </div>
              )}
            </div>
          </header>

          <div className="grid gap-6">
            {data.summary && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-3" style={{ color: theme.primary }}>
                  Creative Vision
                </h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </section>
            )}

            {data.workExperience.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4" style={{ color: theme.primary }}>
                  Portfolio Experience
                </h2>
                <div className="space-y-4">
                  {data.workExperience.map((exp) => (
                    <div key={exp.id} className="border-l-4 pl-4" style={{ borderLeftColor: theme.accent }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <span className="px-3 py-1 text-xs rounded-full text-white" style={{ backgroundColor: theme.secondary }}>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className="text-sm text-gray-700 space-y-1">
                          {exp.description.map((item, index) => (
                            item.trim() && (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: theme.accent }}></span>
                                <span>{item}</span>
                              </li>
                            )
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills.length > 0 && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4" style={{ color: theme.primary }}>
                  Creative Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 text-sm rounded-full border-2"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Executive Elite Template
  if (template === 'executive') {
    return (
      <div className="bg-white shadow-2xl max-w-2xl mx-auto border border-gray-200">
        <div className="bg-gray-900 text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 tracking-tight">
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="space-y-1 text-gray-300">
                {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
                {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 rounded border-2" style={{ borderColor: theme.primary }}>
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ color: theme.primary }}>
                  {data.personalInfo.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {data.summary && (
            <section>
              <div className="flex items-center mb-4">
                <div className="w-8 h-1 mr-4" style={{ backgroundColor: theme.primary }}></div>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  Executive Summary
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
            </section>
          )}

          {data.workExperience.length > 0 && (
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-1 mr-4" style={{ backgroundColor: theme.primary }}></div>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  Leadership Experience
                </h2>
              </div>
              <div className="space-y-6">
                {data.workExperience.map((exp) => (
                  <div key={exp.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company} • {exp.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold" style={{ color: theme.primary }}>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    {exp.description.length > 0 && (
                      <ul className="text-gray-700 space-y-2">
                        {exp.description.map((item, index) => (
                          item.trim() && (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: theme.accent }}></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-8">
            {data.education.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-1 mr-3" style={{ backgroundColor: theme.secondary }}></div>
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    Education
                  </h2>
                </div>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{formatDate(edu.endDate)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.skills.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-1 mr-3" style={{ backgroundColor: theme.accent }}></div>
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                    Core Competencies
                  </h2>
                </div>
                <div className="space-y-2">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div 
                            key={dot} 
                            className="w-2 h-2 rounded-full"
                            style={{ 
                              backgroundColor: dot <= (['Beginner', 'Intermediate', 'Advanced', 'Expert'].indexOf(skill.level) + 2) 
                                ? theme.primary 
                                : '#e5e7eb' 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Tech Innovator Template
  if (template === 'tech') {
    return (
      <div className="bg-gray-900 text-white shadow-2xl rounded-lg overflow-hidden max-w-2xl mx-auto border border-gray-700">
        <div className="relative">
          <div 
            className="h-2 bg-gradient-to-r"
            style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})` }}
          />
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }}>
                  {data.personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  {data.personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: theme.primary }} />
                      <span className="font-mono">{data.personalInfo.email}</span>
                    </div>
                  )}
                  {data.personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: theme.secondary }} />
                      <span className="font-mono">{data.personalInfo.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 border-2 rounded-lg flex items-center justify-center font-mono text-lg font-bold"
                     style={{ borderColor: theme.accent, color: theme.accent }}>
                  {'</>'}
                </div>
              </div>
            </div>

            {data.summary && (
              <section className="mb-8">
                <h2 className="text-lg font-bold mb-3 flex items-center">
                  <span className="w-4 h-4 mr-2" style={{ backgroundColor: theme.primary }}></span>
                  <span style={{ color: theme.primary }}>System.out.println("About Me");</span>
                </h2>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed font-mono text-sm">{data.summary}</p>
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {data.workExperience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 mr-2" style={{ backgroundColor: theme.secondary }}></span>
                <span style={{ color: theme.secondary }}>Experience.log</span>
              </h2>
              <div className="space-y-6">
                {data.workExperience.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: theme.accent }}>{exp.position}</h3>
                        <p className="text-gray-300 font-mono text-sm">{exp.company} @ {exp.location}</p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300 font-mono">
                        {formatDate(exp.startDate)} → {exp.current ? 'current' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description.length > 0 && (
                      <div className="space-y-2">
                        {exp.description.map((item, idx) => (
                          item.trim() && (
                            <div key={idx} className="flex items-start text-sm">
                              <span className="text-gray-500 mr-2 font-mono">→</span>
                              <span className="text-gray-300">{item}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <span className="w-4 h-4 mr-2" style={{ backgroundColor: theme.accent }}></span>
                <span style={{ color: theme.accent }}>Tech Stack</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-mono text-sm">{skill.name}</span>
                      <span className="text-xs px-2 py-1 rounded" 
                            style={{ backgroundColor: theme.primary, color: 'white' }}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Compact Pro Template
  if (template === 'compact') {
    return (
      <div className="bg-white shadow-elegant rounded-lg max-w-2xl mx-auto overflow-hidden">
        <div className="grid grid-cols-3 h-full">
          {/* Sidebar */}
          <div className="col-span-1 p-6 text-white" style={{ backgroundColor: theme.primary }}>
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">
                  {data.personalInfo.fullName?.charAt(0) || 'Y'}
                </span>
              </div>
              <h1 className="text-lg font-bold mb-2 leading-tight">
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2 text-white/90">Contact</h3>
                <div className="space-y-1 text-white/80">
                  {data.personalInfo.email && <p className="break-all">{data.personalInfo.email}</p>}
                  {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                  {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
                </div>
              </div>

              {data.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-white/90">Skills</h3>
                  <div className="space-y-1">
                    {data.skills.slice(0, 8).map((skill) => (
                      <div key={skill.id} className="text-white/80 text-xs">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2 p-6">
            <div className="space-y-6">
              {data.summary && (
                <section>
                  <h2 className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: theme.primary }}>
                    Profile
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
                </section>
              )}

              {data.workExperience.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {data.workExperience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                            <p className="text-gray-600 text-xs">{exp.company}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </p>
                        </div>
                        {exp.description.length > 0 && (
                          <ul className="text-xs text-gray-700 space-y-1 mt-2">
                            {exp.description.slice(0, 2).map((item, index) => (
                              item.trim() && (
                                <li key={index} className="flex items-start">
                                  <span className="text-gray-400 mr-1">•</span>
                                  <span>{item}</span>
                                </li>
                              )
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {data.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ color: theme.primary }}>
                    Education
                  </h2>
                  <div className="space-y-2">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                        <p className="text-gray-600 text-xs">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Artistic Vision Template
  if (template === 'artistic') {
    return (
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-2xl"
             style={{ background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})` }}>
        </div>
        
        <div className="relative bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-block relative">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                  {data.personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="h-1 bg-gradient-to-r rounded-full mx-auto"
                     style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`, width: '60%' }}>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
              </div>
            </div>

            {data.summary && (
              <section className="mb-8 text-center">
                <div className="inline-block p-6 rounded-2xl" style={{ backgroundColor: `${theme.primary}10` }}>
                  <p className="text-gray-700 leading-relaxed italic text-lg">{data.summary}</p>
                </div>
              </section>
            )}

            <div className="space-y-8">
              {data.workExperience.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-center mb-6" style={{ color: theme.primary }}>
                    Creative Journey
                  </h2>
                  <div className="space-y-6">
                    {data.workExperience.map((exp, index) => (
                      <div key={exp.id} className="relative">
                        <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                          <div className={`w-2/3 p-6 rounded-2xl shadow-lg ${index % 2 === 0 ? 'rounded-bl-none' : 'rounded-br-none'}`}
                               style={{ backgroundColor: `${theme.secondary}15` }}>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-bold text-lg" style={{ color: theme.primary }}>{exp.position}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                              </div>
                              <span className="px-3 py-1 text-xs rounded-full text-white"
                                    style={{ backgroundColor: theme.accent }}>
                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                              </span>
                            </div>
                            {exp.description.length > 0 && (
                              <ul className="text-sm text-gray-700 space-y-1">
                                {exp.description.map((item, idx) => (
                                  item.trim() && (
                                    <li key={idx} className="flex items-start">
                                      <span className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: theme.primary }}></span>
                                      <span>{item}</span>
                                    </li>
                                  )
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-2 gap-8">
                {data.education.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold mb-4 text-center" style={{ color: theme.secondary }}>
                      Education
                    </h2>
                    <div className="space-y-4">
                      {data.education.map((edu) => (
                        <div key={edu.id} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${theme.primary}08` }}>
                          <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-600 text-sm">{edu.institution}</p>
                          <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.skills.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold mb-4 text-center" style={{ color: theme.accent }}>
                      Artistic Skills
                    </h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {data.skills.map((skill) => (
                        <span key={skill.id} 
                              className="px-3 py-2 text-sm rounded-full border-2 text-center"
                              style={{ borderColor: theme.primary, color: theme.primary }}>
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Corporate Standard Template (Default)
  return (
    <div className="bg-white shadow-elegant rounded-lg p-8 max-w-2xl mx-auto">
      <header className="text-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
        </div>
      </header>

      <div className="space-y-6">
        {data.summary && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.workExperience.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-4">
              {data.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.company}, {exp.location}</p>
                  {exp.description.length > 0 && (
                    <ul className="text-sm text-gray-700 space-y-1">
                      {exp.description.map((item, index) => (
                        item.trim() && (
                          <li key={index} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <p className="text-gray-700">
              {data.skills.map(skill => skill.name).join(', ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}