import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { ResumeData } from '@/types/resume';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Create canvas from the resume preview
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(filename);
    
    return { success: true, message: 'PDF exported successfully!' };
  } catch (error) {
    console.error('PDF export error:', error);
    return { success: false, message: 'Failed to export PDF. Please try again.' };
  }
};

export const exportToDOCX = async (data: ResumeData, filename: string = 'resume.docx') => {
  try {
    const children: Paragraph[] = [];

    // Header with name
    if (data.personalInfo.fullName) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.personalInfo.fullName,
              size: 32,
              bold: true,
            }),
          ],
          heading: HeadingLevel.TITLE,
        })
      );
    }

    // Contact info
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.github
    ].filter(Boolean).join(' | ');

    if (contactInfo) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: contactInfo, size: 20 })],
        })
      );
    }

    children.push(new Paragraph({ text: '' })); // Empty line

    // Summary
    if (data.summary) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', size: 24, bold: true })],
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [new TextRun({ text: data.summary, size: 20 })],
        }),
        new Paragraph({ text: '' })
      );
    }

    // Work Experience
    if (data.workExperience.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'WORK EXPERIENCE', size: 24, bold: true })],
          heading: HeadingLevel.HEADING_1,
        })
      );

      data.workExperience.forEach((exp) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.position, size: 22, bold: true }),
              new TextRun({ text: ` | ${exp.company}`, size: 20 }),
              new TextRun({ text: ` | ${exp.location}`, size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, 
                size: 18,
                italics: true 
              }),
            ],
          })
        );

        exp.description.forEach((desc) => {
          if (desc.trim()) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: `• ${desc}`, size: 20 })],
              })
            );
          }
        });

        children.push(new Paragraph({ text: '' }));
      });
    }

    // Education
    if (data.education.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'EDUCATION', size: 24, bold: true })],
          heading: HeadingLevel.HEADING_1,
        })
      );

      data.education.forEach((edu) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.degree} in ${edu.field}`, size: 22, bold: true }),
              new TextRun({ text: ` | ${edu.institution}`, size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `${edu.startDate} - ${edu.endDate}`, 
                size: 18,
                italics: true 
              }),
            ],
          })
        );

        if (edu.gpa) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `GPA: ${edu.gpa}`, size: 20 })],
            })
          );
        }

        children.push(new Paragraph({ text: '' }));
      });
    }

    // Skills
    if (data.skills.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'SKILLS', size: 24, bold: true })],
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [new TextRun({ 
            text: data.skills.map(skill => skill.name).join(', '), 
            size: 20 
          })],
        })
      );
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children: children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
    
    return { success: true, message: 'DOCX exported successfully!' };
  } catch (error) {
    console.error('DOCX export error:', error);
    return { success: false, message: 'Failed to export DOCX. Please try again.' };
  }
};

export const exportToTXT = (data: ResumeData, filename: string = 'resume.txt') => {
  try {
    let content = '';

    // Header
    if (data.personalInfo.fullName) {
      content += `${data.personalInfo.fullName.toUpperCase()}\n`;
      content += '='.repeat(data.personalInfo.fullName.length) + '\n\n';
    }

    // Contact info
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.github
    ].filter(Boolean);

    if (contactInfo.length > 0) {
      content += contactInfo.join(' | ') + '\n\n';
    }

    // Summary
    if (data.summary) {
      content += 'PROFESSIONAL SUMMARY\n';
      content += '-'.repeat(20) + '\n';
      content += data.summary + '\n\n';
    }

    // Work Experience
    if (data.workExperience.length > 0) {
      content += 'WORK EXPERIENCE\n';
      content += '-'.repeat(15) + '\n';
      
      data.workExperience.forEach((exp) => {
        content += `${exp.position} | ${exp.company} | ${exp.location}\n`;
        content += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
        
        exp.description.forEach((desc) => {
          if (desc.trim()) {
            content += `• ${desc}\n`;
          }
        });
        content += '\n';
      });
    }

    // Education
    if (data.education.length > 0) {
      content += 'EDUCATION\n';
      content += '-'.repeat(9) + '\n';
      
      data.education.forEach((edu) => {
        content += `${edu.degree} in ${edu.field} | ${edu.institution}\n`;
        content += `${edu.startDate} - ${edu.endDate}\n`;
        if (edu.gpa) {
          content += `GPA: ${edu.gpa}\n`;
        }
        content += '\n';
      });
    }

    // Skills
    if (data.skills.length > 0) {
      content += 'SKILLS\n';
      content += '-'.repeat(6) + '\n';
      content += data.skills.map(skill => skill.name).join(', ') + '\n';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
    
    return { success: true, message: 'TXT exported successfully!' };
  } catch (error) {
    console.error('TXT export error:', error);
    return { success: false, message: 'Failed to export TXT. Please try again.' };
  }
};