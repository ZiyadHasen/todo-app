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
  const { user, refreshUser } = useAuth();
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
      navigate("/app");
    } catch (error) {
      console.error(error);
      toast.error("Could not update profile.");
    }
  };

  return (
    <div className="font-josefin bg-background-default mx-3 flex w-full max-w-sm flex-col self-start rounded-lg px-4 py-6 shadow-2xl lg:mx-auto lg:max-w-lg lg:px-6 lg:py-8">
      <h1 className="text-text-primary mb-6 text-center text-xl font-semibold lg:text-2xl">
        Modify User Information
      </h1>
      <form
        className="space-y-1.5 lg:space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInputField
          id="email"
          label="Email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}

        <CustomInputField
          id="password"
          label="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}

        <CustomInputField id="name" label="Name" {...register("name")} />
        {errors.name && (
          <p className="text-error text-sm">{errors.name.message}</p>
        )}

        <CustomInputField
          id="phone"
          label="Phone"
          type="tel"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-error text-sm">{errors.phone.message}</p>
        )}

        <CustomInputField
          id="birthYear"
          label="Birth Year"
          type="number"
          {...register("birthYear", { valueAsNumber: true })}
        />
        {errors.birthYear && (
          <p className="text-error text-sm">{errors.birthYear.message}</p>
        )}

        <Button
          type="submit"
          className="bg-accent hover:bg-accent/90 text-text-inverted mt-4 h-12 w-full cursor-pointer rounded-lg text-lg font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfileForm;
