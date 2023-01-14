import moment, { isMoment } from 'moment';
import React from 'react';
import {
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import useMediaQuery from '../hooks/useMediaQuery';
import { chartdataStoreSelector,useChartDataStore } from '../stores';
import Error from './Error';
import Loading from './Loading';
import TitleWithReload from './TitleWithReload';

function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        return (
            <div className="flex flex-col text-[0.7rem] p-[0.7rem] bg-white rounded-sm opacity-90 border-[1px] border-300 text-900">
                <div className="font-semibold text-[0.75rem] pb-2">
                    {payload[0].payload.label}
                </div>
                <div className="">
                    <span className="font-semibold">Total blocks: </span>
                    <span>{payload[0].payload.totalBlocks}</span>
                </div>
                <div className="">
                    <span className='font-semibold'>Total transactions: </span>
                    <span>{`${payload[0].payload.totalTxns.toLocaleString("en-US")}`}</span>
                </div>
                <div className="">
                    <span className="font-semibold">Avg block time: </span>
                    <span>{(3600 / payload[0].payload.totalBlocks).toFixed(2)}</span>
                </div>
                <div className="">
                    <span className='font-semibold'>Avg txn time: </span>
                    <span>{(3600 / payload[0].payload.totalTxns).toFixed(2)}</span>
                </div>
            </div>
        );
    }

    return null;
}

export default function Chart() {
    const {
        chartDataLoading,
        chartDataLoadingError,
        chartData,
        getChartData,
    } = useChartDataStore(chartdataStoreSelector);

    const [size, setSize] = React.useState(_ => ({ width: 800, height: 300 }));
    const isMobile = useMediaQuery("(max-width: 600px)");
    const isMediumScreen = useMediaQuery("(max-width: 900px)");
    const isLargeScreen = useMediaQuery("(max-width: 1300px)");
    const isXLScreen = useMediaQuery("(max-width: 1400px)");
    const is2XLScreen = useMediaQuery("(max-width: 1500px)");

    React.useLayoutEffect(() => {
        if (isMobile) {
            setSize(_ => ({ width: 350, height: 200 }));
        } else if (isMediumScreen) {
            setSize(_ => ({ width: 650, height: 300 }));
        } else if (isLargeScreen) {
            setSize(_ => ({ width: 900, height: 300 }));
        } else if (isXLScreen) {
            setSize(_ => ({ width: 1200, height: 300 }));
        } else if (is2XLScreen) {
            setSize(_ => ({ width: 1350, height: 300 }));
        } else {
            setSize(_ => ({ width: 1600, height: 300 }));
        }
    }, [isMobile, isMediumScreen, isLargeScreen, isXLScreen, is2XLScreen]);

    React.useEffect(() => {
        getChartData();
    }, []);

    return (
        <div className='flex flex-col w-full justify-center items-center relative gap-y-4'>
            <TitleWithReload title="Ethereum Hourly Transactions Chart" onReload={_ => getChartData(true)} />
            <LineChart
                width={size.width}
                height={size.height}
                data={chartData}
                margin={{
                    top: 2,
                    right: 40,
                    left: 20,
                    bottom: 10,
                }}
            >
                <XAxis dataKey="name" dy={10} dx={14} angle={0} style={{ fontSize: 12 }} />
                <YAxis
                    label={{
                        value: 'Transaction Per Hour',
                        angle: -90,
                        position: 'center',
                        dx: -40,
                        fontSize: 14,
                    }}
                    style={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="totalTxns"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
            <div
                className={`${chartDataLoading && !chartDataLoadingError ? 'flex' : 'hidden'
                    } absolute left-0 top-0 bottom-0 right-0 flex-col items-center justify-center bg-gray-50 opacity-50`}
            >
                <Loading className="h-[3rem] w-[4rem] stroke-klor-400 stroke-[0.4rem] p-3 text-white opacity-100" />
            </div>
        </div>
    );
}
