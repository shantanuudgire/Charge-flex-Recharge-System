import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllRecords, checkAdminAuth } from './adminService.js';
import './AdminDashboard.css';

function TransactionTable({ data, onNameClick }) {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Plan</th>
            <th>Date</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={`${record.userId}-${index}`}>
              <td>{record.userId}</td>
              <td
                className={onNameClick ? 'clickable' : ''}
                onClick={() => onNameClick && onNameClick(record.name)}
              >
                {record.name}
              </td>
              <td>₹ {record.plan}</td>
              <td>{record.date}</td>
              <td>{record.validity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminDashboard() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [showFilteredTable, setShowFilteredTable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthorized = await checkAdminAuth();
      setIsAdmin(isAuthorized);
      setIsLoading(false);
      
      if (isAuthorized) {
        fetchRecords();
      }
    };
    
    checkAuth();
  }, []);

  const convertToDate = (validity) => {
    const [day, month, year] = validity.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const fetchRecords = async () => {
    try {
      const data = await getAllRecords();
      // Sort records by validity date
      const sortedRecords = data.sort((a, b) => {
        const dateA = convertToDate(a.validity);
        const dateB = convertToDate(b.validity);
        return dateA.getTime() - dateB.getTime();
      });
      setRecords(sortedRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const filterRecords = (name) => {
    const filtered = records.filter((record) => record.name === name);
    setFilteredRecords(filtered);
    setShowFilteredTable(true);
  };

  if (isLoading) {
    return <div className="content-container">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="content-container">
      <h1 className="table-heading">All Transactions</h1>
      <TransactionTable data={records} onNameClick={filterRecords} />

      {showFilteredTable && (
        <div>
          <h2 className="table-heading">User's Transaction History</h2>
          <TransactionTable data={filteredRecords} />
          <br />
          <br />
        </div>
      )}
      <br />
      <br />
    </div>
  );
}

export default AdminDashboard;