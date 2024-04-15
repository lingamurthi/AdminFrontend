import React from "react";
import { Link } from "react-router-dom";

const EmployeeList = ({ empdata }) => {
  return (
    <div className="flex justify-center">
      <table className="w-full border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border border-gray-300">Unique Id</th>
            <th className="py-2 px-4 border border-gray-300">Image</th>
            <th className="py-2 px-4 border border-gray-300">Name</th>
            <th className="py-2 px-4 border border-gray-300">Email</th>
            <th className="py-2 px-4 border border-gray-300">Mobile Number</th>
            <th className="py-2 px-4 border border-gray-300">Designation</th>
            <th className="py-2 px-4 border border-gray-300">Gender</th>
            <th className="py-2 px-4 border border-gray-300">Course</th>
            <th className="py-2 px-4 border border-gray-300">Create Date</th>
            <th className="py-2 px-4 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {empdata?.map((employee, index) => (
            <tr
              key={employee?._id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td className="py-2 px-4 border border-gray-300">
                {employee?._id}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <img
                  src={employee?.image}
                  alt={employee?.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.name}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.email}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.mobileNumber}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.designation}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.gender}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.course}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {employee?.createdAt}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {/* Add your actions here */}
                <Link
                  to={"/EditEmployee/" + employee?._id} // Link to edit page with employee _id
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </Link>

                <Link
                  to={"/DeleteEmployee/" + employee?._id} // Link to edit page with employee _id
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
