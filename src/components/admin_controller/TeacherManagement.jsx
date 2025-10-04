
// // import {
// //   AlertTriangle,
// //   ArrowLeft,
// //   CheckCircle,
// //   Edit,
// //   Filter,
// //   Lock,
// //   Plus,
// //   Search,
// //   Trash2,
// //   User,
// //   UserCheck,
// //   Users,
// //   X
// // } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { Alert, AlertDescription } from '../ui/alert';
// // import { Badge } from '../ui/badge';
// // import { Button } from '../ui/button';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
// // import { Input } from '../ui/input';
// // import { Label } from '../ui/label';

// // export function TeacherManagement({ onBack }) {
// //   const [teachers, setTeachers] = useState([]);
// //   const [filteredTeachers, setFilteredTeachers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingTeacher, setEditingTeacher] = useState(null);
  
// //   // 1. UPDATED: Initialize formData with ONLY username and password
// //   const [formData, setFormData] = useState({
// //     username: '', 
// //     password: ''
// //     // name, email, phone, subject are no longer tracked here for the simplified form
// //   });

// //   // Initialize with mock data (including full details for the directory to function)
// //   useEffect(() => {
// //     // --- API/AXIOS Call: Fetch Teachers (Initial Load) ---
// //     // try {
// //     //   const response = await axios.get('/api/teachers'); // <-- AXIOS GET call here
// //     //   setTeachers(response.data);
// //     //   setFilteredTeachers(response.data);
// //     // } catch (err) {
// //     //   setError('Failed to fetch teachers.');
// //     // }
    
// //     // Simulate API call with mock data (REMOVE THIS BLOCK WHEN USING REAL API)
// //     const mockTeachers = [
// //       { id: 1, username: 'john.smith', name: 'Dr. John Smith', email: 'john.smith@university.edu', phone: '+1-555-0123', subject: 'Computer Science' },
// //       { id: 2, username: 'sarah.johnson', name: 'Prof. Sarah Johnson', email: 'sarah.johnson@university.edu', phone: '+1-555-0124', subject: 'Mathematics' },
// //       { id: 3, username: 'mike.davis', name: 'Dr. Mike Davis', email: 'mike.davis@university.edu', phone: '+1-555-0125', subject: 'Physics' }
// //     ];
// //     setTeachers(mockTeachers);
// //     setFilteredTeachers(mockTeachers);
// //     // END MOCK DATA
// //   }, []);

// //   useEffect(() => {
// //     if (searchTerm.trim() === '') {
// //       setFilteredTeachers(teachers);
// //     } else {
// //       const filtered = teachers.filter(teacher =>
// //         // Search logic remains comprehensive for a better UX, even if table is simple
// //         (teacher.name && teacher.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //         (teacher.username && teacher.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //         (teacher.email && teacher.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //         (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()))
// //       );
// //       setFilteredTeachers(filtered);
// //     }
// //   }, [searchTerm, teachers]);

// //   useEffect(() => {
// //     if (success) {
// //       const timer = setTimeout(() => setSuccess(null), 5000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [success]);

// //   useEffect(() => {
// //     if (error) {
// //       const timer = setTimeout(() => setError(null), 5000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [error]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (editingTeacher) {
// //       await handleUpdateTeacher();
// //     } else {
// //       await handleAddTeacher();
// //     }
// //   };

// //   const handleAddTeacher = async () => {
// //     if (!formData.username || !formData.password) {
// //       setError('Username and password are required');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     // --- API/AXIOS Call: Add Teacher ---
// //     // try {
// //     //   const response = await axios.post('/api/teachers', { 
// //     //     username: formData.username, 
// //     //     password: formData.password 
// //     //     // Other fields can be sent as null or left out if only creating login
// //     //   }); // <-- AXIOS POST call here
// //     //   setTeachers(prev => [...prev, response.data]); 
// //     //   setSuccess('Teacher added successfully!');
// //     //   resetForm();
// //     // } catch (err) {
// //     //   setError('Failed to add teacher.');
// //     // } finally {
// //     //   setLoading(false);
// //     // }

// //     // Simulate API call (REMOVE THIS BLOCK WHEN USING REAL API)
// //     setTimeout(() => {
// //       const newTeacher = {
// //         id: Date.now(),
// //         username: formData.username,
// //         // Mock default values for missing profile fields in the new teacher
// //         name: 'N/A',
// //         email: 'N/A',
// //         phone: 'N/A',
// //         subject: 'N/A',
// //       };
      
// //       setTeachers([...teachers, newTeacher]);
// //       setSuccess('Teacher added successfully!');
// //       resetForm();
// //       setLoading(false);
// //     }, 1500);
// //     // END MOCK DATA
// //   };

// //   const handleUpdateTeacher = async () => {
// //     if (!editingTeacher) return;

// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);
    
// //     // Only send password if it was entered
// //     const updateData = {
// //       ...(formData.password && { password: formData.password }) 
// //       // If we allowed username change: username: formData.username
// //     };

// //     // --- API/AXIOS Call: Update Teacher ---
// //     // try {
// //     //   await axios.put(`/api/teachers/${editingTeacher.id}`, updateData); // <-- AXIOS PUT call here
// //     //   
// //     //   // Update local state (username should only change if allowed/sent)
// //     //   const updatedTeachers = teachers.map(teacher =>
// //     //     teacher.id === editingTeacher.id 
// //     //       ? { ...teacher, ...updateData }
// //     //       : teacher
// //     //   );
// //     //   setTeachers(updatedTeachers);
// //     //   setSuccess('Teacher updated successfully!');
// //     //   resetForm();
// //     // } catch (err) {
// //     //   setError('Failed to update teacher.');
// //     // } finally {
// //     //   setLoading(false);
// //     // }

// //     // Simulate API call (REMOVE THIS BLOCK WHEN USING REAL API)
// //     setTimeout(() => {
// //       // For a simplified view, only username is "editable" (though disabled)
// //       const updatedTeachers = teachers.map(teacher =>
// //         teacher.id === editingTeacher.id 
// //           ? { ...teacher, username: formData.username || teacher.username }
// //           : teacher
// //       );
      
// //       setTeachers(updatedTeachers);
// //       setSuccess('Teacher updated successfully!');
// //       resetForm();
// //       setLoading(false);
// //     }, 1500);
// //     // END MOCK DATA
// //   };

// //   const handleDeleteTeacher = async (teacherId) => {
// //     if (!window.confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) {
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     // --- API/AXIOS Call: Delete Teacher ---
// //     // try {
// //     //   await axios.delete(`/api/teachers/${teacherId}`); // <-- AXIOS DELETE call here
// //     //   const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
// //     //   setTeachers(updatedTeachers);
// //     //   setSuccess('Teacher deleted successfully!');
// //     // } catch (err) {
// //     //   setError('Failed to delete teacher.');
// //     // } finally {
// //     //   setLoading(false);
// //     // }

// //     // Simulate API call (REMOVE THIS BLOCK WHEN USING REAL API)
// //     setTimeout(() => {
// //       const updatedTeachers = teachers.filter(teacher => teacher.id !== teacherId);
// //       setTeachers(updatedTeachers);
// //       setSuccess('Teacher deleted successfully!');
// //       setLoading(false);
// //     }, 1000);
// //     // END MOCK DATA
// //   };

// //   // 2. UPDATED: Reset form to ONLY username and password
// //   const resetForm = () => {
// //     setFormData({ username: '', password: '' });
// //     setShowAddForm(false);
// //     setEditingTeacher(null);
// //     setError(null);
// //   };

// //   const handleEdit = (teacher) => {
// //     setEditingTeacher(teacher);
// //     setFormData({
// //       username: teacher.username || '',
// //       password: '', // Never pre-fill password for security
// //     });
// //     setShowAddForm(true);
// //     setError(null);
// //     setSuccess(null);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
// //       {/* Header (omitted for brevity) */}
// //       <header className="border-b bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
// //         <div className="container mx-auto px-6 py-6">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-4">
// //               {onBack && (
// //                 <Button variant="outline" onClick={onBack} className="flex items-center gap-2 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-colors">
// //                   <ArrowLeft className="w-4 h-4" />
// //                   Back to Dashboard
// //                 </Button>
// //               )}
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
// //                   <UserCheck className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
// //                     Teacher Management
// //                   </h1>
// //                   <p className="text-muted-foreground text-sm">
// //                     Manage teacher accounts and permissions
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
// //                 <UserCheck className="w-3 h-3 mr-1" />
// //                 {filteredTeachers.length} Teachers
// //               </Badge>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-6 py-8">
// //         {/* Messages (omitted for brevity) */}
// //         {success && (
// //           <Alert className="mb-6 border-green-200 bg-green-50">
// //             <CheckCircle className="h-4 w-4 text-green-600" />
// //             <AlertDescription className="text-green-800">{success}</AlertDescription>
// //             <Button variant="ghost" size="sm" onClick={() => setSuccess(null)} className="ml-auto text-green-600 hover:text-green-700">
// //               <X className="h-4 w-4" />
// //             </Button>
// //           </Alert>
// //         )}
// //         {error && (
// //           <Alert variant="destructive" className="mb-6">
// //             <AlertTriangle className="h-4 w-4" />
// //             <AlertDescription>{error}</AlertDescription>
// //             <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto text-destructive-foreground hover:bg-destructive/10">
// //               <X className="h-4 w-4" />
// //             </Button>
// //           </Alert>
// //         )}

// //         {/* Search & Filter Card (omitted for brevity) */}
// //         <Card className="mb-6 bg-gradient-to-r from-white to-green-50/30 border-green-100">
// //           <CardHeader>
// //             <CardTitle className="flex items-center gap-2 text-green-700">
// //               <Filter className="w-5 h-5" />
// //               Search & Manage Teachers
// //             </CardTitle>
// //             <CardDescription>
// //               Find and manage teacher accounts, permissions, and subject assignments
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="flex flex-col lg:flex-row gap-4">
// //               {/* Search Input */}
// //               <div className="flex-1 relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
// //                 <Input
// //                   type="text"
// //                   placeholder="Search by name, username, email, or subject..."
// //                   className="pl-9 bg-white/80 border-green-200 focus:border-green-400 focus:ring-green-400"
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //               </div>
              
// //               {/* Action Buttons */}
// //               <div className="flex gap-2">
// //                 <Button
// //                   onClick={() => {
// //                     resetForm();
// //                     setShowAddForm(!showAddForm);
// //                   }}
// //                   className="bg-green-600 text-black"
// //                   disabled={loading}
// //                 >
// //                   {showAddForm ? (
// //                     <>
// //                       <X className="w-4 h-4 mr-2" />
// //                       Cancel
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Plus className="w-4 h-4 mr-2" />
// //                       Add Teacher
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Teachers List (Only Username and Actions) */}
// //           <div className="lg:col-span-2 space-y-6">
// //             <Card className="bg-white shadow-lg border-green-100">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center justify-between text-green-700">
// //                   <span className="flex items-center gap-2">
// //                     <Users className="w-5 h-5" />
// //                     Teacher Directory
// //                   </span>
// //                   <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
// //                     {filteredTeachers.length} of {teachers.length} teachers
// //                   </Badge>
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Complete list of registered teachers
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead>
// //                       <tr className="border-b border-green-100">
// //                         <th className="text-left p-4 font-medium text-green-700">Username</th>
// //                         <th className="text-left p-4 font-medium text-green-700">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {/* ... Loading and No Teachers state ... (omitted for brevity) */}
// //                       {loading ? (
// //                          <tr><td colSpan="2" className="text-center py-12 text-muted-foreground">Loading...</td></tr>
// //                       ) : filteredTeachers.length === 0 ? (
// //                         <tr><td colSpan="2" className="text-center py-12 text-muted-foreground">No teachers found</td></tr>
// //                       ) : (
// //                         filteredTeachers.map((teacher) => (
// //                           <tr key={teacher.id} className="border-b hover:bg-green-50/50 transition-colors group">
// //                             <td className="p-4 font-mono text-green-600 font-medium">{teacher.username}</td>
                            
// //                             {/* Actions Column */}
// //                             <td className="p-4">
// //                               <div className="flex gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
// //                                 <Button
// //                                   variant="outline"
// //                                   size="sm"
// //                                   onClick={() => handleEdit(teacher)}
// //                                   disabled={loading}
// //                                   className="text-green-600 border-green-200 hover:bg-green-50"
// //                                   title="Edit Teacher"
// //                                 >
// //                                   <Edit className="w-4 h-4" />
// //                                 </Button>
// //                                 <Button
// //                                   variant="outline"
// //                                   size="sm"
// //                                   onClick={() => handleDeleteTeacher(teacher.id)}
// //                                   disabled={loading}
// //                                   className="text-red-600 border-red-200 hover:bg-red-50"
// //                                   title="Delete Teacher"
// //                                 >
// //                                   <Trash2 className="w-4 h-4" />
// //                                 </Button>
// //                               </div>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       )}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Add/Edit Form */}
// //           <div>
// //             {showAddForm ? (
// //               <Card className="bg-gradient-to-r from-white to-green-50/20 border-green-200 shadow-lg sticky top-24">
// //                 <CardHeader>
// //                   <CardTitle className="text-green-700 flex items-center gap-2">
// //                     <Plus className="w-5 h-5" />
// //                     {editingTeacher ? 'Edit Teacher Account' : 'Add New Teacher'}
// //                   </CardTitle>
// //                   <CardDescription>
// //                     {editingTeacher 
// //                       ? 'Update teacher login credentials' 
// //                       : 'Create a new teacher account with login credentials'
// //                     }
// //                   </CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <form onSubmit={handleSubmit} className="space-y-4">
// //                     {/* Username */}
// //                     <div className="space-y-2">
// //                       <Label htmlFor="username" className="flex items-center gap-2">
// //                         <User className="w-4 h-4 text-green-600" />
// //                         Username *
// //                       </Label>
// //                       <Input
// //                         id="username"
// //                         type="text"
// //                         placeholder="Enter username"
// //                         value={formData.username}
// //                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
// //                         className="bg-white/80 border-green-200 focus:border-green-400"
// //                         disabled={editingTeacher}
// //                         required
// //                       />
// //                     </div>

// //                     {/* Password */}
// //                     <div className="space-y-2">
// //                       <Label htmlFor="password" className="flex items-center gap-2">
// //                         <Lock className="w-4 h-4 text-green-600" />
// //                         Password {!editingTeacher && '*'}
// //                       </Label>
// //                       <Input
// //                         id="password"
// //                         type="password"
// //                         placeholder={editingTeacher ? "Leave blank to keep current" : "Enter password"}
// //                         value={formData.password}
// //                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                         className="bg-white/80 border-green-200 focus:border-green-400"
// //                         required={!editingTeacher}
// //                       />
// //                     </div>
                    
// //                     {/* Form Actions */}
// //                     <div className="flex flex-col gap-2 pt-4 border-t">
// //                       <Button 
// //                         type="submit"
// //                         className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
// //                         disabled={loading || (!editingTeacher && (!formData.username || !formData.password))}
// //                       >
// //                         {loading ? (
// //                           <>
// //                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                             Processing...
// //                           </>
// //                         ) : editingTeacher ? 'Update Login' : 'Add Teacher'}
// //                       </Button>
// //                       <Button 
// //                         type="button"
// //                         variant="outline" 
// //                         onClick={resetForm}
// //                         className="border-green-200 text-green-600 hover:bg-green-50"
// //                       >
// //                         Cancel
// //                       </Button>
// //                     </div>
// //                   </form>
// //                 </CardContent>
// //               </Card>
// //             ) : (
// //               <Card className="border-dashed border-green-200 bg-gradient-to-br from-green-50/50 to-white">
// //                   onClick={() => setShowAddForm(true)} 
// //                 <CardHeader className="text-center py-12">
// //                   <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                     <Plus className="w-8 h-8 text-green-600" />
// //                   </div>
// //                   <CardTitle className="text-green-600">Add New Teacher</CardTitle>
// //                   <CardDescription>
// //                     Click "Add Teacher" button to create a new teacher account with login credentials
// //                   </CardDescription>
// //                 </CardHeader>
// //               </Card>
// //             )}
// //           </div>
// //         </div>

// //         {/* Quick Stats (omitted for brevity) */}
// //         <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
// //           <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
// //             <CardContent className="p-6">
// //               <div className="text-center">
// //                 <div className="bg-gradient-to-br from-green-600 to-green-700 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                   <UserCheck className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div className="text-3xl font-bold text-green-700 mb-1">{teachers.length}</div>
// //                 <div className="text-sm text-green-600 font-medium">Total Teachers</div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //           <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
// //             <CardContent className="p-6">
// //               <div className="text-center">
// //                 <div className="bg-gradient-to-br from-orange-600 to-orange-700 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                   <Filter className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div className="text-3xl font-bold text-orange-700 mb-1">{filteredTeachers.length}</div>
// //                 <div className="text-sm text-orange-600 font-medium">Filtered Results</div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }







// // ============================================================================
// // Teacher Management Component
// // Handles CRUD operations for teacher records
// // ============================================================================

// import { useEffect, useRef, useState } from 'react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { AlertTriangle, ArrowLeft, Edit, Plus, Search, Trash2, X } from 'lucide-react';
// import { teacherService } from '../../api/admin/teacherService';

// export  function TeacherManagement({ onBack }) {
//   // ========================================================================
//   // STATE MANAGEMENT
//   // ========================================================================
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingTeacher, setEditingTeacher] = useState(null);

//   // Form state
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const passwordRef = useRef(null);

//   // ========================================================================
//   // LIFECYCLE HOOKS
//   // ========================================================================

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredTeachers(teachers);
//     } else {
//       const timeoutId = setTimeout(() => {
//         searchTeachers(searchTerm);
//       }, 300);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [searchTerm, teachers]);

//   // ========================================================================
//   // API FUNCTIONS
//   // ========================================================================

  
//   const handleAddTeacher = async () => {
//     if (!formData.username || !formData.password) {
//       setError('Please provide username and password');
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const data = await teacherService.addTeacher(formData);
//       if (data.success) {
//         setSuccess('Teacher added successfully!');
//         resetForm();
//         fetchTeachers();
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//      setError(err.response?.data?.message || err.message || 'Error adding teacher');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateTeacher = async () => {
//     if (!editingTeacher || !formData.username) return;
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const data = await teacherService.updateTeacher(editingTeacher.id, formData);
//       if (data.success) {
//         setSuccess('Teacher updated successfully!');
//         resetForm();
//         fetchTeachers();
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//      setError(err.response?.data?.message || err.message || 'Error updating teacher');
//     } finally {
//       setLoading(false);
//     }
//   };


//   // ========================================================================
//   // HELPER FUNCTIONS
//   // ========================================================================

//   const resetForm = () => {
//     setFormData({ username: '', password: '' });
//     setShowAddForm(false);
//     setEditingTeacher(null);
//     setError(null);
//     setSuccess(null);
//     if (passwordRef.current) passwordRef.current.value = '';
//   };

//   const handleEdit = (teacher) => {
//     setEditingTeacher(teacher);
//     setFormData({ username: teacher.username, password: '' });
//     setShowAddForm(true);
//     setError(null);
//     setSuccess(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingTeacher) {
//       await handleUpdateTeacher();
//     } else {
//       await handleAddTeacher();
//     }
//   };

//   const isFormComplete = formData.username && (editingTeacher || formData.password);

//   // ========================================================================
//   // RENDER
//   // ========================================================================

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-4 mb-2">
//           {onBack && (
//             <Button variant="outline" onClick={onBack} size="sm">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back
//             </Button>
//           )}
//           <div>
//             <h1 className="text-3xl font-bold text-green-600">Teacher Management</h1>
//             <p className="text-gray-600 text-sm mt-1">Manage teacher records</p>
//           </div>
//         </div>
//       </div>

//       {/* Alerts */}
//       {error && (
//         <Alert variant="destructive" className="mb-4">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription className="flex items-center justify-between">
//             <span>{error}</span>
//             <Button variant="ghost" size="sm" onClick={() => setError(null)}>
//               <X className="w-4 h-4" />
//             </Button>
//           </AlertDescription>
//         </Alert>
//       )}

//       {success && (
//         <Alert className="bg-green-50 border-green-200 mb-4">
//           <AlertDescription className="text-green-800 flex items-center justify-between">
//             <span>{success}</span>
//             <Button variant="ghost" size="sm" onClick={() => setSuccess(null)}>
//               <X className="w-4 h-4" />
//             </Button>
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT COLUMN: Teacher List + Search */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <Search className="w-5 h-5" />
//                   Search Teachers
//                 </span>
//                 <Button onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}>
//                   {showAddForm ? (
//                     <><X className="w-4 h-4 mr-2" /> Cancel</>
//                   ) : (
//                     <><Plus className="w-4 h-4 mr-2" /> Add Teacher</>
//                   )}
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="lg:col-span-4 mb-4">
//                 <Input
//                   placeholder="Search by username..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Teacher List */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Plus className="w-5 h-5" />
//                 Teacher List
//               </CardTitle>
//               <CardDescription>
//                 Showing {filteredTeachers.length} of {teachers.length} teachers
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Username</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {loading ? (
//                       <tr>
//                         <td colSpan="2" className="px-4 py-12 text-center text-gray-500">
//                           Loading teachers...
//                         </td>
//                       </tr>
//                     ) : filteredTeachers.length === 0 ? (
//                       <tr>
//                         <td colSpan="2" className="px-4 py-12 text-center text-gray-500">
//                           No teachers found
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredTeachers.map((teacher) => (
//                         <tr key={teacher.id} className="hover:bg-gray-50">
//                           <td className="px-4 py-3 text-sm text-gray-900">{teacher.username}</td>
//                           <td className="px-4 py-3 text-sm">
//                             <div className="flex gap-2">
//                               <Button variant="outline" size="sm" onClick={() => handleEdit(teacher)} disabled={loading}>
//                                 <Edit className="w-4 h-4" />
//                               </Button>
//                               <Button variant="outline" size="sm" onClick={() => handleDeleteTeacher(teacher.id)} disabled={loading} className="text-red-600 hover:text-red-700">
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* RIGHT COLUMN: Add/Edit Form */}
//         <div>
//           {showAddForm ? (
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   {editingTeacher ? <><Edit className="w-5 h-5" /> Edit Teacher</> : <><Plus className="w-5 h-5" /> Add New Teacher</>}
//                 </CardTitle>
//                 <CardDescription>
//                   {editingTeacher ? 'Update teacher information' : 'Add a new teacher'}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   {/* Username */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium">
//                       Username <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       placeholder="Enter username"
//                       value={formData.username}
//                       onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                       required
//                       disabled={loading}
//                     />
//                   </div>

//                   {/* Password */}
//                   {!editingTeacher && (
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">
//                         Password <span className="text-red-500">*</span>
//                       </label>
//                       <Input
//                         type="password"
//                         placeholder="Enter password"
//                         ref={passwordRef}
//                         value={formData.password}
//                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                         required
//                         disabled={loading}
//                       />
//                     </div>
//                   )}

//                   {/* Form Actions */}
//                   <div className="flex gap-2 pt-4">
//                     <Button type="submit" className="flex-1" disabled={loading || !isFormComplete}>
//                       {loading ? 'Processing...' : editingTeacher ? 'Update Teacher' : 'Add Teacher'}
//                     </Button>
//                     <Button type="button" variant="outline" onClick={resetForm}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           ) : (
//             <Card className="border-dashed">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-500">
//                   <Plus className="w-5 h-5" />
//                   Add Teacher
//                 </CardTitle>
//                 <CardDescription>
//                   Click the "Add Teacher" button above to add a new teacher
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-8 text-gray-500">
//                   <p>No form active</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/components/admin/TeacherManagement.jsx
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, ArrowLeft, Edit, Plus, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { teacherService } from '../../api/admin/teacherService';

export function TeacherManagement({ onBack }) {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(teacher =>
        teacher.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeachers(filtered);
    }
  }, [searchTerm, teachers]);

  // 1. GET ALL TEACHERS - Maps to: GET /api/admin/teachers
  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teacherService.getTeachers();
      if (data.success) {
        setTeachers(data.teachers || []);
        setFilteredTeachers(data.teachers || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching teachers');
    } finally {
      setLoading(false);
    }
  };

  // 2. ADD TEACHER - Maps to: POST /api/admin/teachers
  // Backend: add_teacher(username, password)
  const handleAddTeacher = async () => {
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await teacherService.addTeacher({
        username: formData.username,
        password: formData.password
      });
      if (data.success) {
        setSuccess('Teacher added successfully!');
        resetForm();
        fetchTeachers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding teacher');
    } finally {
      setLoading(false);
    }
  };

  // 3. UPDATE TEACHER - Maps to: PUT /api/admin/teachers/:id
  // Backend: update_teacher(teacher_id, username?, password?)
  const handleUpdateTeacher = async () => {
    if (!editingTeacher || !formData.username) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updateData = { username: formData.username };
      if (formData.password) updateData.password = formData.password;
      
      const data = await teacherService.updateTeacher(editingTeacher.id, updateData);
      if (data.success) {
        setSuccess('Teacher updated successfully!');
        resetForm();
        fetchTeachers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating teacher');
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETE TEACHER - Maps to: DELETE /api/admin/teachers/:id (if exists in backend)
  const handleDeleteTeacher = async (teacherId) => {
    if (!confirm('Delete this teacher?')) return;
    setLoading(true);
    try {
      await teacherService.deleteTeacher(teacherId);
      setSuccess('Teacher deleted successfully!');
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting teacher');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ username: '', password: '' });
    setShowAddForm(false);
    setEditingTeacher(null);
    setError(null);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({ username: teacher.username, password: '' });
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingTeacher ? handleUpdateTeacher() : handleAddTeacher();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />Back
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-green-600">Teacher Management</h1>
            <p className="text-gray-600 text-sm mt-1">Manage teacher accounts</p>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={() => setError(null)}><X className="w-4 h-4" /></Button>
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 mb-4">
          <AlertDescription className="text-green-800 flex items-center justify-between">
            <span>{success}</span>
            <Button variant="ghost" size="sm" onClick={() => setSuccess(null)}><X className="w-4 h-4" /></Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Search className="w-5 h-5" />Search Teachers</span>
                <Button onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}>
                  {showAddForm ? <><X className="w-4 h-4 mr-2" />Cancel</> : <><Plus className="w-4 h-4 mr-2" />Add Teacher</>}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Search by username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teacher List</CardTitle>
              <CardDescription>Showing {filteredTeachers.length} of {teachers.length} teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {loading ? (
                    <tr><td colSpan="2" className="px-4 py-12 text-center">Loading...</td></tr>
                  ) : filteredTeachers.length === 0 ? (
                    <tr><td colSpan="2" className="px-4 py-12 text-center text-gray-500">No teachers found</td></tr>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{teacher.username}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(teacher)} disabled={loading}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteTeacher(teacher.id)} disabled={loading} className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div>
          {showAddForm ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}</CardTitle>
                <CardDescription>{editingTeacher ? 'Update credentials' : 'Create new account'}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username <span className="text-red-500">*</span></label>
                    <Input placeholder="Enter username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required disabled={loading} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password {!editingTeacher && <span className="text-red-500">*</span>}</label>
                    <Input type="password" placeholder={editingTeacher ? "Leave blank to keep current" : "Enter password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!editingTeacher} disabled={loading} />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1" disabled={loading || !formData.username || (!editingTeacher && !formData.password)}>
                      {loading ? 'Processing...' : editingTeacher ? 'Update' : 'Add'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-gray-500">Add Teacher</CardTitle>
                <CardDescription>Click "Add Teacher" to create account</CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}