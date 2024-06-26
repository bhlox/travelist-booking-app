"use server";
import { db } from "@/db";

export const getDisabledTimeSlots = async (handlerId: string) => {
  const timeSlots = await db.query.blockedSchedules.findMany({
    where: (blockedSchedules, { eq, and }) =>
      and(
        eq(blockedSchedules.handlerId, handlerId),
        eq(blockedSchedules.approved, true)
      ),
    columns: { timeRanges: true, type: true, date: true },
  });
  const formatted = timeSlots.map((slot) => ({
    ...slot,
    timeRanges: JSON.parse(slot.timeRanges as string),
    date: new Date(slot.date),
  }));
  return formatted;
};
