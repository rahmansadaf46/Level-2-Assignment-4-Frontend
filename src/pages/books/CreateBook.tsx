import { CreateBookForm } from "@/components/module/books/CreateBookForm";
import { BookPlus } from "lucide-react";
const CreateBook = () => {
    return (
        <>
            <div className="h-8 text-[#754E1A] dark:text-yellow-300 flex justify-center items-center gap-3 px-5 pb-5 border-b border-muted bg-background">
                <BookPlus className="w-6 h-6" />
                <h3 className="text-2xl font-semibold tracking-tight">
                    Add Book
                </h3>
            </div>

            <div className="w-full  flex justify-center">
                <div className="space-y-5 my-5 w-150">
                    <CreateBookForm />
                </div>
            </div>
        </>
    );
};

export default CreateBook;