"use client";
import BGGradient from "@/components/ui/bg-gradient";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[95dvh] grid place-items-center">
      <BGGradient />
      <div className="relative">
        <h3 className="text-[120px] font-black text-center">404</h3>
        <Image
          src="/assets/booking-404.png"
          alt="booking not found"
          width={300}
          height={300}
        />
        <p className="text-3xl font-semibold text-center">Booking not found</p>
      </div>
    </div>
  );
}
