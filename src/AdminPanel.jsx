import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchApplications = async (statusFilter) => {
    try {
      setLoading(true);
      const url =
        statusFilter && statusFilter !== "All"
          ? `https://agfoodbackend-production.up.railway.app/applications?status=${statusFilter}`
          : "https://agfoodbackend-production.up.railway.app/applications";

      const res = await fetch(url);
      const data = await res.json();
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(filter);
  }, [filter]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      alert(data.message);

      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: data.application.status } : app))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Applications</h1>

      <div className="mb-4 flex gap-2">
        <span>Filter by status:</span>
        {["All", "Pending", "Approved", "Rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${
              filter === s ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Country</th>
                <th className="py-2 px-4 border">Passport</th>
                <th className="py-2 px-4 border">Experience</th>
                <th className="py-2 px-4 border">Photo</th>
                <th className="py-2 px-4 border">Passport Copy</th>
                <th className="py-2 px-4 border">Certificate</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="text-center border-b">
                  <td className="py-2 px-4 border">{app.name}</td>
                  <td className="py-2 px-4 border">{app.phone}</td>
                  <td className="py-2 px-4 border">{app.country}</td>
                  <td className="py-2 px-4 border">{app.passport}</td>
                  <td className="py-2 px-4 border">{app.experience}</td>
                  <td className="py-2 px-4 border">
                    <a
                      href={`http://localhost:5000/${app.photoURL}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border">
                    <a
                      href={`http://localhost:5000/${app.passportURL}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border">
                    {app.certificateURL ? (
                      <a
                        href={`http://localhost:5000/${app.certificateURL}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 border flex flex-col items-center gap-1">
                    <span>{app.status}</span>
                    {app.status === "Pending" && (
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => updateStatus(app._id, "Approved")}
                          className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "Rejected")}
                          className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
