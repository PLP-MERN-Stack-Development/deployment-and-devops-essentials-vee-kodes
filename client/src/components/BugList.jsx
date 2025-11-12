import React from 'react';
import Button from './Button';
import {Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BugList = ({ bugs = [], onDelete }) => {
  const { getToken } = useAuth();

  const handleDelete = async (bugId) => {
    if (!window.confirm('Are you sure you want to delete this bug?')) {
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
      const token = getToken();
      const response = await fetch(`${API_BASE}/api/bugs/${bugId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete bug');
      }

      alert('Bug deleted successfully!');
      if (onDelete) onDelete(bugId);
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message);
    }
  };
  if (!bugs.length) {
    return <p className="text-gray-500">No bugs reported yet.</p>;
  }

  return (
    <div className="space-y-4">
      {bugs.map((bug) => (
        <div
          key={bug._id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold">{bug.title}</h3>
            <p className="text-gray-700">{bug.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Status: <span className="font-medium">{bug.status}</span> | Priority: <span className="font-medium">{bug.priority}</span> | Category: <span className="font-medium">{bug.category}</span>
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex space-x-2">
            <Link to={`/edit/${bug._id}`}>
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(bug._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugList;
