import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { 
  UserPlus, 
  Search, 
  Edit, 
  Trash2, 
  Upload,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function StudentManagement() {
  const [students] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      studentId: 'STU001',
      email: 'alice.johnson@school.edu',
      class: '10A',
      status: 'active',
      lastSeen: new Date('2024-01-15T09:30:00'),
      encodingStatus: 'uploaded'
    },
    {
      id: '2',
      name: 'Bob Smith',
      studentId: 'STU002',
      email: 'bob.smith@school.edu',
      class: '10A',
      status: 'active',
      lastSeen: new Date('2024-01-15T09:30:00'),
      encodingStatus: 'uploaded'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      studentId: 'STU003',
      email: 'charlie.brown@school.edu',
      class: '10B',
      status: 'active',
      lastSeen: new Date('2024-01-14T14:20:00'),
      encodingStatus: 'pending'
    },
    {
      id: '4',
      name: 'Diana Prince',
      studentId: 'STU004',
      email: 'diana.prince@school.edu',
      class: '10A',
      status: 'inactive',
      encodingStatus: 'error'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    email: '',
    class: ''
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    // In a real app, this would make an API call
    console.log('Adding student:', newStudent);
    setIsAddDialogOpen(false);
    setNewStudent({ name: '', studentId: '', email: '', class: '' });
  };

  const handleDeleteStudent = (studentId) => {
    if (confirm('Are you sure you want to delete this student?')) {
      console.log('Deleting student:', studentId);
    }
  };

  const handleRebuildEncodings = () => {
    alert('Face encodings rebuild initiated. This process may take several minutes.');
  };

  const getEncodingStatusBadge = (status) => {
    switch (status) {
      case 'uploaded':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Student Management
              </CardTitle>
              <CardDescription>
                Add, edit, and manage student profiles and face encodings
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRebuildEncodings} variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Rebuild Encodings
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student's information and upload their photo for face recognition.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={newStudent.studentId}
                        onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                        placeholder="e.g., STU005"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        placeholder="student@school.edu"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="class">Class</Label>
                      <Input
                        id="class"
                        value={newStudent.class}
                        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                        placeholder="e.g., 10A"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddStudent}>Add Student</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, ID, or class..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Students Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Face Encoding</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div>{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.studentId}</Badge>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.status === 'active' ? 'default' : 'secondary'}
                        className={
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getEncodingStatusBadge(student.encodingStatus)}
                    </TableCell>
                    <TableCell>
                      {student.lastSeen ? (
                        <div className="text-sm">
                          <div>{student.lastSeen.toLocaleDateString()}</div>
                          <div className="text-muted-foreground">
                            {student.lastSeen.toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No students found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Face encodings must be rebuilt after adding or editing student photos. 
          This process may take several minutes depending on the number of students.
        </AlertDescription>
      </Alert>
    </div>
  );
}