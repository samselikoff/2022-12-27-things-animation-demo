/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useIsPresent,
} from "framer-motion";

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const files = [
  {
    id: 1,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 2,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 3,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 4,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 5,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 6,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 7,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  {
    id: 8,
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80",
  },
];

export default function Example() {
  let [images, setImages] = useState(files);
  let [imagesToDelete, setImagesToDelete] = useState([]);

  function selectedImages(id) {
    setImages((images) => images.filter((i) => i.id !== id));
  }

  // function selectedImages(id) {
  //   setImagesToDelete((i) => [...i, id]);
  // }

  function deleteImages() {
    setImages((images) => images.filter((p) => !imagesToDelete.includes(p.id)));
  }

  return (
    <div className="p-20">
      {/* <button onClick={deleteImages} className="mb-8">
        Delete
      </button> */}
      {/* <ul
        role="list"
        className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      > */}
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <AnimatePresence>
          {images.map((file) => (
            <ImageTile
              key={file.id}
              file={file}
              selectedImages={selectedImages}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function ImageTile({ file, selectedImages }) {
  let isPresent = useIsPresent();

  return (
    <motion.li
      layout
      className="relative"
      exit={{ opacity: 0 }}
      style={{ position: isPresent ? "relative" : "absolute" }}
    >
      <div className="aspect-w-10 aspect-h-7 group block overflow-hidden rounded-lg bg-gray-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100">
        <img
          src={file.source}
          alt=""
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
        <button
          onClick={() => selectedImages(file.id)}
          type="button"
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">View details for {file.title}</span>
        </button>
      </div>
      <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
        {file.title}
      </p>
      <p className="pointer-events-none block text-sm font-medium text-gray-500">
        {file.size}
      </p>
    </motion.li>
  );
}
