"use server";

import { z } from "zod";
import { request } from "../utils/duo";
import { IUserResponse } from "~/interfaces/IUserResponse";
import { ISentPushResponse } from "~/interfaces/ISentPushResponse";
import { IReceivedPushResponse } from "~/interfaces/IReceivedPushResponse";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendPush = async (
  state: { status: string } | undefined,
  formdata: FormData,
) => {
  const form = Object.fromEntries(formdata.entries());
  const parseResult = z.object({ email: z.string().email() }).safeParse(form);

  if (!parseResult.success) {
    return { status: "input error" };
  }

  const { email } = parseResult.data;

  const userResponse: IUserResponse = await request.get("/admin/v1/users", {
    email,
  });

  if (userResponse.response.length == 0) {
    console.log(`${email} not found`);
    return { status: "error" };
  }

  const user_id = userResponse.response[0]?.user_id;
  const phone_id = userResponse.response[0]?.phones[0]?.phone_id;

  const push: ISentPushResponse = await request.post(
    `/admin/v1/users/${user_id}/send_verification_push`,
    { phone_id },
  );

  const push_id = push.response.push_id;
  console.log(
    `${push_id} sent to ${userResponse.response[0]?.alias1}'s ${userResponse.response[0]?.phones[0]?.model}`,
  );

  let approved = false;
  let denied = false;

  while (!approved && !denied) {
    await delay(1000);
    const pushResponse: IReceivedPushResponse = await request.get(
      `/admin/v1/users/${user_id}/verification_push_response`,
      { push_id },
    );

    const result = pushResponse.response.result;
    if (result == "approve") {
      approved = true;
      console.log(`${push_id} approved by ${userResponse.response[0]?.alias1}`);
      return { status: "approved" };
    }

    if (result == "deny" || result == "fraud" || result == "unknown error") {
      denied = true;
      console.log(`${push_id} denied by ${userResponse.response[0]?.alias1}`);
      return { status: "denied" };
    }
  }
};
