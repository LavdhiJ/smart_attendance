
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Download,
  LogOut,
  Upload,
  Users,
  X
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Mock AttendanceResults component
const AttendanceResults = ({ results, onExportExcel }) => (
  <Card>
    <CardHeader>
      <CardTitle>Attendance Results</CardTitle>
      <CardDescription>{results.length} students processed</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {results.map((result) => (
          <div key={result.id} className="p-3 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{result.studentName}</p>
              <p className="text-sm text-muted-foreground">{result.studentId}</p>
              {result.confidence && (
                <p className="text-xs text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </p>
              )}
            </div>
            <Badge 
              variant={result.status === 'recognized' ? 'default' : 'secondary'}
              className={result.status === 'recognized' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
            >
              {result.status === 'recognized' ? 'Present' : 'Unrecognized'}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function TeacherDashboard({ user = { name: 'Teacher' }, onLogout = () => {} }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const fileInputRef = useRef(null);

  // Mock subjects data (will be replaced with backend API)
  const subjectsData = {
    'III-IT': [
      { code: '5ITRC1', name: 'Theory of Computation' },
      { code: '5ITRC2', name: 'Object Oriented Analysis & Design' },
      { code: '5ITRC3', name: 'Computer Networks' },
      { code: '5ITRE1', name: 'Web Technologies' },
      { code: '5ITRG3', name: 'Applied Statistics' },
      { code: '5ITRL3', name: 'Scripting Language Laboratory' }
    ],
    'III-CS': [
      { code: '5CSRC1', name: 'Database Management Systems' },
      { code: '5CSRC2', name: 'Software Engineering' },
      { code: '5CSRC3', name: 'Operating Systems' }
    ],
    'III-ETC': [
      { code: '5ETCRC1', name: 'Digital Signal Processing' },
      { code: '5ETCRC2', name: 'Communication Systems' }
    ],
    'II-IT': [
      { code: '4ITRC1', name: 'Data Structures' },
      { code: '4ITRC2', name: 'Computer Organization' }
    ]
  };

  // Fetch subjects when year or department changes
  useEffect(() => {
    if (selectedYear && selectedDepartment) {
      setLoadingSubjects(true);
      setSelectedSubject(null);
      
      // Simulate API call
      setTimeout(() => {
        const key = `${selectedYear}-${selectedDepartment}`;
        setSubjects(subjectsData[key] || []);
        setLoadingSubjects(false);
      }, 300);
    } else {
      setSubjects([]);
      setSelectedSubject(null);
    }
  }, [selectedYear, selectedDepartment]);

  // Helper function to check if department has sections
  const hasSection = (dept) => {
    return ['CS', 'IT', 'ETC'].includes(dept);
  };

  // Reset section when department changes
  useEffect(() => {
    if (selectedDepartment && !hasSection(selectedDepartment)) {
      setSelectedSection(null);
    }
  }, [selectedDepartment]);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setShowResults(false);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateRecognition = () => {
    const mockStudents = [
      { name: 'Alice Johnson', id: 'STU001', recognized: true, confidence: 0.92 },
      { name: 'Bob Smith', id: 'STU002', recognized: true, confidence: 0.88 },
      { name: 'Charlie Brown', id: 'STU003', recognized: true, confidence: 0.94 },
      { name: 'Unknown Student 1', id: 'UNK001', recognized: false },
      { name: 'Diana Prince', id: 'STU004', recognized: true, confidence: 0.85 },
      { name: 'Unknown Student 2', id: 'UNK002', recognized: false },
      { name: 'Eve Wilson', id: 'STU005', recognized: true, confidence: 0.91 },
      { name: 'Frank Miller', id: 'STU006', recognized: true, confidence: 0.87 }
    ];

    return mockStudents.map((student, index) => ({
      id: `record_${index}`,
      studentName: student.name,
      studentId: student.id,
      status: student.recognized ? 'recognized' : 'unrecognized',
      confidence: student.confidence,
      timestamp: new Date()
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    // Validate class selection
    if (!selectedYear || !selectedDepartment || !selectedSubject) {
      alert('Please select Year, Department, and Subject');
      return;
    }

    if (hasSection(selectedDepartment) && !selectedSection) {
      alert('Please select a Section');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2500));

    // In production, this is where you'll send the file to backend:
    // const formData = new FormData();
    // formData.append('photo', selectedFile);
    // formData.append('year', selectedYear);
    // formData.append('department', selectedDepartment);
    // formData.append('section', selectedSection || '');
    // formData.append('subject', selectedSubject);
    // const response = await fetch('/api/attendance/upload', { method: 'POST', body: formData });

    console.log('File ready for upload:', {
      file: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      year: selectedYear,
      department: selectedDepartment,
      section: selectedSection,
      subject: selectedSubject
    });

    // Generate mock results
    const results = simulateRecognition();
    setAttendanceResults(results);
    setShowResults(true);
    setIsUploading(false);
    
    // Clear file selection after processing
    handleRemoveFile();
  };

  const handleExportExcel = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `attendance_${selectedYear}_${selectedDepartment}_${selectedSection || ''}_${timestamp}.xlsx`;
    
    alert(`Excel report "${filename}" would be downloaded with ${attendanceResults.length} records.\n\nThis will trigger actual file download when backend is integrated.`);
  };

  const recognizedCount = attendanceResults.filter(r => r.status === 'recognized').length;
  const unrecognizedCount = attendanceResults.filter(r => r.status === 'unrecognized').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
          <div className="lg:col-span-2 space-y-6">
          
            <Card>
              <CardHeader>
                <CardTitle>Select Class Details</CardTitle>
                <CardDescription>
                  Choose the year, department, subject, and section for attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Year Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select value={selectedYear || ''} onValueChange={(value) => setSelectedYear(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I">I Year</SelectItem>
                        <SelectItem value="II">II Year</SelectItem>
                        <SelectItem value="III">III Year</SelectItem>
                        <SelectItem value="IV">IV Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select value={selectedDepartment || ''} onValueChange={(value) => setSelectedDepartment(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS">Computer Science (CS)</SelectItem>
                        <SelectItem value="IT">Information Technology (IT)</SelectItem>
                        <SelectItem value="ETC">Electronics & Telecom (ETC)</SelectItem>
                        <SelectItem value="EI">Electronics & Instrumentation (EI)</SelectItem>
                        <SelectItem value="MECH">Mechanical Engineering (MECH)</SelectItem>
                        <SelectItem value="CIVIL">Civil Engineering (CIVIL)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Select 
                      value={selectedSubject || ''} 
                      onValueChange={(value) => setSelectedSubject(value)}
                      disabled={!selectedYear || !selectedDepartment || loadingSubjects}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={
                          loadingSubjects ? "Loading subjects..." : 
                          !selectedYear || !selectedDepartment ? "Select Year & Dept first" :
                          subjects.length === 0 ? "No subjects available" :
                          "Select Subject"
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.code} value={subject.code}>
                            {subject.code} - {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Section Dropdown - Only show for CS, IT, ETC */}
                  {selectedDepartment && hasSection(selectedDepartment) && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Section</label>
                      <Select value={selectedSection || ''} onValueChange={(value) => setSelectedSection(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Selection Summary */}
                {(selectedYear && selectedDepartment && selectedSubject && 
                  (hasSection(selectedDepartment) ? selectedSection : true)) && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Selected Class:</span> {selectedYear} Year {selectedDepartment}
                      {hasSection(selectedDepartment) && ` - Section ${selectedSection}`}
                      <br />
                      <span className="font-medium">Subject:</span> {selectedSubject}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upload Photo Card */}
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
                  />
                  
                  {selectedFile ? (
                    <div className="space-y-4">
                      {/* Image Preview */}
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
                        <Button onClick={handleUpload} disabled={isUploading}>
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
                      <Button asChild>
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
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
              </CardContent>
            </Card>

            {/* Results Section */}
            {showResults && (
              <AttendanceResults
                results={attendanceResults}
                onExportExcel={handleExportExcel}
              />
            )}
          </div>

          {/* Sidebar Stats Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {showResults ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Present Students</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {recognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Unrecognized</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {unrecognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Total Processed</span>
                      <Badge variant="outline" className="border-gray-300">
                        {attendanceResults.length}
                      </Badge>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Attendance Rate: <span className="font-bold text-gray-900">
                          {((recognizedCount / attendanceResults.length) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Upload a class photo to see attendance statistics</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleExportExcel} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Excel Report
                  </Button>
                </CardContent>
              </Card>
            )}

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Make sure students are clearly visible in the photo for best recognition results.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}