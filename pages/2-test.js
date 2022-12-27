import { motion } from "framer-motion";
import { useState } from "react";

let variants = {
  foo: { scale: 2, transition: { duration: 1 } },
  bar: { scale: 3, transition: { duration: 0 } },
};

// Testing conflicting variants
export default function Test() {
  let [count, setCount] = useState(0);

  let activeVariants = [];
  activeVariants.push("foo");
  if (count % 2 === 0) {
    activeVariants.push("bar");
  }

  return (
    <div className="p-40">
      <button onClick={() => setCount(count + 1)}> inc</button>
      <p>active variants: {activeVariants.join(", ")}</p>
      <div className="mt-20">
        <motion.div
          animate={activeVariants}
          variants={variants}
          className="h-8 w-8 bg-blue-500"
        />
      </div>
    </div>
  );
}
