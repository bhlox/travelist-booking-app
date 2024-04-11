"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import StylishBtn from "@/components/ui/stylish-btn";
import SectionTransition from "@/components/section-transition";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travelist",
  description: "A key to a better travel",
};

export default function HomePageClient() {
  return (
    <>
      <HeroBanner />
      <Section1 />
      <Section2 />
      <ClientsSection />
      <CTASection />
    </>
  );
}

function HeroBanner() {
  return (
    <section className="relative min-h-[100dvh]">
      <Image
        src="/assets/hero 1.jpg"
        alt="hero"
        fill
        className="object-cover brightness-[0.8] grayscale-[10%] dark:brightness-[0.6] dark:grayscale-[50%]"
      />
      <div className="grid place-items-center relative max-w-7xl mx-auto px-4 min-h-[100dvh] md:text-6xl font-bold text-4xl text-balance text-center">
        <div className="space-y-4">
          <h3>
            Lorem ipsum dolor sit. <br />
          </h3>
          <h4> Lorem ipsum dolor sit, amet consectetur adipisicing.</h4>
        </div>
      </div>
    </section>
  );
}

function Section1() {
  return (
    <section className=" bg-gradient-to-b from-gray-300 to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="space-y-4 md:w-3/4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, easings: "easeInOut" },
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h4 className="text-5xl md:text-7xl font-bold text-balance capitalize max-w-lg">
              Guided by travelist
            </h4>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{
              scale: 1,
              transition: { duration: 0.3, easings: "easeInOut" },
            }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="relative w-full h-96 md:h-[42rem]">
              <Image
                src="/assets/image 2.jpg"
                alt="first"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: -100, scale: 0, opacity: 0 }}
          whileInView={{
            scale: 1,
            y: 0,
            opacity: 100,
            transition: { duration: 0.3, easings: "easeInOut" },
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="md:max-w-md grid place-items-center"
        >
          <div className="space-y-6 md:space-y-8 leading-loose">
            <p className="text-xl md:text-2xl font-extralight">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatum amet et neque quidem ipsa vitae beatae, esse sequi
              expedita ullam fuga!
            </p>
            <StylishBtn content="Learn more" href="/booking" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

function Section2() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-300 dark:from-neutral-900 dark:to-neutral-950">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24 space-y-12">
        <h3 className="text-5xl md:text-7xl font-bold text-balance capitalize">
          our value proposition
        </h3>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-3 gap-10 md:gap-6"
        >
          <motion.div variants={item} className="space-y-4">
            <Image
              src="/assets/persons 1.jpg"
              alt="person"
              width={600}
              height={600}
            />
            <div>
              <h4 className="text-xl md:text-2xl font-semibold capitalize">
                top tier professionals
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corrupti velit ut dolorum, qui quaerat quasi reprehenderit
                accusantium?
              </p>
            </div>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <Image
              src="/assets/persons 2.jpg"
              alt="person"
              width={600}
              height={600}
            />
            <div>
              <h4 className="text-xl md:text-2xl font-semibold capitalize">
                deep client partnership
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corrupti velit ut dolorum, qui quaerat quasi reprehenderit
                accusantium?
              </p>
            </div>
          </motion.div>
          <motion.div variants={item} className="space-y-4">
            <Image
              src="/assets/persons 3.jpg"
              alt="person"
              width={600}
              height={600}
            />
            <div>
              <h4 className="text-xl md:text-2xl font-semibold capitalize">
                commitment to client returns
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corrupti velit ut dolorum, qui quaerat quasi reprehenderit
                accusantium?
              </p>
            </div>
          </motion.div>
        </motion.div>
        <div className="flex justify-center">
          <Link
            href="/booking#faq"
            className="text-lg md:text-xl font-medium flex items-center gap-2 hover:underline group"
          >
            Read more on our approach{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="space-y-2 bg-gradient-to-b from-gray-300 to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24 space-y-3 text-center">
        <h3 className="text-5xl md:text-7xl font-bold text-balance capitalize">
          our clients
        </h3>
        <p className="max-w-lg text-xl md:text-2xl font-light mx-auto text-balance">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quasi
          veritatis!
        </p>
      </div>
      <Carousel
        opts={{ loop: true }}
        plugins={[
          AutoScroll({ speed: 1, playOnInit: true, stopOnInteraction: false }),
        ]}
        onClick={(e) => e.preventDefault()}
      >
        <CarouselContent
          className="md:-ml-24 -ml-12"
          onClick={(e) => e.preventDefault()}
        >
          {Array.from({ length: 9 }).map((_, ind) => (
            <CarouselItem
              key={ind}
              className="md:basis-[13%] basis-1/3 relative h-12 pl-24 md:pl-6"
              onClick={(e) => e.preventDefault()}
            >
              <Image
                src={`/assets/client ${ind + 1}.png`}
                alt={`client ${ind + 1}`}
                fill
                className="object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-900">
      <div className="px-4 py-16 md:py-24 md:px-0 flex flex-col md:flex-row gap-1 md:gap-8 md:items-center">
        <div className="space-y-3 md:w-2/3">
          <h3 className="text-3xl md:text-7xl md:hidden font-bold text-balance capitalize">
            the right track
          </h3>
          <div className="relative w-full h-96 md:h-[36rem]">
            <Image
              src="/assets/image 4.jpg"
              alt="yes"
              fill
              className="rounded-tr-[200px] md:rounded-tr-full object-cover"
            />
          </div>
        </div>
        <div className="grid md:place-items-center max-w-sm space-y-5 md:space-y-9">
          <div className="space-y-4">
            <h3 className="hidden md:block md:text-5xl font-bold text-balance capitalize">
              the right track
            </h3>
            <p className="text-lg md:text-xl font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, aut
              et quaerat nemo nam quae!
            </p>
          </div>
          <StylishBtn content="get started" href="/booking" />
        </div>
      </div>
    </section>
  );
}
