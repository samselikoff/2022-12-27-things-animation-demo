import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { Fragment, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
let fullConfig = resolveConfig(tailwindConfig);
let colors = fullConfig.theme.colors;

export default function Example() {
  let [open, setOpen] = useState(false);

  return (
    <div className="fixed left-16 top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            onClick={() => setOpen(!open)}
            className="inline-flex w-full justify-center rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Options
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: 0.1 }}
            >
              <Menu.Items
                static
                className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <AnimatedButton
                        onClick={async (controls) => {
                          // await controls.start({
                          //   background: transparentize(colors.violet[500], 0),
                          //   color: colors.gray[900],
                          //   transition: { duration: 0 },
                          // });
                          // await controls.start({
                          //   background: transparentize(colors.violet[500], 1),
                          //   color: colors.white,
                          //   transition: {
                          //     duration: 0,
                          //     delay: 0.06,
                          //     type: "linear",
                          //   },
                          // });
                          // await controls.start({
                          //   background: transparentize(colors.violet[500], 1),
                          //   transition: { duration: 0.15 },
                          // });

                          await controls.start({
                            background: [
                              transparentize(colors.violet[500], 1),
                              transparentize(colors.violet[500], 0),
                              transparentize(colors.violet[500], 0),
                              transparentize(colors.violet[500], 1),
                            ],
                            transition: {
                              duration: 0.2,
                              times: [0.3, 0.3, 0.6, 0.6],
                            },
                          });
                          setOpen(false);
                        }}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-white`}
                      >
                        {/* {active ? ( */}
                        <EditActiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        {/* ) : (
                        <EditInactiveIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )} */}
                        Edit
                      </AnimatedButton>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <DuplicateActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Duplicate
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <ArchiveActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArchiveInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Archive
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <MoveActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <MoveInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Move
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <DeleteActiveIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <DeleteInactiveIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        )}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </motion.div>
          )}
        </AnimatePresence>
      </Menu>
    </div>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function DuplicateActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function DeleteInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

function AnimatedButton({ onClick, ...rest }) {
  const controls = useAnimation();

  return (
    <motion.button
      animate={controls}
      onClick={() => onClick(controls)}
      {...rest}
    />
  );
}

function transparentize(hexColor, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? `rgba(${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(
        result[3],
        16
      )} / ${opacity})`
    : null;
}
