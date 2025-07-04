import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation, useGetBookByIdQuery } from "@/redux/api/baseApi";
import type { IBook, IBorrow } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BorrowBookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(bookId);
  const book: IBook = data?.data;
  const [borrowBook] = useBorrowBookMutation();
  const form = useForm<IBorrow>({
    defaultValues: {
      quantity: 0,
      dueDate: undefined,
    },
    mode: "onChange",
  });
  const { setError, clearErrors, formState } = form;
  const { isValid } = formState;
  const maxCopies = book?.copies ?? 1;
  const onSubmit: SubmitHandler<IBorrow> = async (borrowData) => {
    try {
      const payload = {
        ...borrowData,
        book: bookId,
      };
      const res = await borrowBook(payload).unwrap();
      if (res.success) {
        toast.success(res.message || "Book borrowed successfully");
        navigate("/borrow-summary");
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        toast.error((err as { message: string }).message);
      } else {
        toast.error('An error occurred');
      }
    }
  };
  if (isLoading) return <Loader />;
  if (isError || !book) return <ErrorMessage message="Book not found or failed to load." />;

  return (
    <div className="max-w-md w-full shadow-2xl mx-auto bg-[#FFFADC] dark:bg-[#1D1F29] rounded-2xl p-6 space-y-5 border-2 border-[#CBA35B] dark:border-yellow-300">
      {book.copies > 0 ?
        <>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#FF8000]">{book.title}</h3>
            <p className="text-[#2DAA9E] dark:text-gray-300 text-sm italic">
              by {book.author}
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Available Copies:</span>{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">{book.copies}</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="quantity"
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#003092] dark:text-yellow-300">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        className="border-2 border-[#CBA35C] dark:border-[#948979]"
                        max={maxCopies}
                        placeholder="Enter quantity"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          if (isNaN(value)) {
                            field.onChange("");
                            clearErrors("quantity");
                            return;
                          }
                          const clamped = Math.max(1, Math.min(maxCopies, value));
                          field.onChange(clamped);
                          if (value > maxCopies) {
                            setError("quantity", {
                              type: "manual",
                              message: `Cannot exceed ${maxCopies} available copies`,
                            });
                          } else if (value < 1) {
                            setError("quantity", {
                              type: "manual",
                              message: "Quantity must be at least 1",
                            });
                          } else {
                            clearErrors("quantity");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#003092] dark:text-yellow-300">Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="border-2 border-[#CBA35C] dark:border-[#948979]  bg-[#FFFADC] hover:bg-[#FFFADC]">
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#48A6A7] hover:bg-[#006A71] hover:text-white cursor-pointer text-white mt-2" disabled={!isValid}>
                Confirm Borrow
              </Button>
            </form>
          </Form>
        </>
        : <>
          <ErrorMessage message='Not enough copies available for this book' />
        </>}

    </div>
  );
};

export default BorrowBookForm;
