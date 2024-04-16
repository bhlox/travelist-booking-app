import { TODO } from "@/lib/types";
import { cn } from "@/lib/utils/utils";
import React from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "./ui/label";

function CustomPhoneInput({
  control,
  name,
  storedPhoneNumber,
  errorMsg,
  submitOnEnter,
}: {
  control: Control<TODO>;
  name: "phoneNumber";
  storedPhoneNumber: string | undefined;
  errorMsg: string | undefined;
  submitOnEnter?: Function;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="phoneNumber">Phone number</Label>
      <Controller
        control={control}
        name={name}
        rules={{
          required: { value: true, message: "Pls enter your phone number" },
          minLength: {
            value: 12,
            message: "Please enter a valid phone number",
          },
          maxLength: {
            value: 12,
            message: "Please enter a valid phone number",
          },
        }}
        render={({ field }) => (
          <PhoneInput
            onKeyDown={(e) => {
              if (submitOnEnter && e.key === "Enter") {
                submitOnEnter();
              }
            }}
            value={storedPhoneNumber}
            disableDropdown
            countryCodeEditable={false}
            country="ph"
            onChange={(value) => {
              field.onChange(value);
            }}
            inputClass={cn(
              "dark:bg-black bg-white dark:border-gray-300 border-gray-400 border-2 w-48",
              null,
              {
                "dark:border-red-600 border-red-600": errorMsg,
              }
            )}
            buttonClass={cn(
              "dark:bg-gray-800 bg-gray-300 border-2 dark:border-gray-300 border-gray-400 pointer-events-none",
              null,
              {
                "dark:border-red-600 border-red-600": errorMsg,
              }
            )}
          />
        )}
      />
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </div>
  );
}

export default CustomPhoneInput;
