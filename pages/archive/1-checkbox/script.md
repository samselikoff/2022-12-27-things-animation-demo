# Checkbox

## TODO

- unchecked first in variants order
- delay of 0.1 on checkIcon
- add `h-5 w-5 rounded-md` from checkbox
- add pointer-cursor to checkbox
- remove focus styles from checkbox. explain?
- select-none
- scale 0.85 not 0.8
- remove border-gray-200 from checkbox after moving to FM
- background color white? rgb(255 255 255) (so when adding glow its behind)

## Step: Background

```jsx
{languages.map((language) => (
  <motion.div
    initial={{ background: "#fff" }}
    animate={{ background: language.checked ? "#eee" : "#fff" }}
    // transition={{ duration: 1 }}
```

Keyframes:

```jsx
animate={{
  background: language.checked ? ["#eee", "#fff"] : "#fff",
}}
```

## Step: Scale

Lets make the checkbox scale

```jsx
animate={{ scale: language.checked ? 1.3 : 1 }}
```

Can mess up our layout – also, safari doesn't scale this well. Let's invert it.

```jsx
animate={{ scale: language.checked ? 1 : 0.85 }}
```

Notice on reload we see animation – fix with `initial`.

```jsx
initial={{ scale: 0.8 }}
animate={{ scale: language.checked ? 1 : 0.85 }}
```

Now let's tweak the duration of our animation. We can do this with `transition` prop.

```jsx
transition={{ duration: 0.5 }}
```

Definitely slower – but feels funny. Turns out there's a `type` prop with things like linear and spring. The default was spring which usually what we want for more realistic animations in our apps.

Let's put it back to spring

```jsx
transition={{
  duration: 0.5,
  type: "spring",
}}
```

Much better. We can even change it based on the state – it should shrink faster than it grows.

```jsx
transition={{
  duration: language.checked ? 0.5 : 0.1,
  type: "spring",
}}
```

Get crazy with it:

```jsx
transition={{
  duration: language.checked ? 0.5 : 0.3,
  type: language.checked ? "spring" : "tween",
  bounce: 0.4,
  ease: "easeOut",
}}
```

Ok this is pretty awesome – but confusing and buggy. As we add more details like in Things, we start losing the thread here. Don't want to be writing ternaries and tracking stuff in our head.

Fortunately FM has a great answer for this.

## Step: Variants

Let's refactor to variants. First background:

```jsx
<motion.div
  initial="unchecked"
  animate={language.checked ? "checked" : "unchecked"}
  variants={{
    checked: {
      background: ["#eee", "#fff"],
    },
    unchecked: {
      background: "#fff",
    },
  }}
  key={language.id}
  className="flex items-center px-8 py-3"
>
```

Then scaling checkbox:

```jsx
<motion.input
  id={language.id}
  checked={language.checked}
  onChange={() => handleCheck(language.id)}
  type="checkbox"
  initial="unchecked"
  animate={language.checked ? "checked" : "unchecked"}
  variants={{
    checked: {
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        bounce: 0.4,
      },
    },
    unchecked: {
      scale: 0.8,
      transition: {
        duration: 0.1,
        type: "tween",
        ease: "easeOut",
      },
    },
  }}
```

Note we're duplicating initial/animate on checkbox – can delete, and will inherit from nearest ancestor motion element.

Finally - lets extract these variants out of inline template. Anything non-animation related, look in the template, anything animation related, look to our extracted variants. Just found myself doing this more and more.

```js
let backgroundVariants = {
  checked: {
    background: ["#eee", "#fff"],
  },
  unchecked: {
    background: "#fff",
    transition: {
      duration: 0.1,
    },
  },
};

let checkboxVariants = {
  checked: {
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  unchecked: {
    scale: 0.8,
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeOut",
    },
  },
};
```

## Step: Background and border color

Super easy to animate new properties just by coming to our variants. Let's get the bg color and border color animated:

```js
let checkboxVariants = {
  checked: {
    scale: 1,
    borderColor: "rgb(59 130 246)",
    backgroundColor: "rgb(59 130 246)",
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  unchecked: {
    scale: 0.8,
    borderColor: "rgb(209 213 219)",
    backgroundColor: "rgb(59 130 246 / 0)",
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeOut",
    },
  },
};
```

## Step: Animating the check icon

Here's how to animate an icon. First, we need the inline SVG.

```jsx
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 9 8" fill="none" {...props}>
      <path
        d="M1 4l2 2 5-5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

Then, we can turn the path into a `motion.path` – pretty sick right? FM works with all svg elements too.

Now since we're in the same tree as our other motion elements, we can just add variants. Check it out:

```js
let checkIconVariants = {
  checked: {
    pathLength: 1,
  },
  unchecked: {
    pathLength: 0,
  },
};
```

Explain:

```js
let checkIconVariants = {
  checked: {
    pathLength: [0, 1],
    opacity: 1,
    transition: {
      duration: 0.25,
      type: "spring",
      bounce: 0.4,
    },
  },
  unchecked: {
    opacity: 0,
    transition: {
      duration: 0.1,
      type: "tween",
      ease: "easeOut",
    },
  },
};
```

Sweet, now let's get the check into the checkbox. For this we'll need a custom Switch.

## Step: Custom Switch

Try rendering `Switch` next to checkbox input. Copy attrs over. Only thing:

```jsx
as={motion.button}
```

Boom. Works. Now move CheckIcon inside. Flex, center, make it smaller. Sick.

Now there's actually some more goodies here – this whole `id` and `htmlFor` business, completely goes away with Switch. Let me show you how.

Wrap parent in `Switch.Group`, and turn `<label>` into Switch.label. Drop id, drop htmlFor. Boom.

## Step: Glow

Let's add a glow. It'll be an absolutely positioned div that will sacle up and fade out. We want it to appear behind our check, so let's add a div right above our Switch:

```jsx
<div className="absolute inset-0 scale-110 bg-green-500" />

<Switch />
```

Takes up whole screen :) Add relative to parent. Nice. Now add `rounded-md`.

Ok, we see the scale is off. Let's make this a motion.div and add some variants.

```jsx
<motion.div variants={glowVariants} />
```

```js
let glowVariants = {
  unchecked: {
    scale: 0.85,
  },
  checked: {
    scale: 1.4,
    opacity: [1, 0],
    transition: {
      opacity: { duration: 0.5 },
    },
  },
};
```

## Scratch

```
background: ["rgb(var(--slate-100) / 1)", "rgb(var(--slate-100) / 0)"],
```

## Possible starting (minus fm stuff)

```jsx
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
    setLanguages((languages) => [
      ...languages.map((lang) => ({
        ...lang,
        checked: id === lang.id ? !lang.checked : lang.checked,
      })),
    ]);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-900">
      <div className="mx-auto w-full max-w-sm rounded-lg bg-white py-8">
        <p className="px-8 text-lg font-medium text-gray-900">
          Favorite languages
        </p>
        <div className="mt-4">
          {languages.map((language) => (
            <div key={language.id} className="flex items-center px-8 py-3">
              <div className="flex items-center">
                <input
                  id={language.id}
                  checked={language.checked}
                  onChange={() => handleCheck(language.id)}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus-visible:ring focus-visible:ring-blue-400"
                />
              </div>

              <div className="ml-3">
                <label className="text-gray-700" htmlFor={language.id}>
                  {language.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```
