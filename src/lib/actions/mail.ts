"use server";

export const sendEmail = async ({
  email,
  title,
  message,
}: {
  email: string;
  title: string;
  message: string;
}) => {
  const delay = () => new Promise((res) => setTimeout(res, 2000));
  await delay();
  return true;
};
