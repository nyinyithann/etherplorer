import React from 'react';
import { Link } from 'react-router-dom';

import Error from './Error';
import Loading from './Loading';
import TitleWithReload from './TitleWithReload';

function BlockList({ blocks, loading, error, onReload }) {
  return (
    <div className="mb-4 flex w-full flex-col gap-4 rounded-md border-[1px] border-200 p-4 shadow-sm shadow-100 md:w-[100vw] lg:w-[47vw]">
      <TitleWithReload
        title={`Latest Blocks - ${blocks ? blocks.length : ''}`}
        onReload={onReload}
      />
      <div className="bs-scrollbar relative h-[20rem] flex-grow overflow-auto px-2">
        <table className="relative min-w-full border-separate border-spacing-0">
          <thead className="w-full rounded-md text-left text-900/80">
            <tr className="bg-whitej sticky top-0 w-full bg-white">
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2"
                scope="col"
              >
                Block
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2"
                scope="col"
              >
                Age
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 px-4 text-right"
                scope="col"
              >
                Txn
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 px-4 text-right"
                scope="col"
              >
                Gas Used
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 px-4 text-right"
                scope="col"
              >
                Gas Limit
              </th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-100 font-sans text-[0.8rem] text-800">
            {blocks.map((x) => (
              <tr key={x.number} className="w-full">
                <td className="p-2">
                  <Link to={`block/${x.number}`} className="text-500 underline">
                    {x.number}
                  </Link>
                </td>

                <td className="inline-block w-[8rem] min-w-[4rem] p-2 md:w-[6rem]">
                  {x.age}
                </td>
                <td className="px-4 text-right">
                  {x.txnCount.toLocaleString('en-US')}
                </td>
                <td className="px-4 text-right">
                  {x.gasUsed.toLocaleString('en-US')}
                </td>
                <td className="px-4 text-right">
                  {x.gasLimit.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className={`${
            loading && !error ? 'flex' : 'hidden'
          } absolute left-0 top-0 bottom-0 right-0 flex-col items-center justify-center bg-gray-50 opacity-90`}
        >
          <Loading className="h-[3rem] w-[4rem] stroke-klor-400 stroke-[0.4rem] p-3 text-white" />
        </div>
        <Error error={error} />
      </div>
    </div>
  );
}

export default BlockList;
