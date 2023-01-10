import React from 'react';
const BlockList = ({ blocks }) => {
    return (
        <div className="flex w-[100vw] md:w-[100vw] lg:w-[48vw] flex-col gap-4 p-4 border-[1px] border-200 rounded-md">
            <span className="font-nav text-[1.2rem] font-semibold text-900">
                Latest Blocks
            </span>
            <div className="h-[20rem] flex-grow overflow-auto">
                <table className="relative min-w-full">
                    <thead className="w-full rounded-md text-left text-900">
                        <tr className="sticky top-0 w-full rounded-md bg-200">
                            <th className="sticky top-0 rounded-l-md p-2" scope="col">
                                Block
                            </th>
                            <th className="sticky top-0 p-2" scope="col">
                                Age
                            </th>
                            <th className="sticky top-0 text-right px-4" scope="col">
                                Txn
                            </th>
                            <th className="sticky top-0 text-right px-4" scope="col">
                                Gas Used
                            </th>
                            <th className="sticky top-0 text-right rounded-r-md px-4" scope="col">
                                Gas Limit
                            </th>
                        </tr>
                    </thead>
                    <tbody className="w-full divide-y divide-600 font-sans text-[0.8rem] text-800">
                        {blocks.map((x) => (
                            <tr key={x.number} className="w-full gap-4">
                                <td className="p-2">
                                    <a href={`block/${x.number}`} className="underline text-500">{x.number}</a>
                                </td>
                                <td className="p-2">{x.age}</td>
                                <td className="px-4 text-right">{x.txnCount}</td>
                                <td className="px-4 text-right">{x.gasUsed}</td>
                                <td className="text-right px-4">{x.gasLimit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlockList;
