import ProjectContext from "./Contexts";
import React, { useState } from "react";

const path_to_backend = process.env.REACT_APP_BACKEND_URL;

export default function Project_states(props) {
  const [employees, setEmployees] = useState(null);
  const [avgSalary, setavgSalary] = useState(0);

  const fetchDataFromBackend = async () => {
    try {
      //console.log("here");
      const response = await fetch(`/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log(response);
      if (response.ok) {
        const data = await response.json();

        const Data = data.records;
        const totalSalary = Data.reduce((sum, currentemp) => {
          //average Salary
          return sum + parseInt(currentemp.salary);
        }, 0);
        setavgSalary(totalSalary / Data.length);

        setEmployees(data.records);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateEmployee = async (data, index) => {
    try {
      const response = await fetch(
        `/updateemployee/${index}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.records);
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteEmployee = async (index) => {
    try {
      const response = await fetch(
        `/deleteemployee/${index}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.records);
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const insertEmployee = async (data) => {
    try {
      const response = await fetch(`/addemployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEmployees(data.records);
      } else {
        console.error("Error inserting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };
  const filteremployee = (option) => {
    try {
      if (option == "SalaryASC") {
        console.log("your code reached at FIlter");
        const sortedEmployees = [...employees].sort(
          (a, b) => b.salary - a.salary
        );
        setEmployees(sortedEmployees);
      } else if (option == "SalaryDESC") {
        const sortedEmployees = [...employees].sort(
          (a, b) => a.salary - b.salary
        );
        setEmployees(sortedEmployees);
      } else if (option == "nameDESC") {
        const sortedEmployeesByNameDesc = [...employees].sort((a, b) => {
          // Compare first names
          const firstNameComparison = b.firstname.localeCompare(a.firstname);
          if (firstNameComparison !== 0) {
            return firstNameComparison;
          }

          // If first names are equal, compare last names
          return b.lastname.localeCompare(a.lastname);
        });
        setEmployees(sortedEmployeesByNameDesc);
      } else if (option == "nameASC") {
        const sortedEmployeesByNameAsc = [...employees].sort((a, b) => {
          // Compare first names
          const firstNameComparison = a.firstname.localeCompare(b.firstname);
          if (firstNameComparison !== 0) {
            return firstNameComparison;
          }

          // If first names are equal, compare last names
          return a.lastname.localeCompare(b.lastname);
        });
        setEmployees(sortedEmployeesByNameAsc);
      }
    } catch (error) {
      console.log("Error in filter");
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        fetchDataFromBackend,
        employees,
        updateEmployee,
        deleteEmployee,
        insertEmployee,
        filteremployee,
        avgSalary,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}
