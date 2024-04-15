import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import AdminPanel from "./components/AdminPanel";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import DeleteEmployee from "./components/DeleteEmployee.js";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RegisterForm />,
  },
  {
    path: "/adminpanel",
    element: <AdminPanel />,
  },
  {
    path: "/CreateEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/DeleteEmployee/:empid",
    element: <DeleteEmployee />,
  },
  {
    path: "/EditEmployee/:empid",
    element: <EditEmployee />,
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
