import BookingForm from "@/components/bookings/form/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getHandler, getHandlers } from "@/lib/actions/handlers";
import { decrypt } from "@/lib/utils/encrypt";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";
import BGGradient from "@/components/ui/bg-gradient";
import { Metadata } from "next";
import { handlerProfileImageString } from "@/lib/utils/utils";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  try {
    const handler = await getHandler(id);
    if (!handler) throw new Error("handler not found");
    const imageString = handlerProfileImageString(handler.profilePicture);

    return {
      title: `Travelist - Book with ${handler.displayName}`,
      description: `Book your booking with ${handler.displayName}`,
      openGraph: {
        images: [imageString],
      },
    };
  } catch (error) {
    console.error("meta data error occured");
    console.error(error);
    return {
      title: `Travelist`,
      description: "booking",
    };
  }
}

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
    console.error("handler not found");
    notFound();
  }
  return (
    <>
      <BGGradient />
      <div className="mx-auto max-w-lg space-y-8 min-h-[95dvh] grid place-items-center">
        <Card className="relative">
          <CardHeader>
            <CardDescription>
              <Link
                href="/booking"
                className="capitalize flex gap-2 items-center max-w-max"
              >
                <ArrowLeft /> back to bookings
              </Link>
            </CardDescription>
            <h3 className="text-xl md:text-3xl font-bold">
              Schedule a booking with {handler.displayName}
            </h3>
          </CardHeader>
          <CardContent>
            <BookingForm
              handlerId={params.id}
              handlerName={handler.displayName}
              storedPhoneNumber={phoneNumber}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default BookingPersonPage;
