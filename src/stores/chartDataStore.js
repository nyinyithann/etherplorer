import { Vec } from '@nyinyithann/vec.js';
import moment from 'moment';
import create from 'zustand';

import { toBlock, toTxn } from './utils';
import { getBlockNumberByTimestamp } from './web3helper';
import web3 from './webthree';

export const defaultSelector = ({
  chartDataLoading,
  chatDataLoadingError,
  chartData,
  getChartData,
}) => ({
  chartDataLoading,
  chatDataLoadingError,
  chartData,
  getChartData,
});

const useChartDataStore = create((set, get) => ({
  chartDataLoading: false,
  chatDataLoadingError: null,
  chartData: [],
  getChartData: async (forcedReload, interval = 'hours', capacity = 24) => {
    try {
      const chData = get().chartData;
      const needReload = forcedReload || chData.length === 0;
      if (needReload) {
        set((_) => ({
          chartDataLoading: true,
          chartDataLoadingError: null,
          chartData: [],
        }));

        let fromBlockNumber = await web3.eth.getBlockNumber();
        const chartData = Vec.init(capacity, (c) => {
          const m = moment().subtract(c + 1, interval);
          const mn = m.format('h:m a');
          const lbl = m.format('dddd, MMM Do YYYY h:m a');
          const ts = m.unix();
          return { name: mn, timestamp: ts, label: lbl };
        });

        const blkNums7 = await Promise.all(
          chartData.map(({ timestamp }) =>
            getBlockNumberByTimestamp(timestamp, fromBlockNumber)
          )
        );

        for (let i = 0; i < blkNums7.length; i += 1) {
          chartData[i].fromto = { from: fromBlockNumber, to: blkNums7[i] };
          fromBlockNumber = blkNums7[i] - 1;
        }

        for (let i = 0; i < chartData.length; i += 1) {
          const { from } = chartData[i].fromto;
          const { to } = chartData[i].fromto;
          const blkNumbers = Vec.unfold(
            (x) => (x >= to ? [x, x - 1] : undefined),
            from
          );
          chartData[i].totalBlocks = blkNumbers.length;
          const txns = await Promise.all(
            blkNumbers.map((x) => web3.eth.getBlockTransactionCount(x))
          );
          chartData[i].totalTxns = txns.reduce((a, b) => a + b, 0);

          set((_) => ({
            chartDataLoading: true,
            chartDataLoadingError: null,
            chartData,
          }));
        }

        set((_) => ({
          chartDataLoading: false,
          chartDataLoadingError: null,
          chartData: chartData.sort((x, y) => x.timestamp - y.timestamp),
        }));
      }
    } catch (e) {
      set((_) => ({
        chartDataLoading: false,
        chartDataLoadingError: e.message,
        chartData: [],
      }));
    }
  },
}));

export default useChartDataStore;
