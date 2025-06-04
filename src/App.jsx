import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import AuthProvider from "./providers/Auth/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
