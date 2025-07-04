import Loader from "@/components/loader/Loader";
import BorrowTable from "@/components/module/borrows/BorrowTable";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import type { IBorrowSummary } from "@/types";
import { FileSpreadsheet } from "lucide-react";

const BorrowSummary = () => {
    const { data, isLoading } = useGetBorrowSummaryQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        refetchOnFocus: true,
    })
    if (isLoading) return <Loader />
    return (
        <>
            <div className="h-8 text-[#754E1A] dark:text-yellow-300 flex justify-center items-center gap-3 px-5 pb-5 border-b border-muted bg-background">
                <FileSpreadsheet className="w-6 h-6" />
                <h3 className="text-2xl font-semibold tracking-tight t">
                    Borrow Summary
                </h3>
            </div>
            <div>
                <BorrowTable borrowData={data?.data as IBorrowSummary[]} />
            </div>
        </>
    );
};

export default BorrowSummary;