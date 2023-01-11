import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlockStore, blockStoreSelector } from '../stores';
import Loading from '../components/Loading';

function Title({ text }) {
    return text ? (
        <div className="font-nav text-900 text-[1.1rem] dark:text-slate-300  md:text-[1.4rem] border-b-[2px] border-b-400 pb-1">
            <p>{text}</p>
        </div>
    ) : null;
}


const Pair = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-x-10 py-2">
            <span className="w-1/4 flex-shrink-0 rounded-r-full bg-50/70 pl-1 py-1 text-900 dark:bg-slate-700 dark:text-slate-300">{`${label}`}</span>
            <span className="w-2/4 dark:text-slate-300">{value}</span>
        </div>
    );
};

export default function Block() {
    const { blockNumber } = useParams();
    const {
        blockLoading,
        blockLoadingError,
        block,
        getBlock,
    } = useBlockStore(blockStoreSelector);

    React.useEffect(() => {
        getBlock(blockNumber);
    }, [blockNumber]);

    React.useEffect(() => {
        if (block && block.number) {
            document.title = `Ethereum Block #${block.number}`
        }
    }, [block])

    return (
        <div className='flex flex-col justify-center p-10 gap-y-2 relative'>
            {block ?
                <>
                    <Title text={`BLOCK #${block.number}`} />
                    <div className='flex flex-col divide-y divide-200'>
                        <Pair label="Block Height" value={block.number} />
                        <Pair label="Timestamp" value={`${block.age} ago (${block.date})`} />
                        <Pair label="Transaction Count" value={block.txnCount} />
                        <Pair label="Block Hash" value={block.hash} />
                        <Pair label="Parent Hash" value={block.parentHash} />
                        <Pair label="Nonce" value={block.nonce} />
                        <Pair label="Base Fee Per Gas" value={`${block.baseFeePerGas} Ether`} />
                        <Pair label="SHA3 Uncles" value={block.sha3Uncles} />
                        <Pair label="Miner" value={block.miner} />
                        <Pair label="Difficulty" value={block.difficulty.toLocaleString("en-US")
                        } />
                        <Pair label="Total Difficulty" value={(+block.totalDifficulty).toLocaleString("en-US")
                        } />
                        <Pair label="Size" value={`${block.size.toLocaleString("en-US")
                            } bytes`} />
                        <Pair label="Gas Limit" value={block.gasLimit.toLocaleString("en-US")} />
                        <Pair label="Gas Used" value={block.gasUsed.toLocaleString("en-US")} />

                    </div> </> : null}
            {
                                    <div
                            className={`${blockLoading && !blockLoadingError ? 'flex' : 'hidden'
                                } absolute left-0 top-0 bottom-0 right-0 flex-col items-center justify-center bg-white opacity-90`}
                        >
                            <Loading className="h-[3rem] w-[4rem] stroke-klor-400 stroke-[0.4rem] p-3 text-white" />
                        </div>

        }
        </div>
    );
}
