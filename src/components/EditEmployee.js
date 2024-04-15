import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  // Extract the employee ID from the URL
  const { empid } = useParams();
  const navigate = useNavigate();

  // Initialize form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
    createdAt: "",
  });

  // Fetch employee data based on ID and populate the form
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/v1/singleEmployee/${empid}`);
        const employeeData = await response.json();

        // Prepopulate the form with the fetched data
        setFormData({
          name: employeeData.name,
          email: employeeData.email,
          mobileNumber: employeeData.mobileNumber,
          designation: employeeData.designation,
          gender: employeeData.gender,
          course: employeeData.course,
          image: null, // Assuming you may not want to prepopulate file input
          createdAt: employeeData.createdAt,
        });
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // Handle form field changes

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          course: [...prevData.course, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          course: prevData.course.filter((course) => course !== value),
        }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append form fields and file to the FormData object
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobileNumber", formData.mobileNumber);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", formData.course); // Join array items with comma
    formDataToSend.append("image", formData.image);

    try {
      // Send POST request with the FormData object
      const response = await fetch(`/api/v1/updateEmployee/${empid}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Error:", response.statusText);
      }
      navigate("/adminpanel");
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded-lg shadow-md"
    >
      {/* Name input */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Mobile Number input */}
      <div className="mb-4">
        <label htmlFor="mobileNumber" className="block mb-2">
          Mobile Number:
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Designation dropdown */}
      <div className="mb-4">
        <label htmlFor="designation" className="block mb-2">
          Designation:
        </label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Select designation</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Gender radio buttons */}
      <div className="mb-4">
        <label className="block mb-2">Gender:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              className="mr-2"
            />
            Other
          </label>
        </div>
      </div>

      {/* Course checkboxes */}
      <div className="mb-4">
        <label className="block mb-2">Course:</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="course"
              value="HTML"
              checked={formData.course.includes("HTML")}
              onChange={handleChange}
              className="mr-2"
            />
            HTML
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="course"
              value="CSS"
              checked={formData.course.includes("CSS")}
              onChange={handleChange}
              className="mr-2"
            />
            CSS
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="course"
              value="JavaScript"
              checked={formData.course.includes("JavaScript")}
              onChange={handleChange}
              className="mr-2"
            />
            JavaScript
          </label>
          {/* Add more checkboxes as needed */}
        </div>
      </div>

      {/* Image upload */}
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      {/* Submit button */}
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default EditEmployee;
