import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PortfolioData, PersonalInfo, ProjectItem, EducationItem, CertificationItem, ExperienceItem, AchievementItem, StoredFile, ContactMessage } from '../types.ts';
import { initialPortfolioData } from '../data/initialData.ts';
import { loadPortfolioData, savePortfolioData, fileToStoredFile, downloadFile, exportPortfolioJSON, importPortfolioJSON } from '../utils/storage.ts';
import { downloadCVPdf } from '../utils/generateCVPdf.ts';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  isEditModalOpen: boolean;
  openEditModal: (tab?: string) => void;
  closeEditModal: () => void;
  activeEditTab: string;
  setActiveEditTab: (tab: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => Promise<void>;
  updateProject: (projectId: string, updated: Partial<ProjectItem>) => Promise<void>;
  updateEducation: (eduId: string, updated: Partial<EducationItem>) => Promise<void>;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => Promise<void>;
  updateCertification: (certId: string, updated: Partial<CertificationItem>) => Promise<void>;
  deleteCertification: (certId: string) => Promise<void>;
  updateExperience: (expId: string, updated: Partial<ExperienceItem>) => Promise<void>;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<void>;
  deleteExperience: (expId: string) => Promise<void>;
  updateAchievement: (achId: string, updated: Partial<AchievementItem>) => Promise<void>;
  addAchievement: (ach: Omit<AchievementItem, 'id'>) => Promise<void>;
  deleteAchievement: (achId: string) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  removeProfilePicture: () => Promise<void>;
  uploadCV: (file: File) => Promise<void>;
  removeCV: () => Promise<void>;
  downloadCurrentCV: () => void;
  submitContactMessage: (name: string, email: string, subject: string, message: string) => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  exportData: () => void;
  importData: (file: File) => Promise<boolean>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    let isMounted = true;
    loadPortfolioData().then((loaded) => {
      if (isMounted) {
        setData(loaded);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const persistData = async (newData: PortfolioData) => {
    setData(newData);
    await savePortfolioData(newData);
  };

  const openEditModal = (tab = 'general') => {
    setActiveEditTab(tab);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const updatePersonalInfo = async (info: Partial<PersonalInfo>) => {
    const newData: PortfolioData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        ...info,
      },
    };
    await persistData(newData);
    showToast('Personal information updated');
  };

  const updateProject = async (projectId: string, updated: Partial<ProjectItem>) => {
    const updatedProjects = data.projects.map((p) =>
      p.id === projectId ? { ...p, ...updated } : p
    );
    const newData: PortfolioData = {
      ...data,
      projects: updatedProjects,
    };
    await persistData(newData);
    showToast('Project updated successfully');
  };

  const updateEducation = async (eduId: string, updated: Partial<EducationItem>) => {
    const updatedEdu = data.education.map((e) =>
      e.id === eduId ? { ...e, ...updated } : e
    );
    const newData: PortfolioData = {
      ...data,
      education: updatedEdu,
    };
    await persistData(newData);
    showToast('Education details updated');
  };

  const addCertification = async (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    const newData: PortfolioData = {
      ...data,
      certifications: [...data.certifications, newCert],
    };
    await persistData(newData);
    showToast('Certification added');
  };

  const updateCertification = async (certId: string, updated: Partial<CertificationItem>) => {
    const updatedCerts = data.certifications.map((c) =>
      c.id === certId ? { ...c, ...updated } : c
    );
    const newData: PortfolioData = {
      ...data,
      certifications: updatedCerts,
    };
    await persistData(newData);
    showToast('Certification updated');
  };

  const deleteCertification = async (certId: string) => {
    const updatedCerts = data.certifications.filter((c) => c.id !== certId);
    const newData: PortfolioData = {
      ...data,
      certifications: updatedCerts,
    };
    await persistData(newData);
    showToast('Certification removed');
  };

  const updateExperience = async (expId: string, updated: Partial<ExperienceItem>) => {
    const updatedExp = data.experience.map((e) =>
      e.id === expId ? { ...e, ...updated } : e
    );
    const newData: PortfolioData = {
      ...data,
      experience: updatedExp,
    };
    await persistData(newData);
    showToast('Experience updated');
  };

  const addExperience = async (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`,
    };
    const newData: PortfolioData = {
      ...data,
      experience: [...data.experience, newExp],
    };
    await persistData(newData);
    showToast('Experience added');
  };

  const deleteExperience = async (expId: string) => {
    const updatedExp = data.experience.filter((e) => e.id !== expId);
    const newData: PortfolioData = {
      ...data,
      experience: updatedExp,
    };
    await persistData(newData);
    showToast('Experience removed');
  };

  const updateAchievement = async (achId: string, updated: Partial<AchievementItem>) => {
    const updatedAch = data.achievements.map((a) =>
      a.id === achId ? { ...a, ...updated } : a
    );
    const newData: PortfolioData = {
      ...data,
      achievements: updatedAch,
    };
    await persistData(newData);
    showToast('Achievement updated');
  };

  const addAchievement = async (ach: Omit<AchievementItem, 'id'>) => {
    const newAch: AchievementItem = {
      ...ach,
      id: `ach-${Date.now()}`,
    };
    const newData: PortfolioData = {
      ...data,
      achievements: [...data.achievements, newAch],
    };
    await persistData(newData);
    showToast('Achievement added');
  };

  const deleteAchievement = async (achId: string) => {
    const updatedAch = data.achievements.filter((a) => a.id !== achId);
    const newData: PortfolioData = {
      ...data,
      achievements: updatedAch,
    };
    await persistData(newData);
    showToast('Achievement removed');
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      const stored = await fileToStoredFile(file);
      const newData: PortfolioData = {
        ...data,
        profilePicture: stored,
      };
      await persistData(newData);
      showToast('Profile picture uploaded successfully!');
    } catch (err) {
      showToast('Failed to upload profile picture.');
    }
  };

  const removeProfilePicture = async () => {
    const newData: PortfolioData = {
      ...data,
      profilePicture: null,
    };
    await persistData(newData);
    showToast('Profile picture removed');
  };

  const uploadCV = async (file: File) => {
    try {
      const stored = await fileToStoredFile(file);
      const newData: PortfolioData = {
        ...data,
        cvFile: stored,
      };
      await persistData(newData);
      showToast(`CV "${file.name}" uploaded successfully!`);
    } catch (err) {
      showToast('Failed to upload CV.');
    }
  };

  const removeCV = async () => {
    const newData: PortfolioData = {
      ...data,
      cvFile: null,
    };
    await persistData(newData);
    showToast('CV removed');
  };

  const downloadCurrentCV = () => {
    if (data.cvFile && data.cvFile.dataUrl) {
      downloadFile(data.cvFile);
      showToast(`Downloading ${data.cvFile.name}...`);
    } else {
      downloadCVPdf(data, 'Ella_Khanya_Mpu_CV.pdf');
      showToast('Downloading Ella Khanya Mpu CV (PDF)...');
    }
  };

  const submitContactMessage = async (name: string, email: string, subject: string, message: string): Promise<boolean> => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toLocaleString(),
    };
    const newData: PortfolioData = {
      ...data,
      messages: [newMsg, ...(data.messages || [])],
    };
    await persistData(newData);
    showToast('Your message has been sent successfully!');
    return true;
  };

  const resetToDefaults = async () => {
    await persistData(initialPortfolioData);
    showToast('Portfolio reset to initial defaults');
  };

  const exportData = () => {
    exportPortfolioJSON(data);
    showToast('Exported portfolio JSON configuration');
  };

  const importData = async (file: File): Promise<boolean> => {
    try {
      const imported = await importPortfolioJSON(file);
      await persistData(imported);
      showToast('Portfolio data restored from JSON backup!');
      return true;
    } catch (err) {
      showToast('Failed to import JSON data. Please verify format.');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
        activeEditTab,
        setActiveEditTab,
        updatePersonalInfo,
        updateProject,
        updateEducation,
        addCertification,
        updateCertification,
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
        submitContactMessage,
        resetToDefaults,
        exportData,
        importData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
