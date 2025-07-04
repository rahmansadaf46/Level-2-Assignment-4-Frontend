import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Loader from "@/components/loader/Loader";
import BookDetailsCard from "@/components/module/books/BookDetailsCard";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import {
  BookOpenCheck
} from "lucide-react";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetBookByIdQuery(id);
  const book: IBook = data?.data;
  if (isLoading) return <Loader />;
  if (isError) {
    console.error("Book fetch error:", error);
    return <ErrorMessage message="Failed to load book details." />;
  }
  return (
    <div>
      <div className="h-8 text-[#754E1A] dark:text-yellow-300 flex justify-center items-center gap-3 px-5 pb-5 border-b border-muted bg-background">
        <BookOpenCheck className="w-6 h-6" />
        <h3 className="text-2xl font-semibold tracking-tight">Book Details</h3>
      </div>
      <div className="max-w-4xl mx-auto px-4 pt-5 pb-10">
        <BookDetailsCard book={book} />
      </div>
    </div>
  );
};



export default BookDetails;
