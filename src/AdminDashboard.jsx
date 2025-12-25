// // // import React, { useEffect, useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   Users, Plus, Edit2, Trash2, Search, X, Save,
// // //   FileText, Calendar, CreditCard, Briefcase, Menu,
// // //   User, LogOut
// // // } from "lucide-react";

// // // const API_URL = "http://localhost:5000/api/users";

// // // export default function AdminDashboard() {
// // //   const [users, setUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [editingUser, setEditingUser] = useState(null);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// // //   const [formData, setFormData] = useState({
// // //     fullName: "",
// // //     dateOfBirth: "",
// // //     passportNumber: "",
// // //     expiryDate: "",
// // //     workField: "",
// // //     description: ""
// // //   });

// // //   const workFields = [
// // //     "Heavy Vehicle Driver",
// // //     "Light Vehicle Driver",
// // //     "Helper Staff",
// // //     "Fruit Packaging",
// // //     "Factory Cleaner",
// // //     "Vegetable Sorter"
// // //   ];

// // //   /* ================= FETCH USERS ================= */
// // //   const fetchUsers = async (query = "") => {
// // //     setLoading(true);
// // //     const res = await fetch(`${API_URL}?q=${query}`);
// // //     const data = await res.json();
// // //     setUsers(data);
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, []);

// // //   /* ================= FORM HANDLERS ================= */
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const resetForm = () => {
// // //     setFormData({
// // //       fullName: "",
// // //       dateOfBirth: "",
// // //       passportNumber: "",
// // //       expiryDate: "",
// // //       workField: "",
// // //       description: ""
// // //     });
// // //     setEditingUser(null);
// // //     setIsModalOpen(false);
// // //   };

// // //   /* ================= ADD / UPDATE ================= */
// // //   const handleSubmit = async () => {
// // //     if (Object.values(formData).some(v => !v)) {
// // //       alert("Please fill all fields");
// // //       return;
// // //     }

// // //     const method = editingUser ? "PUT" : "POST";
// // //     const url = editingUser
// // //       ? `${API_URL}/${editingUser._id}`
// // //       : API_URL;

// // //     await fetch(url, {
// // //       method,
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(formData)
// // //     });

// // //     resetForm();
// // //     fetchUsers(searchQuery);
// // //   };

// // //   /* ================= EDIT ================= */
// // //   const handleEdit = (user) => {
// // //     setEditingUser(user);
// // //     setFormData({
// // //       fullName: user.fullName,
// // //       dateOfBirth: user.dateOfBirth,
// // //       passportNumber: user.passportNumber,
// // //       expiryDate: user.expiryDate,
// // //       workField: user.workField,
// // //       description: user.description
// // //     });
// // //     setIsModalOpen(true);
// // //   };

// // //   /* ================= DELETE ================= */
// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Delete this user?")) return;

// // //     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// // //     fetchUsers(searchQuery);
// // //   };

// // //   /* ================= SEARCH ================= */
// // //   useEffect(() => {
// // //     const delay = setTimeout(() => {
// // //       fetchUsers(searchQuery);
// // //     }, 300);
// // //     return () => clearTimeout(delay);
// // //   }, [searchQuery]);

// // //   /* ================= UI ================= */
// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex">

// // //       {/* ================= SIDEBAR ================= */}
// // //       <motion.aside
// // //         initial={{ x: -300 }}
// // //         animate={{ x: isSidebarOpen ? 0 : -300 }}
// // //         className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50"
// // //       >
// // //         <div className="p-6">
// // //           <h2 className="text-xl font-bold">AG Foods</h2>
// // //           <p className="text-sm text-green-300 mb-6">Admin Panel</p>

// // //           <button className="flex items-center gap-3 bg-green-800 px-4 py-3 rounded-lg w-full">
// // //             <Users /> User Management
// // //           </button>
// // //         </div>
// // //       </motion.aside>

// // //       {/* ================= CONTENT ================= */}
// // //       <div className="flex-1">

// // //         {/* HEADER */}
// // //         <header className="bg-white shadow p-4 flex justify-between items-center">
// // //           <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
// // //             <Menu />
// // //           </button>
// // //           <h1 className="text-xl font-bold">User Management</h1>
// // //         </header>

// // //         {/* SEARCH + ADD */}
// // //         <div className="p-6 flex flex-col sm:flex-row gap-4">
// // //           <div className="relative max-w-md w-full">
// // //             <Search className="absolute left-3 top-3 text-gray-400" />
// // //             <input
// // //               className="pl-10 w-full border rounded-lg p-2"
// // //               placeholder="Search..."
// // //               value={searchQuery}
// // //               onChange={e => setSearchQuery(e.target.value)}
// // //             />
// // //           </div>

// // //           <button
// // //             onClick={() => setIsModalOpen(true)}
// // //             className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
// // //           >
// // //             <Plus /> Add User
// // //           </button>
// // //         </div>

// // //         {/* USERS GRID */}
// // //         <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// // //           {loading ? (
// // //             <p>Loading...</p>
// // //           ) : users.length === 0 ? (
// // //             <p>No users found</p>
// // //           ) : users.map(user => (
// // //             <div key={user._id} className="bg-white rounded-xl shadow">
// // //               <div className="bg-green-600 text-white p-4 rounded-t-xl">
// // //                 <h3 className="font-bold">{user.fullName}</h3>
// // //                 <p className="text-sm">{user.workField}</p>
// // //               </div>

// // //               <div className="p-4 space-y-2 text-sm">
// // //                 <p><Calendar className="inline w-4" /> {user.dateOfBirth}</p>
// // //                 <p><CreditCard className="inline w-4" /> {user.passportNumber}</p>
// // //                 <p>Expiry: {user.expiryDate}</p>
// // //                 <p className="text-gray-600">{user.description}</p>

// // //                 <div className="flex gap-2 pt-3">
// // //                   <button
// // //                     onClick={() => handleEdit(user)}
// // //                     className="flex-1 bg-blue-100 text-blue-600 p-2 rounded"
// // //                   >
// // //                     <Edit2 className="inline w-4" /> Edit
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleDelete(user._id)}
// // //                     className="flex-1 bg-red-100 text-red-600 p-2 rounded"
// // //                   >
// // //                     <Trash2 className="inline w-4" /> Delete
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* ================= MODAL ================= */}
// // //       {isModalOpen && (
// // //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
// // //           <div className="bg-white p-6 rounded-xl w-full max-w-xl">
// // //             <h2 className="text-xl font-bold mb-4">
// // //               {editingUser ? "Edit User" : "Add User"}
// // //             </h2>

// // //             {Object.keys(formData).map(key => (
// // //               key !== "description" ? (
// // //                 <input
// // //                   key={key}
// // //                   name={key}
// // //                   value={formData[key]}
// // //                   onChange={handleInputChange}
// // //                   placeholder={key}
// // //                   className="w-full border p-2 rounded mb-3"
// // //                 />
// // //               ) : (
// // //                 <textarea
// // //                   key={key}
// // //                   name={key}
// // //                   value={formData[key]}
// // //                   onChange={handleInputChange}
// // //                   className="w-full border p-2 rounded mb-3"
// // //                 />
// // //               )
// // //             ))}

// // //             <div className="flex gap-2">
// // //               <button onClick={resetForm} className="flex-1 border p-2 rounded">
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={handleSubmit}
// // //                 className="flex-1 bg-green-600 text-white p-2 rounded"
// // //               >
// // //                 <Save className="inline w-4" /> Save
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // }
// // // import React, { useEffect, useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //     Users, Plus, Edit2, Trash2, Search, X, Save,
// // //     FileText, Calendar, CreditCard, Briefcase, Menu,
// // //     User, LogOut, Download
// // // } from "lucide-react";
// // // import PDFGenerator from "./PDFGenerator";

// // // const API_URL = "http://localhost:5000/api/users";

// // // export default function AdminDashboard() {
// // //     const [users, setUsers] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [isModalOpen, setIsModalOpen] = useState(false);
// // //     const [editingUser, setEditingUser] = useState(null);
// // //     const [searchQuery, setSearchQuery] = useState("");
// // //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //     const [selectedUser, setSelectedUser] = useState(null);
// // //     const [isPDFOpen, setIsPDFOpen] = useState(false);

// // //     const [formData, setFormData] = useState({
// // //         fullName: "",
// // //         dateOfBirth: "",
// // //         passportNumber: "",
// // //         expiryDate: "",
// // //         workField: "",
// // //         description: ""
// // //     });

// // //     const workFields = [
// // //         "Heavy Vehicle Driver",
// // //         "Light Vehicle Driver",
// // //         "Helper Staff",
// // //         "Fruit Packaging",
// // //         "Factory Cleaner",
// // //         "Vegetable Sorter",
// // //         "Packing"
// // //     ];

// // //     /* ================= FETCH USERS ================= */
// // //     const fetchUsers = async (query = "") => {
// // //         setLoading(true);
// // //         try {
// // //             const res = await fetch(`${API_URL}?q=${query}`);
// // //             const data = await res.json();
// // //             setUsers(data);
// // //         } catch (error) {
// // //             console.error("Error fetching users:", error);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchUsers();
// // //     }, []);

// // //     /* ================= FORM HANDLERS ================= */
// // //     const handleInputChange = (e) => {
// // //         const { name, value } = e.target;
// // //         setFormData(prev => ({ ...prev, [name]: value }));
// // //     };

// // //     const resetForm = () => {
// // //         setFormData({
// // //             fullName: "",
// // //             dateOfBirth: "",
// // //             passportNumber: "",
// // //             expiryDate: "",
// // //             workField: "",
// // //             description: ""
// // //         });
// // //         setEditingUser(null);
// // //         setIsModalOpen(false);
// // //     };

// // //     /* ================= ADD / UPDATE ================= */
// // //     /* ================= ADD / UPDATE ================= */
// // //     // const handleSubmit = async () => {
// // //     //   // Prepare data with description default
// // //     //   const dataToSend = {
// // //     //     ...formData,
// // //     //     description: formData.description || ""
// // //     //   };

// // //     //   // Validation
// // //     //   const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
// // //     //   const missingFields = requiredFields.filter(field => !dataToSend[field]?.trim());

// // //     //   if (missingFields.length > 0) {
// // //     //     alert(`Please fill all required fields:\n${missingFields.map(f => f.replace(/([A-Z])/g, ' $1')).join(', ')}`);
// // //     //     return;
// // //     //   }

// // //     //   try {
// // //     //     const method = editingUser ? "PUT" : "POST";
// // //     //     const url = editingUser
// // //     //       ? `${API_URL}/${editingUser._id}`
// // //     //       : API_URL;

// // //     //     console.log("Sending data:", dataToSend);

// // //     //     const response = await fetch(url, {
// // //     //       method,
// // //     //       headers: { 
// // //     //         "Content-Type": "application/json",
// // //     //         "Accept": "application/json"
// // //     //       },
// // //     //       body: JSON.stringify(dataToSend)
// // //     //     });

// // //     //     const responseData = await response.json();
// // //     //     console.log("Response:", responseData);

// // //     //     if (!response.ok) {
// // //     //       // Try to show detailed error message
// // //     //       let errorMessage = "Failed to save user";
// // //     //       if (responseData.message) {
// // //     //         errorMessage = responseData.message;
// // //     //       }
// // //     //       if (responseData.errors) {
// // //     //         errorMessage += "\n" + Object.values(responseData.errors).join("\n");
// // //     //       }
// // //     //       if (responseData.missingFields) {
// // //     //         errorMessage += "\nMissing: " + responseData.missingFields.join(", ");
// // //     //       }
// // //     //       throw new Error(errorMessage);
// // //     //     }

// // //     //     resetForm();
// // //     //     fetchUsers(searchQuery);

// // //     //     alert(responseData.message || (editingUser ? "User updated successfully!" : "User added successfully!"));

// // //     //   } catch (error) {
// // //     //     console.error("Error saving user:", error);
// // //     //     alert(`Error: ${error.message}\n\nPlease check the console for details.`);
// // //     //   }
// // //     // };

// // //     const handleSubmit = async () => {
// // //         if (Object.values(formData).some(v => !v)) {
// // //             alert("Please fill all fields");
// // //             return;
// // //         }

// // //         const method = editingUser ? "PUT" : "POST";
// // //         const url = editingUser
// // //             ? `${API_URL}/${editingUser._id}`
// // //             : API_URL;

// // //         await fetch(url, {
// // //             method,
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify(formData)
// // //         });

// // //         resetForm();
// // //         fetchUsers(searchQuery);
// // //     };
// // //     /* ================= EDIT ================= */
// // //     const handleEdit = (user) => {
// // //         setEditingUser(user);
// // //         setFormData({
// // //             fullName: user.fullName,
// // //             dateOfBirth: user.dateOfBirth,
// // //             passportNumber: user.passportNumber,
// // //             expiryDate: user.expiryDate,
// // //             workField: user.workField,
// // //             description: user.description || ""
// // //         });
// // //         setIsModalOpen(true);
// // //     };

// // //     /* ================= DELETE ================= */
// // //     const handleDelete = async (id) => {
// // //         if (!window.confirm("Delete this user?")) return;

// // //         try {
// // //             await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// // //             fetchUsers(searchQuery);
// // //         } catch (error) {
// // //             console.error("Error deleting user:", error);
// // //             alert("Failed to delete user");
// // //         }
// // //     };

// // //     /* ================= GENERATE PDF ================= */
// // //     const handleGeneratePDF = (user) => {
// // //         setSelectedUser(user);
// // //         setIsPDFOpen(true);
// // //     };

// // //     /* ================= SEARCH ================= */
// // //     useEffect(() => {
// // //         const delay = setTimeout(() => {
// // //             fetchUsers(searchQuery);
// // //         }, 300);
// // //         return () => clearTimeout(delay);
// // //     }, [searchQuery]);

// // //     return (
// // //         <div className="min-h-screen bg-gray-100 flex">
// // //             {/* ================= SIDEBAR ================= */}
// // //             <motion.aside
// // //                 initial={{ x: -300 }}
// // //                 animate={{ x: isSidebarOpen ? 0 : -300 }}
// // //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// // //                 className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50 shadow-xl"
// // //             >
// // //                 <div className="p-6">
// // //                     <h2 className="text-2xl font-bold">AG Foods</h2>
// // //                     <p className="text-sm text-green-300 mb-10">Admin Panel</p>

// // //                     <nav className="space-y-4">
// // //                         <button className="flex items-center gap-3 bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg w-full transition-colors">
// // //                             <Users size={20} />
// // //                             <span>User Management</span>
// // //                         </button>
// // //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// // //                             <Briefcase size={20} />
// // //                             <span>Job Applications</span>
// // //                         </button>
// // //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// // //                             <FileText size={20} />
// // //                             <span>Reports</span>
// // //                         </button>
// // //                     </nav>

// // //                     <div className="absolute bottom-6 left-6 right-6">
// // //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// // //                             <LogOut size={20} />
// // //                             <span>Logout</span>
// // //                         </button>
// // //                     </div>
// // //                 </div>
// // //             </motion.aside>

// // //             {/* ================= MAIN CONTENT ================= */}
// // //             <div className="flex-1 flex flex-col">
// // //                 {/* HEADER */}
// // //                 <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
// // //                     <button
// // //                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // //                         className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
// // //                     >
// // //                         <Menu size={24} />
// // //                     </button>
// // //                     <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
// // //                     <div className="flex items-center gap-3">
// // //                         <button className="p-2 hover:bg-gray-100 rounded-lg">
// // //                             <User size={20} />
// // //                         </button>
// // //                     </div>
// // //                 </header>

// // //                 {/* SEARCH + ADD BUTTON */}
// // //                 <div className="p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
// // //                     <div className="relative max-w-md w-full">
// // //                         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
// // //                         <input
// // //                             className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// // //                             placeholder="Search by name, passport, or work field..."
// // //                             value={searchQuery}
// // //                             onChange={e => setSearchQuery(e.target.value)}
// // //                         />
// // //                     </div>

// // //                     <button
// // //                         onClick={() => setIsModalOpen(true)}
// // //                         className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
// // //                     >
// // //                         <Plus size={20} /> Add New User
// // //                     </button>
// // //                 </div>

// // //                 {/* USERS GRID */}
// // //                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
// // //                     {loading ? (
// // //                         <div className="col-span-full flex justify-center items-center h-64">
// // //                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// // //                         </div>
// // //                     ) : users.length === 0 ? (
// // //                         <div className="col-span-full text-center py-12">
// // //                             <FileText className="mx-auto text-gray-400 mb-4" size={48} />
// // //                             <p className="text-gray-500 text-lg">No users found</p>
// // //                             {searchQuery && (
// // //                                 <p className="text-gray-400">Try a different search term</p>
// // //                             )}
// // //                         </div>
// // //                     ) : (
// // //                         users.map(user => (
// // //                             <motion.div
// // //                                 key={user._id}
// // //                                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
// // //                                 initial={{ opacity: 0, y: 20 }}
// // //                                 animate={{ opacity: 1, y: 0 }}
// // //                                 transition={{ duration: 0.3 }}
// // //                             >
// // //                                 <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
// // //                                     <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
// // //                                     <div className="flex items-center gap-2 mt-1">
// // //                                         <Briefcase size={14} />
// // //                                         <p className="text-sm opacity-90">{user.workField}</p>
// // //                                     </div>
// // //                                 </div>

// // //                                 <div className="p-4 space-y-3">
// // //                                     <div className="flex items-center gap-2 text-sm">
// // //                                         <Calendar className="text-gray-500" size={16} />
// // //                                         <span className="font-medium">DOB:</span>
// // //                                         <span>{user.dateOfBirth}</span>
// // //                                     </div>

// // //                                     <div className="flex items-center gap-2 text-sm">
// // //                                         <CreditCard className="text-gray-500" size={16} />
// // //                                         <span className="font-medium">Passport:</span>
// // //                                         <span className="font-mono">{user.passportNumber}</span>
// // //                                     </div>

// // //                                     <div className="text-sm">
// // //                                         <span className="font-medium">Expiry:</span>
// // //                                         <span className={`ml-2 ${new Date(user.expiryDate) < new Date() ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
// // //                                             {user.expiryDate}
// // //                                         </span>
// // //                                     </div>

// // //                                     {user.description && (
// // //                                         <div className="pt-2 border-t border-gray-100">
// // //                                             <p className="text-gray-600 text-sm line-clamp-2">{user.description}</p>
// // //                                         </div>
// // //                                     )}

// // //                                     <div className="flex gap-2 pt-4">
// // //                                         <button
// // //                                             onClick={() => handleEdit(user)}
// // //                                             className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                                         >
// // //                                             <Edit2 size={16} /> Edit
// // //                                         </button>
// // //                                         <button
// // //                                             onClick={() => handleGeneratePDF(user)}
// // //                                             className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                                         >
// // //                                             <FileText size={16} /> PDF
// // //                                         </button>
// // //                                         <button
// // //                                             onClick={() => handleDelete(user._id)}
// // //                                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// // //                                         >
// // //                                             <Trash2 size={16} /> Delete
// // //                                         </button>
// // //                                     </div>
// // //                                 </div>
// // //                             </motion.div>
// // //                         ))
// // //                     )}
// // //                 </div>

// // //                 {/* USER COUNT */}
// // //                 {!loading && users.length > 0 && (
// // //                     <div className="px-6 pb-6">
// // //                         <p className="text-gray-500 text-sm">
// // //                             Showing {users.length} user{users.length !== 1 ? 's' : ''}
// // //                         </p>
// // //                     </div>
// // //                 )}
// // //             </div>

// // //             {/* ================= ADD/EDIT USER MODAL ================= */}
// // //             {isModalOpen && (
// // //                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // //                     <motion.div
// // //                         className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
// // //                         initial={{ scale: 0.9, opacity: 0 }}
// // //                         animate={{ scale: 1, opacity: 1 }}
// // //                         transition={{ type: "spring", damping: 25 }}
// // //                     >
// // //                         <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
// // //                             <h2 className="text-2xl font-bold text-gray-800">
// // //                                 {editingUser ? "Edit User" : "Add New User"}
// // //                             </h2>
// // //                             <button
// // //                                 onClick={resetForm}
// // //                                 className="p-2 hover:bg-gray-100 rounded-lg"
// // //                             >
// // //                                 <X size={24} />
// // //                             </button>
// // //                         </div>

// // //                         <div className="p-6">
// // //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                                 {Object.keys(formData).map(key => {
// // //                                     if (key === "workField") {
// // //                                         return (
// // //                                             <div key={key} className="md:col-span-2">
// // //                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                                                     Work Field *
// // //                                                 </label>
// // //                                                 <select
// // //                                                     name={key}
// // //                                                     value={formData[key]}
// // //                                                     onChange={handleInputChange}
// // //                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// // //                                                     required
// // //                                                 >
// // //                                                     <option value="">Select Work Field</option>
// // //                                                     {workFields.map(field => (
// // //                                                         <option key={field} value={field}>{field}</option>
// // //                                                     ))}
// // //                                                 </select>
// // //                                             </div>
// // //                                         );
// // //                                     }

// // //                                     if (key === "description") {
// // //                                         return (
// // //                                             <div key={key} className="md:col-span-2">
// // //                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                                                     Description
// // //                                                 </label>
// // //                                                 <textarea
// // //                                                     name={key}
// // //                                                     value={formData[key]}
// // //                                                     onChange={handleInputChange}
// // //                                                     placeholder="Additional information..."
// // //                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
// // //                                                     rows={4}
// // //                                                 />
// // //                                             </div>
// // //                                         );
// // //                                     }

// // //                                     return (
// // //                                         <div key={key}>
// // //                                             <label className="block text-sm font-medium text-gray-700 mb-1">
// // //                                                 {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} *
// // //                                             </label>
// // //                                             <input
// // //                                                 type={key.includes("Date") ? "date" : "text"}
// // //                                                 name={key}
// // //                                                 value={formData[key]}
// // //                                                 onChange={handleInputChange}
// // //                                                 placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
// // //                                                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// // //                                                 required
// // //                                             />
// // //                                         </div>
// // //                                     );
// // //                                 })}
// // //                             </div>

// // //                             <div className="flex gap-3 mt-8 pt-6 border-t">
// // //                                 <button
// // //                                     onClick={resetForm}
// // //                                     className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg transition-colors"
// // //                                 >
// // //                                     Cancel
// // //                                 </button>
// // //                                 <button
// // //                                     onClick={handleSubmit}
// // //                                     className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
// // //                                 >
// // //                                     <Save size={20} />
// // //                                     {editingUser ? "Update User" : "Save User"}
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     </motion.div>
// // //                 </div>
// // //             )}

// // //             {/* ================= PDF GENERATOR MODAL ================= */}
// // //             {isPDFOpen && selectedUser && (
// // //                 <PDFGenerator
// // //                     user={selectedUser}
// // //                     isOpen={isPDFOpen}
// // //                     onClose={() => {
// // //                         setIsPDFOpen(false);
// // //                         setSelectedUser(null);
// // //                     }}
// // //                 />
// // //             )}
// // //         </div>
// // //     );
// // // }
// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //     Users, Plus, Edit2, Trash2, Search, X, Save,
// //     FileText, Calendar, CreditCard, Briefcase, Menu,
// //     User, LogOut, Download
// // } from "lucide-react";

// // const API_URL = "http://localhost:5000/api/users";

// // export default function AdminDashboard() {
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [editingUser, setEditingUser] = useState(null);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //     const [formData, setFormData] = useState({
// //         fullName: "",
// //         dateOfBirth: "",
// //         passportNumber: "",
// //         expiryDate: "",
// //         workField: "",
// //         description: ""
// //     });

// //     const workFields = [
// //         "Heavy Vehicle Driver",
// //         "Light Vehicle Driver",
// //         "Helper Staff",
// //         "Fruit Packaging",
// //         "Factory Cleaner",
// //         "Vegetable Sorter",
// //         "Packing"
// //     ];

// //     /* ================= FETCH USERS ================= */
// //     const fetchUsers = async (query = "") => {
// //         setLoading(true);
// //         try {
// //             const res = await fetch(`${API_URL}?q=${query}`);
// //             const data = await res.json();
// //             setUsers(data);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchUsers();
// //     }, []);

// //     /* ================= FORM HANDLERS ================= */
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const resetForm = () => {
// //         setFormData({
// //             fullName: "",
// //             dateOfBirth: "",
// //             passportNumber: "",
// //             expiryDate: "",
// //             workField: "",
// //             description: ""
// //         });
// //         setEditingUser(null);
// //         setIsModalOpen(false);
// //     };

// //     /* ================= ADD / UPDATE ================= */
// //     const handleSubmit = async () => {
// //         // Validation
// //         const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
// //         const missingFields = requiredFields.filter(field => !formData[field]?.trim());

// //         if (missingFields.length > 0) {
// //             alert(`Please fill all required fields: ${missingFields.join(', ')}`);
// //             return;
// //         }

// //         try {
// //             const method = editingUser ? "PUT" : "POST";
// //             const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

// //             const response = await fetch(url, {
// //                 method,
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(formData)
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 alert(data.message || "Failed to save user");
// //                 return;
// //             }

// //             alert(data.message || "User saved successfully!");
// //             resetForm();
// //             fetchUsers(searchQuery);
// //         } catch (error) {
// //             console.error("Error saving user:", error);
// //             alert("Error saving user. Please try again.");
// //         }
// //     };

// //     /* ================= EDIT ================= */
// //     const handleEdit = (user) => {
// //         setEditingUser(user);
// //         setFormData({
// //             fullName: user.fullName,
// //             dateOfBirth: user.dateOfBirth,
// //             passportNumber: user.passportNumber,
// //             expiryDate: user.expiryDate,
// //             workField: user.workField,
// //             description: user.description || ""
// //         });
// //         setIsModalOpen(true);
// //     };

// //     /* ================= DELETE ================= */
// //     const handleDelete = async (id) => {
// //         if (!window.confirm("Delete this user?")) return;

// //         try {
// //             const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// //             const data = await response.json();
            
// //             if (response.ok) {
// //                 alert(data.message || "User deleted successfully!");
// //                 fetchUsers(searchQuery);
// //             } else {
// //                 alert(data.message || "Failed to delete user");
// //             }
// //         } catch (error) {
// //             console.error("Error deleting user:", error);
// //             alert("Failed to delete user");
// //         }
// //     };

// //     /* ================= DOWNLOAD PDF ================= */
// //     const handleDownloadPDF = async (user) => {
// //         try {
// //             const response = await fetch(`${API_URL}/${user._id}/pdf`);
            
// //             if (!response.ok) {
// //                 alert("Failed to generate PDF");
// //                 return;
// //             }

// //             const blob = await response.blob();
// //             const url = window.URL.createObjectURL(blob);
// //             const a = document.createElement('a');
// //             a.href = url;
// //             a.download = `${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`;
// //             document.body.appendChild(a);
// //             a.click();
// //             window.URL.revokeObjectURL(url);
// //             document.body.removeChild(a);
// //         } catch (error) {
// //             console.error("Error downloading PDF:", error);
// //             alert("Failed to download PDF");
// //         }
// //     };

// //     /* ================= SEARCH ================= */
// //     useEffect(() => {
// //         const delay = setTimeout(() => {
// //             fetchUsers(searchQuery);
// //         }, 300);
// //         return () => clearTimeout(delay);
// //     }, [searchQuery]);

// //     return (
// //         <div className="min-h-screen bg-gray-100 flex">
// //             {/* ================= SIDEBAR ================= */}
// //             <motion.aside
// //                 initial={{ x: -300 }}
// //                 animate={{ x: isSidebarOpen ? 0 : -300 }}
// //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //                 className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50 shadow-xl"
// //             >
// //                 <div className="p-6">
// //                     <h2 className="text-2xl font-bold">AG Foods</h2>
// //                     <p className="text-sm text-green-300 mb-10">Admin Panel</p>

// //                     <nav className="space-y-4">
// //                         <button className="flex items-center gap-3 bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <Users size={20} />
// //                             <span>User Management</span>
// //                         </button>
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <Briefcase size={20} />
// //                             <span>Job Applications</span>
// //                         </button>
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <FileText size={20} />
// //                             <span>Reports</span>
// //                         </button>
// //                     </nav>

// //                     <div className="absolute bottom-6 left-6 right-6">
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <LogOut size={20} />
// //                             <span>Logout</span>
// //                         </button>
// //                     </div>
// //                 </div>
// //             </motion.aside>

// //             {/* ================= MAIN CONTENT ================= */}
// //             <div className="flex-1 flex flex-col">
// //                 {/* HEADER */}
// //                 <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
// //                     <button
// //                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //                         className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
// //                     >
// //                         <Menu size={24} />
// //                     </button>
// //                     <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
// //                     <div className="flex items-center gap-3">
// //                         <button className="p-2 hover:bg-gray-100 rounded-lg">
// //                             <User size={20} />
// //                         </button>
// //                     </div>
// //                 </header>

// //                 {/* SEARCH + ADD BUTTON */}
// //                 <div className="p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
// //                     <div className="relative max-w-md w-full">
// //                         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
// //                         <input
// //                             className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                             placeholder="Search by name, passport, or work field..."
// //                             value={searchQuery}
// //                             onChange={e => setSearchQuery(e.target.value)}
// //                         />
// //                     </div>

// //                     <button
// //                         onClick={() => setIsModalOpen(true)}
// //                         className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
// //                     >
// //                         <Plus size={20} /> Add New User
// //                     </button>
// //                 </div>

// //                 {/* USERS GRID */}
// //                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
// //                     {loading ? (
// //                         <div className="col-span-full flex justify-center items-center h-64">
// //                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// //                         </div>
// //                     ) : users.length === 0 ? (
// //                         <div className="col-span-full text-center py-12">
// //                             <FileText className="mx-auto text-gray-400 mb-4" size={48} />
// //                             <p className="text-gray-500 text-lg">No users found</p>
// //                             {searchQuery && (
// //                                 <p className="text-gray-400">Try a different search term</p>
// //                             )}
// //                         </div>
// //                     ) : (
// //                         users.map(user => (
// //                             <motion.div
// //                                 key={user._id}
// //                                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
// //                                 initial={{ opacity: 0, y: 20 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 transition={{ duration: 0.3 }}
// //                             >
// //                                 <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
// //                                     <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
// //                                     <div className="flex items-center gap-2 mt-1">
// //                                         <Briefcase size={14} />
// //                                         <p className="text-sm opacity-90">{user.workField}</p>
// //                                     </div>
// //                                 </div>

// //                                 <div className="p-4 space-y-3">
// //                                     <div className="flex items-center gap-2 text-sm">
// //                                         <Calendar className="text-gray-500" size={16} />
// //                                         <span className="font-medium">DOB:</span>
// //                                         <span>{user.dateOfBirth}</span>
// //                                     </div>

// //                                     <div className="flex items-center gap-2 text-sm">
// //                                         <CreditCard className="text-gray-500" size={16} />
// //                                         <span className="font-medium">Passport:</span>
// //                                         <span className="font-mono">{user.passportNumber}</span>
// //                                     </div>

// //                                     <div className="text-sm">
// //                                         <span className="font-medium">Expiry:</span>
// //                                         <span className={`ml-2 ${new Date(user.expiryDate) < new Date() ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
// //                                             {user.expiryDate}
// //                                         </span>
// //                                     </div>

// //                                     {user.description && (
// //                                         <div className="pt-2 border-t border-gray-100">
// //                                             <p className="text-gray-600 text-sm line-clamp-2">{user.description}</p>
// //                                         </div>
// //                                     )}

// //                                     <div className="flex gap-2 pt-4">
// //                                         <button
// //                                             onClick={() => handleEdit(user)}
// //                                             className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Edit2 size={16} /> Edit
// //                                         </button>
// //                                         <button
// //                                             onClick={() => handleDownloadPDF(user)}
// //                                             className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Download size={16} /> PDF
// //                                         </button>
// //                                         <button
// //                                             onClick={() => handleDelete(user._id)}
// //                                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Trash2 size={16} /> Delete
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </motion.div>
// //                         ))
// //                     )}
// //                 </div>

// //                 {/* USER COUNT */}
// //                 {!loading && users.length > 0 && (
// //                     <div className="px-6 pb-6">
// //                         <p className="text-gray-500 text-sm">
// //                             Showing {users.length} user{users.length !== 1 ? 's' : ''}
// //                         </p>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* ================= ADD/EDIT USER MODAL ================= */}
// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //                     <motion.div
// //                         className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
// //                         initial={{ scale: 0.9, opacity: 0 }}
// //                         animate={{ scale: 1, opacity: 1 }}
// //                         transition={{ type: "spring", damping: 25 }}
// //                     >
// //                         <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
// //                             <h2 className="text-2xl font-bold text-gray-800">
// //                                 {editingUser ? "Edit User" : "Add New User"}
// //                             </h2>
// //                             <button
// //                                 onClick={resetForm}
// //                                 className="p-2 hover:bg-gray-100 rounded-lg"
// //                             >
// //                                 <X size={24} />
// //                             </button>
// //                         </div>

// //                         <div className="p-6">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 {Object.keys(formData).map(key => {
// //                                     if (key === "workField") {
// //                                         return (
// //                                             <div key={key} className="md:col-span-2">
// //                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                                     Work Field *
// //                                                 </label>
// //                                                 <select
// //                                                     name={key}
// //                                                     value={formData[key]}
// //                                                     onChange={handleInputChange}
// //                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                                                     required
// //                                                 >
// //                                                     <option value="">Select Work Field</option>
// //                                                     {workFields.map(field => (
// //                                                         <option key={field} value={field}>{field}</option>
// //                                                     ))}
// //                                                 </select>
// //                                             </div>
// //                                         );
// //                                     }

// //                                     if (key === "description") {
// //                                         return (
// //                                             <div key={key} className="md:col-span-2">
// //                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                                     Description
// //                                                 </label>
// //                                                 <textarea
// //                                                     name={key}
// //                                                     value={formData[key]}
// //                                                     onChange={handleInputChange}
// //                                                     placeholder="Additional information..."
// //                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
// //                                                     rows={4}
// //                                                 />
// //                                             </div>
// //                                         );
// //                                     }

// //                                     return (
// //                                         <div key={key}>
// //                                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                                 {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} *
// //                                             </label>
// //                                             <input
// //                                                 type={key.includes("Date") ? "date" : "text"}
// //                                                 name={key}
// //                                                 value={formData[key]}
// //                                                 onChange={handleInputChange}
// //                                                 placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
// //                                                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     );
// //                                 })}
// //                             </div>

// //                             <div className="flex gap-3 mt-8 pt-6 border-t">
// //                                 <button
// //                                     onClick={resetForm}
// //                                     className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg transition-colors"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     onClick={handleSubmit}
// //                                     className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
// //                                 >
// //                                     <Save size={20} />
// //                                     {editingUser ? "Update User" : "Save User"}
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </motion.div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //     Users, Plus, Edit2, Trash2, Search, X, Save,
// //     FileText, Calendar, CreditCard, Briefcase, Menu,
// //     User, LogOut, Download
// // } from "lucide-react";

// // const API_URL = "http://localhost:5000/api/users";

// // export default function AdminDashboard() {
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [editingUser, setEditingUser] = useState(null);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //     const [formData, setFormData] = useState({
// //         fullName: "",
// //         dateOfBirth: "",
// //         passportNumber: "",
// //         expiryDate: "",
// //         workField: "",
// //         description: ""
// //     });

// //     const workFields = [
// //         "Heavy Vehicle Driver",
// //         "Light Vehicle Driver",
// //         "Helper Staff",
// //         "Fruit Packaging",
// //         "Factory Cleaner",
// //         "Vegetable Sorter",
// //         "Packing"
// //     ];

// //     /* ================= FETCH USERS ================= */
// //     const fetchUsers = async (query = "") => {
// //         setLoading(true);
// //         try {
// //             const res = await fetch(`${API_URL}?q=${query}`);
// //             const data = await res.json();
// //             setUsers(data);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchUsers();
// //     }, []);

// //     /* ================= FORM HANDLERS ================= */
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prev => ({ ...prev, [name]: value }));
// //     };

// //     const resetForm = () => {
// //         setFormData({
// //             fullName: "",
// //             dateOfBirth: "",
// //             passportNumber: "",
// //             expiryDate: "",
// //             workField: "",
// //             description: ""
// //         });
// //         setEditingUser(null);
// //         setIsModalOpen(false);
// //     };

// //     /* ================= ADD / UPDATE ================= */
// //     const handleSubmit = async () => {
// //         const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
// //         const missingFields = requiredFields.filter(field => !formData[field]?.trim());

// //         if (missingFields.length > 0) {
// //             alert(`Please fill all required fields: ${missingFields.join(', ')}`);
// //             return;
// //         }

// //         try {
// //             const method = editingUser ? "PUT" : "POST";
// //             const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

// //             const response = await fetch(url, {
// //                 method,
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(formData)
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 alert(data.message || "Failed to save user");
// //                 return;
// //             }

// //             alert(data.message || "User saved successfully!");
// //             resetForm();
// //             fetchUsers(searchQuery);
// //         } catch (error) {
// //             console.error("Error saving user:", error);
// //             alert("Error saving user. Please try again.");
// //         }
// //     };

// //     /* ================= EDIT ================= */
// //     const handleEdit = (user) => {
// //         setEditingUser(user);
// //         setFormData({
// //             fullName: user.fullName,
// //             dateOfBirth: user.dateOfBirth,
// //             passportNumber: user.passportNumber,
// //             expiryDate: user.expiryDate,
// //             workField: user.workField,
// //             description: user.description || ""
// //         });
// //         setIsModalOpen(true);
// //     };

// //     /* ================= DELETE ================= */
// //     const handleDelete = async (id) => {
// //         if (!window.confirm("Delete this user?")) return;

// //         try {
// //             const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// //             const data = await response.json();
            
// //             if (response.ok) {
// //                 alert(data.message || "User deleted successfully!");
// //                 fetchUsers(searchQuery);
// //             } else {
// //                 alert(data.message || "Failed to delete user");
// //             }
// //         } catch (error) {
// //             console.error("Error deleting user:", error);
// //             alert("Failed to delete user");
// //         }
// //     };

// //     /* ================= GENERATE PDF CLIENT-SIDE ================= */
// //     const generatePDF = async (user) => {
// //         const { jsPDF } = window.jspdf;
// //         const doc = new jsPDF({
// //             orientation: 'portrait',
// //             unit: 'mm',
// //             format: 'a4'
// //         });

// //         const pageWidth = 210;
// //         const pageHeight = 297;
// //         const margin = 20;

// //         // Colors
// //         const redColor = [237, 28, 36];
// //         const blueColor = [0, 32, 91];

// //         // Page 1
// //         // Top border design
// //         doc.setFillColor(...redColor);
// //         doc.rect(0, 0, pageWidth / 2, 15, 'F');
// //         doc.setFillColor(...blueColor);
// //         doc.rect(pageWidth / 2, 0, pageWidth / 2, 15, 'F');

// //         // Canada flag and text
// //         doc.setFontSize(10);
// //         doc.setTextColor(0, 0, 0);
// //         doc.text("🍁", 25, 20);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("CANADA", 30, 22);

// //         // Header right
// //         doc.setFontSize(8);
// //         doc.setFont("helvetica", "normal");
// //         doc.text("3202 Garanville ST Vascuver", pageWidth - 70, 18);
// //         doc.text("BC V6H 3R8 CANADA", pageWidth - 70, 22);

// //         // AG Foods logo placeholder
// //         doc.setFontSize(12);
// //         doc.setFont("helvetica", "bold");
// //         doc.setTextColor(100, 180, 50);
// //         doc.text("AGfoods", pageWidth - 35, 30);

// //         // Main content
// //         doc.setTextColor(0, 0, 0);
// //         doc.setFontSize(10);
// //         doc.setFont("helvetica", "bold");
        
// //         let y = 50;
// //         doc.text("(6) Non-Competition and Confidentiality", margin, y);
        
// //         y += 8;
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(9);
// //         const text1 = "In the employment or any time thereafter you are not permitted to access any confidential information that is the property of the Employer. You are not permitted to disclose this information outside the Company.";
// //         const splitText1 = doc.splitTextToSize(text1, pageWidth - 2 * margin);
// //         doc.text(splitText1, margin, y);
// //         y += splitText1.length * 5;

// //         y += 3;
// //         const text2 = "During your time of Employment with the Employer, you may not engage in any work for another Employer that is related or in competition with the Company. You will fully disclose to your Employer any other Employment relationships you have and you will promptly notify the employer should other employment provide that job is close to or shares from your duties fulfill your duties: and (b) you are not entering another organization in competing with the employer.";
// //         const splitText2 = doc.splitTextToSize(text2, pageWidth - 2 * margin);
// //         doc.text(splitText2, margin, y);
// //         y += splitText2.length * 5;

// //         y += 3;
// //         const text3 = "It is further acknowledged that this information is proprietary or confidential in nature and you will not disclose this information to any of the Employer's clients for a period of at least 03 Years.";
// //         const splitText3 = doc.splitTextToSize(text3, pageWidth - 2 * margin);
// //         doc.text(splitText3, margin, y);
// //         y += splitText3.length * 5;

// //         y += 8;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("(6) Entirety", margin, y);
        
// //         y += 6;
// //         doc.setFont("helvetica", "normal");
// //         const text4 = "This contract represents the entire agreement between the two parties and supercedes any previous written or oral agreement. This agreement may be modified at any time provided the written consent of both the Employer and the Employee.";
// //         const splitText4 = doc.splitTextToSize(text4, pageWidth - 2 * margin);
// //         doc.text(splitText4, margin, y);
// //         y += splitText4.length * 5;

// //         y += 8;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("(7) Legal Authorization", margin, y);
        
// //         y += 6;
// //         doc.setFont("helvetica", "normal");
// //         const text5 = "The Employee agrees that he or she shall be authorized to work in MEINHARDT FINE FOODS and can provide proof of this with legal documentation. This documentation will be obtain by the Employer for legal records.";
// //         const splitText5 = doc.splitTextToSize(text5, pageWidth - 2 * margin);
// //         doc.text(splitText5, margin, y);
// //         y += splitText5.length * 5;

// //         y += 8;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("(8) Severability", margin, y);
        
// //         y += 6;
// //         doc.setFont("helvetica", "normal");
// //         const text6 = "The parties agreed that, if any portion of this contract is found to be void or unenforceable, it shall be struck from the contract and the remaining provisions of the contract shall remain valid and enforceable.";
// //         const splitText6 = doc.splitTextToSize(text6, pageWidth - 2 * margin);
// //         doc.text(splitText6, margin, y);
// //         y += splitText6.length * 5;

// //         y += 8;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("(8) Jurisdiction", margin, y);
        
// //         y += 6;
// //         doc.setFont("helvetica", "normal");
// //         const text7 = "This contract shall be governed, interpreted and construed in accordance with the laws of MEINHARDT FINE FOODS. In return and you agree that the Employer the Employee has executed this contract in the appropriate through the authorization of official agent and with the consent of the Employee given here in writing.";
// //         const splitText7 = doc.splitTextToSize(text7, pageWidth - 2 * margin);
// //         doc.text(splitText7, margin, y);
// //         y += splitText7.length * 5;

// //         // Signatures
// //         y += 15;
// //         doc.setFontSize(8);
// //         doc.text("General Manager Signature", margin + 10, y);
// //         doc.text("Employment signature", pageWidth - margin - 50, y);
        
// //         y += 8;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("Grayson Jackson", margin + 10, y);

// //         // Bottom border
// //         doc.setFillColor(...redColor);
// //         doc.rect(0, pageHeight - 15, pageWidth / 2, 15, 'F');
// //         doc.setFillColor(...blueColor);
// //         doc.rect(pageWidth / 2, pageHeight - 15, pageWidth / 2, 15, 'F');
        
// //         doc.setTextColor(255, 255, 255);
// //         doc.setFontSize(14);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

// //         // Page 2
// //         doc.addPage();

// //         // Top border
// //         doc.setFillColor(...redColor);
// //         doc.rect(0, 0, pageWidth / 2, 15, 'F');
// //         doc.setFillColor(...blueColor);
// //         doc.rect(pageWidth / 2, 0, pageWidth / 2, 15, 'F');
// //         doc.setTextColor(255, 255, 255);
// //         doc.setFontSize(14);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

// //         // AG Foods logo
// //         doc.setTextColor(100, 180, 50);
// //         doc.setFontSize(12);
// //         doc.text("AGfoods", pageWidth - 35, 25);

// //         // Canada flag
// //         doc.setTextColor(0, 0, 0);
// //         doc.setFontSize(10);
// //         doc.text("🍁", 25, 30);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("CANADA", 30, 32);

// //         // Schedule 1 Header
// //         doc.setFontSize(11);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("SCHEDULE 1", pageWidth / 2, 45, { align: 'center' });
// //         doc.text("JOB OFFER LETTER", pageWidth / 2, 51, { align: 'center' });
        
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(9);
// //         doc.text("BETWEEN", pageWidth / 2, 57, { align: 'center' });
// //         doc.setFont("helvetica", "bold");
// //         doc.text("MEINHARDT FINE FOODS", pageWidth / 2, 62, { align: 'center' });
// //         doc.setFont("helvetica", "normal");
// //         doc.text("AND", pageWidth / 2, 68, { align: 'center' });

// //         // Employee name with underline
// //         doc.setFont("helvetica", "bold");
// //         doc.setFontSize(10);
// //         const nameY = 75;
// //         const nameText = `${user.fullName}masloon22-12-2025`;
// //         doc.text(nameText, pageWidth / 2, nameY, { align: 'center' });
// //         doc.line(pageWidth / 2 - 50, nameY + 1, pageWidth / 2 + 50, nameY + 1);

// //         // Employee details
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(9);
// //         doc.text(user.fullName.toUpperCase(), pageWidth / 2, 82, { align: 'center' });
// //         doc.text("Having Nationality of PAK", pageWidth / 2, 87, { align: 'center' });

// //         // Passport number
// //         doc.setFont("helvetica", "bold");
// //         doc.text(`PASSPORT NUMBER-${user.passportNumber}`, pageWidth / 2, 95, { align: 'center' });

// //         // Job details
// //         y = 105;
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(9);
// //         doc.text("1.  JOB TITLE AND PLACE OF WORK", margin, y);
// //         y += 5;
// //         doc.text(`You Will employed in the position of ${user.workField} Your normal place of Work Will`, margin + 5, y);
// //         y += 4;
// //         doc.text("be  CANADA MEINHARDT FINE FOODS", margin + 5, y);
        
// //         y += 6;
// //         doc.text("2.  CONTRACT TERM", margin, y);
// //         y += 5;
// //         doc.text("The term of this contract shall be limited or unlimited and Company shall employ you commencing", margin + 5, y);
// //         y += 4;
// //         doc.text("on or around the 1st September 2025.", margin + 5, y);

// //         y += 6;
// //         doc.text("3.  REMUNERATION", margin, y);

// //         // Remuneration table
// //         y += 5;
// //         const tableData = [
// //             ["Gross Salary", "3500$Canadian Dollars"],
// //             ["Period of contract", "2 Year's renewable"],
// //             ["Accommodations", "Provided by the company"],
// //             ["Meal allowance", "Provided by the company"],
// //             ["Transportation Allowance", "Provided by the company"],
// //             ["Food", "In accordance to Canadian labour Laws"],
// //             ["Medical / Insurance", "In accordance to Canadian labour Laws"],
// //             ["Leave Benefits", "In accordance Canadian labour Law"],
// //             ["Over Time", "As per law"]
// //         ];

// //         const startX = margin + 5;
// //         const col1Width = 60;
// //         const col2Width = 70;
// //         const rowHeight = 6;

// //         tableData.forEach((row, i) => {
// //             doc.text(row[0], startX, y);
// //             doc.text(row[1], startX + col1Width, y);
// //             y += rowHeight;
// //         });

// //         // Hours of work
// //         y += 5;
// //         doc.setFont("helvetica", "bold");
// //         doc.text("Hours of Work", margin, y);
// //         y += 5;
// //         doc.setFont("helvetica", "normal");
// //         doc.setFontSize(8);
        
// //         const hoursText = user.description || "Your hours shall be eight (8) hours per day up to 6 days per week. With a one (1) hour lunch break, you are however expected to work such hours As may be necessary to adequately perform your duties.";
// //         const splitHours = doc.splitTextToSize(hoursText, pageWidth - 2 * margin);
// //         doc.text(splitHours, margin, y);
// //         y += splitHours.length * 4;

// //         // Signature area
// //         y = pageHeight - 50;
// //         doc.setFontSize(9);
// //         doc.setFont("helvetica", "bold");
// //         doc.text("SIGNATURE__________", pageWidth / 2, y, { align: 'center' });
// //         y += 5;
// //         doc.text("THUMB", pageWidth / 2, y, { align: 'center' });

// //         // Bottom border
// //         doc.setFillColor(...redColor);
// //         doc.rect(0, pageHeight - 15, pageWidth / 2, 15, 'F');
// //         doc.setFillColor(...blueColor);
// //         doc.rect(pageWidth / 2, pageHeight - 15, pageWidth / 2, 15, 'F');
// //         doc.setTextColor(255, 255, 255);
// //         doc.setFontSize(14);
// //         doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

// //         // Save PDF
// //         doc.save(`${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`);
// //     };

// //     /* ================= LOAD JSPDF ================= */
// //     useEffect(() => {
// //         const script = document.createElement('script');
// //         script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
// //         script.async = true;
// //         document.body.appendChild(script);
// //         return () => document.body.removeChild(script);
// //     }, []);

// //     /* ================= SEARCH ================= */
// //     useEffect(() => {
// //         const delay = setTimeout(() => {
// //             fetchUsers(searchQuery);
// //         }, 300);
// //         return () => clearTimeout(delay);
// //     }, [searchQuery]);

// //     return (
// //         <div className="min-h-screen bg-gray-100 flex">
// //             {/* ================= SIDEBAR ================= */}
// //             <motion.aside
// //                 initial={{ x: -300 }}
// //                 animate={{ x: isSidebarOpen ? 0 : -300 }}
// //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //                 className="fixed lg:static w-64 bg-green-900 text-white h-screen z-50 shadow-xl"
// //             >
// //                 <div className="p-6">
// //                     <h2 className="text-2xl font-bold">AG Foods</h2>
// //                     <p className="text-sm text-green-300 mb-10">Admin Panel</p>

// //                     <nav className="space-y-4">
// //                         <button className="flex items-center gap-3 bg-green-800 hover:bg-green-700 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <Users size={20} />
// //                             <span>User Management</span>
// //                         </button>
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <Briefcase size={20} />
// //                             <span>Job Applications</span>
// //                         </button>
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <FileText size={20} />
// //                             <span>Reports</span>
// //                         </button>
// //                     </nav>

// //                     <div className="absolute bottom-6 left-6 right-6">
// //                         <button className="flex items-center gap-3 hover:bg-green-800 px-4 py-3 rounded-lg w-full transition-colors">
// //                             <LogOut size={20} />
// //                             <span>Logout</span>
// //                         </button>
// //                     </div>
// //                 </div>
// //             </motion.aside>

// //             {/* ================= MAIN CONTENT ================= */}
// //             <div className="flex-1 flex flex-col">
// //                 {/* HEADER */}
// //                 <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
// //                     <button
// //                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //                         className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
// //                     >
// //                         <Menu size={24} />
// //                     </button>
// //                     <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
// //                     <div className="flex items-center gap-3">
// //                         <button className="p-2 hover:bg-gray-100 rounded-lg">
// //                             <User size={20} />
// //                         </button>
// //                     </div>
// //                 </header>

// //                 {/* SEARCH + ADD BUTTON */}
// //                 <div className="p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
// //                     <div className="relative max-w-md w-full">
// //                         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
// //                         <input
// //                             className="pl-10 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                             placeholder="Search by name, passport, or work field..."
// //                             value={searchQuery}
// //                             onChange={e => setSearchQuery(e.target.value)}
// //                         />
// //                     </div>

// //                     <button
// //                         onClick={() => setIsModalOpen(true)}
// //                         className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
// //                     >
// //                         <Plus size={20} /> Add New User
// //                     </button>
// //                 </div>

// //                 {/* USERS GRID */}
// //                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
// //                     {loading ? (
// //                         <div className="col-span-full flex justify-center items-center h-64">
// //                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// //                         </div>
// //                     ) : users.length === 0 ? (
// //                         <div className="col-span-full text-center py-12">
// //                             <FileText className="mx-auto text-gray-400 mb-4" size={48} />
// //                             <p className="text-gray-500 text-lg">No users found</p>
// //                             {searchQuery && (
// //                                 <p className="text-gray-400">Try a different search term</p>
// //                             )}
// //                         </div>
// //                     ) : (
// //                         users.map(user => (
// //                             <motion.div
// //                                 key={user._id}
// //                                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
// //                                 initial={{ opacity: 0, y: 20 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 transition={{ duration: 0.3 }}
// //                             >
// //                                 <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
// //                                     <h3 className="font-bold text-lg truncate">{user.fullName}</h3>
// //                                     <div className="flex items-center gap-2 mt-1">
// //                                         <Briefcase size={14} />
// //                                         <p className="text-sm opacity-90">{user.workField}</p>
// //                                     </div>
// //                                 </div>

// //                                 <div className="p-4 space-y-3">
// //                                     <div className="flex items-center gap-2 text-sm">
// //                                         <Calendar className="text-gray-500" size={16} />
// //                                         <span className="font-medium">DOB:</span>
// //                                         <span>{user.dateOfBirth}</span>
// //                                     </div>

// //                                     <div className="flex items-center gap-2 text-sm">
// //                                         <CreditCard className="text-gray-500" size={16} />
// //                                         <span className="font-medium">Passport:</span>
// //                                         <span className="font-mono">{user.passportNumber}</span>
// //                                     </div>

// //                                     <div className="text-sm">
// //                                         <span className="font-medium">Expiry:</span>
// //                                         <span className={`ml-2 ${new Date(user.expiryDate) < new Date() ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
// //                                             {user.expiryDate}
// //                                         </span>
// //                                     </div>

// //                                     {user.description && (
// //                                         <div className="pt-2 border-t border-gray-100">
// //                                             <p className="text-gray-600 text-sm line-clamp-2">{user.description}</p>
// //                                         </div>
// //                                     )}

// //                                     <div className="flex gap-2 pt-4">
// //                                         <button
// //                                             onClick={() => handleEdit(user)}
// //                                             className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Edit2 size={16} /> Edit
// //                                         </button>
// //                                         <button
// //                                             onClick={() => generatePDF(user)}
// //                                             className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Download size={16} /> PDF
// //                                         </button>
// //                                         <button
// //                                             onClick={() => handleDelete(user._id)}
// //                                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
// //                                         >
// //                                             <Trash2 size={16} /> Delete
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </motion.div>
// //                         ))
// //                     )}
// //                 </div>

// //                 {/* USER COUNT */}
// //                 {!loading && users.length > 0 && (
// //                     <div className="px-6 pb-6">
// //                         <p className="text-gray-500 text-sm">
// //                             Showing {users.length} user{users.length !== 1 ? 's' : ''}
// //                         </p>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* ================= ADD/EDIT USER MODAL ================= */}
// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //                     <motion.div
// //                         className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
// //                         initial={{ scale: 0.9, opacity: 0 }}
// //                         animate={{ scale: 1, opacity: 1 }}
// //                         transition={{ type: "spring", damping: 25 }}
// //                     >
// //                         <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
// //                             <h2 className="text-2xl font-bold text-gray-800">
// //                                 {editingUser ? "Edit User" : "Add New User"}
// //                             </h2>
// //                             <button
// //                                 onClick={resetForm}
// //                                 className="p-2 hover:bg-gray-100 rounded-lg"
// //                             >
// //                                 <X size={24} />
// //                             </button>
// //                         </div>

// //                         <div className="p-6">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 {Object.keys(formData).map(key => {
// //                                     if (key === "workField") {
// //                                         return (
// //                                             <div key={key} className="md:col-span-2">
// //                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                                     Description (Hours of Work)
// //                                                 </label>
// //                                                 <textarea
// //                                                     name={key}
// //                                                     value={formData[key]}
// //                                                     onChange={handleInputChange}
// //                                                     placeholder="Enter hours of work description..."
// //                                                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent h-32"
// //                                                     rows={4}
// //                                                 />
// //                                             </div>
// //                                         );
// //                                     }

// //                                     return (
// //                                         <div key={key}>
// //                                             <label className="block text-sm font-medium text-gray-700 mb-1">
// //                                                 {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} *
// //                                             </label>
// //                                             <input
// //                                                 type={key.includes("Date") ? "date" : "text"}
// //                                                 name={key}
// //                                                 value={formData[key]}
// //                                                 onChange={handleInputChange}
// //                                                 placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
// //                                                 className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     );
// //                                 })}
// //                             </div>

// //                             <div className="flex gap-3 mt-8 pt-6 border-t">
// //                                 <button
// //                                     onClick={resetForm}
// //                                     className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg transition-colors"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     onClick={handleSubmit}
// //                                     className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
// //                                 >
// //                                     <Save size={20} />
// //                                     {editingUser ? "Update User" : "Save User"}
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </motion.div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//     Users, Plus, Edit2, Trash2, Search, X, Save,
//     FileText, Calendar, CreditCard, Briefcase, Menu,
//     User, LogOut, Download
// } from "lucide-react";
// import stampApproved from '../assets/approvedStmp.jpg';
// import stampApproved2 from '../assets/approvedStmp.jpg';

// const API_URL = "http://localhost:5000/api/users";

// export default function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingUser, setEditingUser] = useState(null);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
//     const handleSubmit = async () => {
//         const requiredFields = ['fullName', 'dateOfBirth', 'passportNumber', 'expiryDate', 'workField'];
//         const missingFields = requiredFields.filter(field => !formData[field]?.trim());

//         if (missingFields.length > 0) {
//             alert(`Please fill all required fields: ${missingFields.join(', ')}`);
//             return;
//         }

//         try {
//             const method = editingUser ? "PUT" : "POST";
//             const url = editingUser ? `${API_URL}/${editingUser._id}` : API_URL;

//             const response = await fetch(url, {
//                 method,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 alert(data.message || "Failed to save user");
//                 return;
//             }

//             alert(data.message || "User saved successfully!");
//             resetForm();
//             fetchUsers(searchQuery);
//         } catch (error) {
//             console.error("Error saving user:", error);
//             alert("Error saving user. Please try again.");
//         }
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
//             const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//             const data = await response.json();
            
//             if (response.ok) {
//                 alert(data.message || "User deleted successfully!");
//                 fetchUsers(searchQuery);
//             } else {
//                 alert(data.message || "Failed to delete user");
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             alert("Failed to delete user");
//         }
//     };

//     /* ================= GENERATE PDF CLIENT-SIDE ================= */
//     // const generatePDF = async (user) => {
//     //     const { jsPDF } = window.jspdf;
//     //     const doc = new jsPDF({
//     //         orientation: 'portrait',
//     //         unit: 'mm',
//     //         format: 'a4'
//     //     });

//     //     const pageWidth = 210;
//     //     const pageHeight = 297;
//     //     const margin = 20;

//     //     // Colors
//     //     const redColor = [237, 28, 36];
//     //     const blueColor = [0, 32, 91];

//     //     // Function to add images
//     //     const addImage = async (imgUrl, x, y, width, height) => {
//     //         try {
//     //             const img = new Image();
//     //             img.src = imgUrl;
//     //             await new Promise((resolve) => {
//     //                 img.onload = () => {
//     //                     doc.addImage(img, 'PNG', x, y, width, height);
//     //                     resolve();
//     //                 };
//     //                 img.onerror = () => resolve();
//     //             });
//     //         } catch (error) {
//     //             console.log('Image not loaded:', imgUrl);
//     //         }
//     //     };

//     //     // Page 1 (Originally page 2)
//     //     // Top border design
//     //     doc.setFillColor(...redColor);
//     //     doc.rect(0, 0, pageWidth / 2, 15, 'F');
//     //     doc.setFillColor(...blueColor);
//     //     doc.rect(pageWidth / 2, 0, pageWidth / 2, 15, 'F');
//     //     doc.setTextColor(255, 255, 255);
//     //     doc.setFontSize(14);
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

//     //     // Canada flag image
//     //     await addImage(
//     //         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
//     //         25, 22, 15, 10
//     //     );

//     //     // AG Foods logo
//     //     await addImage(
//     //         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//     //         pageWidth - 45, 20, 30, 15
//     //     );

//     //     // Profile picture
//     //     // const profilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=200`;
//     //     // await addImage(
//     //     //     profilePicUrl,
//     //     //     pageWidth - 65, 40, 40, 40
//     //     // );

//     //     // Generate QR Code for profile
//     //     const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=https://www.google.com/search?q=${encodeURIComponent(user.fullName)}`;
//     //     await addImage(qrCodeUrl, pageWidth - 70, 85, 15, 15);

//     //     // Schedule 1 Header
//     //     doc.setTextColor(0, 0, 0);
//     //     doc.setFontSize(11);
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("SCHEDULE 1", pageWidth / 2, 45, { align: 'center' });
//     //     doc.text("JOB OFFER LETTER", pageWidth / 2, 51, { align: 'center' });
        
//     //     doc.setFont("helvetica", "normal");
//     //     doc.setFontSize(9);
//     //     doc.text("BETWEEN", pageWidth / 2, 57, { align: 'center' });
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("MEINHARDT FINE FOODS", pageWidth / 2, 62, { align: 'center' });
//     //     doc.setFont("helvetica", "normal");
//     //     doc.text("AND", pageWidth / 2, 68, { align: 'center' });

//     //     // Employee name with underline
//     //     doc.setFont("helvetica", "bold");
//     //     doc.setFontSize(10);
//     //     const nameY = 75;
//     //     const nameText = `${user.fullName}masloon22-12-2025`;
//     //     doc.text(nameText, pageWidth / 2, nameY, { align: 'center' });
//     //     doc.line(pageWidth / 2 - 50, nameY + 1, pageWidth / 2 + 50, nameY + 1);

//     //     // Employee details
//     //     doc.setFont("helvetica", "normal");
//     //     doc.setFontSize(9);
//     //     doc.text(user.fullName.toUpperCase(), pageWidth / 2, 82, { align: 'center' });
//     //     doc.text("Having Nationality of PAK", pageWidth / 2, 87, { align: 'center' });

//     //     // Passport number
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text(`PASSPORT NUMBER-${user.passportNumber}`, pageWidth / 2, 95, { align: 'center' });

//     //     // Job details with bold and underline
//     //     let y = 105;
        
//     //     // JOB TITLE AND PLACE OF WORK - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     doc.setFontSize(9);
//     //     const jobTitleText = "1.  JOB TITLE AND PLACE OF WORK";
//     //     doc.text(jobTitleText, margin, y);
//     //     // Underline
//     //     const textWidth = doc.getTextWidth(jobTitleText);
//     //     doc.line(margin, y + 0.5, margin + textWidth, y + 0.5);
        
//     //     y += 5;
//     //     doc.setFont("helvetica", "normal");
//     //     doc.text(`You Will employed in the position of ${user.workField} Your normal place of Work Will`, margin + 5, y);
//     //     y += 4;
//     //     doc.text("be  CANADA MEINHARDT FINE FOODS", margin + 5, y);
        
//     //     y += 8;
//     //     // CONTRACT TERM - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const contractTermText = "2.  CONTRACT TERM";
//     //     doc.text(contractTermText, margin, y);
//     //     const contractTextWidth = doc.getTextWidth(contractTermText);
//     //     doc.line(margin, y + 0.5, margin + contractTextWidth, y + 0.5);
        
//     //     y += 5;
//     //     doc.setFont("helvetica", "normal");
//     //     doc.text("The term of this contract shall be limited or unlimited and Company shall employ you commencing", margin + 5, y);
//     //     y += 4;
//     //     doc.text("on or around the 1st September 2025.", margin + 5, y);

//     //     y += 8;
//     //     // REMUNERATION - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const remunerationText = "3.  REMUNERATION";
//     //     doc.text(remunerationText, margin, y);
//     //     const remunerationTextWidth = doc.getTextWidth(remunerationText);
//     //     doc.line(margin, y + 0.5, margin + remunerationTextWidth, y + 0.5);

//     //     // Remuneration table
//     //     y += 5;
//     //     const tableData = [
//     //         ["Gross Salary", "3500$Canadian Dollars"],
//     //         ["Period of contract", "2 Year's renewable"],
//     //         ["Accommodations", "Provided by the company"],
//     //         ["Meal allowance", "Provided by the company"],
//     //         ["Transportation Allowance", "Provided by the company"],
//     //         ["Food", "In accordance to Canadian labour Laws"],
//     //         ["Medical / Insurance", "In accordance to Canadian labour Laws"],
//     //         ["Leave Benefits", "In accordance Canadian labour Law"],
//     //         ["Over Time", "As per law"]
//     //     ];

//     //     const startX = margin + 5;
//     //     const col1Width = 60;
//     //     const col2Width = 70;
//     //     const rowHeight = 6;

//     //     tableData.forEach((row, i) => {
//     //         doc.text(row[0], startX, y);
//     //         doc.text(row[1], startX + col1Width, y);
//     //         y += rowHeight;
//     //     });

//     //     // Hours of work - Bold and Underline
//     //     y += 5;
//     //     doc.setFont("helvetica", "bold");
//     //     const hoursTextTitle = "4.  Hours of Work";
//     //     doc.text(hoursTextTitle, margin, y);
//     //     const hoursTextWidth = doc.getTextWidth(hoursTextTitle);
//     //     doc.line(margin, y + 0.5, margin + hoursTextWidth, y + 0.5);
        
//     //     y += 5;
//     //     doc.setFont("helvetica", "normal");
//     //     doc.setFontSize(8);
        
//     //     const hoursText = user.description || "Your hours shall be eight (8) hours per day up to 6 days per week. With a one (1) hour lunch break, you are however expected to work such hours As may be necessary to adequately perform your duties.";
//     //     const splitHours = doc.splitTextToSize(hoursText, pageWidth - 2 * margin);
//     //     doc.text(splitHours, margin, y);
//     //     y += splitHours.length * 4;

//     //     // Signature area with approve stamps
//     //     y = pageHeight - 60;
        
//     //     // Left side - Approve stamp
//     //     await addImage(
//     //         'https://cdn-icons-png.flaticon.com/512/1828/1828640.png',
//     //         margin + 10, y - 15, 20, 20
//     //     );
        
//     //     doc.setFontSize(9);
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("SIGNATURE__________", margin + 30, y);
//     //     y += 5;
//     //     doc.text("THUMB", margin + 30, y);
        
//     //     // Right side - Approve stamp
//     //     await addImage(
//     //         'https://cdn-icons-png.flaticon.com/512/1828/1828640.png',
//     //         pageWidth - margin - 50, y - 20, 20, 20
//     //     );
        
//     //     doc.text("SIGNATURE__________", pageWidth - margin - 70, y);
//     //     y -= 5;
//     //     doc.text("THUMB", pageWidth - margin - 70, y);

//     //     // Bottom border
//     //     doc.setFillColor(...redColor);
//     //     doc.rect(0, pageHeight - 15, pageWidth / 2, 15, 'F');
//     //     doc.setFillColor(...blueColor);
//     //     doc.rect(pageWidth / 2, pageHeight - 15, pageWidth / 2, 15, 'F');
//     //     doc.setTextColor(255, 255, 255);
//     //     doc.setFontSize(14);
//     //     doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

//     //     // Page 2 (Originally page 1)
//     //     doc.addPage();

//     //     // Top border design
//     //     doc.setFillColor(...redColor);
//     //     doc.rect(0, 0, pageWidth / 2, 15, 'F');
//     //     doc.setFillColor(...blueColor);
//     //     doc.rect(pageWidth / 2, 0, pageWidth / 2, 15, 'F');

//     //     // Canada flag image
//     //     await addImage(
//     //         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
//     //         25, 20, 15, 10
//     //     );
        
//     //     doc.setFontSize(10);
//     //     doc.setTextColor(0, 0, 0);
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("CANADA", 42, 25);

//     //     // AG Foods logo
//     //     await addImage(
//     //         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//     //         pageWidth - 45, 25, 30, 15
//     //     );

//     //     // Header right
//     //     doc.setFontSize(8);
//     //     doc.setFont("helvetica", "normal");
//     //     doc.text("3202 Garanville ST Vascuver", pageWidth - 70, 18);
//     //     doc.text("BC V6H 3R8 CANADA", pageWidth - 70, 22);

//     //     // Main content
//     //     doc.setTextColor(0, 0, 0);
//     //     doc.setFontSize(10);
//     //     doc.setFont("helvetica", "bold");
        
//     //     let y2 = 50;
        
//     //     // (6) Non-Competition and Confidentiality - Bold and Underline
//     //     const nonCompText = "(6) Non-Competition and Confidentiality";
//     //     doc.text(nonCompText, margin, y2);
//     //     const nonCompWidth = doc.getTextWidth(nonCompText);
//     //     doc.line(margin, y2 + 0.5, margin + nonCompWidth, y2 + 0.5);
        
//     //     y2 += 8;
//     //     doc.setFont("helvetica", "normal");
//     //     doc.setFontSize(9);
//     //     const text1 = "In the employment or any time thereafter you are not permitted to access any confidential information that is the property of the Employer. You are not permitted to disclose this information outside the Company.";
//     //     const splitText1 = doc.splitTextToSize(text1, pageWidth - 2 * margin);
//     //     doc.text(splitText1, margin, y2);
//     //     y2 += splitText1.length * 5;

//     //     y2 += 3;
//     //     const text2 = "During your time of Employment with the Employer, you may not engage in any work for another Employer that is related or in competition with the Company. You will fully disclose to your Employer any other Employment relationships you have and you will promptly notify the employer should other employment provide that job is close to or shares from your duties fulfill your duties: and (b) you are not entering another organization in competing with the employer.";
//     //     const splitText2 = doc.splitTextToSize(text2, pageWidth - 2 * margin);
//     //     doc.text(splitText2, margin, y2);
//     //     y2 += splitText2.length * 5;

//     //     y2 += 3;
//     //     const text3 = "It is further acknowledged that this information is proprietary or confidential in nature and you will not disclose this information to any of the Employer's clients for a period of at least 03 Years.";
//     //     const splitText3 = doc.splitTextToSize(text3, pageWidth - 2 * margin);
//     //     doc.text(splitText3, margin, y2);
//     //     y2 += splitText3.length * 5;

//     //     y2 += 8;
//     //     // (6) Entirety - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const entiretyText = "(6) Entirety";
//     //     doc.text(entiretyText, margin, y2);
//     //     const entiretyWidth = doc.getTextWidth(entiretyText);
//     //     doc.line(margin, y2 + 0.5, margin + entiretyWidth, y2 + 0.5);
        
//     //     y2 += 6;
//     //     doc.setFont("helvetica", "normal");
//     //     const text4 = "This contract represents the entire agreement between the two parties and supercedes any previous written or oral agreement. This agreement may be modified at any time provided the written consent of both the Employer and the Employee.";
//     //     const splitText4 = doc.splitTextToSize(text4, pageWidth - 2 * margin);
//     //     doc.text(splitText4, margin, y2);
//     //     y2 += splitText4.length * 5;

//     //     y2 += 8;
//     //     // (7) Legal Authorization - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const legalAuthText = "(7) Legal Authorization";
//     //     doc.text(legalAuthText, margin, y2);
//     //     const legalAuthWidth = doc.getTextWidth(legalAuthText);
//     //     doc.line(margin, y2 + 0.5, margin + legalAuthWidth, y2 + 0.5);
        
//     //     y2 += 6;
//     //     doc.setFont("helvetica", "normal");
//     //     const text5 = "The Employee agrees that he or she shall be authorized to work in MEINHARDT FINE FOODS and can provide proof of this with legal documentation. This documentation will be obtain by the Employer for legal records.";
//     //     const splitText5 = doc.splitTextToSize(text5, pageWidth - 2 * margin);
//     //     doc.text(splitText5, margin, y2);
//     //     y2 += splitText5.length * 5;

//     //     y2 += 8;
//     //     // (8) Severability - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const severabilityText = "(8) Severability";
//     //     doc.text(severabilityText, margin, y2);
//     //     const severabilityWidth = doc.getTextWidth(severabilityText);
//     //     doc.line(margin, y2 + 0.5, margin + severabilityWidth, y2 + 0.5);
        
//     //     y2 += 6;
//     //     doc.setFont("helvetica", "normal");
//     //     const text6 = "The parties agreed that, if any portion of this contract is found to be void or unenforceable, it shall be struck from the contract and the remaining provisions of the contract shall remain valid and enforceable.";
//     //     const splitText6 = doc.splitTextToSize(text6, pageWidth - 2 * margin);
//     //     doc.text(splitText6, margin, y2);
//     //     y2 += splitText6.length * 5;

//     //     y2 += 8;
//     //     // (8) Jurisdiction - Bold and Underline
//     //     doc.setFont("helvetica", "bold");
//     //     const jurisdictionText = "(8) Jurisdiction";
//     //     doc.text(jurisdictionText, margin, y2);
//     //     const jurisdictionWidth = doc.getTextWidth(jurisdictionText);
//     //     doc.line(margin, y2 + 0.5, margin + jurisdictionWidth, y2 + 0.5);
        
//     //     y2 += 6;
//     //     doc.setFont("helvetica", "normal");
//     //     const text7 = "This contract shall be governed, interpreted and construed in accordance with the laws of MEINHARDT FINE FOODS. In return and you agree that the Employer the Employee has executed this contract in the appropriate through the authorization of official agent and with the consent of the Employee given here in writing.";
//     //     const splitText7 = doc.splitTextToSize(text7, pageWidth - 2 * margin);
//     //     doc.text(splitText7, margin, y2);
//     //     y2 += splitText7.length * 5;

//     //     // Signatures
//     //     y2 += 15;
//     //     doc.setFontSize(8);
//     //     doc.text("General Manager Signature", margin + 10, y2);
//     //     doc.text("Employment signature", pageWidth - margin - 50, y2);
        
//     //     y2 += 8;
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("Grayson Jackson", margin + 10, y2);

//     //     // Bottom border
//     //     doc.setFillColor(...redColor);
//     //     doc.rect(0, pageHeight - 15, pageWidth / 2, 15, 'F');
//     //     doc.setFillColor(...blueColor);
//     //     doc.rect(pageWidth / 2, pageHeight - 15, pageWidth / 2, 15, 'F');
        
//     //     doc.setTextColor(255, 255, 255);
//     //     doc.setFontSize(14);
//     //     doc.setFont("helvetica", "bold");
//     //     doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

//     //     // Save PDF
//     //     doc.save(`${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`);
//     // };

//     const generatePDF = async (user) => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//     });

//     const pageWidth = 210;
//     const pageHeight = 297;
//     const margin = 20;

//     // Colors - Only red color
//     const redColor = [237, 28, 36];

//     // Stamp variables - YOU CAN REPLACE THESE URLs WITH YOUR IMPORTED IMAGES
//     const stamp01 = `${stampApproved2}`; // Left stamp (checkmark)
//     const stamp02 = `${stampApproved}`; // Right stamp (approved)

//     // Function to add images
//     const addImage = async (imgUrl, x, y, width, height) => {
//         try {
//             const img = new Image();
//             img.src = imgUrl;
//             await new Promise((resolve) => {
//                 img.onload = () => {
//                     doc.addImage(img, 'PNG', x, y, width, height);
//                     resolve();
//                 };
//                 img.onerror = () => {
//                     console.log('Image failed to load:', imgUrl);
//                     resolve();
//                 };
//             });
//         } catch (error) {
//             console.log('Image loading error:', error);
//         }
//     };

//     // Page 1 (Job Offer Letter)
//     // Top border design - RED ONLY
//     doc.setFillColor(...redColor);
//     doc.rect(0, 0, pageWidth, 15, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

//     // Canada flag image
//     await addImage(
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
//         25, 22, 15, 10
//     );

//     // AG Foods logo
//     await addImage(
//         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//         pageWidth - 45, 20, 30, 15
//     );

//     // Profile picture
//     const profilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=200`;
//     await addImage(
//         profilePicUrl,
//         pageWidth - 65, 40, 40, 40
//     );

//     // Generate QR Code for profile
//     const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=https://www.google.com/search?q=${encodeURIComponent(user.fullName)}`;
//     await addImage(qrCodeUrl, pageWidth - 70, 85, 15, 15);

//     // Schedule 1 Header
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(11);
//     doc.setFont("helvetica", "bold");
//     doc.text("SCHEDULE 1", pageWidth / 2, 45, { align: 'center' });
//     doc.text("JOB OFFER LETTER", pageWidth / 2, 51, { align: 'center' });
    
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.text("BETWEEN", pageWidth / 2, 57, { align: 'center' });
//     doc.setFont("helvetica", "bold");
//     doc.text("MEINHARDT FINE FOODS", pageWidth / 2, 62, { align: 'center' });
//     doc.setFont("helvetica", "normal");
//     doc.text("AND", pageWidth / 2, 68, { align: 'center' });

//     // Employee name with underline
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(10);
//     const nameY = 75;
//     const nameText = `${user.fullName}masloon22-12-2025`;
//     doc.text(nameText, pageWidth / 2, nameY, { align: 'center' });
//     doc.line(pageWidth / 2 - 50, nameY + 1, pageWidth / 2 + 50, nameY + 1);

//     // Employee details
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     doc.text(user.fullName.toUpperCase(), pageWidth / 2, 82, { align: 'center' });
//     doc.text("Having Nationality of PAK", pageWidth / 2, 87, { align: 'center' });

//     // Passport number
//     doc.setFont("helvetica", "bold");
//     doc.text(`PASSPORT NUMBER-${user.passportNumber}`, pageWidth / 2, 95, { align: 'center' });

//     // Job details with bold and underline
//     let y = 105;
    
//     // JOB TITLE AND PLACE OF WORK - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(9);
//     const jobTitleText = "1.  JOB TITLE AND PLACE OF WORK";
//     doc.text(jobTitleText, margin, y);
//     // Underline
//     const textWidth = doc.getTextWidth(jobTitleText);
//     doc.line(margin, y + 0.5, margin + textWidth, y + 0.5);
    
//     y += 5;
//     doc.setFont("helvetica", "normal");
//     doc.text(`You Will employed in the position of ${user.workField} Your normal place of Work Will`, margin + 5, y);
//     y += 4;
//     doc.text("be  CANADA MEINHARDT FINE FOODS", margin + 5, y);
    
//     y += 8;
//     // CONTRACT TERM - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const contractTermText = "2.  CONTRACT TERM";
//     doc.text(contractTermText, margin, y);
//     const contractTextWidth = doc.getTextWidth(contractTermText);
//     doc.line(margin, y + 0.5, margin + contractTextWidth, y + 0.5);
    
//     y += 5;
//     doc.setFont("helvetica", "normal");
//     doc.text("The term of this contract shall be limited or unlimited and Company shall employ you commencing", margin + 5, y);
//     y += 4;
//     doc.text("on or around the 1st September 2025.", margin + 5, y);

//     y += 8;
//     // REMUNERATION - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const remunerationText = "3.  REMUNERATION";
//     doc.text(remunerationText, margin, y);
//     const remunerationTextWidth = doc.getTextWidth(remunerationText);
//     doc.line(margin, y + 0.5, margin + remunerationTextWidth, y + 0.5);

//     // Remuneration table
//     y += 5;
//     const tableData = [
//         ["Gross Salary", "3500$Canadian Dollars"],
//         ["Period of contract", "2 Year's renewable"],
//         ["Accommodations", "Provided by the company"],
//         ["Meal allowance", "Provided by the company"],
//         ["Transportation Allowance", "Provided by the company"],
//         ["Food", "In accordance to Canadian labour Laws"],
//         ["Medical / Insurance", "In accordance to Canadian labour Laws"],
//         ["Leave Benefits", "In accordance Canadian labour Law"],
//         ["Over Time", "As per law"]
//     ];

//     const startX = margin + 5;
//     const col1Width = 60;
//     const col2Width = 70;
//     const rowHeight = 6;

//     tableData.forEach((row, i) => {
//         doc.text(row[0], startX, y);
//         doc.text(row[1], startX + col1Width, y);
//         y += rowHeight;
//     });

//     // Hours of work - Bold and Underline
//     y += 5;
//     doc.setFont("helvetica", "bold");
//     const hoursTextTitle = "4.  Hours of Work";
//     doc.text(hoursTextTitle, margin, y);
//     const hoursTextWidth = doc.getTextWidth(hoursTextTitle);
//     doc.line(margin, y + 0.5, margin + hoursTextWidth, y + 0.5);
    
//     y += 5;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
    
//     const hoursText = user.description || "Your hours shall be eight (8) hours per day up to 6 days per week. With a one (1) hour lunch break, you are however expected to work such hours As may be necessary to adequately perform your duties.";
//     const splitHours = doc.splitTextToSize(hoursText, pageWidth - 2 * margin);
//     doc.text(splitHours, margin, y);
//     y += splitHours.length * 4;

//     // Signature area with approve stamps
//     y = pageHeight - 60;
    
//     // Left side - stamp01
//     await addImage(
//         stamp01,  // YOUR FIRST STAMP IMAGE
//         margin, y - 20, 25, 25
//     );
    
//     doc.setFontSize(9);
//     doc.setFont("helvetica", "bold");
//     doc.text("SIGNATURE__________", margin + 35, y);
//     y += 5;
//     doc.text("THUMB", margin + 35, y);
    
//     // Right side - stamp02
//     await addImage(
//         stamp02,  // YOUR SECOND STAMP IMAGE
//         pageWidth - margin - 60, y - 25, 25, 25
//     );
    
//     doc.text("SIGNATURE__________", pageWidth - margin - 80, y);
//     y -= 5;
//     doc.text("THUMB", pageWidth - margin - 80, y);

//     // Bottom border - RED ONLY
//     doc.setFillColor(...redColor);
//     doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

//     // Page 2 (Terms and Conditions)
//     doc.addPage();

//     // Top border design - RED ONLY
//     doc.setFillColor(...redColor);
//     doc.rect(0, 0, pageWidth, 15, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

//     // Canada flag image
//     await addImage(
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png',
//         25, 20, 15, 10
//     );
    
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.setFont("helvetica", "bold");
//     doc.text("CANADA", 42, 25);

//     // AG Foods logo
//     await addImage(
//         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
//         pageWidth - 45, 25, 30, 15
//     );

//     // Header right
//     doc.setFontSize(8);
//     doc.setFont("helvetica", "normal");
//     doc.text("3202 Garanville ST Vascuver", pageWidth - 70, 18);
//     doc.text("BC V6H 3R8 CANADA", pageWidth - 70, 22);

//     // Main content
//     doc.setTextColor(0, 0, 0);
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "bold");
    
//     let y2 = 50;
    
//     // (6) Non-Competition and Confidentiality - Bold and Underline
//     const nonCompText = "(6) Non-Competition and Confidentiality";
//     doc.text(nonCompText, margin, y2);
//     const nonCompWidth = doc.getTextWidth(nonCompText);
//     doc.line(margin, y2 + 0.5, margin + nonCompWidth, y2 + 0.5);
    
//     y2 += 8;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(9);
//     const text1 = "In the employment or any time thereafter you are not permitted to access any confidential information that is the property of the Employer. You are not permitted to disclose this information outside the Company.";
//     const splitText1 = doc.splitTextToSize(text1, pageWidth - 2 * margin);
//     doc.text(splitText1, margin, y2);
//     y2 += splitText1.length * 5;

//     y2 += 3;
//     const text2 = "During your time of Employment with the Employer, you may not engage in any work for another Employer that is related or in competition with the Company. You will fully disclose to your Employer any other Employment relationships you have and you will promptly notify the employer should other employment provide that job is close to or shares from your duties fulfill your duties: and (b) you are not entering another organization in competing with the employer.";
//     const splitText2 = doc.splitTextToSize(text2, pageWidth - 2 * margin);
//     doc.text(splitText2, margin, y2);
//     y2 += splitText2.length * 5;

//     y2 += 3;
//     const text3 = "It is further acknowledged that this information is proprietary or confidential in nature and you will not disclose this information to any of the Employer's clients for a period of at least 03 Years.";
//     const splitText3 = doc.splitTextToSize(text3, pageWidth - 2 * margin);
//     doc.text(splitText3, margin, y2);
//     y2 += splitText3.length * 5;

//     y2 += 8;
//     // (6) Entirety - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const entiretyText = "(6) Entirety";
//     doc.text(entiretyText, margin, y2);
//     const entiretyWidth = doc.getTextWidth(entiretyText);
//     doc.line(margin, y2 + 0.5, margin + entiretyWidth, y2 + 0.5);
    
//     y2 += 6;
//     doc.setFont("helvetica", "normal");
//     const text4 = "This contract represents the entire agreement between the two parties and supercedes any previous written or oral agreement. This agreement may be modified at any time provided the written consent of both the Employer and the Employee.";
//     const splitText4 = doc.splitTextToSize(text4, pageWidth - 2 * margin);
//     doc.text(splitText4, margin, y2);
//     y2 += splitText4.length * 5;

//     y2 += 8;
//     // (7) Legal Authorization - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const legalAuthText = "(7) Legal Authorization";
//     doc.text(legalAuthText, margin, y2);
//     const legalAuthWidth = doc.getTextWidth(legalAuthText);
//     doc.line(margin, y2 + 0.5, margin + legalAuthWidth, y2 + 0.5);
    
//     y2 += 6;
//     doc.setFont("helvetica", "normal");
//     const text5 = "The Employee agrees that he or she shall be authorized to work in MEINHARDT FINE FOODS and can provide proof of this with legal documentation. This documentation will be obtain by the Employer for legal records.";
//     const splitText5 = doc.splitTextToSize(text5, pageWidth - 2 * margin);
//     doc.text(splitText5, margin, y2);
//     y2 += splitText5.length * 5;

//     y2 += 8;
//     // (8) Severability - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const severabilityText = "(8) Severability";
//     doc.text(severabilityText, margin, y2);
//     const severabilityWidth = doc.getTextWidth(severabilityText);
//     doc.line(margin, y2 + 0.5, margin + severabilityWidth, y2 + 0.5);
    
//     y2 += 6;
//     doc.setFont("helvetica", "normal");
//     const text6 = "The parties agreed that, if any portion of this contract is found to be void or unenforceable, it shall be struck from the contract and the remaining provisions of the contract shall remain valid and enforceable.";
//     const splitText6 = doc.splitTextToSize(text6, pageWidth - 2 * margin);
//     doc.text(splitText6, margin, y2);
//     y2 += splitText6.length * 5;

//     y2 += 8;
//     // (8) Jurisdiction - Bold and Underline
//     doc.setFont("helvetica", "bold");
//     const jurisdictionText = "(8) Jurisdiction";
//     doc.text(jurisdictionText, margin, y2);
//     const jurisdictionWidth = doc.getTextWidth(jurisdictionText);
//     doc.line(margin, y2 + 0.5, margin + jurisdictionWidth, y2 + 0.5);
    
//     y2 += 6;
//     doc.setFont("helvetica", "normal");
//     const text7 = "This contract shall be governed, interpreted and construed in accordance with the laws of MEINHARDT FINE FOODS. In return and you agree that the Employer the Employee has executed this contract in the appropriate through the authorization of official agent and with the consent of the Employee given here in writing.";
//     const splitText7 = doc.splitTextToSize(text7, pageWidth - 2 * margin);
//     doc.text(splitText7, margin, y2);
//     y2 += splitText7.length * 5;

//     // Signatures
//     y2 += 15;
//     doc.setFontSize(8);
//     doc.text("General Manager Signature", margin + 10, y2);
//     doc.text("Employment signature", pageWidth - margin - 50, y2);
    
//     y2 += 8;
//     doc.setFont("helvetica", "bold");
//     doc.text("Grayson Jackson", margin + 10, y2);

//     // Bottom border - RED ONLY
//     doc.setFillColor(...redColor);
//     doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

//     // Save PDF
//     doc.save(`${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`);
// };
//     /* ================= LOAD JSPDF ================= */
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
//         script.async = true;
//         document.body.appendChild(script);
//         return () => document.body.removeChild(script);
//     }, []);

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
//                                             onClick={() => generatePDF(user)}
//                                             className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
//                                         >
//                                             <Download size={16} /> PDF
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
//                                                     Description (Hours of Work)
//                                                 </label>
//                                                 <textarea
//                                                     name={key}
//                                                     value={formData[key]}
//                                                     onChange={handleInputChange}
//                                                     placeholder="Enter hours of work description..."
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
import stampApproved from './assets/approvedStmp.jpg';
import stampApproved2 from './assets/approvedStmp.jpg';
import flag from './assets/flag.png';
import agFoods from './assets/AGFood.png';

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

    /* ================= CONVERT IMAGE TO BASE64 ================= */
    const getBase64Image = async (imgSrc) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = imgSrc;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
                console.log('Failed to load image:', imgSrc);
                resolve(null);
            };
        });
    };

    /* ================= GENERATE PDF CLIENT-SIDE ================= */
    const generatePDF = async (user) => {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            alert("PDF library not loaded. Please try again.");
            return;
        }

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 20;

        // Colors - Only red color
        const redColor = [237, 28, 36];

        // For now, use URLs. Replace with your imported images later
        const stamp01 = `${stampApproved}`;//'https://cdn-icons-png.flaticon.com/512/1828/1828640.png';
        const stamp02 = `${stampApproved2}`;//'https://cdn-icons-png.flaticon.com/512/3067/3067257.png';
        const canadaFlag = `${flag}`;//'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png';
        const agFoodsLogo = `${agFoods}` //'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';

        // Function to add images
        const addImage = async (imgUrl, x, y, width, height) => {
            try {
                const base64Img = await getBase64Image(imgUrl);
                if (base64Img) {
                    doc.addImage(base64Img, 'PNG', x, y, width, height);
                }
            } catch (error) {
                console.log('Image loading error:', error);
            }
        };

        // Page 1 (Job Offer Letter)
        // Top border design - RED ONLY
        doc.setFillColor(...redColor);
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

        // Canada flag image
        await addImage(canadaFlag, 25, 22, 15, 10);

        // AG Foods logo
        await addImage(agFoodsLogo, pageWidth - 45, 20, 30, 15);

        // Profile picture
        const profilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&size=200`;
        await addImage(profilePicUrl, pageWidth - 65, 40, 40, 40);

        // Generate QR Code for profile
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=https://www.google.com/search?q=${encodeURIComponent(user.fullName)}`;
        await addImage(qrCodeUrl, pageWidth - 70, 85, 15, 15);

        // Schedule 1 Header
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("SCHEDULE 1", pageWidth / 2, 45, { align: 'center' });
        doc.text("JOB OFFER LETTER", pageWidth / 2, 51, { align: 'center' });
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("BETWEEN", pageWidth / 2, 57, { align: 'center' });
        doc.setFont("helvetica", "bold");
        doc.text("MEINHARDT FINE FOODS", pageWidth / 2, 62, { align: 'center' });
        doc.setFont("helvetica", "normal");
        doc.text("AND", pageWidth / 2, 68, { align: 'center' });

        // Employee name with underline
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        const nameY = 75;
        const nameText = `${user.fullName}masloon22-12-2025`;
        doc.text(nameText, pageWidth / 2, nameY, { align: 'center' });
        doc.line(pageWidth / 2 - 50, nameY + 1, pageWidth / 2 + 50, nameY + 1);

        // Employee details
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(user.fullName.toUpperCase(), pageWidth / 2, 82, { align: 'center' });
        doc.text("Having Nationality of PAK", pageWidth / 2, 87, { align: 'center' });

        // Passport number
        doc.setFont("helvetica", "bold");
        doc.text(`PASSPORT NUMBER-${user.passportNumber}`, pageWidth / 2, 95, { align: 'center' });

        // Job details with bold and underline
        let y = 105;
        
        // JOB TITLE AND PLACE OF WORK - Bold and Underline
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        const jobTitleText = "1.  JOB TITLE AND PLACE OF WORK";
        doc.text(jobTitleText, margin, y);
        // Underline
        const textWidth = doc.getTextWidth(jobTitleText);
        doc.line(margin, y + 0.5, margin + textWidth, y + 0.5);
        
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(`You Will employed in the position of ${user.workField} Your normal place of Work Will`, margin + 5, y);
        y += 4;
        doc.text("be  CANADA MEINHARDT FINE FOODS", margin + 5, y);
        
        y += 8;
        // CONTRACT TERM - Bold and Underline
        doc.setFont("helvetica", "bold");
        const contractTermText = "2.  CONTRACT TERM";
        doc.text(contractTermText, margin, y);
        const contractTextWidth = doc.getTextWidth(contractTermText);
        doc.line(margin, y + 0.5, margin + contractTextWidth, y + 0.5);
        
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text("The term of this contract shall be limited or unlimited and Company shall employ you commencing", margin + 5, y);
        y += 4;
        doc.text("on or around the 1st September 2025.", margin + 5, y);

        y += 8;
        // REMUNERATION - Bold and Underline
        doc.setFont("helvetica", "bold");
        const remunerationText = "3.  REMUNERATION";
        doc.text(remunerationText, margin, y);
        const remunerationTextWidth = doc.getTextWidth(remunerationText);
        doc.line(margin, y + 0.5, margin + remunerationTextWidth, y + 0.5);

        // Remuneration table
        y += 5;
        const tableData = [
            ["Gross Salary", "3500$Canadian Dollars"],
            ["Period of contract", "2 Year's renewable"],
            ["Accommodations", "Provided by the company"],
            ["Meal allowance", "Provided by the company"],
            ["Transportation Allowance", "Provided by the company"],
            ["Food", "In accordance to Canadian labour Laws"],
            ["Medical / Insurance", "In accordance to Canadian labour Laws"],
            ["Leave Benefits", "In accordance Canadian labour Law"],
            ["Over Time", "As per law"]
        ];

        const startX = margin + 5;
        const col1Width = 60;
        const col2Width = 70;
        const rowHeight = 6;

        tableData.forEach((row, i) => {
            doc.text(row[0], startX, y);
            doc.text(row[1], startX + col1Width, y);
            y += rowHeight;
        });

        // Hours of work - Bold and Underline
        y += 5;
        doc.setFont("helvetica", "bold");
        const hoursTextTitle = "4.  Hours of Work";
        doc.text(hoursTextTitle, margin, y);
        const hoursTextWidth = doc.getTextWidth(hoursTextTitle);
        doc.line(margin, y + 0.5, margin + hoursTextWidth, y + 0.5);
        
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        
        const hoursText = user.description || "Your hours shall be eight (8) hours per day up to 6 days per week. With a one (1) hour lunch break, you are however expected to work such hours As may be necessary to adequately perform your duties.";
        const splitHours = doc.splitTextToSize(hoursText, pageWidth - 2 * margin);
        doc.text(splitHours, margin, y);
        y += splitHours.length * 4;

        // Signature area with approve stamps
        y = pageHeight - 60;
        
        // Left side - stamp01
        await addImage(stamp01, margin, y - 20, 25, 25);
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("SIGNATURE__________", margin + 35, y);
        y += 5;
        doc.text("THUMB", margin + 35, y);
        
        // Right side - stamp02
        await addImage(stamp02, pageWidth - margin - 60, y - 25, 25, 25);
        
        doc.text("SIGNATURE__________", pageWidth - margin - 80, y);
        y -= 5;
        doc.text("THUMB", pageWidth - margin - 80, y);

        // Bottom border - RED ONLY
        doc.setFillColor(...redColor);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

        // Page 2 (Terms and Conditions)
        doc.addPage();

        // Top border design - RED ONLY
        doc.setFillColor(...redColor);
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CANADA", pageWidth / 2, 10, { align: 'center' });

        // Canada flag image
        await addImage(canadaFlag, 25, 20, 15, 10);
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("CANADA", 42, 25);

        // AG Foods logo
        await addImage(agFoodsLogo, pageWidth - 45, 25, 30, 15);

        // Header right
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("3202 Garanville ST Vascuver", pageWidth - 70, 18);
        doc.text("BC V6H 3R8 CANADA", pageWidth - 70, 22);

        // Main content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        
        let y2 = 50;
        
        // (6) Non-Competition and Confidentiality - Bold and Underline
        const nonCompText = "(6) Non-Competition and Confidentiality";
        doc.text(nonCompText, margin, y2);
        const nonCompWidth = doc.getTextWidth(nonCompText);
        doc.line(margin, y2 + 0.5, margin + nonCompWidth, y2 + 0.5);
        
        y2 += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const text1 = "In the employment or any time thereafter you are not permitted to access any confidential information that is the property of the Employer. You are not permitted to disclose this information outside the Company.";
        const splitText1 = doc.splitTextToSize(text1, pageWidth - 2 * margin);
        doc.text(splitText1, margin, y2);
        y2 += splitText1.length * 5;

        y2 += 3;
        const text2 = "During your time of Employment with the Employer, you may not engage in any work for another Employer that is related or in competition with the Company. You will fully disclose to your Employer any other Employment relationships you have and you will promptly notify the employer should other employment provide that job is close to or shares from your duties fulfill your duties: and (b) you are not entering another organization in competing with the employer.";
        const splitText2 = doc.splitTextToSize(text2, pageWidth - 2 * margin);
        doc.text(splitText2, margin, y2);
        y2 += splitText2.length * 5;

        y2 += 3;
        const text3 = "It is further acknowledged that this information is proprietary or confidential in nature and you will not disclose this information to any of the Employer's clients for a period of at least 03 Years.";
        const splitText3 = doc.splitTextToSize(text3, pageWidth - 2 * margin);
        doc.text(splitText3, margin, y2);
        y2 += splitText3.length * 5;

        y2 += 8;
        // (6) Entirety - Bold and Underline
        doc.setFont("helvetica", "bold");
        const entiretyText = "(6) Entirety";
        doc.text(entiretyText, margin, y2);
        const entiretyWidth = doc.getTextWidth(entiretyText);
        doc.line(margin, y2 + 0.5, margin + entiretyWidth, y2 + 0.5);
        
        y2 += 6;
        doc.setFont("helvetica", "normal");
        const text4 = "This contract represents the entire agreement between the two parties and supercedes any previous written or oral agreement. This agreement may be modified at any time provided the written consent of both the Employer and the Employee.";
        const splitText4 = doc.splitTextToSize(text4, pageWidth - 2 * margin);
        doc.text(splitText4, margin, y2);
        y2 += splitText4.length * 5;

        y2 += 8;
        // (7) Legal Authorization - Bold and Underline
        doc.setFont("helvetica", "bold");
        const legalAuthText = "(7) Legal Authorization";
        doc.text(legalAuthText, margin, y2);
        const legalAuthWidth = doc.getTextWidth(legalAuthText);
        doc.line(margin, y2 + 0.5, margin + legalAuthWidth, y2 + 0.5);
        
        y2 += 6;
        doc.setFont("helvetica", "normal");
        const text5 = "The Employee agrees that he or she shall be authorized to work in MEINHARDT FINE FOODS and can provide proof of this with legal documentation. This documentation will be obtain by the Employer for legal records.";
        const splitText5 = doc.splitTextToSize(text5, pageWidth - 2 * margin);
        doc.text(splitText5, margin, y2);
        y2 += splitText5.length * 5;

        y2 += 8;
        // (8) Severability - Bold and Underline
        doc.setFont("helvetica", "bold");
        const severabilityText = "(8) Severability";
        doc.text(severabilityText, margin, y2);
        const severabilityWidth = doc.getTextWidth(severabilityText);
        doc.line(margin, y2 + 0.5, margin + severabilityWidth, y2 + 0.5);
        
        y2 += 6;
        doc.setFont("helvetica", "normal");
        const text6 = "The parties agreed that, if any portion of this contract is found to be void or unenforceable, it shall be struck from the contract and the remaining provisions of the contract shall remain valid and enforceable.";
        const splitText6 = doc.splitTextToSize(text6, pageWidth - 2 * margin);
        doc.text(splitText6, margin, y2);
        y2 += splitText6.length * 5;

        y2 += 8;
        // (8) Jurisdiction - Bold and Underline
        doc.setFont("helvetica", "bold");
        const jurisdictionText = "(8) Jurisdiction";
        doc.text(jurisdictionText, margin, y2);
        const jurisdictionWidth = doc.getTextWidth(jurisdictionText);
        doc.line(margin, y2 + 0.5, margin + jurisdictionWidth, y2 + 0.5);
        
        y2 += 6;
        doc.setFont("helvetica", "normal");
        const text7 = "This contract shall be governed, interpreted and construed in accordance with the laws of MEINHARDT FINE FOODS. In return and you agree that the Employer the Employee has executed this contract in the appropriate through the authorization of official agent and with the consent of the Employee given here in writing.";
        const splitText7 = doc.splitTextToSize(text7, pageWidth - 2 * margin);
        doc.text(splitText7, margin, y2);
        y2 += splitText7.length * 5;

        // Signatures
        y2 += 15;
        doc.setFontSize(8);
        doc.text("General Manager Signature", margin + 10, y2);
        doc.text("Employment signature", pageWidth - margin - 50, y2);
        
        y2 += 8;
        doc.setFont("helvetica", "bold");
        doc.text("Grayson Jackson", margin + 10, y2);

        // Bottom border - RED ONLY
        doc.setFillColor(...redColor);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CANADA", pageWidth / 2, pageHeight - 7, { align: 'center' });

        // Save PDF
        doc.save(`${user.fullName.replace(/\s+/g, '_')}_JobOffer.pdf`);
    };

    /* ================= LOAD JSPDF ================= */
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

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
                                            onClick={() => generatePDF(user)}
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
                                                    Description (Hours of Work)
                                                </label>
                                                <textarea
                                                    name={key}
                                                    value={formData[key]}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter hours of work description..."
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