import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

const languages = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "HTML/CSS" },
  { id: 3, name: "Python" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "Ruby" },
  { id: 6, name: "PHP" },
  { id: 7, name: "Swift" },
];

export default function Example() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white py-8">
        <p className="px-8 text-lg font-medium text-gray-900">
          Favorite languages
        </p>
        <div className="mt-4">
          {languages.map((person, personIdx) => (
            <Checkbox key={personIdx}>{person.name}</Checkbox>
          ))}
        </div>
      </div>
    </div>
  );
}

function Checkbox({ children }) {
  let [checked, setChecked] = useState(false);

  return (
    <Switch.Group>
      <motion.div
        className="relative flex items-center py-3 px-8"
        initial={false}
        animate={checked ? "checked" : "unchecked"}
        variants={backgroundVariants}
      >
        <div className="flex items-center">
          <div className="relative">
            <motion.div
              variants={glowVariants}
              className="absolute inset-0 rounded-md"
            />

            <Switch
              as={motion.button}
              variants={buttonVariants}
              className={`relative flex h-5 w-5 items-center justify-center rounded-md border focus:outline-none`}
              checked={checked}
              onChange={() => setChecked(!checked)}
            >
              <CheckIcon className="h-3.5 w-3.5 text-white" />
            </Switch>
          </div>
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <Switch.Label className="select-none text-gray-700">
            {children}
          </Switch.Label>
        </div>
      </motion.div>
    </Switch.Group>
  );
}

let backgroundVariants = {
  unchecked: {
    background: [
      transparentize(colors.slate[100], 1),
      transparentize(colors.slate[100], 0),
    ],
  },
  checked: {
    background: [
      transparentize(colors.slate[100], 1),
      transparentize(colors.slate[100], 0),
    ],
  },
};

let buttonVariants = {
  unchecked: {
    borderColor: colors.gray[300],
    background: colors.white,
    scale: 0.85,
  },
  checked: {
    borderColor: colors.blue[500],
    background: colors.blue[500],
    scale: 1,
  },
};

let glowVariants = {
  unchecked: {
    scale: 1,
    background: transparentize(colors.blue[200], 0),
  },
  checked: {
    scale: 1.5,
    background: [
      transparentize(colors.blue[200], 1),
      transparentize(colors.blue[200], 0),
    ],
    transition: {
      background: { duration: 0.5 },
    },
  },
};

let checkIconVariants = {
  unchecked: {
    pathLength: 0,
  },
  checked: {
    pathLength: 1,
    transition: { delay: 0.1 },
  },
};

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        variants={checkIconVariants}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function transparentize(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
