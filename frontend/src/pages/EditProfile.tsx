import { CustomInputField } from "@/components/custom/CustomInputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function UserInfoForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    birthYear: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        password: "",
        name: user.name || "",
        phone: user.phone || "",
        birthYear: user.birthYear ? String(user.birthYear) : "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: {
      email: string;
      name: string;
      phone: string;
      birthYear: number;
      password?: string;
    } = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      birthYear: Number(formData.birthYear),
    };

    if (formData.password.trim() !== "") {
      payload.password = formData.password;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/update-user",
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error(`Update failed: ${response.status}`);

      toast.success("Profile updated successfully!");
      await refreshUser();

      // Redirect to /app after successful update
      navigate("/app");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Could not update profile.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-[#D375B9]">
          Modify User Information
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <CustomInputField
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
          />

          <div className="space-y-2">
            <CustomInputField
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="relative pr-10"
            />

            <button
              type="button"
              className="absolute right-1 -mt-10 flex items-center text-slate-400"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <CustomInputField
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <CustomInputField
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            placeholder="Enter your phone number"
          />

          <CustomInputField
            id="birthYear"
            label="Birth Year"
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            type="text"
            placeholder="Enter your birth year"
          />

          <Button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#D375B9] py-3 text-lg font-medium text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
