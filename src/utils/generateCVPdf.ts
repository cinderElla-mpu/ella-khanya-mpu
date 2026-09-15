import { jsPDF } from 'jspdf';
import { PortfolioData } from '../types.ts';

export function generateCVPdf(data: PortfolioData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(20, 24, 33);
  doc.text(data.personalInfo.name || 'Ella Khanya Mpu', pageWidth / 2, y, { align: 'center' });
  y += 7;

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70, 80, 95);
  const phone = data.personalInfo.phone || '072 939 6259';
  const email = data.personalInfo.email || 'ellampu710@gmail.com';
  const github = 'github.com/cinderElla-mpu';
  const contactText = `${email}  |  ${phone}  |  ${github}`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 10;

  // Divider helper
  const renderSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin, y);
    y += 2;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentWidth, y);
    y += 5;
  };

  // 1. SUMMARY
  renderSectionHeader('SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summaryText =
    'Motivated technology enthusiast who completed Grade 12 in 2025 and the CAPACITI AI Skills Acceleration Programme in 2026. Gained practical experience in Artificial Intelligence, Generative AI, prompt engineering, and web development. Developed an AI Workplace Productivity Hub as part of my practical learning. Eager to apply my skills, gain industry experience, and grow within the technology field.';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.2 + 5;

  // 2. EDUCATION
  renderSectionHeader('EDUCATION');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('National Senior Certificate (Grade 12)', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Completed 2025', margin + contentWidth, y, { align: 'right' });
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CAPACITI', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Completed 2026', margin + contentWidth, y, { align: 'right' });
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(51, 65, 85);
  doc.text('AI Skills Acceleration Programme', margin, y);
  y += 8;

  // 3. PROJECTS
  renderSectionHeader('PROJECTS');
  const projects = [
    {
      name: 'AI Workplace Productivity Hub',
      desc: 'Created an AI-powered platform providing productivity tools, resources, and practical guidance to help users work more efficiently.',
    },
    {
      name: 'PrasaConnect (MetroTrack AI)',
      desc: 'Commuter web application for Metrorail transit journeys with interactive routing, journey assistance, and community transit updates.',
    },
    {
      name: 'StaySense AI (RoamRate)',
      desc: 'Accommodation review intelligence platform applying sentiment analysis to turn guest feedback into actionable insights.',
    },
  ];

  for (const proj of projects) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.name, margin, y);
    const titleWidth = doc.getTextWidth(proj.name);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('  |  ', margin + titleWidth, y);
    const sepWidth = doc.getTextWidth('  |  ');

    const descLines = doc.splitTextToSize(proj.desc, contentWidth - titleWidth - sepWidth);
    doc.text(descLines[0], margin + titleWidth + sepWidth, y);
    y += 4.5;
    if (descLines.length > 1) {
      for (let i = 1; i < descLines.length; i++) {
        doc.text(descLines[i], margin, y);
        y += 4.5;
      }
    }
    y += 1;
  }
  y += 3;

  // 4. TECHNICAL SKILLS
  renderSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Artificial Intelligence', val: 'Generative AI, Prompt Engineering, Responsible AI, Large Language Models' },
    { label: 'Tools & Platforms', val: 'GitHub, React, JavaScript, HTML/CSS, AI-assisted development tools, Supabase' },
    { label: 'Soft Skills', val: 'Communication, problem-solving, adaptability, critical thinking, continuous learning' },
  ];
  for (const s of skills) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${s.label}: `, margin, y);
    const labelW = doc.getTextWidth(`${s.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const valLines = doc.splitTextToSize(s.val, contentWidth - labelW);
    doc.text(valLines[0], margin + labelW, y);
    y += 4.5;
    if (valLines.length > 1) {
      for (let i = 1; i < valLines.length; i++) {
        doc.text(valLines[i], margin + 5, y);
        y += 4.5;
      }
    }
  }
  y += 3;

  // 5. CERTIFICATIONS
  renderSectionHeader('CERTIFICATIONS & CREDENTIALS');
  const certList = [
    'Introduction to Generative AI — Google Cloud (Coursera Verify: GK70N5FBWZAF)',
    'Supervised Machine Learning: Regression & Classification — Stanford Online & DeepLearning.AI (0QK9ZP4E9CIA)',
    'Unsupervised Learning, Recommenders, Reinforcement Learning — Stanford Online & DeepLearning.AI (JRYBCV8LOL9J)',
    'Generative AI with Large Language Models — AWS & DeepLearning.AI (02J0R534TPZ6)',
    'Generative AI: Prompt Engineering Basics — IBM (MLL4O3Y1HVVP)',
    'Introduction to Artificial Intelligence (AI) — IBM (W3QQDCZ0YK4G)',
    'Python for Data Science, AI & Development — IBM (FVZSV54LHBMB)',
    'AI For Everyone — DeepLearning.AI (TONFYD67BO54)',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  for (const cert of certList) {
    doc.text(`• ${cert}`, margin, y);
    y += 4.2;
  }
  y += 3;

  // 6. LANGUAGES
  renderSectionHeader('LANGUAGES');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('isiXhosa (Native), English (Fluent)', margin, y);
  y += 7;

  // 7. REFERENCES
  renderSectionHeader('REFERENCES');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('Available on request.', margin, y);

  return doc;
}

export function downloadCVPdf(data: PortfolioData, filename = 'Ella_Khanya_Mpu_CV.pdf') {
  const doc = generateCVPdf(data);
  doc.save(filename);
}

export function getCVPdfDataUri(data: PortfolioData): string {
  const doc = generateCVPdf(data);
  return doc.output('datauristring');
}
