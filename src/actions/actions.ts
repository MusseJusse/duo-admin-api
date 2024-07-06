"use server";

import { z } from "zod";
import { request } from "../utils/duo";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendPush = async (
  state: { status: string } | undefined,
  formdata: FormData,
) => {
  if (!state) {
    state = { status: "" }; // or any default value
  }

  const form = Object.fromEntries(formdata.entries());
  const { email } = z.object({ email: z.string() }).parse(form);

  const userResponse = await request.get("/admin/v1/users", {
    email,
  });

  if (userResponse["response"].length == 0) {
    console.log(`${email} not found`);
    return { status: "error" };
  }

  const user = userResponse["response"][0];
  const user_id = user["user_id"];
  const phone_id = user["phones"][0]["phone_id"];

  const push = await request.post(
    `/admin/v1/users/${user_id}/send_verification_push`,
    { phone_id },
  );

  const push_id = push["response"]["push_id"];
  console.log(push_id);
  console.log(`push sent to ${user["alias1"]}'s ${user["phones"][0]["model"]}`);

  let approved = false;
  let denied = false;

  while (!approved && !denied) {
    await delay(1000);
    const pushResponse = await request.get(
      `/admin/v1/users/${user_id}/verification_push_response`,
      { push_id },
    );

    const result = pushResponse["response"]["result"];
    console.log(result);
    if (result == "approve") {
      approved = true;
      return { status: "approved" };
    }
    if (result == "deny" || result == "fraud" || result == "unknown error") {
      denied = true;
      return { status: "denied" };
    }
  }
};
