import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      rollNo: 'CS21001',
      passoutYear: '2025',
      branch: 'CS',
      section: 'A',
      status: 'active',
      lastSeen: new Date('2024-01-15T09:30:00'),
      encodingStatus: 'uploaded'
    },
    {
      id: '2',
      name: 'Bob Smith',
      rollNo: 'CS21002',
      passoutYear: '2025',
      branch: 'CS',
      section: 'A',
      status: 'active',
      lastSeen: new Date('2024-01-15T09:30:00'),
      encodingStatus: 'uploaded'
    },
    {
      id: '3',
      name: 'Charlie Brown',
      rollNo: 'IT21003',
      passoutYear: '2025',
      branch: 'IT',
      section: 'B',
      status: 'active',
      lastSeen: new Date('2024-01-14T14:20:00'),
      encodingStatus: 'pending'
    },
    {
      id: '4',
      name: 'Diana Prince',
      rollNo: 'MECH21004',
      passoutYear: '2025',
      branch: 'MECH',
      section: 'A',
      status: 'inactive',
      encodingStatus: 'error'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    passoutYear: '',
    branch: '',
    section: 'A'
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.rollNo || !newStudent.passoutYear || !newStudent.branch) {
      alert('Please fill in all required fields');
      return;
    }

    const studentData = {
      id: Date.now().toString(),
      ...newStudent,
      status: 'active',
      encodingStatus: 'pending',
      lastSeen: null
    };

    setStudents([...students, studentData]);
    setIsAddDialogOpen(false);
    setNewStudent({ name: '', rollNo: '', passoutYear: '', branch: '', section: 'A' });
  };

  const handleEditStudent = (student) => {
    setEditingStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent.name || !editingStudent.rollNo || !editingStudent.passoutYear || !editingStudent.branch) {
      alert('Please fill in all required fields');
      return;
    }

    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setIsEditDialogOpen(false);
    setEditingStudent(null);
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
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student's information for attendance tracking.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rollNo">Roll No *</Label>
                      <Input
                        id="rollNo"
                        value={newStudent.rollNo}
                        onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                        placeholder="e.g., CS21001"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="passoutYear">Passout Year *</Label>
                      <Select value={newStudent.passoutYear} onValueChange={(value) => setNewStudent({ ...newStudent, passoutYear: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Passout Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="branch">Branch *</Label>
                      <Select value={newStudent.branch} onValueChange={(value) => setNewStudent({ ...newStudent, branch: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Branch" />
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
                    <div className="grid gap-2">
                      <Label htmlFor="section">Section</Label>
                      <Select value={newStudent.section} onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                        </SelectContent>
                      </Select>
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
        
        {/* Edit Student Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the student's information.
              </DialogDescription>
            </DialogHeader>
            {editingStudent && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name *</Label>
                  <Input
                    id="edit-name"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    placeholder="Enter student's full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-rollNo">Roll No *</Label>
                  <Input
                    id="edit-rollNo"
                    value={editingStudent.rollNo}
                    onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                    placeholder="e.g., CS21001"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-passoutYear">Passout Year *</Label>
                  <Select value={editingStudent.passoutYear} onValueChange={(value) => setEditingStudent({ ...editingStudent, passoutYear: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Passout Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-branch">Branch *</Label>
                  <Select value={editingStudent.branch} onValueChange={(value) => setEditingStudent({ ...editingStudent, branch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
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
                <div className="grid gap-2">
                  <Label htmlFor="edit-section">Section</Label>
                  <Select value={editingStudent.section} onValueChange={(value) => setEditingStudent({ ...editingStudent, section: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStudent}>Update Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, roll no, branch, or section..."
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
                  <TableHead>Roll No</TableHead>
                  <TableHead>Passout Year</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Section</TableHead>
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
                      <div className="font-medium">{student.name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.rollNo}</Badge>
                    </TableCell>
                    <TableCell>{student.passoutYear}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.branch}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Section {student.section}</Badge>
                    </TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                        >
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