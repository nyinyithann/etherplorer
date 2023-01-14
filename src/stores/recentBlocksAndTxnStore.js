import { Vec } from '@nyinyithann/vec.js';
import create from 'zustand';

import { toBlocks, toTxns } from './utils';
import web3 from './webthree';

export const defaultSelector = ({
  blockLoading,
  blockLoadingError,
  blocks,
  txnLoading,
  txnLoadingError,
  transactions,
  getRecentBlocksAndTxn,
}) => ({
  blockLoading,
  blockLoadingError,
  blocks,
  txnLoading,
  txnLoadingError,
  transactions,
  getRecentBlocksAndTxn,
});

const NUMBER_OF_RECENT_BLOCKS = 100;

const useRecentBlocksAndTxnStore = create((set, get) => ({
  blockLoading: false,
  blockLoadingError: null,
  blocks: [],
  txnLoading: false,
  txnLoadingError: null,
  transactions: [],
  getRecentBlocksAndTxn: async (forcedReload) => {
    const existingBlks = get().blocks;
    const needReload = forcedReload || existingBlks.length === 0;
    if (needReload) {
      set(({ blocks, transactions }) => ({
        blocks,
        transactions,
        blockLoading: true,
        blockLoadingError: null,
        txnLoading: true,
        txnLoadingError: null,
      }));
      let resultBlocks = [];
      try {
        const latestBlkNum = await web3.eth.getBlockNumber();
        const blkNumbers = Vec.init(
          NUMBER_OF_RECENT_BLOCKS,
          (x) => latestBlkNum - (NUMBER_OF_RECENT_BLOCKS - 1 - x)
        );
        const blks = await Promise.all(
          blkNumbers.map((x) => web3.eth.getBlock(x))
        );

        resultBlocks = toBlocks(blks);

        set(({ transactions }) => ({
          blockLoading: false,
          blockLoadingError: null,
          blocks: resultBlocks,
          transactions,
          txnLoading: true,
          txnLoadingError: null,
        }));
      } catch (e) {
        set(({ transactions }) => ({
          blockLoading: false,
          blockLoadingError: e.message,
          blocks: [],
          transactions,
          txnLoading: false,
          txnLoadingError: null,
        }));
      }

      try {
        const txns = resultBlocks
          .slice(0, 3)
          .reduce((acc, x) => acc.concat(x.transactions), []);

        const transactions = await Promise.all(
          txns.map((x) => web3.eth.getTransaction(x))
        );
        set(({ blocks }) => ({
          blockLoading: false,
          blockLoadingError: null,
          blocks,
          transactions: toTxns(transactions, resultBlocks),
          txnLoading: false,
          txnLoadingError: null,
        }));
      } catch (e) {
        set(({ blocks }) => ({
          blockLoading: false,
          blockLoadingError: null,
          blocks,
          transactions: [],
          txnLoading: false,
          txnLoadingError: e.message,
        }));
      }
    } else {
      set(
        ({
          blocks,
          blockLoading,
          blockLoadingError,
          transactions,
          txnLoading,
          txnLoadingError,
        }) => ({
          blocks,
          transactions,
          blockLoading,
          blockLoadingError,
          txnLoading,
          txnLoadingError,
        })
      );
    }
  },
}));

export default useRecentBlocksAndTxnStore;
