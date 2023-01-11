import React from 'react';

export default function Title({ text }) {
  return text ? (
    <div className="border-b-[2px] border-b-400 pb-1 font-nav  text-[1.1rem] text-900 dark:text-slate-300 md:text-[1.4rem]">
      <p>{text}</p>
    </div>
  ) : null;
}
