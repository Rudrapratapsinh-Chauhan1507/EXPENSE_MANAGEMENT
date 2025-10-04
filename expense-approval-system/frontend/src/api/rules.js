import { getUsers } from './users';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';



let mockRules = [
  { _id: '1', name: 'Manager Approval', type: 'percentage', percentage: 50, approvers: [{ _id: '3', name: 'Jane Smith' }] },
  { _id: '2', name: 'Finance Approval', type: 'specific', percentage: null, approvers: [{ _id: '1', name: 'Admin User' }] },
];

export const getRules = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRules), 300));
};

export const saveRule = async (rule) => {
  return new Promise((resolve) => {
    const newRule = { ...rule, _id: String(mockRules.length + 1) };
    mockRules.push(newRule);
    setTimeout(() => resolve(newRule), 300);
  });
};

export const getUsersForRules = async () => {
  return await getUsers();
};