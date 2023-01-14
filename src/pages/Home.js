import React from 'react';

import BlockList from '../components/BlockList';
import Chart from '../components/Chart';
import SearchBox from '../components/SearchBox';
import TxnList from '../components/TxnList';
import { recentStoreselector, useRecentBlocksAndTxnStore } from '../stores';

export default function Home() {
  const {
    getRecentBlocksAndTxn,
    blockLoading,
    blockLoadingError,
    blocks,
    txnLoading,
    txnLoadingError,
    transactions,
  } = useRecentBlocksAndTxnStore(recentStoreselector);

  React.useEffect(() => {
    getRecentBlocksAndTxn(false);
    document.title = 'Ether Explorer';
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-start gap-y-4 p-4 dark:text-slate-300">
      <div className="flex w-full items-center justify-center px-4 md:px-20">
        <SearchBox />
      </div>
      <div className="flex h-auto w-[95vw] flex-col items-center justify-center gap-0 rounded-md border-[1px] border-200 p-4 shadow-sm shadow-100">
        <Chart />
      </div>
      <div className="flex w-full flex-row flex-wrap justify-evenly">
        <BlockList
          blocks={blocks}
          loading={blockLoading}
          error={blockLoadingError}
          onReload={(_) => getRecentBlocksAndTxn(true)}
        />
        <TxnList
          transactions={transactions}
          loading={txnLoading}
          error={txnLoadingError}
          onReload={(_) => getRecentBlocksAndTxn(true)}
        />
      </div>
    </main>
  );
}
