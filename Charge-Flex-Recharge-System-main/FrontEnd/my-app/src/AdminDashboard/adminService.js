import StorageService from '../Storage';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export async function checkAdminAuth() {
  if (!StorageService.isAdminLoggedIn()) return false;
  
  try {
    const response = await fetch(`${API_BASE_URL}/admin/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${StorageService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.log('Admin validation error:', error);
    return false;
  }
}

export async function getAllRecords() {
  if (!StorageService.isAdminLoggedIn()) throw new Error('Not authorized');
  
  try {
    const response = await fetch(`${API_BASE_URL}/getRecords`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${StorageService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch records');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
}
