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

  const user = userResponse.response[0];
  const phone = user?.phones[0];
  if (!phone || !user) {
    return { status: "error" };
  }

  const push: ISentPushResponse = await request.post(
    `/admin/v1/users/${user.user_id}/send_verification_push`,
    { phone_id: phone.phone_id },
  );

  const push_id = push.response.push_id;
  console.log(`${push_id} sent to ${user.alias1}'s ${phone.model}`);

  while (true) {
    await delay(1000);
    const pushResponse: IReceivedPushResponse = await request.get(
      `/admin/v1/users/${user.user_id}/verification_push_response`,
      { push_id },
    );

    const result = pushResponse.response.result;
    if (result === "approve") {
      console.log(`${push_id} approved by ${user.alias1}`);
      return { status: "approved" };
    }

    if (["deny", "fraud", "unknown error"].includes(result)) {
      console.log(`${push_id} denied by ${user.alias1}`);
      return { status: "denied" };
    }
  }
};
