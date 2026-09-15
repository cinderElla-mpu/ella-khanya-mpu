import React, { useState } from 'react';
import {
  X,
  User,
  Layers,
  GraduationCap,
  Award,
  Briefcase,
  Trophy,
  FileDown,
  FileUp,
  RotateCcw,
  Plus,
  Trash2,
  Camera,
  FileText,
  Check,
  Save,
  MessageSquare,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { ProjectItem, CertificationItem, ExperienceItem, AchievementItem } from '../types.ts';

export const EditModal: React.FC = () => {
  const {
    data,
    isEditModalOpen,
    closeEditModal,
    activeEditTab,
    setActiveEditTab,
    updatePersonalInfo,
    updateProject,
    updateEducation,
    addCertification,
    deleteCertification,
    updateExperience,
    addExperience,
    deleteExperience,
    updateAchievement,
    addAchievement,
    deleteAchievement,
    uploadProfilePicture,
    removeProfilePicture,
    uploadCV,
    removeCV,
    downloadCurrentCV,
    resetToDefaults,
    exportData,
    importData,
    showToast,
  } = usePortfolio();

  // General info local form state
  const [name, setName] = useState(data.personalInfo.name);
  const [tagline, setTagline] = useState(data.personalInfo.tagline);
  const [intro, setIntro] = useState(data.personalInfo.intro);
  const [email, setEmail] = useState(data.personalInfo.email);
  const [linkedInUrl, setLinkedInUrl] = useState(data.personalInfo.linkedInUrl);
  const [githubUrl, setGithubUrl] = useState(data.personalInfo.githubUrl);
  const [location, setLocation] = useState(data.personalInfo.location);

  // Education state
  const [schoolName, setSchoolName] = useState(data.education[0]?.school || '');
  const [subjectsInput, setSubjectsInput] = useState(data.education[0]?.relevantSubjects.join(', ') || '');
  const [coursesInput, setCoursesInput] = useState(data.education[0]?.additionalCourses.join(', ') || '');
  const [techCoursesInput, setTechCoursesInput] = useState(data.education[0]?.technologyCourses.join(', ') || '');
  const [aiCoursesInput, setAiCoursesInput] = useState(data.education[0]?.aiCourses.join(', ') || '');

  // New certification form state
  const [newCertName, setNewCertName] = useState('');
  const [newCertInst, setNewCertInst] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [newCertDesc, setNewCertDesc] = useState('');
  const [newCertLink, setNewCertLink] = useState('');

  // New experience form state
  const [newExpProg, setNewExpProg] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpDate, setNewExpDate] = useState('');
  const [newExpLearn, setNewExpLearn] = useState('');
  const [newExpProj, setNewExpProj] = useState('');
  const [newExpSkills, setNewExpSkills] = useState('');

  // New achievement form state
  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchSub, setNewAchSub] = useState('');
  const [newAchDesc, setNewAchDesc] = useState('');

  if (!isEditModalOpen) return null;

  const handleSaveGeneral = async () => {
    await updatePersonalInfo({
      name,
      tagline,
      intro,
      email,
      linkedInUrl,
      githubUrl,
      location,
    });
  };

  const handleSaveEducation = async () => {
    if (data.education[0]) {
      await updateEducation(data.education[0].id, {
        school: schoolName,
        relevantSubjects: subjectsInput.split(',').map((s) => s.trim()).filter(Boolean),
        additionalCourses: coursesInput.split(',').map((s) => s.trim()).filter(Boolean),
        technologyCourses: techCoursesInput.split(',').map((s) => s.trim()).filter(Boolean),
        aiCourses: aiCoursesInput.split(',').map((s) => s.trim()).filter(Boolean),
      });
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertInst.trim()) {
      showToast('Please enter certification name and institution.');
      return;
    }
    await addCertification({
      name: newCertName,
      institution: newCertInst,
      dateCompleted: newCertDate || '2025',
      description: newCertDesc,
      certificateLink: newCertLink,
    });
    setNewCertName('');
    setNewCertInst('');
    setNewCertDate('');
    setNewCertDesc('');
    setNewCertLink('');
  };

  const handleAddExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpProg.trim() || !newExpOrg.trim()) {
      showToast('Please enter programme name and organisation.');
      return;
    }
    await addExperience({
      programmeName: newExpProg,
      organisation: newExpOrg,
      date: newExpDate || '2025',
      category: 'learning',
      whatILearned: newExpLearn,
      projectsCompleted: newExpProj,
      skillsDeveloped: newExpSkills,
    });
    setNewExpProg('');
    setNewExpOrg('');
    setNewExpDate('');
    setNewExpLearn('');
    setNewExpProj('');
    setNewExpSkills('');
  };

  const handleAddAch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle.trim()) {
      showToast('Please enter achievement title.');
      return;
    }
    await addAchievement({
      title: newAchTitle,
      subtitle: newAchSub || 'Milestone',
      description: newAchDesc,
      category: 'projects',
    });
    setNewAchTitle('');
    setNewAchSub('');
    setNewAchDesc('');
  };

  const tabs = [
    { id: 'general', label: 'General & Media', icon: User },
    { id: 'projects', label: 'Projects & Links', icon: Layers },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'messages', label: `Messages (${data.messages?.length || 0})`, icon: MessageSquare },
    { id: 'backup', label: 'Backup & Reset', icon: FileDown },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center font-bold text-sm">
              EK
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
                Portfolio Customizer & Editor
              </h3>
              <p className="text-2xs text-slate-600">
                Update your details, project URLs, CV, and files without touching code.
              </p>
            </div>
          </div>
          <button
            onClick={closeEditModal}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-white px-4 pt-2 gap-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeEditTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveEditTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-cyan-500 text-cyan-600 bg-cyan-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB: GENERAL & MEDIA */}
          {activeEditTab === 'general' && (
            <div className="space-y-6">
              {/* Media Uploads Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                {/* Profile Picture */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-display flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-600" />
                    <span>Profile Picture</span>
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
                      {data.profilePicture?.dataUrl ? (
                        <img
                          src={data.profilePicture.dataUrl}
                          alt="Ella Khanya Mpu"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadProfilePicture(file);
                          }}
                        />
                      </label>
                      {data.profilePicture && (
                        <div>
                          <button
                            type="button"
                            onClick={removeProfilePicture}
                            className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove photo</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CV File */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-display flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-600" />
                    <span>Curriculum Vitae (CV)</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-600">
                      {data.cvFile ? (
                        <span className="font-semibold text-cyan-800">
                          {data.cvFile.name} (Uploaded)
                        </span>
                      ) : (
                        <span>No CV uploaded yet.</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-2xs">
                        <FileUp className="w-3.5 h-3.5" />
                        <span>{data.cvFile ? 'Replace CV' : 'Upload CV'}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadCV(file);
                          }}
                        />
                      </label>
                      {data.cvFile && (
                        <>
                          <button
                            type="button"
                            onClick={downloadCurrentCV}
                            className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-medium rounded-lg text-slate-700"
                          >
                            Download
                          </button>
                          <button
                            type="button"
                            onClick={removeCV}
                            className="text-xs text-rose-600 hover:underline"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Introduction Bio</label>
                  <textarea
                    rows={3}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSaveGeneral}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save General Information</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeEditTab === 'projects' && (
            <div className="space-y-6">
              <p className="text-xs text-slate-600">
                Manage the live links and source code URLs for each of your applications.
              </p>

              {data.projects.map((project) => (
                <div key={project.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-slate-900 text-base">
                      {project.name}
                    </h4>
                    <span className="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                      {project.badge || project.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Live Application URL</label>
                      <input
                        type="url"
                        placeholder="https://your-deployed-app.com"
                        value={project.liveUrl || ''}
                        onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white focus:border-cyan-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Repository URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/cinderElla-mpu/repo"
                        value={project.githubUrl || ''}
                        onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  {project.id === 'staysense-roamrate' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Demo URL (optional)</label>
                      <input
                        type="url"
                        placeholder="https://demo-link.com"
                        value={project.demoUrl || ''}
                        onChange={(e) => updateProject(project.id, { demoUrl: e.target.value })}
                        className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeEditTab === 'education' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-xs text-cyan-950">
                <strong>Matric Qualification:</strong> Completed 2025. Add your high school name and any specific subjects or technical courses you completed below.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">School Name</label>
                  <input
                    type="text"
                    placeholder="Enter your High School Name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relevant Subjects (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics, Information Technology, Physical Sciences, English"
                    value={subjectsInput}
                    onChange={(e) => setSubjectsInput(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Courses (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Introduction to Programming, Web Basics"
                    value={coursesInput}
                    onChange={(e) => setCoursesInput(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Technology Courses (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Development, JavaScript Essentials"
                    value={techCoursesInput}
                    onChange={(e) => setTechCoursesInput(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    AI Courses (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Prompt Engineering Basics, Generative AI Fundamentals"
                    value={aiCoursesInput}
                    onChange={(e) => setAiCoursesInput(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleSaveEducation}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Education Details</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CERTIFICATIONS */}
          {activeEditTab === 'certifications' && (
            <div className="space-y-6">
              {/* Add New Cert Form */}
              <form onSubmit={handleAddCert} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Add New Course or Certification</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course / Certificate Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prompt Engineering & Generative AI"
                      value={newCertName}
                      onChange={(e) => setNewCertName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / Platform *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coursera, DeepLearning.AI, freeCodeCamp"
                      value={newCertInst}
                      onChange={(e) => setNewCertInst(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date Completed</label>
                    <input
                      type="text"
                      placeholder="e.g. February 2025"
                      value={newCertDate}
                      onChange={(e) => setNewCertDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Certificate Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://credential-link.com"
                      value={newCertLink}
                      onChange={(e) => setNewCertLink(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Description</label>
                    <textarea
                      rows={2}
                      placeholder="What topics were covered in this course?"
                      value={newCertDesc}
                      onChange={(e) => setNewCertDesc(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs bg-white focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certification</span>
                </button>
              </form>

              {/* Existing Certs List */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm">
                  Existing Certifications ({data.certifications.length})
                </h4>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{cert.name}</div>
                      <div className="text-xs text-cyan-700">{cert.institution} • {cert.dateCompleted}</div>
                    </div>
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeEditTab === 'experience' && (
            <div className="space-y-6">
              {/* Existing entries */}
              {data.experience.map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      {exp.programmeName}
                    </h4>
                    {exp.id !== 'exp-ai-programme' && (
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Organisation</label>
                      <input
                        type="text"
                        value={exp.organisation}
                        onChange={(e) => updateExperience(exp.id, { organisation: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Date Period</label>
                      <input
                        type="text"
                        value={exp.date}
                        onChange={(e) => updateExperience(exp.id, { date: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">What I Learned</label>
                      <textarea
                        rows={2}
                        value={exp.whatILearned}
                        onChange={(e) => updateExperience(exp.id, { whatILearned: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Projects Completed</label>
                      <textarea
                        rows={2}
                        value={exp.projectsCompleted}
                        onChange={(e) => updateExperience(exp.id, { projectsCompleted: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Skills Developed</label>
                      <textarea
                        rows={2}
                        value={exp.skillsDeveloped}
                        onChange={(e) => updateExperience(exp.id, { skillsDeveloped: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add another experience */}
              <form onSubmit={handleAddExp} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Add Project, Hackathon, or Learning Experience</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Project / Programme Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Group Web Hackathon"
                      value={newExpProg}
                      onChange={(e) => setNewExpProg(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Host / Organisation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tech Community"
                      value={newExpOrg}
                      onChange={(e) => setNewExpOrg(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">What was learned / built</label>
                    <textarea
                      rows={2}
                      placeholder="Summary of experience..."
                      value={newExpLearn}
                      onChange={(e) => setNewExpLearn(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-semibold"
                >
                  Add Experience
                </button>
              </form>
            </div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeEditTab === 'achievements' && (
            <div className="space-y-6">
              <form onSubmit={handleAddAch} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-cyan-600" />
                  <span>Add Achievement Card</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. First Open Source Project"
                      value={newAchTitle}
                      onChange={(e) => setNewAchTitle(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Subtitle / Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Completed 2025"
                      value={newAchSub}
                      onChange={(e) => setNewAchSub(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Details of the accomplishment..."
                      value={newAchDesc}
                      onChange={(e) => setNewAchDesc(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-white"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-semibold"
                >
                  Add Achievement
                </button>
              </form>

              <div className="space-y-3">
                {data.achievements.map((ach) => (
                  <div key={ach.id} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{ach.title}</div>
                      <div className="text-xs text-slate-600">{ach.subtitle}</div>
                    </div>
                    {ach.id !== 'ach-matric' && (
                      <button
                        onClick={() => deleteAchievement(ach.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES INBOX */}
          {activeEditTab === 'messages' && (
            <div className="space-y-4">
              <h4 className="font-display font-bold text-slate-900 text-base">
                Received Messages ({data.messages?.length || 0})
              </h4>
              <p className="text-xs text-slate-600">
                Messages submitted through your portfolio contact form are recorded here for your review.
              </p>

              {data.messages && data.messages.length > 0 ? (
                <div className="space-y-3">
                  {data.messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{msg.name} ({msg.email})</span>
                        <span className="text-slate-600">{msg.timestamp}</span>
                      </div>
                      <div className="font-semibold text-cyan-800 text-xs">{msg.subject}</div>
                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-600 text-xs border rounded-2xl bg-slate-50">
                  No contact messages received yet.
                </div>
              )}
            </div>
          )}

          {/* TAB: BACKUP & RESET */}
          {activeEditTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-cyan-600" />
                  <span>Export Portfolio Data</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Download a JSON file containing all your customized text, URLs, education, and achievements.
                </p>
                <button
                  type="button"
                  onClick={exportData}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <FileDown className="w-4 h-4 text-cyan-400" />
                  <span>Export Portfolio JSON</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileUp className="w-4 h-4 text-cyan-600" />
                  <span>Import / Restore Data</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Restore your portfolio from a previously saved JSON configuration file.
                </p>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs">
                  <FileUp className="w-4 h-4" />
                  <span>Select JSON Backup File</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) importData(file);
                    }}
                  />
                </label>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                <h4 className="font-display font-bold text-rose-900 text-sm flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  <span>Reset to Original Portfolio Defaults</span>
                </h4>
                <p className="text-xs text-rose-800">
                  Reset all portfolio text, project cards, and sections back to the authentic defaults for Ella Khanya Mpu.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all portfolio entries to default initial values?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  Reset All to Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-2xs text-slate-600">
            Changes are saved to browser storage automatically.
          </span>
          <button
            onClick={closeEditModal}
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
