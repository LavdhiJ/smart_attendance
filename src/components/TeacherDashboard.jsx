// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { AlertTriangle, Calendar, Camera, Download, Eye, FileText, Upload, X } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { AttendanceStats } from '../components/teacher_components/AttendanceStats.jsx';
// import { StudentAttendanceList } from '../components/teacher_components/StudentAttendanceList.jsx';
// import { dropdownService } from '../api/shared/dropdownService.js';
// import { classService } from '../api/teacher/classService.js';
// import { attendanceService } from '../api/teacher/attendanceService.js';
// import { reportService } from '../api/teacher/reportService.js';
// const API_BASE_URL = 'http://192.168.29.97:5000/api';

// export function TeacherDashboard() {
//   // Class selection state
//   const [branches, setBranches] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
  
//   // Photo upload state
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
  
//   // Results state for showing stats and list
//   const [attendanceResults, setAttendanceResults] = useState(null);
//   const [showResults, setShowResults] = useState(false);
  
//   // Manual attendance modification state
//   const [updatingStudents, setUpdatingStudents] = useState(new Set());
//   const [manualUpdateError, setManualUpdateError] = useState(null);
  
//   // NEW: Report viewing state
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [reportData, setReportData] = useState(null);
//   const [loadingReport, setLoadingReport] = useState(false);
//   const [reportStartDate, setReportStartDate] = useState('');
//   const [reportEndDate, setReportEndDate] = useState('');
  
//   // NEW: Date-specific attendance state
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [dateAttendance, setDateAttendance] = useState(null);
//   const [loadingDateAttendance, setLoadingDateAttendance] = useState(false);
  
//   const fileInputRef = useRef(null);

//   // Fetch branches on mount
//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   // Fetch subjects when class details change
//   useEffect(() => {
//     if (selectedBranch && selectedYear && selectedSection) {
//       fetchSubjects();
//     } else {
//       setSubjects([]);
//       setSelectedSubject(null);
//     }
//   }, [selectedBranch, selectedYear, selectedSection]);

//   const fetchBranches = async () => {
//     try {
//       const data = await dropdownService.getBranches();
//       if (data.success) {
//         setBranches(data.branches);
//       }
//     } catch (err) {
//       console.error('Failed to fetch branches:', err);
//       setError('Failed to load branches');
//     }
//   };

//   const fetchSubjects = async () => {
//     setLoadingSubjects(true);
//     setError(null);
    
//     try {
//       const data = await classService.getSubjectsForClass(
//         selectedBranch,
//         selectedYear,
//         selectedSection,
//         selectedAcademicYear
//       );
      
//       if (data.success) {
//         setSubjects(data.subjects || []);
//         if (!data.subjects || data.subjects.length === 0) {
//           setError('No subjects found for this class. Please add subjects in the database.');
//         }
//       } else {
//         setError(data.message || 'Failed to load subjects');
//         setSubjects([]);
//       }
//     } catch (err) {
//       console.error('Failed to fetch subjects:', err);
//       setError('Failed to load subjects');
//       setSubjects([]);
//     } finally {
//       setLoadingSubjects(false);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       if (file.size > 10 * 1024 * 1024) {
//         setError('File size must be less than 10MB');
//         return;
//       }
      
//       setSelectedFile(file);
//       setError(null);
//       setSuccess(null);
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setError('Please select a valid image file');
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setImagePreview(null);
//     setError(null);
//     setSuccess(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file first');
//       return;
//     }

//     if (!selectedSubject) {
//       setError('Please select all class details (Year, Branch, Section, and Subject)');
//       return;
//     }

//     setIsUploading(true);
//     setUploadProgress(0);
//     setError(null);
//     setSuccess(null);

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('class_subject_id', selectedSubject);
//       formData.append('attendance_date', new Date().toISOString().split('T')[0]);

//       const progressInterval = setInterval(() => {
//         setUploadProgress(prev => Math.min(prev + 10, 90));
//       }, 200);

//       const data = await attendanceService.markAttendance(formData);

//       clearInterval(progressInterval);
//       setUploadProgress(100);

//       if (data.success) {
//         setSuccess(`Attendance marked successfully! ${data.recognized_count} students recognized, ${data.unrecognized_count} unrecognized.`);
        
//         // IMPORTANT: Ensure all students have a proper status
//         const processedData = {
//           ...data,
//           students: data.students?.map(student => ({
//             ...student,
//             status: student.status || (student.confidence > 0.5 ? 'present' : 'absent')
//           })) || []
//         };
        
//         setAttendanceResults(processedData);
//         setShowResults(true);
        
//         setTimeout(() => {
//           handleRemoveFile();
//         }, 2000);
//       } else {
//         setError(data.message || 'Failed to process attendance');
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
//       setError('Failed to upload photo. Please try again.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleManualAttendance = async (studentId, newStatus) => {
//     setManualUpdateError(null);
//     setUpdatingStudents(prev => new Set(prev).add(studentId));

//     try {
//       const data = await attendanceService.markManual({
//         student_id: studentId,
//         status: newStatus,
//         class_subject_id: selectedSubject,
//         attendance_date: new Date().toISOString().split('T')[0]
//       });

//       if (data.success) {
//         setAttendanceResults(prevResults => {
//           if (!prevResults || !prevResults.students) return prevResults;

//           const updatedStudents = prevResults.students.map(student => {
//             if (student.student_id === studentId) {
//               return {
//                 ...student,
//                 status: newStatus,
//                 manually_modified: true
//               };
//             }
//             return student;
//           });

//           const presentCount = updatedStudents.filter(s => s.status === 'present').length;
//           const absentCount = updatedStudents.filter(s => s.status === 'absent').length;
//           const totalProcessed = updatedStudents.length;

//           return {
//             ...prevResults,
//             students: updatedStudents,
//             recognized_count: presentCount,
//             unrecognized_count: absentCount,
//             total_processed: totalProcessed
//           };
//         });

//         setSuccess(`Attendance updated successfully`);
//         setTimeout(() => setSuccess(null), 3000);
//       } else {
//         setManualUpdateError(data.message || 'Failed to update attendance');
//       }
//     } catch (err) {
//       console.error('Manual attendance update error:', err);
//       setManualUpdateError('Failed to update attendance. Please try again.');
//     } finally {
//       setUpdatingStudents(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(studentId);
//         return newSet;
//       });
//     }
//   };

//   // NEW: Fetch attendance report
//   const handleFetchReport = async () => {
//     if (!selectedSubject) {
//       setError('Please select a subject first');
//       return;
//     }

//     setLoadingReport(true);
//     setError(null);

//     try {
//       const data = await reportService.getReport(
//         selectedSubject,
//         reportStartDate,
//         reportEndDate
//       );

//       if (data.success) {
//         setReportData(data.report);
//         setShowReportModal(true);
//       } else {
//         setError(data.message || 'Failed to fetch report');
//       }
//     } catch (err) {
//       console.error('Report fetch error:', err);
//       setError(err.response?.data?.message || 'Failed to fetch attendance report');
//     } finally {
//       setLoadingReport(false);
//     }
//   };

//   // NEW: Fetch attendance by date
//   const handleFetchByDate = async () => {
//     if (!selectedSubject) {
//       setError('Please select a subject first');
//       return;
//     }

//     setLoadingDateAttendance(true);
//     setError(null);

//     try {
//       const data = await reportService.getByDate(selectedSubject, selectedDate);

//       if (data.success) {
//         setDateAttendance(data.records);
//         setShowResults(true);
        
//         // Format data similar to automatic attendance for consistent display
//         const formattedData = {
//           students: data.records || [],
//           recognized_count: data.records?.filter(r => r.status === 'present').length || 0,
//           unrecognized_count: data.records?.filter(r => r.status === 'absent').length || 0,
//           total_processed: data.records?.length || 0
//         };
        
//         setAttendanceResults(formattedData);
//         setSuccess(`Loaded attendance for ${selectedDate}`);
//         setTimeout(() => setSuccess(null), 3000);
//       } else {
//         setError(data.message || 'No attendance records found for this date');
//       }
//     } catch (err) {
//       console.error('Date attendance fetch error:', err);
//       setError('Failed to fetch attendance for selected date');
//     } finally {
//       setLoadingDateAttendance(false);
//     }
//   };

//   // NEW: Download report as CSV
//   const downloadReportCSV = () => {
//     if (!reportData) return;

//     const csvRows = [];
//     csvRows.push(['Student Name', 'Roll Number', 'Total Classes', 'Present', 'Absent', 'Attendance %'].join(','));

//     reportData.forEach(student => {
//       csvRows.push([
//         student.name,
//         student.roll_number,
//         student.total_classes || 0,
//         student.present_count || 0,
//         student.absent_count || 0,
//         student.attendance_percentage ? student.attendance_percentage.toFixed(2) + '%' : '0%'
//       ].join(','));
//     });

//     const csvContent = csvRows.join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `attendance_report_${selectedSubject}_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getSelectedBranchName = () => {
//     const branch = branches.find(b => b.id === parseInt(selectedBranch));
//     return branch ? branch.branch_name : '';
//   };

//   const getSelectedSubjectName = () => {
//     const subject = subjects.find(
//       (s) => String(s.class_subject_id) === String(selectedSubject)
//     );
//     return subject ? `${subject.subject_code} - ${subject.subject_name}` : '';
//   };

//   const isFormComplete = selectedBranch && selectedYear && selectedSection && selectedAcademicYear && selectedSubject;

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT COLUMN: Class Selection + Photo Upload (2/3 width) */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Class Selection Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Select Class Details</CardTitle>
//               <CardDescription>
//                 Choose the year, branch, section, and subject for attendance tracking
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Academic Year Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Academic Year</label>
//                   <Select value={selectedAcademicYear || ''} onValueChange={setSelectedAcademicYear}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Academic Year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="2024-25">2024-25</SelectItem>
//                       <SelectItem value="2023-24">2023-24</SelectItem>
//                       <SelectItem value="2025-26">2025-26</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Year Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Year</label>
//                   <Select value={selectedYear || ''} onValueChange={setSelectedYear}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Year" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="1">I Year</SelectItem>
//                       <SelectItem value="2">II Year</SelectItem>
//                       <SelectItem value="3">III Year</SelectItem>
//                       <SelectItem value="4">IV Year</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Branch Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Branch/Department</label>
//                   <Select value={selectedBranch || ''} onValueChange={setSelectedBranch}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Branch" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {branches.map((branch) => (
//                         branch && branch.id ? (
//                           <SelectItem key={branch.id} value={branch.id.toString()}>
//                             {branch.branch_name} ({branch.branch_code})
//                           </SelectItem>
//                         ) : null
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Section Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Section</label>
//                   <Select value={selectedSection || ''} onValueChange={setSelectedSection}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Section" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="A">Section A</SelectItem>
//                       <SelectItem value="B">Section B</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Subject Dropdown */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Subject</label>
//                   <Select 
//                     value={selectedSubject || ''} 
//                     onValueChange={setSelectedSubject}
//                     disabled={!selectedBranch || !selectedYear || !selectedSection || loadingSubjects}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder={
//                         loadingSubjects ? "Loading subjects..." : 
//                         !selectedBranch || !selectedYear || !selectedSection ? "Select Year, Branch & Section first" :
//                         subjects.length === 0 ? "No subjects available" :
//                         "Select Subject"
//                       } />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {subjects.map((subject) => (
//                         <SelectItem 
//                           key={subject.class_subject_id} 
//                           value={subject.class_subject_id}
//                         >
//                           {subject.subject_code} - {subject.subject_name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Selection Summary */}
//               {isFormComplete && (
//                 <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-sm text-gray-700">
//                     <span className="font-medium">Academic Year:</span> {selectedAcademicYear}
//                     <br />
//                     <span className="font-medium">Selected Class:</span> {selectedYear === '1' ? 'I' : selectedYear === '2' ? 'II' : selectedYear === '3' ? 'III' : 'IV'} Year {getSelectedBranchName()} - Section {selectedSection}
//                     <br />
//                     <span className="font-medium">Subject:</span> {getSelectedSubjectName()}
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* NEW: View Attendance Actions Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Eye className="w-5 h-5" />
//                 View Attendance
//               </CardTitle>
//               <CardDescription>
//                 View attendance records by date or generate reports
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {/* View by Date Section */}
//               <div className="border rounded-lg p-4 space-y-3">
//                 <h3 className="font-medium text-sm flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   View Attendance by Date
//                 </h3>
//                 <div className="flex gap-2">
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
//                     disabled={!isFormComplete}
//                   />
//                   <Button 
//                     onClick={handleFetchByDate}
//                     disabled={!isFormComplete || loadingDateAttendance}
//                     size="sm"
//                   >
//                     {loadingDateAttendance ? 'Loading...' : 'View'}
//                   </Button>
//                 </div>
//               </div>

//               {/* Generate Report Section */}
//               <div className="border rounded-lg p-4 space-y-3">
//                 <h3 className="font-medium text-sm flex items-center gap-2">
//                   <FileText className="w-4 h-4" />
//                   Generate Attendance Report
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="space-y-1">
//                     <label className="text-xs text-gray-600">Start Date (Optional)</label>
//                     <input
//                       type="date"
//                       value={reportStartDate}
//                       onChange={(e) => setReportStartDate(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                       disabled={!isFormComplete}
//                     />
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-xs text-gray-600">End Date (Optional)</label>
//                     <input
//                       type="date"
//                       value={reportEndDate}
//                       onChange={(e) => setReportEndDate(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                       disabled={!isFormComplete}
//                     />
//                   </div>
//                 </div>
//                 <Button 
//                   onClick={handleFetchReport}
//                   disabled={!isFormComplete || loadingReport}
//                   className="w-full"
//                   size="sm"
//                 >
//                   {loadingReport ? 'Generating...' : 'Generate Report'}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Photo Upload Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Camera className="w-5 h-5" />
//                 Upload Class Photo
//               </CardTitle>
//               <CardDescription>
//                 Upload a photo of your class to automatically mark attendance
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileSelect}
//                   className="hidden"
//                   id="photo-upload"
//                   disabled={!isFormComplete}
//                 />
                
//                 {selectedFile ? (
//                   <div className="space-y-4">
//                     {imagePreview && (
//                       <div className="relative inline-block">
//                         <img 
//                           src={imagePreview} 
//                           alt="Preview" 
//                           className="max-h-64 rounded-lg border-2 border-gray-200"
//                         />
//                         <button
//                           onClick={handleRemoveFile}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                           disabled={isUploading}
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     )}
                    
//                     <div>
//                       <p className="font-medium text-gray-900">{selectedFile.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                     </div>
                    
//                     <div className="flex gap-2 justify-center">
//                       <Button onClick={handleUpload} disabled={isUploading || !isFormComplete}>
//                         {isUploading ? 'Processing...' : 'Process Photo'}
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         onClick={handleRemoveFile}
//                         disabled={isUploading}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <Upload className="w-12 h-12 mx-auto text-gray-400" />
//                     <div>
//                       <p className="font-medium text-gray-700">Click to upload or drag and drop</p>
//                       <p className="text-sm text-gray-500">
//                         PNG, JPG or GIF (max 10MB)
//                       </p>
//                     </div>
//                     <Button asChild disabled={!isFormComplete}>
//                       <label htmlFor="photo-upload" className="cursor-pointer">
//                         Choose File
//                       </label>
//                     </Button>
//                     {!isFormComplete && (
//                       <p className="text-xs text-gray-500 mt-2">
//                         Please select class details first
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {isUploading && (
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-700">Processing image...</span>
//                     <span className="font-medium text-gray-900">{uploadProgress}%</span>
//                   </div>
//                   <Progress value={uploadProgress} />
//                 </div>
//               )}

//               {error && (
//                 <Alert variant="destructive">
//                   <AlertTriangle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               {success && (
//                 <Alert className="bg-green-50 border-green-200">
//                   <AlertDescription className="text-green-800">{success}</AlertDescription>
//                 </Alert>
//               )}

//               {manualUpdateError && (
//                 <Alert variant="destructive">
//                   <AlertTriangle className="h-4 w-4" />
//                   <AlertDescription>{manualUpdateError}</AlertDescription>
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>  

//           <Alert>
//             <AlertTriangle className="h-4 w-4" />
//             <AlertDescription>
//               Make sure students are clearly visible in the photo for best recognition results. You can manually modify attendance after processing.
//             </AlertDescription>
//           </Alert>
//         </div>

//         {/* RIGHT COLUMN: Quick Stats (1/3 width) */}
//         <div>
//           {showResults && attendanceResults ? (
//             <AttendanceStats attendanceData={attendanceResults} />
//           ) : (
//             <Card className="border-dashed">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-gray-500">
//                   <Camera className="w-5 h-5" />
//                   Quick Stats
//                 </CardTitle>
//                 <CardDescription>
//                   Upload a class photo or view attendance to see statistics
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-8 text-gray-500">
//                   Statistics will appear here after processing
//                 </div>
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>

//       {/* BOTTOM SECTION: Student List (Full Width) */}
//       {showResults && attendanceResults && attendanceResults.students && (
//         <div className="mt-6">
//           <StudentAttendanceList 
//             students={attendanceResults.students}
//             attendanceDate={selectedDate}
//             onManualUpdate={handleManualAttendance}
//             updatingStudents={updatingStudents}
//           />
//         </div>
//       )}

//       {/* Report Modal */}
//       {showReportModal && reportData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//             <CardHeader className="border-b">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="flex items-center gap-2">
//                     <FileText className="w-5 h-5" />
//                     Attendance Report
//                   </CardTitle>
//                   <CardDescription>
//                     {getSelectedSubjectName()}
//                     {reportStartDate && ` from ${reportStartDate}`}
//                     {reportEndDate && ` to ${reportEndDate}`}
//                   </CardDescription>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button 
//                     size="sm" 
//                     variant="outline"
//                     onClick={downloadReportCSV}
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     Download CSV
//                   </Button>
//                   <Button 
//                     size="sm" 
//                     variant="outline"
//                     onClick={() => setShowReportModal(false)}
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="overflow-y-auto flex-1 p-6">
//               <div className="border rounded-lg overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Roll No</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
//                       <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Total Classes</th>
//                       <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Present</th>
//                       <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Absent</th>
//                       <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Attendance %</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y">
//                     {reportData.map((student, index) => (
//                       <tr key={student.student_id || index} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
//                         <td className="px-4 py-3">
//                           <span className="font-mono text-sm font-medium">{student.roll_number}</span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                               {student.name?.charAt(0).toUpperCase() || '?'}
//                             </div>
//                             <span className="font-medium text-sm">{student.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-center text-sm font-medium">
//                           {student.total_classes || 0}
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {student.present_count || 0}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                             {student.absent_count || 0}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 text-center">
//                           <div className="flex items-center justify-center gap-2">
//                             <div className="flex-1 max-w-[100px]">
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className={`h-2 rounded-full ${
//                                     (student.attendance_percentage || 0) >= 75 ? 'bg-green-600' :
//                                     (student.attendance_percentage || 0) >= 60 ? 'bg-yellow-600' :
//                                     'bg-red-600'
//                                   }`}
//                                   style={{ width: `${student.attendance_percentage || 0}%` }}
//                                 ></div>
//                               </div>
//                             </div>
//                             <span className={`text-sm font-semibold ${
//                               (student.attendance_percentage || 0) >= 75 ? 'text-green-700' :
//                               (student.attendance_percentage || 0) >= 60 ? 'text-yellow-700' :
//                               'text-red-700'
//                             }`}>
//                               {student.attendance_percentage?.toFixed(1) || 0}%
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {reportData.length === 0 && (
//                 <div className="text-center py-12 text-gray-500">
//                   <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                   <p>No attendance records found for the selected period</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }


import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Calendar, Camera, Download, Eye, FileText, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AttendanceStats } from '../components/teacher_components/AttendanceStats.jsx';
import { StudentAttendanceList } from '../components/teacher_components/StudentAttendanceList.jsx';

// Import axios services
import { dropdownService } from '../api/shared/dropdownService.js';
import { classService } from '../api/teacher/classService.js';
import { attendanceService } from '../api/teacher/attendanceService.js';
import { reportService } from '../api/teacher/reportService.js';

export function TeacherDashboard() {
  // Class selection state
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  
  // Photo upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Results state for showing stats and list
  const [attendanceResults, setAttendanceResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  // Manual attendance modification state
  const [updatingStudents, setUpdatingStudents] = useState(new Set());
  const [manualUpdateError, setManualUpdateError] = useState(null);
  
  // Report viewing state
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  
  // Date-specific attendance state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateAttendance, setDateAttendance] = useState(null);
  const [loadingDateAttendance, setLoadingDateAttendance] = useState(false);
  
  const fileInputRef = useRef(null);

  // Fetch branches on mount
  useEffect(() => {
    fetchBranches();
  }, []);

  // Fetch subjects when class details change
  useEffect(() => {
    if (selectedBranch && selectedYear && selectedSection) {
      fetchSubjects();
    } else {
      setSubjects([]);
      setSelectedSubject(null);
    }
  }, [selectedBranch, selectedYear, selectedSection, selectedAcademicYear]);

  const fetchBranches = async () => {
    try {
      const data = await dropdownService.getBranches();
      if (data.success) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error('Failed to fetch branches:', err);
      setError('Failed to load branches');
    }
  };

  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    setError(null);
    
    try {
      const data = await classService.getSubjectsForClass(
        selectedBranch,
        selectedYear,
        selectedSection,
        selectedAcademicYear
      );
      
      if (data.success) {
        setSubjects(data.subjects || []);
        if (!data.subjects || data.subjects.length === 0) {
          setError('No subjects found for this class. Please add subjects in the database.');
        }
      } else {
        setError(data.message || 'Failed to load subjects');
        setSubjects([]);
      }
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to load subjects');
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
      setSuccess(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if (!selectedSubject) {
      setError('Please select all class details (Year, Branch, Section, and Subject)');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('class_subject_id', selectedSubject);
      formData.append('attendance_date', new Date().toISOString().split('T')[0]);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const data = await attendanceService.markAttendance(formData);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (data.success) {
        setSuccess(`Attendance marked successfully! ${data.recognized_count} students recognized, ${data.unrecognized_count} unrecognized.`);
        
        // Ensure all students have a proper status
        const processedData = {
          ...data,
          students: data.students?.map(student => ({
            ...student,
            status: student.status || (student.confidence > 0.5 ? 'present' : 'absent')
          })) || []
        };
        
        setAttendanceResults(processedData);
        setShowResults(true);
        
        setTimeout(() => {
          handleRemoveFile();
        }, 2000);
      } else {
        setError(data.message || 'Failed to process attendance');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualAttendance = async (studentId, newStatus) => {
    setManualUpdateError(null);
    setUpdatingStudents(prev => new Set(prev).add(studentId));

    try {
      const data = await attendanceService.markManual({
        student_id: studentId,
        status: newStatus,
        class_subject_id: selectedSubject,
        attendance_date: new Date().toISOString().split('T')[0]
      });

      if (data.success) {
        setAttendanceResults(prevResults => {
          if (!prevResults || !prevResults.students) return prevResults;

          const updatedStudents = prevResults.students.map(student => {
            if (student.student_id === studentId) {
              return {
                ...student,
                status: newStatus,
                manually_modified: true
              };
            }
            return student;
          });

          const presentCount = updatedStudents.filter(s => s.status === 'present').length;
          const absentCount = updatedStudents.filter(s => s.status === 'absent').length;
          const totalProcessed = updatedStudents.length;

          return {
            ...prevResults,
            students: updatedStudents,
            recognized_count: presentCount,
            unrecognized_count: absentCount,
            total_processed: totalProcessed
          };
        });

        setSuccess(`Attendance updated successfully`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setManualUpdateError(data.message || 'Failed to update attendance');
      }
    } catch (err) {
      console.error('Manual attendance update error:', err);
      setManualUpdateError(err.response?.data?.message || 'Failed to update attendance. Please try again.');
    } finally {
      setUpdatingStudents(prev => {
        const newSet = new Set(prev);
        newSet.delete(studentId);
        return newSet;
      });
    }
  };

  // Fetch attendance report
  const handleFetchReport = async () => {
    if (!selectedSubject) {
      setError('Please select a subject first');
      return;
    }

    setLoadingReport(true);
    setError(null);

    try {
      const data = await reportService.getReport(
        selectedSubject,
        reportStartDate,
        reportEndDate
      );

      if (data.success) {
        setReportData(data.report);
        setShowReportModal(true);
      } else {
        setError(data.message || 'Failed to fetch report');
      }
    } catch (err) {
      console.error('Report fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch attendance report');
    } finally {
      setLoadingReport(false);
    }
  };

  // Fetch attendance by date
  const handleFetchByDate = async () => {
    if (!selectedSubject) {
      setError('Please select a subject first');
      return;
    }

    setLoadingDateAttendance(true);
    setError(null);

    try {
      const data = await reportService.getByDate(selectedSubject, selectedDate);

      if (data.success) {
        setDateAttendance(data.records);
        setShowResults(true);
        
        // Format data similar to automatic attendance for consistent display
        const formattedData = {
          students: data.records || [],
          recognized_count: data.records?.filter(r => r.status === 'present').length || 0,
          unrecognized_count: data.records?.filter(r => r.status === 'absent').length || 0,
          total_processed: data.records?.length || 0
        };
        
        setAttendanceResults(formattedData);
        setSuccess(`Loaded attendance for ${selectedDate}`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || 'No attendance records found for this date');
      }
    } catch (err) {
      console.error('Date attendance fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch attendance for selected date');
    } finally {
      setLoadingDateAttendance(false);
    }
  };

  // Download report as CSV
  const downloadReportCSV = () => {
    if (!reportData) return;

    const csvRows = [];
    csvRows.push(['Student Name', 'Roll Number', 'Total Classes', 'Present', 'Absent', 'Attendance %'].join(','));

    reportData.forEach(student => {
      csvRows.push([
        student.name,
        student.roll_number,
        student.total_classes || 0,
        student.present_count || 0,
        student.absent_count || 0,
        student.attendance_percentage ? student.attendance_percentage.toFixed(2) + '%' : '0%'
      ].join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${selectedSubject}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSelectedBranchName = () => {
    const branch = branches.find(b => b.id === parseInt(selectedBranch));
    return branch ? branch.branch_name : '';
  };

  const getSelectedSubjectName = () => {
    const subject = subjects.find(
      (s) => String(s.class_subject_id) === String(selectedSubject)
    );
    return subject ? `${subject.subject_code} - ${subject.subject_name}` : '';
  };

  const isFormComplete = selectedBranch && selectedYear && selectedSection && selectedAcademicYear && selectedSubject;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Class Selection + Photo Upload (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Class Selection Card */}
          <Card>
            <CardHeader>
              <CardTitle>Select Class Details</CardTitle>
              <CardDescription>
                Choose the year, branch, section, and subject for attendance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Academic Year Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Year</label>
                  <Select value={selectedAcademicYear || ''} onValueChange={setSelectedAcademicYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-25">2024-25</SelectItem>
                      <SelectItem value="2023-24">2023-24</SelectItem>
                      <SelectItem value="2025-26">2025-26</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={selectedYear || ''} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">I Year</SelectItem>
                      <SelectItem value="2">II Year</SelectItem>
                      <SelectItem value="3">III Year</SelectItem>
                      <SelectItem value="4">IV Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Branch Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch/Department</label>
                  <Select value={selectedBranch || ''} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        branch && branch.id ? (
                          <SelectItem key={branch.id} value={branch.id.toString()}>
                            {branch.branch_name} ({branch.branch_code})
                          </SelectItem>
                        ) : null
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Section Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Section</label>
                  <Select value={selectedSection || ''} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select 
                    value={selectedSubject || ''} 
                    onValueChange={setSelectedSubject}
                    disabled={!selectedBranch || !selectedYear || !selectedSection || loadingSubjects}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        loadingSubjects ? "Loading subjects..." : 
                        !selectedBranch || !selectedYear || !selectedSection ? "Select Year, Branch & Section first" :
                        subjects.length === 0 ? "No subjects available" :
                        "Select Subject"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem 
                          key={subject.class_subject_id} 
                          value={subject.class_subject_id}
                        >
                          {subject.subject_code} - {subject.subject_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selection Summary */}
              {isFormComplete && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Academic Year:</span> {selectedAcademicYear}
                    <br />
                    <span className="font-medium">Selected Class:</span> {selectedYear === '1' ? 'I' : selectedYear === '2' ? 'II' : selectedYear === '3' ? 'III' : 'IV'} Year {getSelectedBranchName()} - Section {selectedSection}
                    <br />
                    <span className="font-medium">Subject:</span> {getSelectedSubjectName()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* View Attendance Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                View Attendance
              </CardTitle>
              <CardDescription>
                View attendance records by date or generate reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* View by Date Section */}
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Attendance by Date
                </h3>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    disabled={!isFormComplete}
                  />
                  <Button 
                    onClick={handleFetchByDate}
                    disabled={!isFormComplete || loadingDateAttendance}
                    size="sm"
                  >
                    {loadingDateAttendance ? 'Loading...' : 'View'}
                  </Button>
                </div>
              </div>

              {/* Generate Report Section */}
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Attendance Report
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">Start Date (Optional)</label>
                    <input
                      type="date"
                      value={reportStartDate}
                      onChange={(e) => setReportStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      disabled={!isFormComplete}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-600">End Date (Optional)</label>
                    <input
                      type="date"
                      value={reportEndDate}
                      onChange={(e) => setReportEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      disabled={!isFormComplete}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleFetchReport}
                  disabled={!isFormComplete || loadingReport}
                  className="w-full"
                  size="sm"
                >
                  {loadingReport ? 'Generating...' : 'Generate Report'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Class Photo
              </CardTitle>
              <CardDescription>
                Upload a photo of your class to automatically mark attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                  disabled={!isFormComplete}
                />
                
                {selectedFile ? (
                  <div className="space-y-4">
                    {imagePreview && (
                      <div className="relative inline-block">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-64 rounded-lg border-2 border-gray-200"
                        />
                        <button
                          onClick={handleRemoveFile}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          disabled={isUploading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleUpload} disabled={isUploading || !isFormComplete}>
                        {isUploading ? 'Processing...' : 'Process Photo'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleRemoveFile}
                        disabled={isUploading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-700">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG or GIF (max 10MB)
                      </p>
                    </div>
                    <Button asChild disabled={!isFormComplete}>
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                    {!isFormComplete && (
                      <p className="text-xs text-gray-500 mt-2">
                        Please select class details first
                      </p>
                    )}
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Processing image...</span>
                    <span className="font-medium text-gray-900">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              {manualUpdateError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{manualUpdateError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>  

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Make sure students are clearly visible in the photo for best recognition results. You can manually modify attendance after processing.
            </AlertDescription>
          </Alert>
        </div>

        {/* RIGHT COLUMN: Quick Stats (1/3 width) */}
        <div>
          {showResults && attendanceResults ? (
            <AttendanceStats attendanceData={attendanceResults} />
          ) : (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-500">
                  <Camera className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
                <CardDescription>
                  Upload a class photo or view attendance to see statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Statistics will appear here after processing
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: Student List (Full Width) */}
      {showResults && attendanceResults && attendanceResults.students && (
        <div className="mt-6">
          <StudentAttendanceList 
            students={attendanceResults.students}
            attendanceDate={selectedDate}
            onManualUpdate={handleManualAttendance}
            updatingStudents={updatingStudents}
          />
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && reportData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Attendance Report
                  </CardTitle>
                  <CardDescription>
                    {getSelectedSubjectName()}
                    {reportStartDate && ` from ${reportStartDate}`}
                    {reportEndDate && ` to ${reportEndDate}`}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={downloadReportCSV}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CSV
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowReportModal(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 p-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Roll No</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Total Classes</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Present</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Absent</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {reportData.map((student, index) => (
                      <tr key={student.student_id || index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm font-medium">{student.roll_number}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {student.name?.charAt(0).toUpperCase() || '?'}
                            </div>
                            <span className="font-medium text-sm">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium">
                          {student.total_classes || 0}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {student.present_count || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {student.absent_count || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex-1 max-w-[100px]">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    (student.attendance_percentage || 0) >= 75 ? 'bg-green-600' :
                                    (student.attendance_percentage || 0) >= 60 ? 'bg-yellow-600' :
                                    'bg-red-600'
                                  }`}
                                  style={{ width: `${student.attendance_percentage || 0}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className={`text-sm font-semibold ${
                              (student.attendance_percentage || 0) >= 75 ? 'text-green-700' :
                              (student.attendance_percentage || 0) >= 60 ? 'text-yellow-700' :
                              'text-red-700'
                            }`}>
                              {student.attendance_percentage?.toFixed(1) || 0}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {reportData.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No attendance records found for the selected period</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

