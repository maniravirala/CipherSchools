import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import FinishTest from './pages/FinishTest';
import Register from './pages/Register';
import PrivateRoute from './layouts/ProtectedRoute';
import PermissionPage from './pages/PermissionPage';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/permissions" element={<PrivateRoute><PermissionPage /></PrivateRoute>} />
          <Route path="/test-page" element={<PrivateRoute><TestPage /></PrivateRoute>} />
          <Route path="/test" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/finish" element={<PrivateRoute><FinishTest /></PrivateRoute>} />

          {/* Catch-all Route */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
