import React from "react";
import { motion } from "framer-motion";

export default function SectionTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 1.5, easings: "easeInOut" },
      }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
