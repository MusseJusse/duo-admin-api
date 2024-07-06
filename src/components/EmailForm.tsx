"use client";

import { useFormState } from "react-dom";
import { sendPush } from "../actions/actions";
import { SubmitButton } from "./submit";
import { toast } from "sonner";
import { useEffect } from "react";

export const EmailForm = () => {
  const [state, formAction] = useFormState(sendPush, { status: null });

  useEffect(() => {
    if (state == undefined) {
    } else if (state.status == "approved") {
      toast.success("Approved");
    } else if (state.status == "denied") {
      toast.warning("Denied");
    } else if (state.status == "error") {
      toast.error("User not found");
    }
  }, [state]);

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
