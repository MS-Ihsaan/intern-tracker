import { useApplications } from "../context/ApplicationsContext";

const STATUSES = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];

export default function Tracker() {
  const { applications, updateStatus, removeApplication } = useApplications();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {STATUSES.map((status) => {
          const jobsInStatus = applications.filter((app) => app.status === status);
          return (
            <div key={status} className="bg-gray-50 rounded-lg p-3">
              <h2 className="font-semibold text-gray-700 mb-3">
                {status} ({jobsInStatus.length})
              </h2>

              <div className="flex flex-col gap-2">
                {jobsInStatus.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white border rounded p-3 shadow-sm text-sm"
                  >
                    <p className="font-medium text-gray-900">{app.title}</p>
                    <p className="text-gray-500">{app.company}</p>

                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="mt-2 w-full border rounded text-xs p-1"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeApplication(app.id)}
                      className="mt-2 text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {jobsInStatus.length === 0 && (
                  <p className="text-xs text-gray-400">No jobs here yet</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}