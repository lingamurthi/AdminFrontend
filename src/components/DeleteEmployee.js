import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DeleteEmployee = () => {
  const { empid } = useParams();
  const [data1, setData1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/removeEmployee/${empid}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const data = await response.json();
          setData1(data.message);
        } else {
          throw new Error("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error removing employee:", error);
        setData1("Error: Failed to delete employee");
      }
    };

    fetchData();
  }, [empid]);

  return <div>{data1 !== null ? data1 : "Deleting employee..."}</div>;
};

export default DeleteEmployee;
