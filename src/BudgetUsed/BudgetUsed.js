import axios from "axios";
import { useState, useEffect } from "react";
import "./BudgetUsed.scss";

const BudgetUsed = () => {
  const [usedselectedCategory, setUsedSelectedCategory] = useState("");
  const [usedselectedYear, setUsedSelectedYear] = useState(new Date().getFullYear());
  const [usedselectedMonth, setUsedSelectedMonth] = useState("");
  const [usedBudget, setUsedBudget] = useState(0);
  const [usedCategories, setUsedCategories] = useState([]);

  useEffect(() => {
    fetchUsedCategories(); 
  }, []);

  const fetchUsedCategories = () => {
    axios.get("http://155.138.219.54:3002/api/categories")
      .then((response) => {
        setUsedCategories(response.data);
        
        setUsedSelectedCategory(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching used categories:", error);
      });
  };

  const handleUsedBudgetSubmit = async (e) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");
    const usedBudgetNumber = parseFloat(usedBudget);

    const payload = {
      category: usedselectedCategory,
      used: usedBudgetNumber,
      month: usedselectedMonth,
      year: usedselectedYear,
      userId: storedUserId,
    };

    try {
      await axios.post("http://155.138.219.54:3002/api/enter-used-budget", payload);
      console.log("Used Budget update successful");

      
      fetchUsedCategories(); 
    } catch (error) {
      console.error("Error entering used budget:", error);
      if (error.response && error.response.data) {
        console.error("Server error message:", error.response.data);
      }
    }
  };

  return (
    <div style={{ ...styles.container }}>
      <h2 style={styles.heading}>Enter Used Budget</h2>
      <form onSubmit={handleUsedBudgetSubmit} style={styles.form}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label style={styles.label}>
          Select Month:
          <select
            value={usedselectedMonth}
            onChange={(e) => setUsedSelectedMonth(e.target.value)}
            style={styles.input}
          >
            {[ "select None",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Select Year:
          <input
            type="number"
            value={usedselectedYear}
            onChange={(e) => setUsedSelectedYear(e.target.value)}
            style={styles.input}
          />
        </label>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label style={styles.label}>
          Select Category:
          <select
            value={usedselectedCategory}
            onChange={(e) => setUsedSelectedCategory(e.target.value)}
            style={styles.input}
          >
            {usedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Enter UsedBudget:
          <input
            type="number"
            value={usedBudget}
            onChange={(e) => setUsedBudget(e.target.value)}
            style={styles.input}
          />
        </label>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontSize: 'medium',
    maxWidth: '40%',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    width: '100%', 
    flexDirection: 'column',
  },
  label: {
    width:'50%',
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    padding: '10px',
    marginBottom: '10px',
  },
  input: {
    height: '40px',
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  button: {
    marginTop: '20px',
    color: '#fff',
    backgroundColor: '#44b5e6',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
};
export default BudgetUsed;
