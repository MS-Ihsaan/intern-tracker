import HighlightText from "./HighlightText";

export default function JobCard({ job, onSave, searchTerm }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <img
          src={job.company_logo}
          alt={`${job.company_name} logo`}
          className="w-10 h-10 object-contain rounded"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div>
          <h3 className="font-semibold text-gray-900">
            <HighlightText text={job.title} term={searchTerm} />
          </h3>
          <p className="text-sm text-gray-500">{job.company_name}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {job.candidate_required_location}
        </span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {job.category}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View listing →
        </a>
        <button
          onClick={() => onSave(job)}
          className="text-sm bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}