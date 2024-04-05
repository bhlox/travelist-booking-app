import { personsInCharge } from "@/lib/constants";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { IBookingForm, IUpdateBookingForm } from "@/lib/types";

export default function SelectInput({
  handler,
  control,
  setValue,
}: {
  control: Control<IUpdateBookingForm, any>;
  handler: string;
  setValue: UseFormSetValue<IUpdateBookingForm>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="handlerId">Handler</Label>
      <Controller
        control={control}
        name="handlerId"
        render={({ field }) => (
          <Select
            defaultValue={handler} 
            onValueChange={(value) => {
              field.onChange(value);
              setValue("selectedTime", "");
            }}
          >
            <SelectTrigger className="w-[180px] border-gray-400 dark:border-gray-300 border-2">
              <SelectValue placeholder="Select your person" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                {personsInCharge.map((person) => (
                  <SelectItem key={`select-${person.name}`} value={person.name}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
