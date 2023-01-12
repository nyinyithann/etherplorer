import React from 'react';
import { useParams } from 'react-router-dom';
import { useTxnStore, txnStoreSelector } from '../stores';
import Loading from '../components/Loading';
import Title from '../components/Title';
import Pair from '../components/Pair';
import SearchBox from '../components/SearchBox';
import Error from '../components/Error';

export default function TransactionPage() {
  const { txHash } = useParams();
  const { txnLoading, txnLoadingError, txn, getTxn } =
    useTxnStore(txnStoreSelector);
  React.useEffect(() => {
    getTxn(txHash);
  }, [txHash]);

  React.useEffect(() => {
    document.title = 'Ether Explorer (Transaction)';
  }, []);
  return (
    <div className="relative flex flex-col justify-center gap-y-2 p-10">
      <div className="flex w-full items-center justify-center pb-4">
        <SearchBox />
      </div>
      {txn ? (
        <>
          <Title text="Transaction Details" />
          <div className="flex flex-col divide-y divide-200">
            <Pair label="Transaction Hash " value={txn.hash} />
            <Pair label="Block" value={txn.blockNumber} />
            <Pair label="Timestamp" value={`${txn.age} ago (${txn.date})`} />
            <Pair label="From" value={txn.from} />
            <Pair label="To" value={txn.to} />
            <Pair label="Value" value={`${txn.value} ether`} />
            <Pair label="Gas Price" value={`${txn.gasPrice} ether`} />
            <Pair label="Gas" value={txn.gas.toLocaleString('en-US')} />
            <Pair label="Transaction Index" value={txn.transactionIndex} />
            <Pair label="Nonce" value={txn.nonce.toLocaleString('en-US')} />
          </div>
        </>
      ) : null}
      <div
        className={`${
          txnLoading && !txnLoadingError ? 'flex' : 'hidden'
        } absolute left-0 top-0 bottom-0 right-0 flex-col items-center justify-center bg-white opacity-90`}
      >
        <Loading className="h-[3rem] w-[4rem] stroke-klor-400 stroke-[0.4rem] p-3 text-white" />
      </div>
      <Error error={txnLoadingError} />
    </div>
  );
}
