/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

const faqs = [
  {
    question: "What's the best thing about S1witzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Sw2itzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switze3rland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switz4erland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure
                  as={motion.div}
                  layout
                  key={faq.question}
                  className="pt-6"
                >
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                          <motion.span
                            layout
                            className="font-medium text-gray-900"
                          >
                            {faq.question}
                          </motion.span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>

                      <motion.div layout key="foo" className="overflow-hidden">
                        <Disclosure.Panel>
                          <p className="overflow-hidden pt-2 pr-12 text-base text-gray-500">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </motion.div>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <p className="p-20">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis dolorum
        illo placeat ab enim maiores ex id excepturi, facilis pariatur unde
        consequatur neque ipsum quos vitae aperiam cum dolorem tempora.
      </p>
    </>
  );
}

function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height } : {}}
      className="relative w-full overflow-hidden"
      transition={{ type: "spring", duration: 0.3 }}
    >
      <div ref={ref} className={`${height ? "absolute" : "relative"} w-full`}>
        {children}
      </div>
    </motion.div>
  );
}
