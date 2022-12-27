import { motion } from "framer-motion";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { useEffect } from "react";

/*
  TODO:
  - remove border-t from parent?
*/

let fullConfig = resolveConfig(tailwindConfig);
let { white, blue, zinc } = fullConfig.theme.colors;
let textColorGray = "#919191";

function d(v) {
  return 1 * v;
}

export default function Home() {
  return (
    <div className="min-h-screen origin-top-left scale-[1] bg-brand p-16">
      <div className="mx-auto max-w-md">
        <div className="mt-[6px] flex items-center">
          <StarIcon className="mr-0.5 h-8 w-8 text-yellow-300" />
          <h1 className="text-[22px] font-bold text-white">
            <span style={{ letterSpacing: -4 }}>T</span>oday
          </h1>
        </div>

        <div className="mt-[30px]">
          <Todo>Learn Framer Motion</Todo>
          <Todo>...</Todo>
          <Todo>Profit 🥳</Todo>
        </div>
      </div>
    </div>
  );
}

function Todo({ children }) {
  let [checked, setChecked] = useState(false);
  let [pressed, setPressed] = useState(false);
  let [hovered, setHovered] = useState(false);

  let activeVariants = [checked ? "checked" : "unchecked"];
  let hoveredAndPressed = pressed && hovered;
  if (hoveredAndPressed) {
    activeVariants.push("hoveredAndPressed");
  } else if (pressed) {
    activeVariants.push("pressed");
  }

  useEffect(() => {
    let handle = () => {
      setPressed(false);
    };

    document.addEventListener("pointerup", handle);
    return () => {
      document.removeEventListener("pointerup", handle);
    };
  }, []);

  return (
    <motion.div
      data-test="parent"
      initial={false}
      animate={activeVariants}
      variants={parentVariants}
      className="flex w-full items-center space-x-2 rounded border-t px-2 py-[3px] text-[14px] font-medium tracking-tight focus:outline-none"
    >
      <motion.span
        data-test="wrapper"
        className="relative flex items-center"
        variants={wrapperVariants}
        custom={checked}
        onPointerDown={() => setPressed(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.button
          data-test="checkbox"
          onClick={() => setChecked(!checked)}
          className="inline-block h-3 w-3 rounded border"
          variants={checkboxVariants}
          transition={{
            duration: d(0.18),
            ease: "easeIn",
          }}
        >
          <motion.span
            data-test="glow"
            className="absolute inset-0 rounded"
            variants={glowVariants}
          >
            <CheckIcon className="scale-[0.6] text-brand" />
          </motion.span>
        </motion.button>
      </motion.span>

      <motion.span
        data-test="text"
        variants={textVariants}
        transition={{
          duration: d(0.58),
          ease: easeOutQuart,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

let easeOutQuart = [0.25, 1, 0.5, 1];

function CheckIcon(props) {
  return (
    <motion.svg
      data-test="checkmark"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      {...props}
    >
      <motion.path
        variants={checkmarkVariants}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  );
}

let parentVariants = {
  pressed: {
    background: hexToRgba("#3A3C3F", 1),
    borderColor: hexToRgba("#424446", 1),
    transition: { duration: d(0) },
  },
  hoveredAndPressed: {
    background: hexToRgba("#3A3C3F", 1),
    borderColor: hexToRgba("#424446", 1),
    transition: { duration: d(0) },
  },
  unchecked: {
    background: [null, hexToRgba("#3A3C3F", 1), hexToRgba("#3A3C3F", 0)],
    borderColor: [null, hexToRgba("#424446", 1), hexToRgba("#424446", 0)],
    transition: {
      duration: d(0.58),
      times: [0, 0.05, 1],
    },
  },
  checked: {
    background: [null, hexToRgba("#3A3C3F", 1), hexToRgba("#3A3C3F", 0)],
    borderColor: [null, hexToRgba("#424446", 1), hexToRgba("#424446", 0)],
    transition: {
      duration: d(0.58),
      times: [0, 0.05, 1],
    },
  },
};

let wrapperVariants = {
  unchecked: {
    scale: 1,
    transition: {
      duration: d(0.275),
      ease: "easeOut",
    },
  },
  checked: {
    scale: 1.2,
    transition: { when: "beforeChildren", duration: d(0) },
  },
  pressed: (checked) => ({
    scale: checked ? 1.2 : 1,
    transition: { duration: 0 },
  }),
  hoveredAndPressed: (checked) => ({
    scale: !checked ? 1.2 : 1.35,
    transition: { duration: d(0) },
  }),
};

let checkboxVariants = {
  unchecked: {
    background: hexToRgba(blue[400], 0),
    borderColor: zinc[500],
  },
  checked: {
    background: hexToRgba(blue[400], 1),
    borderColor: blue[400],
  },
};

let checkmarkVariants = {
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { duration: d(0.18), ease: "easeIn" },
      opacity: { delay: d(0.17), duration: d(0.01) },
    },
  },
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: d(0.18), ease: "easeIn" },
      opacity: { duration: d(0.01) },
    },
  },
};

let glowVariants = {
  unchecked: {
    scale: 1,
    background: hexToRgba(blue[400], 0),
  },
  checked: {
    scale: 1.4,
    background: [
      hexToRgba(blue[400], 0.2),
      hexToRgba(blue[400], 0.2),
      hexToRgba(blue[400], 0),
    ],
    transition: {
      scale: { duration: d(0.18) },
      background: {
        times: [0, 0.25, 1],
        duration: d(0.58),
      },
    },
  },
};

let textVariants = {
  unchecked: { color: white },
  checked: { color: textColorGray },
};

function hexToRgba(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
