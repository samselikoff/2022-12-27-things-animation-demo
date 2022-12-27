import { useState } from "react";
// import { CheckIcon } from "@heroicons/react/outline";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  return (
    <div className="p-16 space-y-2 bg-[#242526] min-h-screen">
      <Todo>Another thing</Todo>
      {/* <Todo>Second thing</Todo>
      <Todo>And a third</Todo> */}
    </div>
  );
}

let CHECK_ICON_TRANSITION = { duration: 0.15, ease: "easeIn" };

function Todo({ children }) {
  let [checked, setChecked] = useState(false);
  let controls = useAnimation();

  let GLOW_TRANSITION = {
    duration: checked ? 0.15 : 0,
    delay: 0.02,
    ease: "easeOut",
  };
  let CHECKBOX_TRANSITION = {
    scale: {
      duration: checked ? 0 : 0.5,
    },
  };

  return (
    <button
      onClick={() => {
        setChecked(!checked);
        // if (!enabled) {
        //   controls.start({
        //     scale: 1.7,
        //     opacity: [1, 0],
        //     transition: { duration: 0.5, ease: "easeOut" },
        //   });
        // } else {
        //   controls.set({
        //     scale: 1,
        //     opacity: 0,
        //   });
        // }
      }}
      className="flex items-center space-x-2 text-[14px] font-medium tracking-tight focus:outline-none"
      // style={{ transform: "scale(7)", transformOrigin: "top left" }}
    >
      <span className="relative flex items-center">
        <motion.span
          data-test="glow"
          className="absolute inset-0 rounded bg-blue-400/20"
          // animate={controls}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: checked ? 1.55 : 1,
            // opacity: checked ? 1 : 0,
          }}
          transition={GLOW_TRANSITION}
          // transition={{
          //   duration: checked ? 0.15 : 0,
          //   delay: 0.02,
          //   ease: "easeOut",
          // }}
          // transition={{ duration: 0.5, ease: "easeOut" }}

          // Original
          // transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.01, 1] }}
          // animate={{
          //   scale: enabled ? [null, 1.7] : 1,
          //   opacity: enabled ? [null, 1, 0] : 0,
          // }}
        />
        <motion.span
          data-test="checkbox"
          // className={`w-3 h-3 inline-block border rounded-[4px] border-zinc-500`}
          className="inline-block w-3 h-3 border rounded"
          variants={{
            unchecked: {
              background: "#27272a",
              borderColor: "#71717a",
              scale: 1,
            },
            checked: {
              background: "#60a5fa",
              borderColor: "#60a5fa",
              scale: 1.15,
            },
          }}
          initial="unchecked"
          animate={checked ? "checked" : "unchecked"}
          // whileTap={{ scale: enabled ? 1.3 : 1.15 }}
          // transition={{ duration: 0 }}
          transition={CHECKBOX_TRANSITION}
          // transition={{
          //   // ease: (v) => {
          //   //   console.log(v);
          //   //   return v;
          //   //   // return 1 - Math.pow(1 - v, 3);
          //   // },
          //   scale: {
          //     duration: checked ? 0 : 0.5,
          //   },
          //   // times: [0, 0.5, 1],
          // }}
        >
          {checked && (
            <CheckIcon className={`${checked ? "" : "hidden"} text-zinc-800`} />
          )}
        </motion.span>
      </span>
      <motion.span
        animate={{
          color: checked ? "#919191" : "#ffffff",
        }}
      >
        {children}
      </motion.span>
    </button>
  );
}

function CheckIcon(props) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props}
    >
      <motion.path
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        // transition={{ duration: 0.15, ease: "easeIn" }}
        transition={CHECK_ICON_TRANSITION}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  );
}
