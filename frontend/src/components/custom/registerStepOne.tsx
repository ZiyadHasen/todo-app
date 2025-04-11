import React from "react";
import { Link } from "react-router-dom";

interface RegisterStepOneProps {
  onNext: () => void;
}

const RegisterStepOne: React.FC<RegisterStepOneProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full p-6 bg-white dark:bg-gray-700 shadow rounded">
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
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default RegisterStepOne;
