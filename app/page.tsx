import moment from 'moment';

export default async function Home() {
    const expensesResponse = await fetch('http://localhost:3000/api/expenses', {
        next: { revalidate: 10 },
    });
    const expenses = await expensesResponse.json();

    function addBackground(color: string) {
        switch (color) {
            case 'yellow':
                return 'bg-yellow-300';
            case 'pink':
                return 'bg-pink-300';
            case 'red':
                return 'bg-red-300';
            case 'purple':
                return 'bg-purple-300';
            case 'gray':
                return 'bg-gray-300';
            case 'orange':
                return 'bg-orange-300';
            default:
                return '';
        }
    }

    const allExpensesArray = expenses.map((expense) =>
        parseInt(expense.properties.amount.number),
    );

    const totalExpenses = allExpensesArray.reduce((current, next) => {
        return current + next;
    }, 0);

    return (
        <>
            <p>Expenses : </p>
            <table className='table-auto divide-y w-1/2'>
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
                        <th className='px-2 first:pl-5 last:pr-5 py-3'>Date</th>
                    </tr>
                </thead>
                <tbody className='text-md divide-y'>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className='pl-5 p-2 whitespace-nowrap'>
                                {
                                    expense.properties.expense.title[0].text
                                        .content
                                }
                            </td>
                            <td className='p-2 whitespace-nowrap text-right'>
                                ₹{' '}
                                {expense.properties.amount.number.toLocaleString(
                                    'en-US',
                                )}
                            </td>
                            <td
                                className={`p-2 whitespace-now text-right flex`}
                            >
                                <p
                                    className={`rounded-sm px-1 ml-auto ${addBackground(
                                        expense.properties.category.select
                                            .color,
                                    )}`}
                                >
                                    {expense.properties.category.select.name}
                                </p>
                            </td>
                            <td className='p-2 whitespace-nowrap text-center'>
                                {moment(
                                    expense.properties.date.date.start,
                                ).format('MMMM Do, YYYY h:mm a')}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className='pl-5 p-2 whitespace-nowrap'>Total </td>
                        <td className='p-2 whitespace-nowrap text-right'>
                            ₹ {totalExpenses.toLocaleString('en-US')}
                        </td>
                        <td
                            className={`p-2 whitespace-now text-right flex`}
                        ></td>
                        <td className='p-2 whitespace-nowrap text-center'></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
