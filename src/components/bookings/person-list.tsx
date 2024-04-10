"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { handlerProfileImageString } from "@/lib/utils/utils";

function PersonList({
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
    <div className="w-full max-h-full flex flex-wrap items-center justify-center">
      {handlers.map((person) => (
        <PersonCard
          key={`person-${person.id}`}
          name={person.displayName}
          id={person.id}
          description={person.description}
          profilePicture={person.profilePicture}
        />
      ))}
    </div>
  );
}

export function PersonCard({
  name,
  id,
  description,
  profilePicture,
}: {
  name: string;
  id: string;
  description: string | null;
  profilePicture: string;
}) {
  const profPic = handlerProfileImageString(profilePicture);
  return (
    <div className="lg:px-2 p-2 w-full md:w-1/2 lg:w-1/4">
      <div className="relative h-[32rem] w-full rounded-xl group overflow-hidden">
        <Image
          src={profPic}
          alt={name}
          fill
          className="rounded-xl object-cover"
        />
        <div className="z-10 absolute block w-full bg-white rounded-t-3xl space-y-7 p-4 md:opacity-0 md:-bottom-40 md:group-hover:bottom-0 md:group-hover:opacity-100 transition-all duration-300 ease-in-out left-0 bottom-0 text-black">
          <h4 className="text-xl md:text-3xl font-semibold ">{name}</h4>
          <p>
            {description ??
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores quam sequi!"}
          </p>
          <Button
            asChild
            className="block w-full text-center hover:bg-black dark:hover:bg-black hover:-translate-y-1 transition-transform duration-200 ease-in-out bg-black dark:bg-black text-white dark:text-white"
          >
            <Link scroll={false} href={{ pathname: `/booking/${id}` }}>
              Book
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PersonList;
