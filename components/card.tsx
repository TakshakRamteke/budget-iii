export default function Card({
    title,
    amount,
}: {
    title: string;
    amount: number;
}) {
    return (
        <div className='p-4 min-w-[13rem] border border-slate-200 mr-3 w-52 shrink-0 rounded shadow-sm bg-white flex flex-col'>
            <p className='text-lg font-medium'>{title}</p>
            <p className='font-semibold text-3xl ml-auto mt-4'>
                ₹ {amount.toLocaleString()}
            </p>
        </div>
    );
}
