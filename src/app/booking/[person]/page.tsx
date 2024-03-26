import BookingForm from "@/components/bookings/form/form";
import { personsInCharge } from "@/lib/constants";
import { decrypt } from "@/lib/utils/encrypt";
import { cookies } from "next/headers";
import React from "react";

export const dynamicParams = false;

export function generateStaticParams() {
  return personsInCharge.map((person) => ({
    person: person.name,
  }));
}

async function BookingPersonPage({ params }: { params: { person: string } }) {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  return (
    <div className="pt-16 mx-auto max-w-lg space-y-8">
      <h3 className="text-xl md:text-3xl font-bold">
        Schedule a booking with {params.person}
      </h3>
      <BookingForm
        selectedPerson={params.person}
        storedPhoneNumber={phoneNumber}
        bookingToBeUpdated={undefined}
      />
    </div>
  );
}

export default BookingPersonPage;
