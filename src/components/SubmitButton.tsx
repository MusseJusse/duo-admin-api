"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="h-full rounded bg-blue-500 px-4"
      type="submit"
      disabled={pending}
    >
      {pending ? "Sending" : "Send Push"}
      {pending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
    </Button>
  );
};
