import { motion } from "framer-motion";
import { useState } from "react";

export default function Scratch1() {
  let [on, setOn] = useState(false);

  return (
    <div className="origin-top-left scale-[3] p-8">
      <button onClick={() => setOn(!on)}>click</button>
      <motion.svg
        className="h-20 w-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <motion.path
          initial={false}
          animate={on ? "checked" : "unchecked"}
          variants={{
            unchecked: {
              pathLength: 0,
              opacity: 0,
              transition: {
                pathLength: { type: "tween", duration: 1 },
                opacity: { delay: 0.99, duration: 0.01 },
              },
            },
            checked: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.01 },
              },
            },
          }}
          transition={{ duration: 1, ease: "easeIn" }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </motion.svg>
    </div>
  );
}
