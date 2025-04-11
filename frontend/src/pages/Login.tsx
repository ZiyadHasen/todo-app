import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-xs p-6 bg-white dark:bg-gray-700 shadow rounded">
        <h1 className="text-2xl mb-4 text-center dark:text-white">Login</h1>
        <form>
          <input
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            type="email"
            placeholder="Email"
          />
          <input
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center dark:text-white">
          No account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
