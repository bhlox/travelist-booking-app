import BookingForm from "@/components/bookings/form/form";
import { getHandler, getHandlers } from "@/lib/actions/handlers";
import { decrypt } from "@/lib/utils/encrypt";
import { cookies } from "next/headers";
import React from "react";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await getHandlers();
  return ids.map((person) => ({
    id: person.id,
  }));
}

async function BookingPersonPage({ params }: { params: { id: string } }) {
  let phoneNumber = cookies().get("pn")?.value;
  if (phoneNumber) {
    phoneNumber = decrypt(phoneNumber);
  }
  const handler = await getHandler(params.id);
  if (!handler) {
    throw new Error("handler not found");
  }
  return (
    <div className="pt-16 mx-auto max-w-lg space-y-8">
      <h3 className="text-xl md:text-3xl font-bold">
        Schedule a booking with {handler.displayName}
      </h3>
      <BookingForm
        handlerId={params.id}
        handlerName={handler.displayName}
        storedPhoneNumber={phoneNumber}
        bookingToBeUpdated={undefined}
      />
    </div>
  );
}

export default BookingPersonPage;
