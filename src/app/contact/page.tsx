import { Metadata } from "next";
import ContactPageClient from "./client";

export const metadata: Metadata = {
  title: "Travelist - Contact Us",
  description: "Book your travelist",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
