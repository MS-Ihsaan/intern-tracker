import { createContext, useContext, useEffect, useState } from "react";

const ApplicationsContext = createContext(null);
const STORAGE_KEY = "interntrack_applications";

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const saveApplication = (job) => {
    setApplications((prev) => {
      // avoid duplicates
      if (prev.some((app) => app.id === job.id)) return prev;
      const newApp = {
        id: job.id,
        title: job.title,
        company: job.company_name,
        url: job.url,
        status: "Saved",
        dateSaved: new Date().toISOString(),
      };
      return [...prev, newApp];
    });
  };

  const updateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const removeApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <ApplicationsContext.Provider
      value={{ applications, saveApplication, updateStatus, removeApplication }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }
  return context;
}