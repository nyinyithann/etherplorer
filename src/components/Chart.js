import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useChartDataStore, chartdataStoreSelector } from '../stores';

const data = [
    {
        name: '6 AM',
        txn: 2000,
        blk: 100,
    },
    {
        name: '7 AM',
        txn: 4000,
        blk: 200,
    },
    {
        name: '8 AM',
        txn: 2300,
        blk: 120,
    },
    {
        name: '9 AM',
        txn: 3400,
        blk: 140,
    },
    {
        name: '10 AM',
        txn: 2400,
        blk: 90,
    },
    {
        name: '11 AM',
        txn: 3000,
        blk: 130,
    },
    {
        name: '12 PM',
        txn: 5400,
        blk: 210,
    },
    {
        name: '1 PM',
        txn: 1000,
        blk: 40,
    },
];

export default function Chart() {
    const {
        chartDataLoading,
        chartDataLoadingError,
        chartData,
        getChartData,
    } = useChartDataStore(chartdataStoreSelector);

    React.useEffect(() => {
        getChartData();
    }, []);

    return (
        <LineChart
            width={800}
            height={500}
            data={data}
            margin={{
                top: 2,
                right: 40,
                left: 20,
                bottom: 10,
            }}
        >
            <XAxis dataKey="name" dy={10} dx={14} angle={0} />
            <YAxis
                label={{
                    value: 'Transaction Per Hour',
                    angle: -90,
                    position: 'center',
                    dx: -30,
                }}
            />
            <Tooltip />
            <Line
                type="monotone"
                dataKey="txn"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
        </LineChart>
    );
}
