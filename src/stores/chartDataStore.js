import create from 'zustand';

import { toBlock, toTxn } from './utils';
import web3 from './webthree';
import { getBlockNumberByTimestamp } from './web3helper.js';
import { Vec } from '@nyinyithann/vec.js';
import moment from 'moment';

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

const useChartDataStore = create((set) => ({
    chartDataLoading: false,
    chatDataLoadingError: null,
    chartData: [],
    getChartData: async (interval = 'hours', capacity = 2) => {
        try {
            set((_) => ({
                chartDataLoading: true,
                chartDataLoadingError: null,
                chartData: [],
            }));
            /*
            let currentTimeStamp = moment().unix();
            let fromBlockNumber = await web3.eth.getBlockNumber();
            let chartData = Vec.init(capacity, c => {
                const m = moment().subtract(c + 1, interval);
                const mn = m.format('DD/MM/YY h m a');
                const ts = m.unix();
                return { name: mn, timestamp: ts };
            });

            for (const data of chartData) {
                console.log(data.timestamp);
                let toBlkNo = await getBlockNumberByTimestamp(data.timestamp, fromBlockNumber);
                data.fromto = { from: fromBlockNumber, to: toBlkNo };
                fromBlockNumber = toBlkNo + 1;
            }
            console.log(chartData);
            */
            let currentTimeStamp = moment().unix();
            let fromBlockNumber = await web3.eth.getBlockNumber();
            let chartData = Vec.init(capacity, c => {
                const m = moment().subtract(c + 1, interval);
                const mn = m.format('DD/MM/YY h m a');
                const ts = m.unix();
                return { name: mn, timestamp: ts };
            });

            console.log("start...");
            const blkNums7 = await Promise.all(
                chartData.map(({ timestamp }) => getBlockNumberByTimestamp(timestamp, fromBlockNumber)));
            for (const i of blkNums7.map((_, x) => x)) {
                chartData[i].fromto = { from: fromBlockNumber, to: blkNums7[i] };
                fromBlockNumber = blkNums7[i] - 1;
            }
            console.log("txn count...");

            for (let i = 0; i < chartData.length; i++) {
                const from = chartData[i].fromto.from;
                const to = chartData[i].fromto.to;
                console.log(from);
                console.log(to);
                let blkNumbers = Vec.unfold(x => x >= to ? [x, x - 1] : undefined, from);
                chartData[i].totalBlocks = blkNumbers.length;
                console.log(chartData[i].totalBlocks);
                let txns = await Promise.all(blkNumbers.map(x => web3.eth.getBlockTransactionCount(x)));
                console.log(txns);
                console.log("total txns: " + txns.reduceRight((x,y) => x + y, 0));
                chartData[i].totalTxns = txns.reduce((a, b) => a + b, 0);
                console.log("total txns: " + chartData[i].totalTxns);
            }

            console.log(chartData);

        } catch (e) {
            console.log(e);
            set((_) => ({
                chartDataLoading: true,
                chartDataLoadingError: e.message,
                chartData: [],
            }));
        }
    },
}));

export default useChartDataStore;
