# First pass: Ternaries everywhere!

Let's start by looking at how we can animate the check mark.

This is easy to do in Framer Motion by animating the svg's `pathLength`:

```jsx
<motion.path
  d="M5 13l4 4L19 7"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
```

This gives us a pretty awesome check animation:

[ image ]

Of course, we want the check to be based off React state, so we can use a ternary to conditionally control the animation:

```jsx


let [ checked, setChecked ] = useState()

// ...

<motion.path
  d="M5 13l4 4L19 7"
  initial={{ pathLength: checked ? 1 : 0 }}
  animate={{ pathLength: checked ? 1 : 0 }}
/>


```

This works great! Whenever the checked state is updated, the check gets animate.

Of course, there's more than just the path length. We need to animate other properties like the opacity and color; we need to set different timings based on whether you're checking or unchecking the box; and we need to use a delay so the checkmark animates in the second stage of animation.

```jsx
<motion.path
  d="M5 13l4 4L19 7"
  initial={{
    pathLength: checked ? 1 : 0,
    color: checked ? "white" : "gray",
    opacity: checked ? 1 : 0,
  }}
  animate={{
    pathLength: checked ? 1 : 0,
    color: checked ? "white" : "gray",
    opacity: checked ? 1 : 0,
  }}
  transition={{
    duration: checked ? 0.5 : 0.2,
    pathLength: {
      delay: checked ? 0.5 : 0,
    },
  }}
/>
```

While this works, it's hard to read. Can you tell me what happens when you uncheck the box?

What we need is a way to make this animation more readable.

# Refactoring to Variants

Framer Motion has a feature called _variants_ that lets you give a name to a set of animated properties. It’s great for adding more clarity to complex animations.

Here's what our animation looks like using variants:

```jsx
<motion.path
  d="M5 13l4 4L19 7"
  variants={{
    unchecked: {
      pathLength: 0,
      color: "gray",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    checked: {
      pathLength: 1,
      color: "white",
      opacity: 1,
      transition: {
        duration: 0.2,
        pathLength: {
          delay: 0.5,
        },
      },
    },
  }}
  initial={checked ? "checked" : "unchecked"}
  animate={checked ? "checked" : "unchecked"}
/>
```

Now we clearly can see what happens when we uncheck the box: the pathLength and opacity animate to 0 and the color animates to gray in 0.5 seconds. A lot easier than before, right?

The thing about animations with lots of details is that they get complex really fast. Details means lots of different properties with different delays and transitions, and these details have to be orchestrated with each other. Variants let us express these complex animations in a readable way.

Even more importantly, variants are much easier to tweak and change. If we need to add a new animated property to the `checked` state, we know exactly where to go.

**Variants let us decouple _what state_ an element should be in (e.g. checked) from _what it means_ for an element to be that particular state (e.g. a pathLength of 1).**

The actual animation from Things is quite complex – each element-variant-property often has its own set of durations, delays and easings. In total we set over 30 unique properties – all while just using two variants, checked and unchecked.

Refactoring all of our code to use variants is what really let us start finessing each stage of our animation to match the native one from Things.

[ image ]

# The Course - 6 High-Fidelity Component Walkthroughs

The course we’re building will teach you how to build six separate components, from scratch, step-by-step, just like the checkbox animation from Things. For each component you’ll get a video walkthrough as well as full access to the component’s source code.

One thing I’ve learned from publishing more consistently to my YouTube channel this year is that people like _details_. So, we’re sourcing our component ideas from some of our favorite, most polished apps, and making sure we deliver detailed, high-fidelity reproductions.

We can’t wait to keep building out these demos – we continue to be more and more impressed by Framer Motion the more we use it.

Till next time!

– Sam and Ryan
