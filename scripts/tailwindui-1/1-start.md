# Step 1

```jsx
const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];

export default function Example() {
  return (
    <div className="max-w-sm p-8">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Members</legend>
        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {people.map((person, personIdx) => (
            <div key={personIdx} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`person-${person.id}`}
                  className="select-none font-medium text-gray-700"
                >
                  {person.name}
                </label>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  id={`person-${person.id}`}
                  name={`person-${person.id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
```

# Step 2: Recreate with HUI

Extract to component, use headless ui

```jsx
import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";

const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];

export default function Example() {
  return (
    <div className="max-w-sm p-8">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Members</legend>
        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {people.map((person, personIdx) => (
            <Checkbox key={personIdx}>{person.name}</Checkbox>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function Checkbox({ children }) {
  let [checked, setChecked] = useState(false);

  return (
    <Switch.Group>
      <div className="relative flex items-start py-4">
        <div className="min-w-0 flex-1 text-sm">
          <Switch.Label className="select-none font-medium text-gray-700">
            {children}
          </Switch.Label>
        </div>
        <div className="ml-3 flex h-5 items-center">
          <Switch
            className={`${
              checked
                ? "border-indigo-600 bg-indigo-600"
                : "border-gray-300 bg-white active:bg-indigo-100"
            } flex h-4 w-4 items-center justify-center rounded border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2`}
            checked={checked}
            onChange={() => setChecked(!checked)}
          >
            {checked && <CheckIcon className="h-3 w-3 text-white" />}
          </Switch>
        </div>
      </div>
    </Switch.Group>
  );
}
```

# Step 3: Animated check, bg, fade

```jsx
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

const people = [
  { id: 1, name: "Annette Black" },
  { id: 2, name: "Cody Fisher" },
  { id: 3, name: "Courtney Henry" },
  { id: 4, name: "Kathryn Murphy" },
  { id: 5, name: "Theresa Webb" },
];

export default function Example() {
  return (
    <div className="max-w-sm p-8">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Members</legend>
        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {people.map((person, personIdx) => (
            <Checkbox key={personIdx}>{person.name}</Checkbox>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function Checkbox({ children }) {
  let [checked, setChecked] = useState(false);

  return (
    <Switch.Group>
      <div className="relative flex items-start py-4">
        <div className="min-w-0 flex-1 text-sm">
          <Switch.Label className="select-none font-medium text-gray-700">
            {children}
          </Switch.Label>
        </div>
        <div className="ml-3 flex h-5 items-center">
          <Switch
            as={motion.button}
            initial={false}
            animate={checked ? "checked" : "unchecked"}
            variants={buttonVariants}
            className={`flex h-4 w-4 items-center justify-center rounded-md border focus:outline-none`}
            checked={checked}
            onChange={() => setChecked(!checked)}
          >
            <CheckIcon className="h-3 w-3 text-white" />
          </Switch>
        </div>
      </div>
    </Switch.Group>
  );
}

let buttonVariants = {
  unchecked: {
    borderColor: colors.gray[300],
    background: colors.white,
    scale: 0.85,
  },
  checked: {
    borderColor: colors.indigo[600],
    background: colors.indigo[600],
    scale: 1,
  },
};

let checkIconVariants = {
  unchecked: {
    pathLength: 0,
  },
  checked: {
    pathLength: 1,
    transition: { duration: 0.3 },
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
```
