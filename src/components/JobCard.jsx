import HighlightText from "./HighlightText";

export default function JobCard({ job, onSave, searchTerm }) {
  return (
    <div className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <img
              src={job.company_logo}
              alt={`${job.company_name} logo`}
              className="h-8 w-8 object-contain"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              <HighlightText text={job.title} term={searchTerm} />
            </h3>
            <p className="text-sm text-slate-500">{job.company_name}</p>
          </div>
        </div>

        {job.remote && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
            Remote
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {job.candidate_required_location}
        </span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {job.category}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between pt-2">
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          View listing →
        </a>
        <button
          onClick={() => onSave(job)}
          className="rounded-full bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}