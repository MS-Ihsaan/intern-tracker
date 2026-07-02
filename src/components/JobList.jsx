import JobCard from "./JobCard";

export default function JobList({ jobs, loading, error, onSave, searchTerm }) {
  if (loading) {
    return <p className="text-center text-gray-500 py-8">Loading jobs...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-8">
        Couldn't load jobs: {error}
      </p>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No listings found. Try a different search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onSave={onSave} searchTerm={searchTerm} />
      ))}
    </div>
  );
}