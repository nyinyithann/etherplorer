import React from 'react';

export default function TitleWithReload({ title, onReload }) {
  return (
    <div className="flex w-full  border-b-[1px] border-200">
      <span className="pb-2 font-nav text-[1.2rem] font-semibold text-900">
        {title}
      </span>
      <button
        type="button"
        className="ml-auto mb-2 rounded-full bg-200 p-2 hover:bg-300"
        onClick={onReload}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-4 w-4 stroke-klor-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </div>
  );
}
