import { addDays } from "date-fns";
import dayjs from "dayjs";
import { DateAfter, DateBefore, Matcher } from "react-day-picker";

export const openingTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const personsInCharge = [{ name: "bhlox" }, { name: "second" }];

export const startOfBookingTime = dayjs().unix();

export const disableWeekends: Matcher = (date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

export const validDays = {
  before: addDays(new Date(), 1),
  after: addDays(new Date(), 31),
};

export const defaultDbProfPicString = "/avatar_default.jpg" as const;

export const reviewsData = [
  {
    name: "Harold",
    review:
      "I recently sought staff consultation assistance from [Your Company Name], and I was thoroughly impressed. The consultants were not only knowledgeable but also incredibly attentive to my needs. They took the time to address all my questions and concerns, providing practical advice that was tailored to my specific situation. Thanks to their expertise, I now feel equipped to tackle any challenges that come my way. Highly recommend their services to anyone seeking expert guidance!",
  },
  {
    name: "Brandie",
    review:
      "The staff consultation experience at [Your Company Name] was truly outstanding. The team's professionalism and expertise were evident from start to finish. They patiently listened to my concerns, offered tailored solutions, and went above and beyond to ensure I had all the information I needed. Thanks to them, I feel empowered to move forward with clarity and conviction.",
  },
  {
    name: "Mandre",
    review:
      "I can't praise the staff consultation at [Your Company Name] enough! From the moment I walked in, I felt heard and valued. They took the time to understand my needs and provided insightful guidance that exceeded my expectations. Thanks to their expertise, I was able to make informed decisions with confidence. Highly recommended!",
  },
  {
    name: "Leila",
    review:
      "I recently sought staff consultation assistance from [Your Company Name], and I was thoroughly impressed. The consultants were not only knowledgeable but also incredibly attentive to my needs. They took the time to address all my questions and concerns, providing practical advice that was tailored to my specific situation. Thanks to their expertise, I now feel equipped to tackle any challenges that come my way. Highly recommend their services to anyone seeking expert guidance!",
  },
  {
    name: "Jim Park",
    review:
      "I recently sought staff consultation assistance from [Your Company Name], and I was thoroughly impressed. The consultants were not only knowledgeable but also incredibly attentive to my needs. They took the time to address all my questions and concerns, providing practical advice that was tailored to my specific situation. Thanks to their expertise, I now feel equipped to tackle any challenges that come my way. Highly recommend their services to anyone seeking expert guidance!",
  },
];

export const FAQ_DATA = [
  {
    question: "What is this?",
    answer:
      "Our expert advisors provide personalized guidance and recommendations to individuals or groups planning their travel itineraries.",
  },
  {
    question: "What types  of travel issues could you help?",
    answer:
      "Our travel consultation services cover a wide range of topics, including destination recommendations, itinerary planning, transportation options, accommodation selection, budgeting advice, and travel health and safety considerations.",
  },
  {
    question: "How does this work?",
    answer:
      "The process typically begins with an initial consultation session, during which our advisors will discuss your travel preferences, interests, and any specific requirements you may have. Based on this information, we'll work closely with you to create a customized travel plan tailored to your needs.",
  },
  {
    question: "Who can benefit?",
    answer:
      "Our services are beneficial for individuals or groups looking to make the most out of their travel experiences, whether it's for leisure, business, or special occasions. From first-time travelers to seasoned globetrotters, our services cater to everyone.",
  },
];
