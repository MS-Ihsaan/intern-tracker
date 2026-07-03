import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchJobs } from "../services/jobsApi";
import JobList from "../components/JobList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const { data: allJobs, loading, error } = useFetch(() => fetchJobs(), []);

  const categories = useMemo(() => {
    const unique = new Set(allJobs.map((job) => job.category));
    return ["all", ...Array.from(unique).sort()];
  }, [allJobs]);

  const filteredJobs = useMemo(() => {
    let result = allJobs;

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company_name.toLowerCase().includes(term)
      );
    }

    if (category !== "all") {
      result = result.filter((job) => job.category === category);
    }

    if (remoteOnly) {
      result = result.filter((job) => job.remote === true);
    }

    return result;
  }, [allJobs, search, category, remoteOnly]);

  const handleSave = (job) => {
    console.log("Saving job:", job);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Browse Internships & Jobs</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <input
          type="text"
          placeholder="Search by title or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-md"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)} 
          />
          Remote Only
        </label>
      </div>

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