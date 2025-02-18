import { createContext, useState } from 'react';
import moment from 'moment';

export const datesContext = createContext<any | null>(null);

export default function DatesProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const currentDate = new Date();
    const [month, setMonth] = useState(() => {
        if (currentDate.getDate() >= 7) {
            return currentDate.getMonth() + 1;
        } else {
            return currentDate.getMonth();
        }
    });

    const [fromDate, setFromDate] = useState(
        new Date(
            //@ts-ignore
            moment(
                `07/${month}/${currentDate.getFullYear()},00:00:00`,
                'DD/MM/YYYY,hh:mm:ss',
            ),
        ),
    );

    const [toDate, setToDate] = useState(
        new Date(
            //@ts-ignore
            moment(
                `07/${month >= 12 ? 12 : month + 1}/${
                    month >= 12
                        ? currentDate.getFullYear() + 1
                        : currentDate.getFullYear()
                },00:00:00`,
                'DD/MM/YYYY,hh:mm:ss',
            ),
        ),
    );

    return (
        <datesContext.Provider
            value={{
                month,
                fromDate,
                toDate,
                setFromDate,
                setToDate,
                setMonth,
            }}
        >
            {children}
        </datesContext.Provider>
    );
}
