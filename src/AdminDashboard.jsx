// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Users, Plus, Edit2, Trash2, Search, X, Save,
//   FileText, Calendar, CreditCard, Briefcase, Menu,
//   User, LogOut
// } from "lucide-react";

// const API_URL = "http://localhost:5000/api/users";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     passportNumber: "",
//     expiryDate: "",
//     workField: "",
//     description: ""
//   });

//   const workFields = [
//     "Heavy Vehicle Driver",
//     "Light Vehicle Driver",
//     "Helper Staff",
//     "Fruit Packaging",
//     "Factory Cleaner",
//     "Vegetable Sorter"
//   ];

//   /* ================= FETCH USERS ================= */
//   const fetchUsers = async (query = "") => {
//     setLoading(true);
//     const res = await fetch(`${API_URL}?q=${query}`);
//     const data = await res.json();
//     setUsers(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   /* ================= FORM HANDLERS ================= */
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const resetForm = () => {
//     setFormData({
//       fullName: "",
//       dateOfBirth: "",
//       passportNumber: "",
//       expiryDate: "",
//       workField: "",
//       description: ""
//     });
//     setEditingUser(null);
//     setIsModalOpen(false);
//   };

//   /* ================= ADD / UPDATE ================= */
//   const handleSubmit = async () => {
//     if (Object.values(formData).some(v => !v)) {
//       alert("Please fill all fields");
//       return;
//     }

//     const method = editingUser ? "PUT" : "POST";
//     const url = editingUser
//       ? `${API_URL}/${editingUser._id}`
//       : API_URL;

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     });

//     resetForm();
//     fetchUsers(searchQuery);
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormData({
//       fullName: user.fullName,
//       dateOfBirth: user.dateOfBirth,
//       passportNumber: user.passportNumber,
//       expiryDate: user.expiryDate,
//       workField: user.workField,
//       description: user.description
//     });
//     setIsModalOpen(true);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this user?")) return;

//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//     fetchUsers(searchQuery);
//   };

//   /* ================= SEARCH ================= */
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchUsers(searchQuery);
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [searchQuery]);

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 flex">

//       {/* ================= SIDEBAR ================= */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{ x: isSidebarOpen ? 0 : -300 }}
//         className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50"
//       >
//         <div className="p-6">
//           <h2 className="text-xl font-bold">AG Foods</h2>
//           <p className="text-sm text-green-300 mb-6">Admin Panel</p>

//           <button className="flex items-center gap-3 bg-green-800 px-4 py-3 rounded-lg w-full">
//             <Users /> User Management
//           </button>
//         </div>
//       </motion.aside>

//       {/* ================= CONTENT ================= */}
//       <div className="flex-1">

//         {/* HEADER */}
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
//             <Menu />
//           </button>
//           <h1 className="text-xl font-bold">User Management</h1>
//         </header>

//         {/* SEARCH + ADD */}
//         <div className="p-6 flex flex-col sm:flex-row gap-4">
//           <div className="relative max-w-md w-full">
//             <Search className="absolute left-3 top-3 text-gray-400" />
//             <input
//               className="pl-10 w-full border rounded-lg p-2"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
//           >
//             <Plus /> Add User
//           </button>
//         </div>

//         {/* USERS GRID */}
//         <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {loading ? (
//             <p>Loading...</p>
//           ) : users.length === 0 ? (
//             <p>No users found</p>
//           ) : users.map(user => (
//             <div key={user._id} className="bg-white rounded-xl shadow">
//               <div className="bg-green-600 text-white p-4 rounded-t-xl">
//                 <h3 className="font-bold">{user.fullName}</h3>
//                 <p className="text-sm">{user.workField}</p>
//               </div>

//               <div className="p-4 space-y-2 text-sm">
//                 <p><Calendar className="inline w-4" /> {user.dateOfBirth}</p>
//                 <p><CreditCard className="inline w-4" /> {user.passportNumber}</p>
//                 <p>Expiry: {user.expiryDate}</p>
//                 <p className="text-gray-600">{user.description}</p>

//                 <div className="flex gap-2 pt-3">
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="flex-1 bg-blue-100 text-blue-600 p-2 rounded"
//                   >
//                     <Edit2 className="inline w-4" /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user._id)}
//                     className="flex-1 bg-red-100 text-red-600 p-2 rounded"
//                   >
//                     <Trash2 className="inline w-4" /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= MODAL ================= */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-full max-w-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editingUser ? "Edit User" : "Add User"}
//             </h2>

//             {Object.keys(formData).map(key => (
//               key !== "description" ? (
//                 <input
//                   key={key}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleInputChange}
//                   placeholder={key}
//                   className="w-full border p-2 rounded mb-3"
//                 />
//               ) : (
//                 <textarea
//                   key={key}
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleInputChange}
//                   className="w-full border p-2 rounded mb-3"
//                 />
//               )
//             ))}

//             <div className="flex gap-2">
//               <button onClick={resetForm} className="flex-1 border p-2 rounded">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 bg-green-600 text-white p-2 rounded"
//               >
//                 <Save className="inline w-4" /> Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//     Users, Plus, Edit2, Trash2, Search, X, Save,
//     FileText, Calendar, CreditCard, Briefcase, Menu,
//     User, LogOut, Download
// } from "lucide-react";
// import PDFGenerator from "./PDFGenerator";

// const API_URL = "http://localhost:5000/api/users";

// export default function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingUser, setEditingUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [isPDFOpen, setIsPDFOpen] = useState(false);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         dateOfBirth: "",
//         passportNumber: "",
//         expiryDate: "",
//         workField: "",
//         description: ""
//     });

//     const workFields = [
//         "Heavy Vehicle Driver",
//         "Light Vehicle Driver",
//         "Helper Staff",
//         "Fruit Packaging",
//         "Factory Cleaner",
//         "Vegetable Sorter",
//         "Packing"
//     ];

//     /* ================= FETCH USERS ================= */
//     const fetchUsers = async (query = "") => {
//         setLoading(true);
//         try {
//             const res = await fetch(`${API_URL}?q=${query}`);
//             const data = await res.json();
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     /* ================= FORM HANDLERS ================= */
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const resetForm = () => {
//         setFormData({
//             fullName: "",
//             dateOfBirth: "",
//             passportNumber: "",
//             expiryDate: "",
//             workField: "",
//             description: ""
//         });
//         setEditingUser(null);
//         setIsModalOpen(false);
//     };

//     /* ================= ADD / UPDATE ================= */
//     /* ================= ADD / UPDATE ================= */
//     // const handleSubmit = async () => {
//     //   // Prepare data with description default
//     //   const dataToSend = {
//     //     ...formData,
//     //     description: formData.description || ""
//     //   };

//     //   // Validation
//     //   const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
//     //   const missingFields = requiredFields.filter(field => !dataToSend[field]?.trim());

//     //   if (missingFields.length > 0) {
//     //     alert(`Please fill all required fields:\n${missingFields.map(f => f.replace(/([A-Z])/g, ' $1')).join(', ')}`);
//     //     return;
//     //   }

//     //   try {
//     //     const method = editingUser ? "PUT" : "POST";
//     //     const url = editingUser
//     //       ? `${API_URL}/${editingUser._id}`
//     //       : API_URL;

//     //     console.log("Sending data:", dataToSend);

//     //     const response = await fetch(url, {
//     //       method,
//     //       headers: { 
//     //         "Content-Type": "application/json",
//     //         "Accept": "application/json"
//     //       },
//     //       body: JSON.stringify(dataToSend)
//     //     });

//     //     const responseData = await response.json();
//     //     console.log("Response:", responseData);

//     //     if (!response.ok) {
//     //       // Try to show detailed error message
//     //       let errorMessage = "Failed to save user";
//     //       if (responseData.message) {
//     //         errorMessage = responseData.message;
//     //       }
//     //       if (responseData.errors) {
//     //         errorMessage += "\n" + Object.values(responseData.errors).join("\n");
//     //       }
//     //       if (responseData.missingFields) {
//     //         errorMessage += "\nMissing: " + responseData.missingFields.join(", ");
//     //       }
//     //       throw new Error(errorMessage);
//     //     }

//     //     resetForm();
//     //     fetchUsers(searchQuery);

//     //     alert(responseData.message || (editingUser ? "User updated successfully!" : "User added successfully!"));

//     //   } catch (error) {
//     //     console.error("Error saving user:", error);
//     //     alert(`Error: ${error.message}\n\nPlease check the console for details.`);
//     //   }
//     // };

//     const handleSubmit = async () => {
//         if (Object.values(formData).some(v => !v)) {
//             alert("Please fill all fields");
//             return;
//         }

//         const method = editingUser ? "PUT" : "POST";
//         const url = editingUser
//             ? `${API_URL}/${editingUser._id}`
//             : API_URL;

//         await fetch(url, {
//             method,
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         resetForm();
//         fetchUsers(searchQuery);
//     };
//     /* ================= EDIT ================= */
//     const handleEdit = (user) => {
//         setEditingUser(user);
//         setFormData({
//             fullName: user.fullName,
//             dateOfBirth: user.dateOfBirth,
//             passportNumber: user.passportNumber,
//             expiryDate: user.expiryDate,
//             workField: user.workField,
//             description: user.description || ""
//         });
//         setIsModalOpen(true);
//     };

//     /* ================= DELETE ================= */
//     const handleDelete = async (id) => {
//         if (!window.confirm("Delete this user?")) return;

//         try {
//             await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//             fetchUsers(searchQuery);
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             alert("Failed to delete user");
//         }
//     };

//     /* ================= GENERATE PDF ================= */
//     const handleGeneratePDF = (user) => {
//         setSelectedUser(user);
//         setIsPDFOpen(true);
//     };

//     /* ================= SEARCH ================= */
//     useEffect(() => {
//         const delay = setTimeout(() => {
//             fetchUsers(searchQuery);
//         }, 300);
//         return () => clearTimeout(delay);
//     }, [searchQuery]);

//     return (
//         <div className="min-h-screen bg-gray-100 flex">
//             {/* ================= SIDEBAR ================= */}
//             <motion.aside
//                 initial={{ x: -300 }}
//                 animate={{ x: isSidebarOpen ? 0 : -300 }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50 shadow-xl"
//             >
//                 <div className="p-6">
//                     <h2 className="text-2xl font-bold">AG Foods</h2>
//                     <p className="text-sm text-green-300 mb-10">Admin Panel</p>

//                     <nav className="space-y-4">
//                         <button className="flex items-center gap-3 bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg w-full transition-colors">
//                             <Users size={20} />
//                             <span>User Management</span>
//                         </button>
//                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
//                             <Briefcase size={20} />
//                             <span>Job Applications</span>
//                         </button>
//                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
//                             <FileText size={20} />
//                             <span>Reports</span>
//                         </button>
//                     </nav>

//                     <div className="absolute bottom-6 left-6 right-6">
//                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
//                             <LogOut size={20} />
//                             <span>Logout</span>
//                         </button>
//                     </div>
//                 </div>
//             </motion.aside>

//             {/* ================= MAIN CONTENT ================= */}
//             <div className="flex-1 flex flex-col">
//                 {/* HEADER */}
//                 <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
//                     <button
//                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                         className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
//                     >
//                         <Menu size={24} />
//                     </button>
//                     <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//                     <div className="flex items-center gap-3">
//                         <button className="p-2 hover:bg-gray-100 rounded-lg">
//                             <User size={20} />
//                         </button>
//                     </div>
//                 </header>

//                 {/* SEARCH + ADD BUTTON */}
//                 <div className="p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
//                     <div className="relative max-w-md w-full">
//                         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//                         <input
//                             className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             placeholder="Search by name, passport, or work field..."
//                             value={searchQuery}
//                             onChange={e => setSearchQuery(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
//                     >
//                         <Plus size={20} /> Add New User
//                     </button>
//                 </div>

//                 {/* USERS GRID */}
//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
//                     {loading ? (
//                         <div className="col-span-full flex justify-center items-center h-64">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//                         </div>
//                     ) : users.length === 0 ? (
//                         <div className="col-span-full text-center py-12">
//                             <FileText className="mx-auto text-gray-400 mb-4" size={48} />
//                             <p className="text-gray-500 text-lg">No users found</p>
//                             {searchQuery && (
//                                 <p className="text-gray-400">Try a different search term</p>
//                             )}
//                         </div>
//                     ) : (
//                         users.map(user => (
//                             <motion.div
//                                 key={user._id}
//                                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
//                                     <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
//                                     <div className="flex items-center gap-2 mt-1">
//                                         <Briefcase size={14} />
//                                         <p className="text-sm opacity-90">{user.workField}</p>
//                                     </div>
//                                 </div>

//                                 <div className="p-4 space-y-3">
//                                     <div className="flex items-center gap-2 text-sm">
//                                         <Calendar className="text-gray-500" size={16} />
//                                         <span className="font-medium">DOB:</span>
//                                         <span>{user.dateOfBirth}</span>
//                                     </div>

//                                     <div className="flex items-center gap-2 text-sm">
//                                         <CreditCard className="text-gray-500" size={16} />
//                                         <span className="font-medium">Passport:</span>
//                                         <span className="font-mono">{user.passportNumber}</span>
//                                     </div>

//                                     <div className="text-sm">
//                                         <span className="font-medium">Expiry:</span>
//                                         <span className={`ml-2 ${new Date(user.expiryDate) < new Date() ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
//                                             {user.expiryDate}
//                                         </span>
//                                     </div>

//                                     {user.description && (
//                                         <div className="pt-2 border-t border-gray-100">
//                                             <p className="text-gray-600 text-sm line-clamp-2">{user.description}</p>
//                                         </div>
//                                     )}

//                                     <div className="flex gap-2 pt-4">
//                                         <button
//                                             onClick={() => handleEdit(user)}
//                                             className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
//                                         >
//                                             <Edit2 size={16} /> Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleGeneratePDF(user)}
//                                             className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
//                                         >
//                                             <FileText size={16} /> PDF
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(user._id)}
//                                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
//                                         >
//                                             <Trash2 size={16} /> Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))
//                     )}
//                 </div>

//                 {/* USER COUNT */}
//                 {!loading && users.length > 0 && (
//                     <div className="px-6 pb-6">
//                         <p className="text-gray-500 text-sm">
//                             Showing {users.length} user{users.length !== 1 ? 's' : ''}
//                         </p>
//                     </div>
//                 )}
//             </div>

//             {/* ================= ADD/EDIT USER MODAL ================= */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//                     <motion.div
//                         className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ type: "spring", damping: 25 }}
//                     >
//                         <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 {editingUser ? "Edit User" : "Add New User"}
//                             </h2>
//                             <button
//                                 onClick={resetForm}
//                                 className="p-2 hover:bg-gray-100 rounded-lg"
//                             >
//                                 <X size={24} />
//                             </button>
//                         </div>

//                         <div className="p-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {Object.keys(formData).map(key => {
//                                     if (key === "workField") {
//                                         return (
//                                             <div key={key} className="md:col-span-2">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                     Work Field *
//                                                 </label>
//                                                 <select
//                                                     name={key}
//                                                     value={formData[key]}
//                                                     onChange={handleInputChange}
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                                     required
//                                                 >
//                                                     <option value="">Select Work Field</option>
//                                                     {workFields.map(field => (
//                                                         <option key={field} value={field}>{field}</option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         );
//                                     }

//                                     if (key === "description") {
//                                         return (
//                                             <div key={key} className="md:col-span-2">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                     Description
//                                                 </label>
//                                                 <textarea
//                                                     name={key}
//                                                     value={formData[key]}
//                                                     onChange={handleInputChange}
//                                                     placeholder="Additional information..."
//                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
//                                                     rows={4}
//                                                 />
//                                             </div>
//                                         );
//                                     }

//                                     return (
//                                         <div key={key}>
//                                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                 {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} *
//                                             </label>
//                                             <input
//                                                 type={key.includes("Date") ? "date" : "text"}
//                                                 name={key}
//                                                 value={formData[key]}
//                                                 onChange={handleInputChange}
//                                                 placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                                                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                                                 required
//                                             />
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             <div className="flex gap-3 mt-8 pt-6 border-t">
//                                 <button
//                                     onClick={resetForm}
//                                     className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSubmit}
//                                     className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
//                                 >
//                                     <Save size={20} />
//                                     {editingUser ? "Update User" : "Save User"}
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             )}

//             {/* ================= PDF GENERATOR MODAL ================= */}
//             {isPDFOpen && selectedUser && (
//                 <PDFGenerator
//                     user={selectedUser}
//                     isOpen={isPDFOpen}
//                     onClose={() => {
//                         setIsPDFOpen(false);
//                         setSelectedUser(null);
//                     }}
//                 />
//             )}
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users, Plus, Edit2, Trash2, Search, X, Save,
    FileText, Calendar, CreditCard, Briefcase, Menu,
    User, LogOut, Download
} from "lucide-react";

const API_URL = "https://agfoodbackend-production.up.railway.app/api/users";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        passportNumber: "",
        expiryDate: "",
        workField: "",
        description: ""
    });

    const workFields = [
        "Heavy Vehicle Driver",
        "Light Vehicle Driver",
        "Helper Staff",
        "Fruit Packaging",
        "Factory Cleaner",
        "Vegetable Sorter",
        "Packing"
    ];

    /* ================= FETCH USERS ================= */
    const fetchUsers = async (query = "") => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?q=${query}`);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* ================= FORM HANDLERS ================= */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            dateOfBirth: "",
            passportNumber: "",
            expiryDate: "",
            workField: "",
            description: ""
        });
        setEditingUser(null);
        setIsModalOpen(false);
    };

    /* ================= ADD / UPDATE ================= */
    const handleSubmit = async () => {
        // Validation
        const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
        const missingFields = requiredFields.filter(field => !formData[field]?.trim());

        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            const method = editingUser ? "PUT" : "POST";
            const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to save user");
                return;
            }

            alert(data.message || "User saved successfully!");
            resetForm();
            fetchUsers(searchQuery);
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Error saving user. Please try again.");
        }
    };

    /* ================= EDIT ================= */
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            passportNumber: user.passportNumber,
            expiryDate: user.expiryDate,
            workField: user.workField,
            description: user.description || ""
        });
        setIsModalOpen(true);
    };

    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await response.json();
            
            if (response.ok) {
                alert(data.message || "User deleted successfully!");
                fetchUsers(searchQuery);
            } else {
                alert(data.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    /* ================= DOWNLOAD PDF ================= */
    const handleDownloadPDF = async (user) => {
        try {
            const response = await fetch(`${API_URL}/${user._id}/pdf`);
            
            if (!response.ok) {
                alert("Failed to generate PDF");
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            alert("Failed to download PDF");
        }
    };

    /* ================= SEARCH ================= */
    useEffect(() => {
        const delay = setTimeout(() => {
            fetchUsers(searchQuery);
        }, 300);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* ================= SIDEBAR ================= */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50 shadow-xl"
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold">AG Foods</h2>
                    <p className="text-sm text-green-300 mb-10">Admin Panel</p>

                    <nav className="space-y-4">
                        <button className="flex items-center gap-3 bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg w-full transition-colors">
                            <Users size={20} />
                            <span>User Management</span>
                        </button>
                        <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
                            <Briefcase size={20} />
                            <span>Job Applications</span>
                        </button>
                        <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
                            <FileText size={20} />
                            <span>Reports</span>
                        </button>
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 flex flex-col">
                {/* HEADER */}
                <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <User size={20} />
                        </button>
                    </div>
                </header>

                {/* SEARCH + ADD BUTTON */}
                <div className="p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Search by name, passport, or work field..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                    >
                        <Plus size={20} /> Add New User
                    </button>
                </div>

                {/* USERS GRID */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-500 text-lg">No users found</p>
                            {searchQuery && (
                                <p className="text-gray-400">Try a different search term</p>
                            )}
                        </div>
                    ) : (
                        users.map(user => (
                            <motion.div
                                key={user._id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
                                    <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Briefcase size={14} />
                                        <p className="text-sm opacity-90">{user.workField}</p>
                                    </div>
                                </div>

                                <div className="p-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="text-gray-500" size={16} />
                                        <span className="font-medium">DOB:</span>
                                        <span>{user.dateOfBirth}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="text-gray-500" size={16} />
                                        <span className="font-medium">Passport:</span>
                                        <span className="font-mono">{user.passportNumber}</span>
                                    </div>

                                    <div className="text-sm">
                                        <span className="font-medium">Expiry:</span>
                                        <span className={`ml-2 ${new Date(user.expiryDate) < new Date() ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                                            {user.expiryDate}
                                        </span>
                                    </div>

                                    {user.description && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <p className="text-gray-600 text-sm line-clamp-2">{user.description}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Edit2 size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDownloadPDF(user)}
                                            className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Download size={16} /> PDF
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* USER COUNT */}
                {!loading && users.length > 0 && (
                    <div className="px-6 pb-6">
                        <p className="text-gray-500 text-sm">
                            Showing {users.length} user{users.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}
            </div>

            {/* ================= ADD/EDIT USER MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 25 }}
                    >
                        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingUser ? "Edit User" : "Add New User"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(formData).map(key => {
                                    if (key === "workField") {
                                        return (
                                            <div key={key} className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Work Field *
                                                </label>
                                                <select
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                    required
                                                >
                                                    <option value="">Select Work Field</option>
                                                    {workFields.map(field => (
                                                        <option key={field} value={field}>{field}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        );
                                    }

                                    if (key === "description") {
                                        return (
                                            <div key={key} className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleInputChange}
                                                    placeholder="Additional information..."
                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
                                                    rows={4}
                                                />
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={key}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} *
                                            </label>
                                            <input
                                                type={key.includes("Date") ? "date" : "text"}
                                                name={key}
                                                value={formData[key]}
                                                onChange={handleInputChange}
                                                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3 mt-8 pt-6 border-t">
                                <button
                                    onClick={resetForm}
                                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                                >
                                    <Save size={20} />
                                    {editingUser ? "Update User" : "Save User"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}