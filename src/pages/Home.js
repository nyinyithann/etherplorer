import React from 'react';
import { useRecentBlocksAndTxnStore, recentStoreselector } from '../stores';
import BlockList from '../components/BlockList';
import TxnList from '../components/TxnList';

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
    document.title = "Ether Explorer"
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-start p-4 dark:text-slate-300">
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
