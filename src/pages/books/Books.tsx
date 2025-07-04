import Loader from "@/components/loader/Loader";
import BookTable from "@/components/module/books/BookTable";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Books = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching } = useGetBooksQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (bookId: string) => {
    const res = await deleteBook(bookId).unwrap();
    if (res.success) {
      toast.success(res.message);
    }
  };

  if (isLoading || isFetching) return <Loader />;

  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className="h-8 text-[#754E1A] dark:text-yellow-300 flex justify-center items-center gap-3 px-5 pb-5 border-b border-muted bg-background">
        <BookOpen className="w-6 h-6" />
        <h3 className="text-2xl font-semibold tracking-tight">All Books</h3>
      </div>
      <div className="pb-5">
        <BookTable bookData={data?.data as IBook[]}
          totalPages={totalPages}
          page={page}
          isFetching={isFetching}
          setPage={setPage}
          handleDelete={handleDelete} />
      </div>

    </>
  );
};

export default Books;
