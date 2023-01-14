import React from 'react';
import { useNavigate } from 'react-router-dom';
import web3 from 'web3';

export default function SearchBox() {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const navigateTo = (v) => {
    const textValue = v.trim();
    if (Number.isFinite(+textValue)) {
      navigate(`/block/${textValue}`);
    }
    if (web3.utils.isHexStrict(textValue)) {
      navigate(`/txn/${textValue}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text) {
      navigateTo(text);
    }
  };

  const onClick = (_) => {
    if (text) {
      navigateTo(text);
    }
  };

  return (
    <div className="relative flex w-full items-center gap-x-2 rounded-lg bg-300 p-2 pb-2 text-slate-500 shadow shadow-200 focus-within:text-slate-600">
      <input
        id="search-field"
        className="block h-8 w-full rounded-md border-t-0 border-r-0 border-l-0 border-b-[1px] border-b-400 pl-[2rem] text-[0.9rem] text-900 placeholder-klor-300 outline-none ring-0 hover:border-b-500 focus:text-900 focus:placeholder-klor-300 focus:outline-none focus:ring-0 active:text-900 active:outline-none active:ring-0 dark:bg-slate-800 dark:text-slate-400"
        placeholder="Search block number/ txn hash"
        type="search"
        name="search"
        maxLength={256}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="cursor-pointer rounded-md bg-400 p-2 shadow shadow-300 hover:bg-500 focus:bg-500 active:bg-500"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4 stroke-klor-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}
