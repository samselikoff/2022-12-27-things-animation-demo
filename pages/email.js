import { motion } from "framer-motion";
import { useState } from "react";

export default function Email() {
  let [checked, set] = useState(true);

  return (
    <div className="w-[620px] h-[310px] bg-brand flex items-center justify-center pb-10 text-white">
      <svg
        className="w-20 h-20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <motion.path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
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
      </svg>
      <button onClick={() => set(!checked)}>check</button>
    </div>
  );
}

// import { motion } from "framer-motion";
// import { useState } from "react";

// export default function Email() {
//   let [checked, set] = useState(false);

//   return (
//     <div className="w-[620px] h-[310px] bg-brand flex items-center justify-center pb-10 text-white">
//       <svg
//         className="w-20 h-20"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={3}
//       >
//         <motion.path
//           // initial={{ pathLength: 0 }}
//           initial={false}
//           animate={{ pathLength: checked ? 1 : 0 }}
//           transition={
//             {
//               // duration: 1,
//               // delay: 1,
//               // type: "spring",
//               // repeat: Infinity,
//               // repeatType: "reverse",
//             }
//           }
//           // stroke="c"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 13l4 4L19 7"
//         />
//       </svg>
//       <button onClick={() => set(!checked)}>check</button>
//     </div>
//   );
// }
