"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSecureCookiePN } from "@/lib/actions/bookings";

export default function Buts({ id, phone }: { id: number; phone: string }) {
  const router = useRouter();
  return (
    <Button asChild>
      <Link
        scroll={false}
        onClick={() => createSecureCookiePN(phone)}
        href={`/my-bookings/${id}/edit`}
      >
        Edit
      </Link>
    </Button>
  );
}
