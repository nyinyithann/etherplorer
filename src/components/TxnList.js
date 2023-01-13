import React from 'react';
import { Link } from 'react-router-dom';

import Error from './Error';
import Loading from './Loading';
import TitleWithReload from './TitleWithReload';

function TxnList({ transactions, loading, error, onReload }) {
  return (
    <div className="mb-4 flex w-full flex-col gap-4 rounded-md border-[1px] border-200 p-4 shadow-sm shadow-100 sm:w-[100vw] md:w-[100vw] lg:w-[47vw]">
      <TitleWithReload title="Latest Transactions" onReload={onReload} />
      <div className="bs-scrollbar relative h-[20rem] flex-grow overflow-auto px-2">
        <table className="relative min-w-full table-auto border-separate border-spacing-0">
          <thead className="w-full rounded-md text-left text-900/80">
            <tr className="sticky top-0 w-full bg-white">
              <th
                key="hash"
                className="sticky top-0 border-b-[2px] border-400 p-2"
                scope="col"
              >
                Txn Hash
              </th>
              <th
                key="block"
                className="sticky top-0 border-b-[2px]  border-400 p-2"
                scope="col"
              >
                Block
              </th>
              <th
                key="age"
                className="sticky top-0 border-b-[2px] border-400 p-2
"
                scope="col"
              >
                Age
              </th>
              <th
                key="value"
                className="sticky top-0 border-b-[2px] border-400 p-2 text-right"
                scope="col"
              >
                Value
              </th>
              <th
                key="txnfee"
                className="sticky top-0 border-b-[2px] border-400 p-2 text-right"
                scope="col"
              >
                Txn Fee
              </th>
            </tr>
          </thead>
          <tbody className="w-full min-w-full border-separate border-spacing-0 divide-y divide-100 overflow-auto font-sans text-[0.8rem] text-800">
            {transactions.map((x) => (
              <tr
                key={x.hash}
                className="w-full min-w-full border-separate border-spacing-0 overflow-auto"
              >
                <td className="block w-[7rem] overflow-hidden truncate p-2">
                  <Link to={`txn/${x.hash}`} className="text-500 underline">
                    <span className="w-2">{x.hash}</span>
                  </Link>
                </td>
                <td className="min-w-[6rem] p-2">
                  <Link
                    to={`block/${x.blockNumber}`}
                    className="text-500 underline"
                  >
                    <span className="w-2">{x.blockNumber}</span>
                  </Link>
                </td>
                <td className="inline-block w-[8rem] min-w-[4rem] p-2">
                  {x.age}
                </td>
                <td className="min-w-[10rem] p-2 text-right">{x.value}</td>
                <td className="min-w-[10rem] p-2 text-right">{x.gasPrice}</td>
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

export default TxnList;
