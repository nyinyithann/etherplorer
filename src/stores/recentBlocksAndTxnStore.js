import { Vec } from '@nyinyithann/vec.js';
import create from 'zustand';
import web3 from './webthree';
import {toBlock} from './utils';

export const defaultSelector = ({
    loading,
    error,
    blocks,
    getRecentBlocksAndTxn,
}) => ({
    loading,
    error,
    blocks,
    getRecentBlocksAndTxn,
});

const NUMBER_OF_RECENT_BLOCKS = 50;

const useRecentBlocksAndTxnStore = create((set) => ({
    loading: false,
    error: null,
    blocks: [],
    getRecentBlocksAndTxn: async () => {
        try {
            set(({ blocks }) => ({ blocks, error: null, loading: true }));
            const latestBlkNum = await web3.eth.getBlockNumber();
            const blkNumbers = Vec.init(NUMBER_OF_RECENT_BLOCKS, (x) => latestBlkNum - (NUMBER_OF_RECENT_BLOCKS - 1 - x));
            const blocks = await Promise.all(
                blkNumbers.map((x) => web3.eth.getBlock(x))
            );
            set(_ => ({ loading: false, error: null, blocks: toBlock(blocks) }));
        } catch (e) {
            set(({ blocks }) => ({ blocks, loading: false, error: e.message }));
        }
    },
}));

export default useRecentBlocksAndTxnStore;
