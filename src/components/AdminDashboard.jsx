import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  Settings, 
  Download, 
  LogOut, 
  Database, 
  FileText, 
  AlertTriangle,
  UserPlus,
  Trash2,
  Eye,
  Calendar,
  BarChart3
} from 'lucide-react';
import { StudentManagement } from './StudentManagement';
import { SystemLogs } from './SystemLogs';
import { AttendanceReport } from './AttendanceReport';

export function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleBackupDatabase = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    alert(`Database backup "attendance_backup_${timestamp}.sql" would be created.`);
  };

  const handleExportArchive = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    alert(`Excel archive "attendance_archive_${timestamp}.xlsx" would be exported.`);
  };

  const stats = {
    totalStudents: 156,
    attendanceRecords: 1243,
    lastBackup: '2024-01-15',
    systemHealth: 'Good'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">Registered in system</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Attendance Records</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.attendanceRecords}</div>
                  <p className="text-xs text-muted-foreground">Total records processed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Last Backup</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.lastBackup}</div>
                  <p className="text-xs text-muted-foreground">Database backup</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">System Health</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {stats.systemHealth}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Attendance processed successfully</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago - Class 10A</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">New student added to database</p>
                      <p className="text-xs text-muted-foreground">1 hour ago - John Doe (STU157)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Unrecognized face detected</p>
                      <p className="text-xs text-muted-foreground">3 hours ago - Class 9B</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Student
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Today's Attendance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Create Database Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    View System Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <AttendanceReport />
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs">
            <SystemLogs />
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="backup" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Database Backup
                  </CardTitle>
                  <CardDescription>
                    Create and manage MySQL database backups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm">Last backup: {stats.lastBackup}</p>
                    <p className="text-sm text-muted-foreground">
                      Regular backups help protect your attendance data
                    </p>
                  </div>
                  <Button onClick={handleBackupDatabase} className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Excel Archive
                  </CardTitle>
                  <CardDescription>
                    Export historical attendance data to Excel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm">Export all attendance records</p>
                    <p className="text-sm text-muted-foreground">
                      Includes student details and attendance history
                    </p>
                  </div>
                  <Button onClick={handleExportArchive} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Archive
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                It's recommended to create backups regularly and store them in a secure location. 
                Schedule automatic backups for better data protection.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}