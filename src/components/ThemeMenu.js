import { Menu } from '@headlessui/react';
import React, { Fragment, useCallback } from 'react';

import { ThemeSwitchContext } from '../providers/ThemeSwitchProvider';

const themeList = [
  // {
  //   category: 'gray',
  //   themes: [
  //     { color: '#000000', name: 'dark' },
  //     { color: '#94A3B8', name: 'theme-slate' },
  //     { color: '#A3A3A3', name: 'theme-neutral' },
  //     { color: '#cccccc', name: 'theme-lightgray' },
  //   ],
  // },
  {
    category: 'rose',
    themes: [
      { color: '#FB7185', name: 'theme-rose' },
      { color: '#F472B6', name: 'theme-pink' },
      { color: '#ff9494', name: 'theme-monalisa' },
      { color: '#cf9068', name: 'theme-coffee' },
    ],
  },
  {
    category: 'orange',
    themes: [
      { color: '#FB923C', name: 'theme-orange' },
      { color: '#b2ad55', name: 'theme-olive' },
      { color: '#FACC15', name: 'theme-yellow' },
      { color: '#e8e121', name: 'theme-sunflower' },
    ],
  },
  {
    category: 'green',
    themes: [
      { color: '#4ADE80', name: 'theme-green' },
      { color: '#34D399', name: 'theme-emerald' },
      { color: '#2DD4BF', name: 'theme-teal' },
      { color: '#A3E635', name: 'theme-lime' },
    ],
  },
  {
    category: 'blue',
    themes: [
      { color: '#60A5FA', name: 'theme-blue' },
      { color: '#38BDF8', name: 'theme-sky' },
      { color: '#22D3EE', name: 'theme-cyan' },
      { color: '#a2b3d7', name: 'theme-polo' },
    ],
  },
  {
    category: 'indigo',
    themes: [
      { color: '#818CF8', name: 'theme-indigo' },
      { color: '#A78BFA', name: 'theme-violet' },
      { color: '#C084FC', name: 'theme-purple' },
      { color: '#E879F9', name: 'theme-fuchsia' },
    ],
  },
];

function ColorButton({ color, theme, onClick }) {
  return (
    <button
      type="button"
      aria-label="color"
      className="flex h-8 w-8 items-center justify-center rounded-full p-1 shadow shadow-500
              hover:ring-2 hover:ring-slate-300 focus:shadow-600 focus:outline-none dark:shadow-xl
              dark:shadow-gray-800 md:h-6 md:w-6"
      data-theme={theme}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}

function ThemeMenu() {
  const { setTheme } = React.useContext(ThemeSwitchContext);
  const clickHandler = useCallback(
    (e) => {
      // e.preventDefault();
      setTheme(e.target.getAttribute('data-theme'));
    },
    [setTheme]
  );

  return (
    <Menu as="div" className="relative z-50 flex items-center text-left">
      {({ open }) => (
        <>
          <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-200 text-700 outline-none ring-0 saturate-150 hover:bg-400 hover:text-white dark:border-[1px] dark:border-slate-400 dark:bg-slate-400 dark:hover:bg-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-1 pl-1 pt-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clipRule="evenodd"
              />
            </svg>
          </Menu.Button>
          {open && (
            <Menu.Items
              as="div"
              className="absolute right-1 top-[1.6rem] mt-4 flex w-auto origin-top-right flex-col items-center justify-center gap-y-[0.7rem] rounded bg-300 p-2 shadow-md  shadow-200 focus:outline-none dark:border-[1px] dark:border-slate-500 dark:bg-slate-600"
            >
              {themeList.map(({ category, themes }) => (
                <div key={category} className="z-10 flex w-full">
                  {themes.map(({ color, name }) => (
                    <Menu.Item
                      key={name}
                      as="div"
                      className="flex flex-1 flex-row flex-wrap justify-start gap-3 p-2"
                    >
                      <ColorButton
                        color={color}
                        theme={name}
                        onClick={clickHandler}
                      />
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
}

export default ThemeMenu;
