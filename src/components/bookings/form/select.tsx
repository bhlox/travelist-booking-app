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
import { IBookingForm } from "@/lib/types";

export default function SelectInput({
  personInCharge,
  control,
  setValue,
}: {
  control: Control<IBookingForm, any>;
  personInCharge: string;
  setValue: UseFormSetValue<IBookingForm>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="">Person in charge</Label>
      <Controller
        control={control}
        name="personInCharge"
        render={({ field }) => (
          <Select
            defaultValue={personInCharge}
            onValueChange={(value) => {
              field.onChange(value);
              setValue("selectedTime", undefined);
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
