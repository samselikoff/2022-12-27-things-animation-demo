import { motion } from "framer-motion";
import { useState } from "react";

let variants = {
  initial: { scale: 0.5 },
  animate: { scale: [1, 2, 3, 1] },
};

export default function Test() {
  let [count, setCount] = useState(0);

  let activeVariants = ["animate"];
  if (count % 2 === 0) {
    activeVariants.push("foo");
  }
  console.log(activeVariants);

  return (
    <>
      <motion.div
        initial="initial"
        animate={activeVariants}
        variants={variants}
        transition={{ delay: 1 }}
        className="h-8 w-8 bg-blue-500"
      />
      <p>the count is {count}</p>
      <button onClick={() => setCount(count + 1)}> inc</button>
    </>
  );
}
