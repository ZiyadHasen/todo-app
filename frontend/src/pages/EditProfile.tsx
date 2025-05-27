// src/components/EditProfileForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { CustomInputField } from "@/components/custom/CustomInputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { z } from "zod";
import { userSchemaModify } from "@/validationSchema";

export type UserFormValues = z.infer<typeof userSchemaModify>;

const EditProfileForm = () => {
  const { user, updateLocalUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchemaModify),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email || "",
        password: "",
        name: user.name || "",
        phone: user.phone || "",
        birthYear: user.birthYear ?? new Date().getFullYear(),
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      const payload: Partial<UserFormValues> = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        birthYear: data.birthYear,
      };
      if (data.password) payload.password = data.password;

      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/v1/users/update-user`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      const { user: updated } = await res.json(); // assume API returns { user: {…} }

      // 🏎️ Merge updated fields locally—no re‑fetch
      updateLocalUser(updated);

      toast.success("Profile updated successfully!");
      navigate("/app");
    } catch (err) {
      console.error(err);
      toast.error("Could not update profile.");
    }
  };

  return (
    <div className="font-josefin bg-bg-card mx-3 flex w-full max-w-sm flex-col self-start rounded-lg px-4 py-6 shadow-2xl lg:mx-auto lg:max-w-lg lg:px-6 lg:py-8">
      <h1 className="text-text-accent mb-6 text-center text-xl font-semibold lg:text-2xl">
        Modify User Information
      </h1>
      <form
        className="space-y-1.5 lg:space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInputField
          id="email"
          label="Email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <CustomInputField
          id="password"
          label="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <CustomInputField id="name" label="Name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}

        <CustomInputField
          id="phone"
          label="Phone"
          type="tel"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}

        <CustomInputField
          id="birthYear"
          label="Birth Year"
          type="number"
          {...register("birthYear", { valueAsNumber: true })}
        />
        {errors.birthYear && (
          <p className="text-sm text-red-500">{errors.birthYear.message}</p>
        )}

        <Button
          type="submit"
          className="bg-bg-accent hover:bg-accent/90 text-text-white mt-4 h-12 w-full cursor-pointer rounded-lg text-lg font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
