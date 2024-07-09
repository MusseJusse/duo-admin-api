"use client";

import { useFormState } from "react-dom";
import { sendPush } from "../actions/actions";
import { SubmitButton } from "./SubmitButton";
import { toast } from "sonner";
import { useEffect } from "react";

export const EmailForm = () => {
  const [{ status }, formAction] = useFormState(sendPush, { status: "" });

  useEffect(() => {
    switch (status) {
      case "approved":
        toast.success("Approved", { duration: 3000 });
        break;
      case "denied":
        toast.warning("Denied", { duration: 3000 });
        break;
      case "input error":
        toast.error("Email required", { duration: 1000 });
        break;
      case "error":
        toast.error("User not found", { duration: 3000 });
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <form action={formAction} className="flex h-10 gap-4">
      <input
        name="email"
        type="text"
        required
        placeholder="Email"
        className="h-full w-72 rounded border p-4 text-black"
      ></input>
      <SubmitButton />
    </form>
  );
};
