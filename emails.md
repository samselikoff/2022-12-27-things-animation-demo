```jsx
<motion.path
  d="m5 1314 4L19 7"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
```

---

First:

```jsx
let motion, checked;

<motion.path
  initial={{
    pathLength: checked ? 1 : 0,
  }}
  animate={{
    pathLength: checked ? 1 : 0,
  }}
  transition={{
    ease: "easeIn",
    duration: checked ? 0.2 : 0.1,
  }}
  d="M5 13l4 4L19 7"
  strokeLinecap="round"
  strokeLinejoin="round"
/>;
```

Move properties to variants:

```jsx
let motion, checked;
function App() {
  return (
    <motion.button initial="unchecked" animate="checked">
      // other motion elements with their own variants... // `initial` and
      `animate` no longer needed!
      <motion.path
        variants={{
          unchecked: {
            pathLength: 0,
          },
          checked: {
            pathLength: 1,
          },
        }}
        transition={{
          ease: "easeIn",
          duration: checked ? 0.2 : 0.1,
        }}
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.button>
  );
}
```

Move properties to variants:

```jsx
let motion, checked;
function App() {
  return (
    <motion.path
      variants={{
        unchecked: {
          pathLength: 0,
          transition: {
            ease: "easeIn",
            duration: 0.1,
          },
        },
        checked: {
          pathLength: 1,
          transition: {
            ease: "easeIn",
            duration: 0.2,
          },
        },
      }}
      d="M5 13l4 4L19 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}
```

<!-- // transition={{
//   duration: checked ? 0.15 : 0,
// <motion.path
// animate={{
//   pathLength: checked ? 1 : 0
// }}
// transition={{
//   duration: checked ? 0.2 : 0.1
// }}
// variants={{
//     unchecked: { pathLength: 0 },
//     checked: { pathLength: 1 },
//   }}
// transition={{ duration: 0.18, ease: "easeIn" }}
// strokeLinecap="round"
// strokeLinejoin="round"
// d="M5 13l4 4L19 7"
// />

// // transition={{
// // duration: checked ? 0.15 : 0, -->
