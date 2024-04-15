import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(true);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (registered) {
      try {
        const response = await fetch("api/v1/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, username, password }), // Include id field in the body
        });
        const data = await response.json();

        if (data.error) {
          setErrors(data.error);
        }
        if (!data?.message) {
          throw new Error("Registration failed");
        }

        // Reset form fields after successful submission
        setId("");
        setUsername("");
        setPassword("");

        setSuccess(data?.message);
        setRegistered(false);
      } catch (error) {
        console.error("Error:", error.message);
        // Handle error, e.g., display error message to the user
      }
    } else {
      try {
        const response = await fetch("api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Include id field in the body
        });
        const data = await response.json();

        if (data.error) {
          setErrors(data.error);
        }

        if (!data?.message) {
          throw new Error("Login failed");
        }

        // Reset form fields after successful submission
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt", JSON.stringify(data.data.accessToken));
        }
        setId("");
        setUsername("");
        setPassword("");

        setSuccess(data?.message);

        navigate("/adminpanel");
      } catch (error) {
        console.error("Error:", error.message);
        // Handle error, e.g., display error message to the user
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300"
      >
        <h2 className="text-center mb-4">
          {registered ? "Register Form" : "Login Form"}
        </h2>
        {registered && (
          <>
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ID:
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {registered ? "Register" : "Login"}
          </button>
          <div>
            <h2 className="bg-green-500">{success}</h2>
            {success && <h2>You can login now</h2>}
          </div>
          {errors && <div>{errors}</div>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
