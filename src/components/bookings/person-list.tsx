"use client";
import { personsInCharge } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function PersonList({
  handlers,
}: {
  handlers: {
    id: string;
    displayName: string;
  }[];
}) {
  return (
    <div className="w-full max-h-full flex flex-wrap items-center justify-center">
      {handlers.map((person) => (
        <PersonCard
          key={`person-${person.id}`}
          name={person.displayName}
          id={person.id}
        />
      ))}
    </div>
  );
}

function PersonCard({ name, id }: { name: string; id: string }) {
  return (
    <div className="lg:px-2 p-2 w-full md:w-1/2 lg:w-1/4">
      <Card className="border-black dark:border-gray-300">
        <CardHeader>
          <CardDescription>image here</CardDescription>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          cupiditate fugiat blanditiis.
        </CardContent>
        <CardFooter>
          <Button
            asChild
            className="block w-full text-center hover:-translate-y-1 transition-transform duration-200 ease-in-out"
          >
            <Link scroll={false} href={{ pathname: `/booking/${id}` }}>
              Book
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PersonList;
