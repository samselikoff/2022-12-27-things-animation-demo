import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

let i = 3;
export default function Example() {
  let [items, setItems] = useState([1, 2, 3]);

  function handleClick() {
    i++;
    setItems((items) => [...items, i]);
  }

  function removeItem(item) {
    setItems((items) => items.filter((i) => i !== item));
  }

  return (
    <div className="mx-auto mt-20 max-w-sm">
      <button onClick={handleClick}>Add</button>
      {/* <ResizablePanel> */}
      <div className="divide-y divide-gray-700 pt-8">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-between py-2 px-2"
              key={item}
              transition={{ layout: { type: "spring", duration: 0.3 } }}
            >
              <span>{item}</span>
              <button onClick={() => removeItem(item)}>–</button>
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      {/* </ResizablePanel> */}
      <p className="pt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolorum
        facilis dolor, quidem magni amet iusto, eos ullam provident ipsa
        perspiciatis doloremque debitis veritatis corporis possimus harum nulla,
        in repellat!
      </p>
    </div>
  );
}

export function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      className="relative w-full overflow-hidden"
      transition={{ type: "spring", duration: 0.3 }}
    >
      <div ref={ref} className={`${height ? "absolute" : "relative"} w-full`}>
        {children}
      </div>
    </motion.div>
  );
}
