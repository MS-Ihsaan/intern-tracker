import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchJobs } from "../services/jobsApi";
import JobList from "../components/JobList";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data: allJobs, loading, error } = useFetch(() => fetchJobs(), []);

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return allJobs;
    const term = search.toLowerCase();
    return allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company_name.toLowerCase().includes(term)
    );
  }, [allJobs, search]);

  const handleSave = (job) => {
    console.log("Saving job:", job);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Browse Internships & Jobs</h1>

      <input
        type="text"
        placeholder="Search by title or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full max-w-md"
      />

      {!loading && !error && (
        <p className="text-sm text-gray-500 mt-2 mb-6">
          Showing {filteredJobs.length} of {allJobs.length} jobs
        </p>
      )}

      <JobList
        jobs={filteredJobs}
        loading={loading}
        error={error}
        onSave={handleSave}
        searchTerm={search}
      />
    </div>
  );
}