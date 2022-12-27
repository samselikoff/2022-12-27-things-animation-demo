import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const LANGUAGES = [
  { id: 1, name: "JavaScript", checked: false },
  { id: 2, name: "HTML/CSS", checked: false },
  { id: 3, name: "Python", checked: false },
  { id: 4, name: "TypeScript", checked: false },
  { id: 5, name: "Ruby", checked: false },
  { id: 6, name: "PHP", checked: false },
  { id: 7, name: "Swift", checked: false },
];

export default function Example() {
  let [languages, setLanguages] = useState(LANGUAGES);

  function handleCheck(id) {
    setLanguages((languages) =>
      languages.map((lang) => ({
        ...lang,
        checked: id === lang.id ? !lang.checked : lang.checked,
      }))
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white py-8">
        <p className="px-8 text-lg font-medium text-gray-900">
          Favorite languages
        </p>
        <div className="mt-4">
          {languages.map((language) => (
            <Switch.Group key={language.id}>
              <motion.div
                initial={false}
                animate={language.checked ? "checked" : "unchecked"}
                variants={backgroundVariants}
                className="flex items-center px-8 py-3"
              >
                <div className="relative flex items-center">
                  <motion.div
                    variants={glowVariants}
                    className="absolute inset-0 rounded-md bg-blue-300"
                  />
                  <Switch
                    as={motion.button}
                    checked={language.checked}
                    onChange={() => handleCheck(language.id)}
                    variants={checkboxVariants}
                    className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
                  </Switch>
                </div>
                <div className="ml-3">
                  <Switch.Label className="select-none text-gray-700">
                    {language.name}
                  </Switch.Label>
                </div>
              </motion.div>
            </Switch.Group>
          ))}
        </div>
      </div>
    </div>
  );
}

let backgroundVariants = {
  checked: {
    background: ["#eee", "#fff"],
  },
  unchecked: {
    background: ["#eee", "#fff"],
  },
};

let glowVariants = {
  unchecked: {
    scale: 0.85,
  },
  checked: {
    scale: 1.3,
    opacity: [1, 0],
    transition: {
      opacity: { duration: 0.6 },
    },
  },
};

let checkboxVariants = {
  unchecked: {
    scale: 0.85,
    borderColor: "rgb(209 213 219)",
    background: "rgb(255 255 255)",
  },
  checked: {
    scale: 1,
    borderColor: "rgb(59 130 246)",
    background: "rgb(59 130 246)",
  },
};

let checkIconVariants = {
  checked: {
    pathLength: 1,
    transition: {
      delay: 0.1,
    },
  },
  unchecked: {
    pathLength: 0,
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
