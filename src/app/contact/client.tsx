"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";
import { Contact } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";


export default function ContactPageClient() {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <div className="relative min-h-[100dvh] grid place-items-center">
      <Image
        src="/assets/contact bg.jpg"
        alt="contact"
        fill
        className="object-cover brightness-[0.8] dark:brightness-[0.6] dark:grayscale-[50%]"
      />
      <div className="relative max-w-5xl mx-auto pt-16 p-4 md:pt-4">
        <Card>
          <CardContent className="space-y-8 py-12">
            <div className="grid md:grid-cols-3 gap-6 md:gap-16">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold capitalize">
                  find us
                </h3>
                <p className="font-light text-sm">
                  19352 Central East Area <br /> Avenue 1032 <br /> Washington,
                  DC, 90253
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold capitalize">
                  general contact
                </h3>
                <div className="flex flex-col">
                  <a
                    href="tel:+15555555555"
                    className="font-light text-sm hover:underline hover:text-blue-600"
                  >
                    +1 (555) 555-5555
                  </a>
                  <a
                    href="mailto:thevalidmail@gmail.xy"
                    className="font-light text-sm hover:underline hover:text-blue-600"
                  >
                    thevalidmail@gmail.xy
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold capitalize">
                  follow us
                </h3>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  className="block rounded-full text-gray-100 bg-blue-800 max-w-max p-2"
                >
                  <FaLinkedinIn className="text-4xl " />
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2/">
                <h3 className="text-4xl md:text-7xl font-bold capitalize text-balance">
                  submit an inquiry
                </h3>
              </div>
              <div className="md:w-1/2 space-y-10">
                <p className="text-sm font-light">
                  If you are a prospective client or team member and want to
                  connect or request more information, please contact one of our
                  partners.
                </p>
                <Button
                  type="button"
                  onClick={() => setShowForm((c) => !c)}
                  className="flex gap-2 items-center text-xl font-bold capitalize"
                >
                  <SiMinutemailer /> message us
                </Button>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div
              className={cn("grid transition-all duration-300 ease-in-out", {
                "grid-rows-[0fr]": !showForm,
                "grid-rows-[1fr]": showForm,
              })}
            >
              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const contactSchema = z.object({
  email: z.string().email(),
  title: z.string(),
  message: z.string(),
});

function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values);
  }
  return (
    <div className="overflow-hidden mx-auto max-w-2xl w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="sample@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
