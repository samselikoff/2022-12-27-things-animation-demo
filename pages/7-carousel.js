import {
  animate,
  motion,
  useElementScroll,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Example() {
  let ref = useRef();
  let panel1 = useRef();
  let foo = useScroll({
    container: ref,
    target: panel1,
    // offset: ["start start", "end end"],
    // offset: ["start end", "end start"],
    offset: ["end end", "start start"],
  });
  // const { scrollXProgress } = useElementScroll(ref);
  // const progress = useTransform(scrollXProgress, [0, 0.25], [1, 0]);
  // const opacity1 = useTransform(scrollXProgress, [0, 0.5], [1, 0]);
  // const opacity2 = useTransform(scrollXProgress, [0, 0.5, 1], [0, 1, 0]);
  // const opacity3 = useTransform(scrollXProgress, [0.5, 1], [0, 1]);

  function startScrolling() {
    ref.current.scrollTo({ left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    foo.scrollXProgress.onChange((v) => {
      console.log(v);
    });
    // scrollXProgress.onChange((v) => {
    //   console.log(v);
    // });
  }, [foo.scrollXProgress]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
      <div className="mx-auto max-w-sm">
        <motion.div
          ref={ref}
          className="mx-auto flex w-full snap-x snap-mandatory overflow-x-scroll overscroll-contain rounded-lg bg-white py-8"
        >
          {/* <Card progress={progress} /> */}
          <motion.div className="w-full flex-shrink-0 snap-start p-4">
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
          <motion.div className="w-full flex-shrink-0 snap-start p-4">
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
          <motion.div className="w-full flex-shrink-0 snap-start p-4">
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
          <motion.div
            ref={panel1}
            // style={{ opacity: opacity2 }}
            // style={{ opacity: foo.scrollXProgress }}
            className="w-full flex-shrink-0 snap-start border p-4"
          >
            TEST
          </motion.div>
          <motion.div
            // style={{ opacity: opacity3 }}
            className="w-full flex-shrink-0 snap-start p-4"
          >
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
          <motion.div
            // style={{ opacity: opacity3 }}
            className="w-full flex-shrink-0 snap-start p-4"
          >
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
          <motion.div
            // style={{ opacity: opacity3 }}
            className="w-full flex-shrink-0 snap-start p-4"
          >
            Dolor sit amet consectetur adipisicing elit. Illum commodi.
          </motion.div>
        </motion.div>

        <div className="mt-8 flex w-full justify-between space-x-4">
          <button
            onClick={startScrolling}
            className="w-full rounded-lg bg-white py-1"
          >
            1
          </button>
          <button
            onClick={() =>
              panel1.current.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full rounded-lg bg-white py-1"
          >
            2
          </button>
          <button className="w-full rounded-lg bg-white py-1">3</button>
        </div>
      </div>
    </div>
  );
}

// Progress goes between 0 and 1
function Card({ progress }) {
  const y = useTransform(progress, [0, 1], [0, 50]);

  return (
    <motion.div
      style={{ opacity: progress }}
      className="w-full flex-shrink-0 snap-start p-4"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum commodi.
    </motion.div>
  );
}
