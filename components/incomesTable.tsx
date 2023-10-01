'use client';

import moment from 'moment';
import { useState } from 'react';

export default function IncomesTable({
    capitalData,
    totalAmount,
}: {
    capitalData: Income[];
    totalAmount: number;
}) {
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(10);

    function goNext() {
        if (capitalData.length > last) {
            setFirst(last);
            setLast(last + 10);
        }
    }

    function goPrev() {
        if (first > 0) {
            setLast(first);
            setFirst(first - 10);
        }
    }

    return (
        <div>
            <div className='overflow-x-scroll'>
                <table className='table-auto divide-y lg:w-full'>
                    <thead className='text-xs uppercase text-gray-500 mt-0'>
                        <tr>
                            <th className='px-2 first:pl-5 last:pr-5 py-3'>
                                Title
                            </th>
                            <th className='px-2 first:pl-5 last:pr-5 py-3 text-right'>
                                Amount
                            </th>
                            <th className='px-2 first:pl-5 last:pr-5 py-3 text-right'>
                                Category
                            </th>
                            <th className='px-2 first:pl-5 last:pr-5 py-3'>
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-md divide-y'>
                        {capitalData
                            .reverse()
                            .slice(first, last)
                            .map((data) => (
                                <tr key={data.id}>
                                    <td className='pl-5 p-2 whitespace-nowrap'>
                                        {
                                            data.properties.name.title[0].text
                                                .content
                                        }
                                    </td>
                                    <td className='p-2 whitespace-nowrap text-right'>
                                        ₹{' '}
                                        {data.properties.amount.number.toLocaleString(
                                            'en-US',
                                        )}
                                    </td>
                                    <td
                                        className={`p-2 whitespace-now text-right flex`}
                                    >
                                        <p
                                            className={`rounded-sm px-1 text-xs w-[8rem] py-1 ml-auto bg-${data.properties.source.select.color}-300`}
                                        >
                                            {data.properties.source.select.name}
                                        </p>
                                    </td>
                                    <td className='p-2 whitespace-nowrap text-center'>
                                        {moment(
                                            data.properties.date.date.start,
                                        ).format('MMMM Do, YYYY h:mm a')}
                                    </td>
                                </tr>
                            ))}
                        <tr>
                            <td className='pl-5 p-2 whitespace-nowrap font-semibold text-lg'>
                                Total{' '}
                            </td>
                            <td className='p-2 whitespace-nowrap text-right font-semibold text-lg'>
                                ₹ {totalAmount.toLocaleString('en-US')}
                            </td>
                            <td
                                className={`p-2 whitespace-now text-right flex`}
                            ></td>
                            <td className='p-2 whitespace-nowrap text-center'></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='flex items-center my-3'>
                <p className='mx-3'>
                    {first + 1} to {last} of {capitalData.length} entries
                </p>

                <button
                    className='p-2 border border-slate-200 rounded font-medium px-4 shadow-sm ml-auto'
                    onClick={goPrev}
                >
                    Prev
                </button>

                <button
                    className='p-2 border border-slate-200 rounded font-medium px-4 shadow-sm ml-8'
                    onClick={goNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
