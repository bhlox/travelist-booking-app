"use client";
import PersonList from "@/components/bookings/person-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reviewsData } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function ClientBookingsPage({
  storedPhoneNumber,
  handlers,
}: {
  storedPhoneNumber: string | undefined;
  handlers: {
    id: string;
    displayName: string;
    description: string | null;
    profilePicture: string;
  }[];
}) {
  return (
    <>
      <StaffSection handlers={handlers} />
      <ReviewsSection />
      <FAQSection />
    </>
  );
}

function StaffSection({
  handlers,
}: {
  handlers: {
    id: string;
    displayName: string;
    description: string | null;
    profilePicture: string;
  }[];
}) {
  return (
    <section
      id="staff"
      className="space-y-6 bg-gradient-to-b from-gray-300 to-gray-50 dark:from-neutral-950 dark:to-neutral-800"
    >
      <div className="max-w-screen-2xl mx-auto px-4 pt-24 space-y-8">
        <h3 className="text-3xl md:text-6xl font-bold max-w-3xl">
          Every one of our consultants is unique, but we are united by our
          passion for solving problems and helping our clients succeed.
        </h3>
        <PersonList handlers={handlers} />
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24 space-y-12">
        <h3 className="text-3xl md:text-6xl font-bold capitalize">
          what our customers are saying
        </h3>
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent className="md:-ml-24">
            {reviewsData.map((data, ind) => (
              <CarouselItem
                key={`carousel-item-${ind}`}
                className="md:basis-1/3 md:pl-6 basis-full"
              >
                <Card>
                  <CardHeader>
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-A400 dark:text-gray-600 fill-current"
                    >
                      <path
                        d="M24 7.3h-5.1L22.3.4H17l-3.4 6.9v10.3H24V7.3zM10.3 17.6V7.3H5L8.6.4H3.4L0 7.3v10.3h10.3z"
                        fill="current"
                      />
                    </svg>
                  </CardHeader>
                  <CardContent className="">{data.review}</CardContent>
                  <CardFooter>{data.name}</CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-center gap-2 md:gap-4">
            {reviewsData.map((_, ind) => (
              <button
                key={`carousel-circle-${ind}`}
                onClick={() => api?.scrollTo(ind)}
                className={cn(
                  "size-4 rounded-full bg-gray-400 dark:bg-gray-300",
                  null,
                  {
                    "bg-purple-600 dark:bg-purple-600":
                      ind + 1 === currentSlide,
                  }
                )}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-gray-50 to-gray-300 dark:from-neutral-800 dark:to-neutral-900"
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-16 space-y-12">
        <h3 className="text-3xl md:text-6xl font-bold capitalize text-center max-w-2xl mx-auto">
          frequently asked questions
        </h3>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ClientBookingsPage;
