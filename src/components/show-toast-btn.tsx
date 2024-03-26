"use client";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import ToastContent from "./ui/toast-content";

export default function ShowToastBtn() {
  return (
    <Button
      onClick={() =>
        toast.info(
          <ToastContent
            title="Sample"
            description="random words inserted here"
          />
        )
      }
    >
      Show Toast
    </Button>
  );
}
