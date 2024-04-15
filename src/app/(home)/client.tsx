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
import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

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
      <div className="grid place-items-center relative max-w-7xl mx-auto px-4 min-h-[100dvh] text-balance text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              easings: "easeInOut",
              delay: 0.07,
            },
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-4"
        >
          {/* <TestSVG /> */}
          <h3 className="md:text-lg">
            Expert-guided bookings for seamless travel experiences.
            <br />
          </h3>
          <h4 className="md:text-6xl font-bold text-4xl capitalize">
            Your journey, perfected.
          </h4>
        </motion.div>
      </div>
    </section>
  );
}

function Section1() {
  const [trigger, setTrigger] = useState(false);
  const { width } = useWindowSize();
  return (
    <section className=" bg-gradient-to-b from-gray-300 to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-screen-2xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row gap-6 md:gap-16">
        <div className="space-y-4 md:w-3/4">
          {trigger && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  easings: "easeInOut",
                  delay: 0.07,
                },
              }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h4 className="text-5xl md:text-7xl font-bold text-balance capitalize max-w-lg">
                Guided by travelist
              </h4>
            </motion.div>
          )}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{
              scale: 1,
              transition: { duration: 0.3, easings: "easeInOut" },
            }}
            onViewportEnter={() => setTrigger(true)}
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
        {trigger && (
          <motion.div
            initial={
              (width ?? 0) < 769
                ? { y: -100, opacity: 0 }
                : { x: -100, opacity: 0 }
            }
            whileInView={
              (width ?? 0) < 769
                ? {
                    y: 0,
                    opacity: 100,
                    transition: {
                      duration: 0.3,
                      easings: "easeInOut",
                      delay: 0.07,
                    },
                  }
                : {
                    x: 0,
                    opacity: 100,
                    transition: {
                      duration: 0.3,
                      easings: "easeInOut",
                      delay: 0.07,
                    },
                  }
            }
            viewport={{ once: true, amount: 0.4 }}
            className="md:max-w-md grid place-items-center"
          >
            <div className="space-y-6 md:space-y-8 leading-loose">
              <p className="text-xl md:text-2xl font-extralight">
                Travelist meets unparalleled expertise. Our dedicated team of
                advisors is committed to crafting unforgettable travel
                experiences tailored to your preferences and desires.
              </p>
              <StylishBtn content="Learn more" href="/booking" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
                A team of elite experts renowned for their exceptional skills,
                industry-leading knowledge, and unwavering commitment to
                excellence.
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
                Cultivating meaningful and collaborative relationships with
                clients to achieve shared goals and long-term success.
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
                Our dedication to maximizing client returns through strategic
                planning and meticulous execution.
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
          Travelist serves leading travel companies including Airbnb, Booking,
          and high-growth disruptors.
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
              Guiding you towards success with precision, clarity, and
              unwavering dedication.
            </p>
          </div>
          <StylishBtn content="get started" href="/booking" />
        </div>
      </div>
    </section>
  );
}

function TestSVG() {
  return (
    <motion.svg
      width="238.672"
      height="78.321"
      viewBox="0 0 238.672 78.321"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        stroke-linecap="round"
        fill-rule="evenodd"
        font-size="9pt"
        stroke="#000"
        stroke-width="0.25mm"
        fill="none"
        // style={{"stroke:#000;stroke-width:0.25mm;fill:#000"}}
      >
        <path
          pathLength="1"
          stroke-dasharray="1 1"
          // // initial={{ pathLength: 0, pathOffset: 0 }}
          // // animate={{ pathLength: 5, pathOffset: 1 }}
          // initial={{ pathLength: 0, path }}
          // animate={{ pathLength: 1 }}
          // transition={{
          //   duration: 2,
          //   ease: "easeInOut",
          //   repeat: Infinity,
          //   repeatType: "loop",
          //   repeatDelay: 1,
          // }}
          // fillOpacity={1}
          // // strokeWidth={4}
          // // strokeDasharray="0 1"
          // // fill="none"
          d="M 24.414 75.318 A 6.309 6.309 0 0 0 26.247 76.621 Q 28.166 77.539 31.055 77.539 A 10.518 10.518 0 0 0 34.619 76.929 A 14.301 14.301 0 0 0 37.842 75.293 A 18.48 18.48 0 0 1 37.604 73.966 A 14.993 14.993 0 0 1 37.451 71.875 A 7.354 7.354 0 0 1 37.48 71.209 A 5.587 5.587 0 0 1 37.598 70.459 A 33.813 33.813 0 0 1 37.639 70.294 Q 38.868 65.386 41.797 59.888 A 118.241 118.241 0 0 1 43.751 56.368 A 139.031 139.031 0 0 1 48.706 48.438 Q 52.637 42.578 56.763 36.768 A 378.73 378.73 0 0 0 59.035 33.532 A 325.734 325.734 0 0 0 64.404 25.562 A 116.523 116.523 0 0 0 64.626 25.22 Q 67.99 20.018 70.117 15.503 Q 71.43 12.716 71.959 10.339 A 13.922 13.922 0 0 0 72.314 7.325 A 6.813 6.813 0 0 0 72.192 5.999 A 4.896 4.896 0 0 0 71.509 4.273 Q 70.93 3.378 69.733 3.126 A 5.02 5.02 0 0 0 68.701 3.028 A 4.896 4.896 0 0 0 67.797 3.114 Q 67.035 3.257 66.235 3.638 A 9.625 9.625 0 0 0 64.868 4.444 Q 63.665 5.284 62.729 6.074 A 18.459 18.459 0 0 0 61.572 7.129 Q 62.402 8.203 62.964 9.449 Q 63.525 10.694 63.525 12.061 A 3.143 3.143 0 0 1 63.522 12.204 Q 63.507 12.533 63.428 13.086 A 35.357 35.357 0 0 1 62.378 16.821 A 44.506 44.506 0 0 1 60.327 21.802 A 83.513 83.513 0 0 1 60.053 22.367 A 90.84 90.84 0 0 1 55.322 30.811 A 173.683 173.683 0 0 1 49.512 39.453 A 3557.074 3557.074 0 0 1 46.643 43.445 A 2783.32 2783.32 0 0 1 43.994 47.119 Q 41.016 51.221 38.135 55.347 A 139.211 139.211 0 0 0 32.666 63.819 Q 32.031 63.721 31.372 63.672 A 9.003 9.003 0 0 0 30.707 63.648 A 9.507 9.507 0 0 0 30.029 63.672 Q 27.051 56.104 25.732 48.023 A 275.689 275.689 0 0 1 23.584 31.885 Q 23.428 30.277 23.218 28.448 A 268.721 268.721 0 0 0 22.803 25.049 Q 22.314 21.241 21.338 17.383 A 35.011 35.011 0 0 0 21.014 16.193 A 30.78 30.78 0 0 0 18.628 10.279 A 17.63 17.63 0 0 0 18.179 9.486 A 14.964 14.964 0 0 0 14.136 5.03 A 10.161 10.161 0 0 0 10.369 3.358 A 14.189 14.189 0 0 0 7.227 3.028 A 4.827 4.827 0 0 0 6.3 3.119 Q 4.79 3.413 3.223 4.663 Q 1.941 5.686 1.003 6.622 A 15.656 15.656 0 0 0 0 7.715 A 44.222 44.222 0 0 1 1.421 8.587 A 38.594 38.594 0 0 1 5.981 11.988 A 17.145 17.145 0 0 1 7.886 13.939 A 20.007 20.007 0 0 1 10.4 17.823 A 44.641 44.641 0 0 1 11.695 20.657 A 49.18 49.18 0 0 1 14.795 31.714 A 231.498 231.498 0 0 1 15.369 35.451 A 203.507 203.507 0 0 1 16.65 46.241 A 1183.785 1183.785 0 0 0 16.925 49.076 A 1328.415 1328.415 0 0 0 17.822 57.911 A 44.85 44.85 0 0 0 17.919 58.758 A 39.886 39.886 0 0 0 20.654 69.239 A 28.819 28.819 0 0 0 21.178 70.418 Q 22.606 73.448 24.414 75.318 Z M 198.779 32.544 A 1790.745 1790.745 0 0 0 202.002 16.7 Q 202.393 14.649 202.71 12.549 A 28.057 28.057 0 0 0 203.027 8.35 A 15.33 15.33 0 0 0 202.976 7.085 A 12.692 12.692 0 0 0 201.782 2.588 Q 200.537 0 196.777 0 Q 194.971 0 192.993 0.782 A 40.031 40.031 0 0 0 191.119 1.575 A 30.384 30.384 0 0 0 189.453 2.393 A 18.944 18.944 0 0 1 192.773 13.379 A 96.354 96.354 0 0 1 192.041 25.244 A 489.968 489.968 0 0 1 190.43 37.061 A 1534.538 1534.538 0 0 1 187.476 56.372 A 331.293 331.293 0 0 1 183.838 75.537 A 11.69 11.69 0 0 0 184.753 76.198 A 14.634 14.634 0 0 0 186.108 76.978 A 6.664 6.664 0 0 0 186.875 77.311 A 5.276 5.276 0 0 0 188.672 77.637 A 4.336 4.336 0 0 0 188.677 77.637 Q 190.773 77.634 191.821 75.611 A 19.354 19.354 0 0 0 192.574 73.984 A 15.273 15.273 0 0 0 193.311 71.68 Q 197.168 74.024 201.294 76.075 A 19.744 19.744 0 0 0 210.205 78.125 A 29.702 29.702 0 0 0 214.461 77.83 A 23.149 23.149 0 0 0 222.632 75.098 A 27.05 27.05 0 0 0 231.543 66.993 A 37.506 37.506 0 0 0 236.89 55.713 Q 238.672 49.512 238.672 43.213 A 44.293 44.293 0 0 0 237.939 35.279 A 28.132 28.132 0 0 0 237.916 35.153 A 25.171 25.171 0 0 0 235.376 27.832 Q 233.545 24.414 230.298 22.339 Q 228.268 21.042 225.543 20.556 A 20.057 20.057 0 0 0 222.021 20.264 A 11.4 11.4 0 0 0 218.433 20.849 A 14.146 14.146 0 0 0 215.137 22.461 A 29.614 29.614 0 0 0 212.864 24.105 A 34.636 34.636 0 0 0 208.765 27.979 A 73.994 73.994 0 0 0 208.023 28.811 A 66.856 66.856 0 0 0 203.369 34.742 A 153.282 153.282 0 0 0 202.296 36.306 Q 201.442 37.568 200.722 38.692 A 74.77 74.77 0 0 0 199.463 40.723 A 62.722 62.722 0 0 0 198.536 42.347 A 49.152 49.152 0 0 0 197.51 44.312 A 58.419 58.419 0 0 0 197.11 45.14 Q 196.768 45.863 196.396 46.694 A 115.948 115.948 0 0 0 195.654 48.389 Q 197.168 40.284 198.779 32.544 Z M 116.215 68.665 A 10.691 10.691 0 0 0 116.602 65.723 A 4.249 4.249 0 0 0 116.601 65.647 Q 116.592 65.133 116.457 64.792 A 1.125 1.125 0 0 0 116.211 64.405 Q 114.551 66.748 110.62 68.384 A 30.181 30.181 0 0 1 106.699 69.698 A 38.995 38.995 0 0 1 101.685 70.655 A 40.419 40.419 0 0 1 96.594 70.978 A 39.811 39.811 0 0 1 91.724 70.679 Q 86.768 70.069 82.959 67.994 A 13.771 13.771 0 0 1 82.811 67.912 A 10.846 10.846 0 0 1 77.734 62.061 Q 77.415 61.191 77.208 60.098 A 19.581 19.581 0 0 1 76.978 58.496 Q 76.758 56.397 76.758 54.151 A 59.581 59.581 0 0 0 77.091 54.164 Q 79.724 54.26 82.736 54.14 A 103.437 103.437 0 0 0 87.231 53.858 Q 93.066 53.369 98.975 51.978 Q 104.883 50.586 109.888 47.998 A 27.728 27.728 0 0 0 112.303 46.595 A 22.555 22.555 0 0 0 117.944 41.431 A 14.26 14.26 0 0 0 120.331 36.708 A 17.485 17.485 0 0 0 120.996 31.787 A 12.337 12.337 0 0 0 120.71 29.052 A 8.232 8.232 0 0 0 118.335 24.781 A 13.985 13.985 0 0 0 116.159 23.096 A 15.696 15.696 0 0 0 111.816 21.241 A 32.803 32.803 0 0 0 110.854 21 A 28.966 28.966 0 0 0 104.248 20.215 A 42.009 42.009 0 0 0 103.63 20.22 A 35.626 35.626 0 0 0 86.206 24.854 Q 78.076 29.493 72.852 37.94 A 38.996 38.996 0 0 0 69.019 46.485 Q 67.578 51.075 67.578 55.713 A 32.644 32.644 0 0 0 67.593 56.705 Q 67.82 64.174 71.509 68.848 A 21.653 21.653 0 0 0 74.275 71.758 A 22.924 22.924 0 0 0 81.787 76.075 A 37.861 37.861 0 0 0 84.606 76.95 A 41.334 41.334 0 0 0 95.361 78.321 Q 96.918 78.321 98.674 78.162 A 52.026 52.026 0 0 0 101.929 77.759 Q 105.566 77.198 108.911 75.806 A 17.299 17.299 0 0 0 110.149 75.234 A 14.344 14.344 0 0 0 114.429 71.949 A 8.377 8.377 0 0 0 116.215 68.665 Z M 138.265 77.369 A 11.175 11.175 0 0 0 140.283 77.539 A 4.801 4.801 0 0 0 140.969 77.488 Q 141.488 77.413 142.06 77.229 A 10.014 10.014 0 0 0 143.188 76.783 Q 144.824 76.026 146.362 75 Q 147.516 74.231 148.354 73.627 A 34.983 34.983 0 0 0 148.877 73.243 Q 145.898 71.241 143.75 68.286 Q 141.602 65.332 141.602 61.621 Q 141.602 58.838 143.018 56.055 A 45.169 45.169 0 0 1 144.146 53.97 A 36.221 36.221 0 0 1 145.996 51.075 A 60.42 60.42 0 0 1 150.128 46.007 A 47.212 47.212 0 0 1 156.616 40.064 A 47.97 47.97 0 0 1 160.724 37.289 A 38.276 38.276 0 0 1 168.14 33.814 A 37.502 37.502 0 0 1 172.146 32.692 Q 175.427 31.973 178.518 31.973 A 26.29 26.29 0 0 1 179.248 31.983 A 15.354 15.354 0 0 0 180.225 26.612 A 10.822 10.822 0 0 0 180.135 25.229 A 12.295 12.295 0 0 0 179.395 22.364 Q 178.797 20.817 177.289 20.384 A 4.747 4.747 0 0 0 175.977 20.215 Q 170.85 20.215 166.162 22.705 A 38.003 38.003 0 0 0 164.927 23.391 A 41.282 41.282 0 0 0 157.349 29.077 A 84.316 84.316 0 0 0 149.707 37.281 Q 146.191 41.602 143.408 45.313 A 25.513 25.513 0 0 0 143.765 44.463 Q 144.385 42.908 144.888 41.081 A 46.364 46.364 0 0 0 145.752 37.305 Q 146.631 32.618 146.631 28.223 A 13.02 13.02 0 0 0 146.591 27.185 Q 146.377 24.513 145.02 22.95 Q 143.408 21.094 139.893 21.094 A 11.906 11.906 0 0 0 135.742 21.851 A 38.646 38.646 0 0 0 131.836 23.536 A 16.42 16.42 0 0 1 135.376 29.786 A 24.463 24.463 0 0 1 136.426 36.914 Q 136.426 41.944 135.278 46.827 A 8945.201 8945.201 0 0 1 132.983 56.568 A 42.871 42.871 0 0 0 131.836 66.455 A 21.489 21.489 0 0 0 131.847 67.159 A 19.024 19.024 0 0 0 132.568 71.827 A 10.125 10.125 0 0 0 132.782 72.484 A 8.217 8.217 0 0 0 135.132 75.952 A 5.621 5.621 0 0 0 136.242 76.701 Q 137.135 77.161 138.265 77.369 Z M 219.141 30.86 A 11.028 11.028 0 0 0 213.333 32.542 A 14.624 14.624 0 0 0 211.768 33.643 A 28.304 28.304 0 0 0 207.889 37.458 A 36.896 36.896 0 0 0 205.371 40.821 A 68.882 68.882 0 0 0 200.171 50.122 A 113.665 113.665 0 0 0 197.856 55.465 A 89.182 89.182 0 0 0 196.387 59.375 A 162.998 162.998 0 0 0 195.682 61.441 Q 194.893 63.806 194.408 65.549 A 45.846 45.846 0 0 0 194.189 66.358 A 44.673 44.673 0 0 0 199.26 68.466 A 53.461 53.461 0 0 0 201.831 69.287 A 31.568 31.568 0 0 0 206.136 70.24 A 24.837 24.837 0 0 0 209.717 70.508 A 23.671 23.671 0 0 0 214.75 70 A 16.763 16.763 0 0 0 220.801 67.432 A 19.053 19.053 0 0 0 227.49 59.229 A 27.005 27.005 0 0 0 229.654 50.267 A 32.186 32.186 0 0 0 229.736 47.95 A 34.784 34.784 0 0 0 229.569 44.616 A 43.148 43.148 0 0 0 229.297 42.408 Q 228.857 39.453 227.734 36.841 Q 226.611 34.229 224.536 32.544 A 7.285 7.285 0 0 0 221.545 31.117 Q 220.472 30.868 219.222 30.86 A 13.011 13.011 0 0 0 219.141 30.86 Z M 78.027 43.409 A 33.048 33.048 0 0 0 77.741 44.663 Q 77.596 45.359 77.458 46.145 A 61.43 61.43 0 0 0 77.295 47.119 Q 80.236 47.281 83.858 47.193 A 119.809 119.809 0 0 0 85.425 47.144 A 81.839 81.839 0 0 0 94.653 46.265 A 53.318 53.318 0 0 0 100.196 45.132 A 44.086 44.086 0 0 0 103.247 44.214 Q 106.823 42.993 109.146 41.064 A 13.235 13.235 0 0 0 109.595 40.674 Q 112.012 38.477 112.012 35.352 A 5.191 5.191 0 0 0 111.742 33.646 A 4.422 4.422 0 0 0 110.498 31.787 A 9.641 9.641 0 0 0 108.09 30.211 A 12.113 12.113 0 0 0 106.763 29.688 Q 104.541 28.955 102.222 28.662 Q 100.491 28.444 99.155 28.388 A 20.862 20.862 0 0 0 98.291 28.369 A 26.122 26.122 0 0 0 92.088 29.072 A 19.723 19.723 0 0 0 85.327 32.105 Q 80.029 35.84 78.027 43.409 Z"
        >
          <animate attributeName="stroke-dashoffset" from="1" to="0" dur="8s" />
        </path>
      </g>
    </motion.svg>
  );
}
