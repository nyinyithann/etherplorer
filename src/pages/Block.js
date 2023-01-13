import React from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Pair from '../components/Pair';
import SearchBox from '../components/SearchBox';
import Title from '../components/Title';
import { blockStoreSelector, useBlockStore } from '../stores';

export default function Block() {
  const { blockNumber } = useParams();
  const { blockLoading, blockLoadingError, block, getBlock } =
    useBlockStore(blockStoreSelector);

  React.useEffect(() => {
    getBlock(blockNumber);
  }, [blockNumber]);

  React.useEffect(() => {
    if (block && block.number) {
      document.title = `Ethereum Block #${block.number}`;
    }
  }, [block]);

  return (
    <div className="relative flex flex-col justify-center gap-y-2 p-10 pt-4">
      <div className="flex w-full items-center justify-center pb-4">
        <SearchBox />
      </div>
      {block ? (
        <>
          <Title text={`BLOCK #${block.number}`} />
          <div className="flex flex-col divide-y divide-200">
            <Pair label="Block Height" value={block.number} />
            <Pair
              label="Timestamp"
              value={`${block.age} ago (${block.date})`}
            />
            <Pair label="Transaction Count" value={block.txnCount} />
            <Pair label="Block Hash" value={block.hash} />
            <Pair label="Parent Hash" value={block.parentHash} />
            <Pair label="Nonce" value={block.nonce.toLocaleString('en-US')} />
            <Pair
              label="Base Fee Per Gas"
              value={`${block.baseFeePerGas ? block.baseFeePerGas : 0} Ether`}
            />
            <Pair label="SHA3 Uncles" value={block.sha3Uncles} />
            <Pair label="Miner" value={block.miner} />
            <Pair
              label="Difficulty"
              value={block.difficulty.toLocaleString('en-US')}
            />
            <Pair
              label="Total Difficulty"
              value={(+block.totalDifficulty).toLocaleString('en-US')}
            />
            <Pair
              label="Size"
              value={`${block.size.toLocaleString('en-US')} bytes`}
            />
            <Pair
              label="Gas Limit"
              value={block.gasLimit.toLocaleString('en-US')}
            />
            <Pair
              label="Gas Used"
              value={block.gasUsed.toLocaleString('en-US')}
            />
          </div>{' '}
        </>
      ) : null}
      <div
        className={`${
          blockLoading && !blockLoadingError ? 'flex' : 'hidden'
        } absolute left-0 top-0 bottom-0 right-0 flex-col items-center justify-center bg-white opacity-90`}
      >
        <Loading className="h-[3rem] w-[4rem] stroke-klor-400 stroke-[0.4rem] p-3 text-white" />
      </div>
      <Error error={blockLoadingError} />
    </div>
  );
}
