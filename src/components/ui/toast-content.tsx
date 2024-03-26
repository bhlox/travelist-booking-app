import React from "react";

export default function ToastContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      <p className="">{description}</p>
    </>
  );
}
