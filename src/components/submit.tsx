"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="h-full rounded bg-blue-500 px-4"
      type="submit"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Push"}
    </Button>
  );
};
