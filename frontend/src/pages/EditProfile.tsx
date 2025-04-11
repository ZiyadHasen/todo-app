import React from "react";

export default function EditProfile() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-700 rounded shadow">
      <h2 className="text-lg mb-4 dark:text-white">Edit Profile</h2>
      <form>
        <input
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          type="text"
          placeholder="Username"
        />
        <input
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          type="email"
          placeholder="Email"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
