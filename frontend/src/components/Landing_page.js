import React, { useContext, useEffect, useState, useRef } from "react";
import ProjectContext from "../context/Contexts";
import "./Crud.css";
export default function Landing_page() {
  const context = useContext(ProjectContext);

  const {
    fetchDataFromBackend,
    employees,
    updateEmployee,
    deleteEmployee,
    insertEmployee,
    setEmployees,
    avgSalary,
    filteremployee,
  } = context;
  const [editbuttonstate, setEditbutton] = useState(false);
  const [showbuttonState, setShowbutton] = useState(false);
  const [newEmployee, setNewEmployee] = useState({});
  const [updateddata, setupdateddata] = useState(null);
  const [updatestate, setUpdatestate] = useState(-1);
  const [search, setsearch] = useState(null);
  const [searcharr, setsearchdata] = useState(null);
  const searchref = useRef();
  // const onclickhandle = (ele, index) => {
  //   console.log(ele);
  //   updateEmployee(ele, index);
  // };
  const Showbutton = () => {
    setShowbutton(!showbuttonState);
  };
  const onclickDelete = (index) => {
    console.log("On Click Delete");
    deleteEmployee(index);
  };
  const onchangehandle = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const onclickAdd = (e) => {
    console.log("you are here");
    insertEmployee(newEmployee);
  };
  function handleEdit(name) {
    //console.log(employees[name]);
    setupdateddata(employees[name]);
    setUpdatestate(name);
  }
  function handleEditpop(name) {
    setUpdatestate(name);
    console.log(name);
    setupdateddata(employees[name]);
    setEditbutton(!editbuttonstate);
    console.log("Here Updatestate is", name);
    //console.log("Edit button run")
  }
  function handleInput(e) {
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value });
    //console.log(updateddata);
  }
  function handlesubmit(e) {
    e.preventDefault();
    setupdateddata({ ...updateddata, [e.target.name]: e.target.value });
    console.log("You are here to submit");
    //console.log(updateddata);
    //console.log(updatestate);
    //  if (updatestate != -1)
    updateEmployee(updateddata, updatestate);
    setUpdatestate(-1);
    setEditbutton(!editbuttonstate);
  }

  function handlesearchchange(e) {
    console.log(e.target.value);
    setsearch(e.target.value);
  }
  function searchdata() {
    var val = searchref.current.value;
    console.log(val);
    var ind;
    if (search == "Age") {
      ind = 2;
      const newdata = employees.map((item, index) => {
        return item.age == val ? item : null;
      });
      console.log(newdata);
      setsearchdata(newdata);
    } else if (search == "Name") {
      let arr = val.split(" ");
      let val1 = arr[0]?.toLowerCase();
      let val2 = arr[1]?.toLowerCase();
      const newdata = employees.map((item, index) => {
        return item.firstname.toLowerCase() == val1 && item.lastname.toLowerCase() == val2
          ? item
          : null;
      });
      console.log(newdata);
      setsearchdata(newdata);
    } else if (search == "Salary") {
      ind = 4;
      const newdata = employees.map((item, index) => {
        return item.salary == val ? item : null;
      });
      console.log(newdata);
      setsearchdata(newdata);
    } else {
      ind = 5;
      const newdata = employees.map((item, index) => {
        return item.department === val ? item : null;
      });
      console.log(newdata);
      setsearchdata(newdata);
    }
  }

  useEffect(() => {
    fetchDataFromBackend();
    console.log(employees);
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent:"center", maxWidth: "100%", flexWrap: "wrap" }}>
        <div className="Header">
          <h1>Employee Management System</h1>
        </div>
        <div className="navbar">
          <div>
          <label
                htmlFor="selectedOption"
                className="select-label"
                style={{ color: "white" }}
              >
                Search by:{" "}
              </label>
            <select className="selectBar" onChange={handlesearchchange} name="search" id="Searchbarr">
              <option value="">Select</option>
              <option value="Name">By Name</option>
              <option value="Age">By Age</option>
              <option value="Salary">By Salary</option>
              <option value="Department">By Department</option>
            </select>
            {search && (
              <><input type="text" id="searchinput" ref={searchref} />
                <button
                  type="button"
                  className="button"
                  onClick={() => searchdata()}
                >
                  Search
                </button>
              </>)}
          </div>
            <div className="filterEmp">
              <label
                htmlFor="selectedOption"
                className="select-label"
                style={{ color: "white" }}
              >
                Filter by:{" "}
              </label>
            <select
              
                id="selectedOption"
                className="options selectBar"
                onChange={(e) => filteremployee(e.target.value)}
              >
                <option value="">Select</option>
                <option value="nameASC">Name Asc</option>
                <option value="nameDESC">Name Desc</option>
                <option value="SalaryASC">Salary ASC</option>
                <option value="SalaryDESC">Salary DESC</option>
              </select>
          </div>
          
          <p className="avg-text">
              Average Salary of Employees : {avgSalary.toFixed(2)}
          </p>
          
          </div>
          <div>
            <table>
              {searcharr &&
                searcharr.map((item, index) => {
                  return (
                    item != null && (
                      <tr>
                        <td>{item.firstname + " " + item.lastname}</td>
                        <td>{item.age}</td>
                        <td>{item.dob}</td>
                        <td>{item.salary}</td>
                        <td>{item.department}</td>
                        <td>
                    <button
                      className="edit"
                      onClick={() => handleEditpop(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => {
                        return onclickDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                      </tr>
                    )
                  );
                })}
            </table>
          </div>
        {showbuttonState && (
          <div className="modal">
            <h3>Add New Employee</h3>
            <form className="add-form" onSubmit={onclickAdd}>
              <input
                placeholder="First Name"
                className="add-input"
                type="text"
                name="firstname"
                value={newEmployee.firstname || ""}
                onChange={onchangehandle}
              />
              <input
                placeholder="Last Name"
                className="add-input"
                type="text"
                name="lastname"
                value={newEmployee.lastname || ""}
                onChange={onchangehandle}
              />
              <input
                placeholder="Age"
                className="add-input"
                type="number"
                name="age"
                value={newEmployee.age || ""}
                onChange={onchangehandle}
              />
              <input
                placeholder="Date of Birth"
                className="add-input"
                type="date"
                name="dob"
                value={newEmployee.dob || ""}
                onChange={onchangehandle}
              />
              <input
                placeholder="Salary"
                className="add-input"
                type="number"
                name="salary"
                value={newEmployee.salary || ""}
                onChange={onchangehandle}
              />
              <input
                placeholder="Department"
                className="add-input"
                type="text"
                name="department"
                value={newEmployee.department || ""}
                onChange={onchangehandle}
              />
              <button className="form-button" type="submit">
                Submit
              </button>
            </form>
            <button className="hide-form-button" onClick={Showbutton}>
              Cancel
            </button>
          </div>
        )}
        {editbuttonstate && (
          <div className="modal">
            <h3>Update Employee Form</h3>
            <form className="add-form" onSubmit={handlesubmit}>
              <input
                className="add-input"
                type="text"
                name="firstname"
                value={updateddata?.firstname}
                onChange={handleInput}
              />
              <input
                className="add-input"
                type="text"
                name="lastname"
                value={updateddata?.lastname}
                onChange={handleInput}
              />
              <input
                className="add-input"
                type="number"
                name="age"
                value={updateddata?.age}
                onChange={handleInput}
              />
              <input
                className="add-input"
                type="date"
                name="dob"
                value={updateddata?.dob}
                onChange={handleInput}
              />
              <input
                className="add-input"
                type="number"
                name="salary"
                value={updateddata?.salary}
                onChange={handleInput}
              />
              <input
                className="add-input"
                type="text"
                name="department"
                value={updateddata?.department}
                onChange={handleInput}
              />
              <button type="submit" className="form-button">
                Update
              </button>
            </form>
            <button className="hide-form-button" onClick={handleEditpop}>
              Cancel
            </button>
          </div>
        )}
        <div className="crud ">
          <h1> Employees details </h1>
          <br />
          {/* <form action=""> */}
          <table>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>DOB</td>
              <td>Salary</td>
              <td>Department</td>
              <td>Button</td>
            </tr>

            {employees &&
              employees.map((item, index) => (
                <tr>
                  <td className="td">{item.firstname + " " + item.lastname}</td>
                  <td>{item.age}</td>
                  <td>{item.dob}</td>
                  <td>{item.salary}</td>
                  <td>{item.department}</td>
                  {/* <td>{index}</td> */}
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEditpop(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => {
                        return onclickDelete(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
          {/* </form> */}
        </div>
        <div className="AddEmployeeContainer">
          <button className="AddEmployeeButton " onClick={Showbutton}>Add New Employee</button>
        </div>
        <br />
        </div>
      </>
      
  );
}
