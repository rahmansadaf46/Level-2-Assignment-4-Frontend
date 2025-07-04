import ErrorMessage from '@/components/errorMessage/ErrorMessage';
import type { IBorrowSummary } from '@/types';

const BorrowTable = ({
    borrowData
}: {
    borrowData: IBorrowSummary[];
}) => {
    return (
        <div className='w-full flex justify-center'>
            <div className="overflow-x-auto mt-5 w-150 ">
                {borrowData.length > 0 ? <>
                    <table className="min-w-full divide-y divide-border ">
                        <thead className="bg-[#CBA35C] dark:bg-[#754E1A] text-left ">
                            <tr>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Book Title</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">ISBN</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Total Quantity Borrowed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-border dark:bg-background">
                            {[...borrowData]
                                ?.sort((a: IBorrowSummary, b: IBorrowSummary) => b.totalQuantity - a.totalQuantity)
                                .map((borrow: IBorrowSummary) => (
                                    <tr
                                        key={borrow._id}
                                        className="hover:bg-accent transition-colors bg-[#FFFADC] dark:bg-[#1D1F29]"
                                    >
                                        <td className="px-6 py-4 font-medium text-primary">{borrow.book.title}</td>
                                        <td className="px-6 py-4">{borrow.book.isbn}</td>
                                        <td className="px-6 py-4">{borrow.totalQuantity}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table></> : <>
                    <ErrorMessage message='No Borrow Summary Found'/>
                </>}
            </div>
        </div>
    );
};

export default BorrowTable;