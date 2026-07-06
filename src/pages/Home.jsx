import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchJobs } from "../services/jobsApi";
import JobList from "../components/JobList";
import { useApplications } from "../context/ApplicationsContext";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const { saveApplication } = useApplications();

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
    saveApplication(job);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Curated opportunities
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Discover internships that fit your next move.
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Browse, refine, and track promising roles in one polished workspace.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-5 text-slate-50">
            <p className="text-sm text-slate-400">Current view</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{filteredJobs.length}</p>
                <p className="text-sm text-slate-400">matching roles</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold">{allJobs.length}</p>
                <p className="text-sm text-slate-400">total listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.5fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label htmlFor="job-search" className="mb-2 block text-sm font-medium text-slate-700">
              Search roles
            </label>
            <input
              id="job-search"
              type="text"
              placeholder="Search by title or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <label htmlFor="job-category" className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>
            <select
              id="job-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Remote only
          </label>
        </div>

        {!loading && !error && (
          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <p>
              Showing {filteredJobs.length} of {allJobs.length} jobs
            </p>
            <p className="text-slate-400">Refined for clarity</p>
          </div>
        )}
      </section>

      <div className="mt-8">
        <JobList
          jobs={filteredJobs}
          loading={loading}
          error={error}
          onSave={handleSave}
          searchTerm={search}
        />
      </div>
    </div>
  );
}