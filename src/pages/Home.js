import React from 'react';
import { useRecentBlocksAndTxnStore, recentStoreselector } from '../stores';
import BlockList from '../components/BlockList';
// import Loading from '../components/Loading';

export default function Home() {
  const { getRecentBlocksAndTxn, loading, error, blocks } =
    useRecentBlocksAndTxnStore(recentStoreselector);
  React.useEffect(() => {
    getRecentBlocksAndTxn();
  }, []);

  return (
    <main className="flex h-full flex-col items-center justify-start dark:text-slate-300 p-4">
      <div className="flex w-full flex-row flex-wrap justify-evenly gap-4">
        <BlockList blocks={blocks} />
        <BlockList blocks={blocks} />
      </div>
    </main>
  );
}
