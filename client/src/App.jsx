import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home"
import NewBugPage from "./pages/NewBugPage";
import BugListPage from "./pages/BugListPage";
import EditBug from "./pages/EditBug";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// App Component
const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <div className="container mx-auto px-4 py-6 max-w-7xl min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/new-bug" element={<ProtectedRoute><NewBugPage /></ProtectedRoute>} />
            <Route path="/bug-list" element={<ProtectedRoute><BugListPage /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><EditBug /></ProtectedRoute>} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;