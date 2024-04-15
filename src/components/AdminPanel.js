import React, { useState } from "react";
import EmployeeList from "./EmployeeList";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [empData1, setEmpData1] = useState([]);

  const handleClick = async () => {
    try {
      const data = await fetch("api/v1/employeeList");
      const jsondata = await data?.json();

      setEmpData1(jsondata);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickEmployeeList = () => {
    navigate("/CreateEmployee");
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("jwt");
      const response = await fetch("api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      });
      const data = await response.json();
      if (data.message) {
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button
          className="bg-cyan-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClick}
        >
          EmployeeList
        </button>
        <button
          className="bg-cyan-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleClickEmployeeList}
        >
          CreateEmployeeList
        </button>
        <button
          className="bg-cyan-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
      <EmployeeList empdata={empData1} />
    </div>
  );
};

export default AdminPanel;
