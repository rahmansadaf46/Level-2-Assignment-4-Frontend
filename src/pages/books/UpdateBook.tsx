import { UpdateBookForm } from "@/components/module/books/UpdateBookForm";
import { Pencil } from "lucide-react";

const UpdateBook = () => {
    return (
        <>
            <div className="h-8 text-[#754E1A] dark:text-yellow-300 flex justify-center items-center gap-3 px-5 pb-5 border-b border-muted bg-background">
                <Pencil className="w-6 h-6  " />
                <h3 className="text-2xl font-semibold tracking-tight">
                    Edit Book
                </h3>
            </div>
            <div className="w-full  flex justify-center ">
                <div className="space-y-5 my-5 w-150">
                    <UpdateBookForm />
                </div>
            </div>
        </>
    );
};

export default UpdateBook;