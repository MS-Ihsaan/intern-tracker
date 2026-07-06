import { useApplications } from "../context/ApplicationsContext";
import { Link } from "react-router-dom";

const STATUSES = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];

export default function Tracker() {
  const { applications, updateStatus, removeApplication } = useApplications();

  if (applications.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="max-w-xl rounded-[28px] border border-slate-200 bg-white p-10 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)]">
          <h1 className="text-2xl font-semibold text-slate-900">My Applications</h1>
          <p className="mt-3 text-slate-600">
            You haven’t saved any jobs yet. Browse listings and hit “Save” to begin organizing your opportunities.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Browse jobs →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-[24px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">My Applications</h1>
        <p className="mt-2 text-sm text-slate-600">
          Keep every opportunity moving with a clear, polished pipeline.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
        {STATUSES.map((status) => {
          const jobsInStatus = applications.filter((app) => app.status === status);
          return (
            <div key={status} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-slate-800">{status}</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {jobsInStatus.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {jobsInStatus.map((app) => (
                  <div key={app.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
                    <p className="font-medium text-slate-900">{app.title}</p>
                    <p className="mt-1 text-slate-500">{app.company}</p>

                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeApplication(app.id)}
                      className="mt-2 text-xs font-medium text-red-500 transition hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {jobsInStatus.length === 0 && (
                  <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center text-xs text-slate-400">
                    No jobs here yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}