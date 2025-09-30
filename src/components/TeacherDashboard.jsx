/*import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Upload, 
  Camera, 
  Users, 
  Download, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileImage
} from 'lucide-react';
import { AttendanceResults } from './AttendanceResults';

export function TeacherDashboard({ user, onLogout }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setShowResults(false);
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
    if (!selectedFile) return;

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

    // Generate mock results
    const results = simulateRecognition();
    setAttendanceResults(results);
    setShowResults(true);
    setIsUploading(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `attendance_${timestamp}.xlsx`;
    
    // In a real app, this would trigger actual file download
    alert(`Excel report "${filename}" would be downloaded with ${attendanceResults.length} records.`);
  };

  const recognizedCount = attendanceResults.filter(r => r.status === 'recognized').length;
  const unrecognizedCount = attendanceResults.filter(r => r.status === 'unrecognized').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header *///}///*
      /*
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1>Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section *///}//
          /*
          <div className="lg:col-span-2 space-y-6">
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
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
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
                      <FileImage className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p>{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Processing...' : 'Process Photo'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedFile(null)}
                          disabled={isUploading}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p>Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
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
                      <span>Processing image...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Section *///}
            /*
            {showResults && (
              <AttendanceResults
                results={attendanceResults}
                onExportExcel={handleExportExcel}
              />
            )}
          </div>

          {/* Stats Section */ 
        
        /*}
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
                      <span>Present Students</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {recognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Unrecognized</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {unrecognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Processed</span>
                      <Badge variant="outline">
                        {attendanceResults.length}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a class photo to see attendance statistics</p>
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
}*/
/*
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Upload, 
  Camera, 
  Users, 
  Download, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileImage
} from 'lucide-react';
import { AttendanceResults } from './AttendanceResults';

export function TeacherDashboard({ user, onLogout }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setShowResults(false);
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
    if (!selectedFile) return;

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

    // Generate mock results
    const results = simulateRecognition();
    setAttendanceResults(results);
    setShowResults(true);
    setIsUploading(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `attendance_${timestamp}.xlsx`;
    
    // In a real app, this would trigger actual file download
    alert(`Excel report "${filename}" would be downloaded with ${attendanceResults.length} records.`);
  };

  const recognizedCount = attendanceResults.filter(r => r.status === 'recognized').length;
  const unrecognizedCount = attendanceResults.filter(r => r.status === 'unrecognized').length;

  return (
    <div className="min-h-screen bg-background">
    
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1>Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
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
                  Choose the year, department, and section for attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Year</label>
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
                    <label className="text-sm">Department</label>
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

                  <div className="space-y-2">
                    <label className="text-sm">Section</label>
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


                  <div>

                  </div>
                </div>

                {(selectedYear && selectedDepartment && selectedSection) && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      Selected Class: <span className="font-medium">{selectedYear} Year {selectedDepartment} - Section {selectedSection}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

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
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
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
                      <FileImage className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p>{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Processing...' : 'Process Photo'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedFile(null)}
                          disabled={isUploading}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p>Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
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
                      <span>Processing image...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

          
            {showResults && (
              <AttendanceResults
                results={attendanceResults}
                onExportExcel={handleExportExcel}
              />
            )}
          </div>

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
                      <span>Present Students</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {recognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Unrecognized</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {unrecognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Processed</span>
                      <Badge variant="outline">
                        {attendanceResults.length}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a class photo to see attendance statistics</p>
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
}*/

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Camera, 
  Users, 
  Download, 
  LogOut, 
  CheckCircle, 
  AlertTriangle,
  FileImage
} from 'lucide-react';

// Mock AttendanceResults component - replace with your actual component
const AttendanceResults = ({ results, onExportExcel }) => (
  <Card>
    <CardHeader>
      <CardTitle>Attendance Results</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {results.map((result) => (
          <div key={result.id} className="p-3 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">{result.studentName}</p>
              <p className="text-sm text-muted-foreground">{result.studentId}</p>
            </div>
            <Badge variant={result.status === 'recognized' ? 'default' : 'secondary'}>
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

  // ============================================================================
  // BACKEND INTEGRATION REQUIRED: Replace this dummy data with API call
  // ============================================================================
  const subjectsData = {
    'III-IT': [
      { code: '5ITRC1', name: 'Theory of Computation' },
      { code: '5ITRC2', name: 'Object Oriented Analysis & Design' },
      { code: '5ITRC3', name: 'Computer Networks' },
      { code: '5ITRE1', name: 'Web Technologies' },
      { code: '5ITRG3', name: 'Applied Statistics' },
      { code: '5ITRL3', name: 'Scripting Language Laboratory' },
      { code: '5SIRS5', name: 'Principles of Management' },
      { code: '5ITRV5', name: 'Comprehensive Viva-V' }
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
    // Add more year-department combinations as needed
  };

  // Fetch subjects when year or department changes
  useEffect(() => {
    if (selectedYear && selectedDepartment) {
      setLoadingSubjects(true);
      setSelectedSubject(null);
      
      // ============================================================================
      // BACKEND INTEGRATION REQUIRED: Replace with actual API call
      // ============================================================================
      // Simulate API call
      setTimeout(() => {
        const key = `${selectedYear}-${selectedDepartment}`;
        setSubjects(subjectsData[key] || []);
        setLoadingSubjects(false);
      }, 300);

      /* 
      REPLACE THE ABOVE setTimeout WITH THIS ACTUAL API CALL:
      
      fetch(`/api/subjects?year=${selectedYear}&department=${selectedDepartment}`)
        .then(res => res.json())
        .then(data => {
          setSubjects(data);
          setLoadingSubjects(false);
        })
        .catch(error => {
          console.error('Error fetching subjects:', error);
          setSubjects([]);
          setLoadingSubjects(false);
        });
      */
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
    if (!selectedFile) return;

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

    // Generate mock results
    const results = simulateRecognition();
    setAttendanceResults(results);
    setShowResults(true);
    setIsUploading(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `attendance_${timestamp}.xlsx`;
    
    // In a real app, this would trigger actual file download
    alert(`Excel report "${filename}" would be downloaded with ${attendanceResults.length} records.`);
  };

  const recognizedCount = attendanceResults.filter(r => r.status === 'recognized').length;
  const unrecognizedCount = attendanceResults.filter(r => r.status === 'unrecognized').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Class Selection Card */}
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

                  {/* Department Dropdown */}
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
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      Selected Class: <span className="font-medium">
                        {selectedYear} Year {selectedDepartment}
                        {hasSection(selectedDepartment) && ` - Section ${selectedSection}`}
                      </span>
                      <br />
                      Subject: <span className="font-medium">{selectedSubject}</span>
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
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
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
                      <FileImage className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Processing...' : 'Process Photo'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedFile(null)}
                          disabled={isUploading}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
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
                      <span>Processing image...</span>
                      <span>{uploadProgress}%</span>
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

          {/* Stats Section */}
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
                      <span className="text-sm">Present Students</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {recognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Unrecognized</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {unrecognizedCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Processed</span>
                      <Badge variant="outline">
                        {attendanceResults.length}
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
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