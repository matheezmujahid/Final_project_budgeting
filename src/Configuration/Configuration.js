import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';

function ConfigurePage({ updateDashboardData }) {
  const [categoryAllocation, setCategoryAllocation] = useState('');
  const [allocated, setAllocated] = useState('');
  const [selectedMonthAllocation, setSelectedMonthAllocation] = useState('January');
  const [selectedYearAllocation, setSelectedYearAllocation] = useState(new Date().getFullYear());
  const [allCategories, setAllCategories] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);

  const [selectedMonthDeallocation, setSelectedMonthDeallocation] = useState('January');
  const [selectedYearDeallocation, setSelectedYearDeallocation] = useState(new Date().getFullYear());

  // Fetch all categories for the datalist
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/categories');
        setAllCategories(response.data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchAllCategories();
  }, []);

  const handleAllocationSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');

    // Ensure allocated is a valid number
    const allocatedValue = parseFloat(allocated);

    // Check if allocated is a valid number
    if (isNaN(allocatedValue)) {
      console.error('Invalid value for allocated:', allocated);
      // Handle the error or inform the user
      return;
    }

    const budgetData = {
      category: categoryAllocation,
      allocated: allocatedValue,
      month: selectedMonthAllocation,
      year: selectedYearAllocation,
      userId,
    };

    try {
      const response = await axios.post('http://localhost:3002/api/configure-budget', budgetData);
      console.log(response.data);

      if (typeof updateDashboardData === 'function') {
        updateDashboardData();
      }
    } catch (error) {
      console.error('Error configuring budget:', error);
    }

    setCategoryAllocation('');
    setAllocated('');
  };

 
  // Array of all months
  const months = [
    'None',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="configurationcontent">
      <h2 style={{ textAlign: 'left', marginBottom: '20px',color: 'white' }}>Configure Budget</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between',backgroundColor:'white',width:'50%' }}>
        {/* Allocation Form */}
        <form style={{ width: '100%', padding: '20px', backgroundColor:'cream',border: '1px solid #ccc', borderRadius: '8px' }} onSubmit={handleAllocationSubmit}>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Category:
            <input type="text" list='categoriesAllocatedList' value={categoryAllocation} onChange={(e) => setCategoryAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <datalist id="categoriesAllocatedList">
              {allCategories.length > 0 && allCategories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Allocated Budget:
            <input type="number" value={allocated} onChange={(e) => setAllocated(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Month:
            <select value={selectedMonthAllocation} onChange={(e) => setSelectedMonthAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: '10px' }}>
            Year:
            <input type="number" value={selectedYearAllocation} onChange={(e) => setSelectedYearAllocation(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </label>
          <button type="submit" style={{ backgroundColor: 'coral', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Allocate</button>
        </form>

      
      </div>
    </div>
  );
}

export default ConfigurePage;