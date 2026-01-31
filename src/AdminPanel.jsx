// // import React, { useEffect, useState } from "react";

// // export default function AdminPanel() {
// //   const [applications, setApplications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [filter, setFilter] = useState("All");

// //   const fetchApplications = async (statusFilter) => {
// //     try {
// //       setLoading(true);
// //       const url =
// //         statusFilter && statusFilter !== "All"
// //           ? `https://agfoodbackendcopy-production.up.railway.app/applications/api/approve-application${statusFilter}`
// //           : "https://agfoodbackendcopy-production.up.railway.app/applications";

// //       const res = await fetch(url);
// //       const data = await res.json();
// //       setApplications(data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error(err);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchApplications(filter);
// //   }, [filter]);

// //   const updateStatus = async (id, newStatus) => {
// //     try {
// //       const res = await fetch(`https://agfoodbackendcopy-production.up.railway.app/api/approve-application/${id}`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ status: newStatus }),
// //       });
// //       const data = await res.json();
// //       alert(data.message);

// //       setApplications((prev) =>
// //         prev.map((app) => (app._id === id ? { ...app, status: data.application.status } : app))
// //       );
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error updating status");
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <h1 className="text-3xl font-bold mb-6">Admin Panel - Applications</h1>

// //       <div className="mb-4 flex gap-2">
// //         <span>Filter by status:</span>
// //         {["All", "Pending", "Approved", "Rejected"].map((s) => (
// //           <button
// //             key={s}
// //             onClick={() => setFilter(s)}
// //             className={`px-3 py-1 rounded ${
// //               filter === s ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
// //             }`}
// //           >
// //             {s}
// //           </button>
// //         ))}
// //       </div>

// //       {applications.length === 0 ? (
// //         <p>No applications found.</p>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full bg-white border rounded-lg">
// //             <thead>
// //               <tr className="bg-blue-700 text-white">
// //                 <th className="py-2 px-4 border">Name</th>
// //                 <th className="py-2 px-4 border">Phone</th>
// //                 <th className="py-2 px-4 border">Country</th>
// //                 <th className="py-2 px-4 border">Email</th>
// //                 <th className="py-2 px-4 border">Passport</th>
// //                 <th className="py-2 px-4 border">Job</th>
// //                 <th className="py-2 px-4 border">Experience</th>
// //                 <th className="py-2 px-4 border">Photo</th>
// //                 <th className="py-2 px-4 border">Passport Copy</th>
// //                 <th className="py-2 px-4 border">Certificate</th>
// //                 <th className="py-2 px-4 border">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {applications.map((app) => (
// //                 <tr key={app._id} className="text-center border-b">
// //                   <td className="py-2 px-4 border">{app.name}</td>
// //                   <td className="py-2 px-4 border">{app.phone}</td>
// //                   <td className="py-2 px-4 border">{app.country}</td>
// //                   <td className="py-2 px-4 border">{app.email}</td>
// //                   <td className="py-2 px-4 border">{app.passportNumber}</td>
// //                   <td className="py-2 px-4 border">{app.jobPosition}</td>
// //                   <td className="py-2 px-4 border">{app.experience}</td>
// //                   <td className="py-2 px-4 border">
// //                     <a
// //                       href={`https://agfoodbackendcopy-production.up.railway.app/${app.photoURL}`}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="text-blue-600 underline"
// //                     >
// //                       View
// //                     </a>
// //                   </td>
// //                   <td className="py-2 px-4 border">
// //                     <a
// //                       href={`https://agfoodbackendcopy-production.up.railway.app/${app.passportURL}`}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="text-blue-600 underline"
// //                     >
// //                       View
// //                     </a>
// //                   </td>
// //                   <td className="py-2 px-4 border">
// //                     {app.certificateURL ? (
// //                       <a
// //                         href={`https://agfoodbackend-production.up.railway.app/${app.certificateURL}`}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="text-blue-600 underline"
// //                       >
// //                         View
// //                       </a>
// //                     ) : (
// //                       "N/A"
// //                     )}
// //                   </td>
// //                   <td className="py-2 px-4 border flex flex-col items-center gap-1">
// //                     <span>{app.status}</span>
// //                     {app.status === "Pending" && (
// //                       <div className="flex gap-2 mt-1">
// //                         <button
// //                           onClick={() => updateStatus(app._id, "Approved")}
// //                           className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
// //                         >
// //                           Approve
// //                         </button>
// //                         <button
// //                           onClick={() => updateStatus(app._id, "Rejected")}
// //                           className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
// //                         >
// //                           Reject
// //                         </button>
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";

// export default function AdminPanel() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   const fetchApplications = async (statusFilter) => {
//     try {
//       setLoading(true);
//       // 🔧 FIXED: Correct URL
//       const baseURL = "https://agfoodbackendcopy-production.up.railway.app";
//       let url = `${baseURL}/applications`;

//       // If you want server-side filtering, add query parameter support on server
//       const res = await fetch(url);
//       const data = await res.json();

//       // Filter on client side
//       const filteredData = statusFilter !== "All" 
//         ? data.filter(app => app.status === statusFilter)
//         : data;

//       setApplications(filteredData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications(filter);
//   }, [filter]);

//   const updateStatus = async (id, newStatus) => {
//     try {
//       // 🔧 FIXED: Correct endpoint and method
//       const baseURL = "https://agfoodbackendcopy-production.up.railway.app";
//       const endpoint = newStatus === "Approved" 
//         ? "approve-application" 
//         : "reject-application";

//       const res = await fetch(`${baseURL}/api/${endpoint}/${id}`, {
//         method: "PATCH",
//         headers: { 
//           "Content-Type": "application/json" 
//         }
//         // No body needed since it's just status update
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert(data.message);
//         // Update local state
//         setApplications(prev =>
//           prev.map(app => 
//             app._id === id ? { ...app, status: newStatus } : app
//           )
//         );
//       } else {
//         alert("Failed to update status: " + data.message);
//       }
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Error updating status");
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Panel - Applications</h1>

//       <div className="mb-4 flex gap-2 items-center">
//         <span>Filter by status:</span>
//         {["All", "Pending", "Approved", "Rejected"].map((s) => (
//           <button
//             key={s}
//             onClick={() => setFilter(s)}
//             className={`px-3 py-1 rounded ${
//               filter === s ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
//             }`}
//           >
//             {s}
//           </button>
//         ))}
//         <button 
//           onClick={() => fetchApplications(filter)}
//           className="ml-4 px-3 py-1 bg-green-600 text-white rounded"
//         >
//           Refresh
//         </button>
//       </div>

//       {applications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border rounded-lg">
//             <thead>
//               <tr className="bg-blue-700 text-white">
//                 <th className="py-2 px-4 border">Name</th>
//                 <th className="py-2 px-4 border">Phone</th>
//                 <th className="py-2 px-4 border">Country</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Passport</th>
//                 <th className="py-2 px-4 border">Job</th>
//                 <th className="py-2 px-4 border">Experience</th>
//                 <th className="py-2 px-4 border">Photo</th>
//                 <th className="py-2 px-4 border">Passport Copy</th>
//                 <th className="py-2 px-4 border">Certificate</th>
//                 <th className="py-2 px-4 border">Status</th>
//                 <th className="py-2 px-4 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app._id} className="text-center border-b">
//                   <td className="py-2 px-4 border">{app.name}</td>
//                   <td className="py-2 px-4 border">{app.phone}</td>
//                   <td className="py-2 px-4 border">{app.country}</td>
//                   <td className="py-2 px-4 border">{app.email}</td>
//                   <td className="py-2 px-4 border">{app.passportNumber}</td>
//                   <td className="py-2 px-4 border">{app.jobPosition}</td>
//                   <td className="py-2 px-4 border">{app.experience}</td>
//                   <td className="py-2 px-4 border">
//                     {app.photoURL && (
//                       <a
//                         href={`https://agfoodbackendcopy-production.up.railway.app/${app.photoURL}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View
//                       </a>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {app.passportURL && (
//                       <a
//                         href={`https://agfoodbackendcopy-production.up.railway.app/${app.passportURL}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View
//                       </a>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {app.certificateURL ? (
//                       <a
//                         href={`https://agfoodbackendcopy-production.up.railway.app/${app.certificateURL}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border">
//                     <span className={`px-2 py-1 rounded ${
//                       app.status === "Approved" ? "bg-green-100 text-green-800" :
//                       app.status === "Rejected" ? "bg-red-100 text-red-800" :
//                       "bg-yellow-100 text-yellow-800"
//                     }`}>
//                       {app.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 border">
//                     {app.status === "Pending" ? (
//                       <div className="flex gap-2 justify-center">
//                         <button
//                           onClick={() => updateStatus(app._id, "Approved")}
//                           className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(app._id, "Rejected")}
//                           className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="text-gray-500">No actions</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [salaryModal, setSalaryModal] = useState({ show: false, id: null, name: "" });
  const [salaryInput, setSalaryInput] = useState("");

  const fetchApplications = async (statusFilter) => {
    try {
      setLoading(true);
      const baseURL = "https://agfoodbackendcopy-production.up.railway.app";
      let url = `${baseURL}/applications`;

      const res = await fetch(url);
      const data = await res.json();

      const filteredData = statusFilter !== "All"
        ? data.filter(app => app.status === statusFilter)
        : data;

      setApplications(filteredData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(filter);
  }, [filter]);

  const handleDelete = async (id) => {

    try {
      const baseURL = "https://agfoodbackendcopy-production.up.railway.app";

      const res = await fetch(`${baseURL}/api/application/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Deleted successfully");

        // UI se remove
        setApplications(prev =>
          prev.filter(app => app._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting user");
    }
  };

  const openSalaryModal = (id, name) => {
    setSalaryModal({ show: true, id, name });
    setSalaryInput("");
  };

  const closeSalaryModal = () => {
    setSalaryModal({ show: false, id: null, name: "" });
    setSalaryInput("");
  };

  const updateStatus = async (id, newStatus, salary = null) => {
    try {
      const baseURL = "https://agfoodbackendcopy-production.up.railway.app";
      const endpoint = newStatus === "Approved"
        ? "approve-application"
        : "reject-application";

      const requestBody = {};
      if (newStatus === "Approved" && salary) {
        requestBody.salary = salary;
      }

      const res = await fetch(`${baseURL}/api/${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setApplications(prev =>
          prev.map(app =>
            app._id === id ? { ...app, status: newStatus, salary: salary || app.salary } : app
          )
        );
        closeSalaryModal();
      } else {
        alert("Failed to update status: " + data.message);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating status");
    }
  };

  const handleApprove = () => {
    if (!salaryInput.trim()) {
      alert("Please enter salary amount");
      return;
    }
    updateStatus(salaryModal.id, "Approved", salaryInput);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Applications</h1>

      <div className="mb-4 flex gap-2 items-center">
        <span>Filter by status:</span>
        {["All", "Pending", "Approved", "Rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${filter === s ? "bg-blue-700 text-white" : "bg-gray-300 text-black"
              }`}
          >
            {s}
          </button>
        ))}
        <button
          onClick={() => fetchApplications(filter)}
          className="ml-4 px-3 py-1 bg-green-600 text-white rounded"
        >
          Refresh
        </button>
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
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Passport</th>
                <th className="py-2 px-4 border">Job</th>
                <th className="py-2 px-4 border">Experience</th>
                <th className="py-2 px-4 border">Salary</th>
                <th className="py-2 px-4 border">Photo</th>
                <th className="py-2 px-4 border">Passport Copy</th>
                <th className="py-2 px-4 border">Certificate</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="text-center border-b">
                  <td className="py-2 px-4 border">{app.name}</td>
                  <td className="py-2 px-4 border">{app.phone}</td>
                  <td className="py-2 px-4 border">{app.country}</td>
                  <td className="py-2 px-4 border">{app.email}</td>
                  <td className="py-2 px-4 border">{app.passportNumber}</td>
                  <td className="py-2 px-4 border">{app.jobPosition}</td>
                  <td className="py-2 px-4 border">{app.experience}</td>
                  <td className="py-2 px-4 border">
                    {app.salary ? (
                      <span className="text-green-700 font-semibold">${app.salary}</span>
                    ) : (
                      <span className="text-gray-400">Not set</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {app.photoURL && (
                      <a
                        href={`https://agfoodbackendcopy-production.up.railway.app/${app.photoURL}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {app.passportURL && (
                      <a
                        href={`https://agfoodbackendcopy-production.up.railway.app/${app.passportURL}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {app.certificateURL ? (
                      <a
                        href={`https://agfoodbackendcopy-production.up.railway.app/${app.certificateURL}`}
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
                  <td className="py-2 px-4 border">
                    <span className={`px-2 py-1 rounded ${app.status === "Approved" ? "bg-green-100 text-green-800" :
                      app.status === "Rejected" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">
                    {app.status === "Pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => openSalaryModal(app._id, app.name)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "Rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                        {/* <span className="text-gray-500">No actions</span> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Salary Modal */}
      {salaryModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Approve Application</h2>
            <p className="text-gray-600 mb-4">
              Approving application for: <strong>{salaryModal.name}</strong>
            </p>

            <label className="block mb-2 font-semibold">
              Enter Monthly Salary (USD):
            </label>
            <input
              type="text"
              value={salaryInput}
              onChange={(e) => setSalaryInput(e.target.value)}
              placeholder="e.g., 4500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeSalaryModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}