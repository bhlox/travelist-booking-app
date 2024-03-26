import React, { useState } from "react";
import ModalBookings from "./modal";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/utils/encrypt";

async function BookingModalPage({ params }: { params: { person: string } }) {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  // console.log("booking modal page");
  return (
    <ModalBookings phoneNumber={phoneNumber} selectedPerson={params.person} />
  );
}

export default BookingModalPage;
