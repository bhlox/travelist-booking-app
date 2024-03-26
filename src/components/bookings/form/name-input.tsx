import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBookingForm } from "@/lib/types";
import { cn } from "@/lib/utils/utils";
import React from "react";
import { UseFormRegister } from "react-hook-form";

export default function NameInput({
  register,
  errorMsg,
}: {
  register: UseFormRegister<IBookingForm>;
  errorMsg: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="customerName">Name</Label>
      <Input
        id="customerName"
        {...register("customerName", {
          required: { message: "Please enter your name", value: true },
        })}
        placeholder="Name"
        className={cn(
          "border-2 border-gray-400 focus:border-black dark:border-gray-300",
          undefined,
          {
            "dark:border-red-600 border-red-600": errorMsg,
          }
        )}
      />
      {errorMsg ? (
        <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>
      ) : null}
    </div>
  );
}
