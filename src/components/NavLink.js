import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function NavLink({ children, to }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const getButtonStyle = (m) => {
    const base =
      'focus:outline-none h-8 rounded-sm hover:bg-400/60 dark:hover:bg-slate-600 mx-1';
    return m ? `${base} bg-400/60 dark:bg-slate-500` : base;
  };

  return (
    <button className={getButtonStyle(match)} type="button">
      <Link to={to} className="py-5 px-3 text-900">
        {children}
      </Link>
    </button>
  );
}

export default NavLink;
