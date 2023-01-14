import React from 'react';

export default function Error({ error }) {
  if (!error) {
    return <div />;
  }
  return (
    <div className="z-50 flex w-full flex-col p-2 font-sans text-800">
      <p>Sorry. Error occured! 😔</p>
      <p>{error}</p>
    </div>
  );
}
