import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const mockUsers = [
  { _id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', managerId: '' },
  { _id: '2', name: 'John Doe', email: 'john@example.com', role: 'employee', managerId: '3' },
  { _id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'manager', managerId: '' },
];

export const getUsers = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 300));
};

export const createUser = async (user) => {
  return new Promise((resolve) => {
    const newUser = { ...user, _id: String(mockUsers.length + 1) };
    mockUsers.push(newUser);
    setTimeout(() => resolve(newUser), 300);
  });
};

export const updateUser = async (id, user) => {
  return new Promise((resolve) => {
    const index = mockUsers.findIndex((u) => u._id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...user };
      resolve(mockUsers[index]);
    } else {
      resolve(null);
    }
  });
};
