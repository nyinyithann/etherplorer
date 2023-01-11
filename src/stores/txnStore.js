import create from 'zustand';
import web3 from './webthree';
import { toTxn } from './utils';

export const defaultSelector = ({
  txnLoading,
  txnLoadingError,
  txn,
  getTxn,
}) => ({
  txnLoading,
  txnLoadingError,
  txn,
  getTxn,
});

const useTxnStore = create((set) => ({
  txnLoading: false,
  txnLoadingError: null,
  txn: null,
  getTxn: async (txnHash) => {
    try {
      set((_) => ({
        txn: null,
        txnLoading: true,
        txnLoadingError: null,
      }));

      const txn = await web3.eth.getTransaction(txnHash);
      const block = await web3.eth.getBlock(txn.blockNumber);
      const resultTxn = toTxn(txn, block);

      set((_) => ({
        txn: resultTxn,
        txnLoading: false,
        txnLoadingError: null,
      }));
    } catch (e) {
      set((_) => ({
        txn: null,
        txnLoading: false,
        txnLoadingError: e.message,
      }));
    }
  },
}));

export default useTxnStore;