import React, { useState } from "react";
import ModalBookings from "./modal";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";
import { getHandler } from "@/lib/actions/handlers";

async function BookingModalPage({ params }: { params: { id: string } }) {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  const handler = await getHandler(params.id);
  if (!handler) {
    throw new Error("handler not found");
  }

  return (
    <ModalBookings
      phoneNumber={phoneNumber}
      handlerName={handler?.displayName}
      handlerId={params.id}
    />
  );
}

export default BookingModalPage;
