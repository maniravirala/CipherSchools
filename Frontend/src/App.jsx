import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarLayout from './layouts/NavbarLayout';
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
        <Routes>
          <Route path="/login" element={<NavbarLayout><Login /></NavbarLayout>} />
          <Route path="/register" element={<NavbarLayout><Register /></NavbarLayout>} />
          
          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><NavbarLayout><Dashboard /></NavbarLayout></PrivateRoute>} />
          <Route path="/permissions/:id" element={<PrivateRoute><NavbarLayout><PermissionPage /></NavbarLayout></PrivateRoute>} />
          <Route path="/test-page/:id" element={<PrivateRoute><NavbarLayout><TestPage /></NavbarLayout></PrivateRoute>} />
          {/* <Route path="/test/:id" element={<PrivateRoute><Test /></PrivateRoute>} /> */}
          <Route path="/test/:id" element={<Test />} />
          <Route path="/finish" element={<PrivateRoute><NavbarLayout><FinishTest /></NavbarLayout></PrivateRoute>} />
          {/* Catch-all Route */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </Router>
  );
}

export default App;
