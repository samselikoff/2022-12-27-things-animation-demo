import { motion } from "framer-motion";
import { useState } from "react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

let fullConfig = resolveConfig(tailwindConfig);
let { white, blue, zinc } = fullConfig.theme.colors;
let textColorGray = "#919191";
let bgColor = "#242526";
console.log(blue);

export default function Home() {
  return (
    <div className="p-16 space-y-2 bg-[#242526] min-h-screen">
      <Todo>Another thing</Todo>
    </div>
  );
}

function Todo({ children }) {
  let [checked, setChecked] = useState(false);

  // let CHECKBOX_TRANSITION = {
  //   scale: {
  //     duration: checked ? 0 : 0.5,
  //   },
  // };

  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex items-center space-x-2 text-[14px] font-medium tracking-tight focus:outline-none"
    >
      <motion.span
        data-test="wrapper"
        initial="unchecked"
        animate={checked ? "checked" : "unchecked"}
        className="relative flex items-center"
        variants={{
          unchecked: { scale: 1 },
          checked: { scale: 1.2 },
        }}
        transition={{
          duration: checked ? 0 : 0.5,
          when: "beforeChildren",
        }}
      >
        <motion.span
          data-test="checkbox"
          className="inline-block w-3 h-3 border rounded "
          variants={{
            unchecked: {
              background: bgColor,
              borderColor: zinc[500],
            },
            checked: {
              background: blue[400],
              borderColor: blue[400],
            },
          }}
          // transition={CHECKBOX_TRANSITION}
        >
          <motion.span
            data-test="glow"
            // className={`${checked ? "" : "hidden"} absolute inset-0 rounded`}
            className="absolute inset-0 rounded "
            // } absolute inset-0 rounded bg-blue-400/20`}
            variants={{
              unchecked: {
                display: "none",
                scale: 1,
                background: `${blue[400]}33`,
              },
              checked: {
                display: "block",
                scale: 1.4,
                background: `${blue[400]}00`,
              },
            }}
            transition={{
              background: { delay: 0.18, duration: 0.4 },
              duration: checked ? 0.18 : 0,
              // ease: "easeOut",
            }}
          >
            <CheckIcon className="text-[#242526] scale-[0.6]" />
          </motion.span>
        </motion.span>
      </motion.span>

      <motion.span
        animate={{
          color: checked ? textColorGray : white,
        }}
        transition={{
          duration: 0.58,

          ease: easeOutQuart,
          // ease: "circOut"
        }}
      >
        {children}
      </motion.span>
    </button>
  );
}

let easeOutQuart = [0.25, 1, 0.5, 1];
let easeOutExpo = [0.16, 1, 0.3, 1];

function CheckIcon(props) {
  return (
    <motion.svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props}
    >
      <motion.path
        variants={{
          unchecked: { pathLength: 0 },
          checked: { pathLength: 1 },
        }}
        transition={{ duration: 0.18, ease: "easeIn" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  );
}
