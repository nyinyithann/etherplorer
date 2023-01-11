import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import TitleWithReload from './TitleWithReload';

const TxnList = ({ transactions, loading, error, onReload }) => {
  return (
    <div className="mb-4 flex w-[94vw] flex-col gap-4 rounded-md border-[1px] border-200 p-4 shadow-sm shadow-100 sm:w-[100vw] md:w-[100vw] lg:w-[47vw]">
      <TitleWithReload title="Latest Transactions" onReload={onReload} />
      <div className="bs-scrollbar relative h-[20rem] flex-grow overflow-auto px-2">
        <table className="relative min-w-full border-separate border-spacing-0">
          <thead className="w-full rounded-md text-left text-900/80">
            <tr className="sticky top-0 w-full bg-white">
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2"
                scope="col"
              >
                Txn Hash
              </th>
              <th
                className="sticky top-0 border-b-[2px]  border-400 p-2"
                scope="col"
              >
                Block
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2
"
                scope="col"
              >
                Age
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2 text-right"
                scope="col"
              >
                Value
              </th>
              <th
                className="sticky top-0 border-b-[2px] border-400 p-2 text-right"
                scope="col"
              >
                Txn Fee
              </th>
            </tr>
          </thead>
          <tbody className="w-full divide-y divide-100 font-sans text-[0.8rem] text-800">
            {transactions.map((x) => (
              <tr key={x.number} className="w-full">
                <td className="block w-[7rem] overflow-hidden truncate p-2">
                  <Link to={`txn/${x.hash}`} className="text-500 underline">
                    <span className="w-2">{x.hash}</span>
                  </Link>
                </td>
                <td className="p-2">
                  <Link
                    to={`block/${x.blockNumber}`}
                    className="text-500 underline"
                  >
                    <span className="w-2">{x.blockNumber}</span>
                  </Link>
                </td>
                <td className="p-2">{x.age}</td>
                <td className="p-2 text-right">{x.value}</td>
                <td className="p-2 text-right">{x.gasPrice}</td>
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
      </div>
    </div>
  );
};

export default TxnList;
