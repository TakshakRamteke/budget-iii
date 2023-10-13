import { createContext, useState } from 'react';

export const recordsContext = createContext<RecordsProviderContext | null>(
    null,
);

export default function RecordsProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    return (
        <recordsContext.Provider
            value={{ incomes, expenses, setIncomes, setExpenses }}
        >
            {children}
        </recordsContext.Provider>
    );
}
