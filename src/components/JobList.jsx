import JobCard from "./JobCard";

export default function JobList({ jobs, loading, error, onSave, searchTerm }) {
  if (loading) {
    return (
      <div className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-medium text-slate-700">Loading opportunities...</p>
        <p className="mt-2 text-sm text-slate-500">Please wait while we gather the latest listings.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[24px] border border-red-200 bg-red-50 p-8 text-center shadow-sm">
        <p className="text-lg font-medium text-red-700">We couldn’t load the listings</p>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm">
        <p className="text-lg font-medium text-slate-700">No listings found</p>
        <p className="mt-2 text-sm text-slate-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onSave={onSave} searchTerm={searchTerm} />
      ))}
    </div>
  );
}