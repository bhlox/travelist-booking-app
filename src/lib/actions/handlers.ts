import { db } from "@/db";

export const getHandlers = async () => {
  return await db.query.user.findMany({
    where: (user, { eq }) => eq(user.role, "staff"),
    columns: { id: true, displayName: true },
  });
};

export const getHandler = async (id: string) => {
  return await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, id),
    columns: { id: true, displayName: true },
  });
};
