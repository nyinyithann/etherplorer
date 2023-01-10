import React from 'react';

import Loading from './Loading';

function SuspensionLoader({ children }) {
  return (
    <React.Suspense
      fallback={
        <Loading className="h-[3rem] w-[4rem] stroke-klor-200 stroke-[0.2rem] p-3 text-700" />
      }
    >
      {children}
    </React.Suspense>
  );
}

export default SuspensionLoader;
