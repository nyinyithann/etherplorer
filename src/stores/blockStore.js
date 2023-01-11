import create from 'zustand';
import web3 from './webthree';
import { toBlock } from './utils';

export const defaultSelector = ({
    blockLoading,
    blockLoadingError,
    block,
    getBlock,
}) => ({
    blockLoading,
    blockLoadingError,
    block,
    getBlock,
});

const useBlockStore = create((set) => ({
    blockLoading: false,
    blockLoadingError: null,
    block: null,
    getBlock: async (hashOrNumber) => {
        try {
            set((_) => ({
                block: null,
                blockLoading: true,
                blockLoadingError: null,
            }));

            const block = await web3.eth.getBlock(hashOrNumber);
            const resultBlock = toBlock(block);

            set((_) => ({
                block: resultBlock,
                blockLoading: false,
                blockLoadingError: null,
            }));
        } catch (e) {
            set((_) => ({
                blockLoading: false,
                blockLoadingError: e.message,
                block: null,
            }));
        }
    },
}));

export default useBlockStore;
