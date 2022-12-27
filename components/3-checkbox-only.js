import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

let fullConfig = resolveConfig(tailwindConfig);
let { blue, zinc } = fullConfig.theme.colors;

function d(v) {
  return 1 * v;
}

export default function Checkbox() {
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
      className="flex w-full items-center space-x-2 rounded px-2 py-[3px] text-[14px] font-medium tracking-tight focus:outline-none"
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
          id="person-1"
          data-test="checkbox"
          onClick={() => setChecked(!checked)}
          className="inline-block h-4 w-4 rounded border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
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
            <CheckIcon className="scale-[0.5] text-white" />
          </motion.span>
        </motion.button>
      </motion.span>
    </motion.div>
  );
}

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
    borderColor: zinc[300],
  },
  checked: {
    background: hexToRgba(blue[400], 1),
    borderColor: blue[400],
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

function hexToRgba(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
