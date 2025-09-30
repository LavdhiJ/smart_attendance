import { useState } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginForm } from './components/LoginForm';
import  TeacherDashboard  from './components/TeacherDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentUser.role === 'teacher' ? (
        <TeacherDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
} 
