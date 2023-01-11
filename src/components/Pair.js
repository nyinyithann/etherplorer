import React from 'react';

export default function Pair({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-x-10 py-2">
      <span className="w-1/4 flex-shrink-0 rounded-r-full bg-50/70 py-1 pl-1 text-900 dark:bg-slate-700 dark:text-slate-300">{`${label}`}</span>
      <span className="w-2/4 dark:text-slate-300">{value}</span>
    </div>
  );
}
