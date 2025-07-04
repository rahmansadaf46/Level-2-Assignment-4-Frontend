import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetBookByIdQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function UpdateBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading, isError, error } = useGetBookByIdQuery(id);
  const book: IBook | undefined = bookData?.data;
  const [updateBook] = useUpdateBookMutation();
  const form = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      isbn: "",
      description: "",
      copies: 0,
    },
    mode: "onChange",
  });
  const { setError, clearErrors, formState } = form;
  const { isValid } = formState;

  useEffect(() => {
    if (book && !isLoading) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies,
      });
    }
  }, [book, isLoading, form]);

  const onSubmit: SubmitHandler<IBook> = async (formData) => {
    const bookData = {
      ...formData,
      available: true,
    };
    try {
      const res = await updateBook({ bookData, id }).unwrap();
      if (res.success) {
        toast.success(res.message || "Book updated successfully");
        navigate("/books");
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'error' in err) {
        toast.error((err as { error: string }).error);
      } else {
        toast.error('An error occurred');
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error("Error fetching book:", error);
    return <ErrorMessage message='Error loading book data.' />;
  }

  return (
    <div className="bg-[#FFFADC] dark:bg-[#1D1F29] rounded-2xl p-8 shadow-2xl border-2 border-[#CBA35B] dark:border-yellow-300">
      <Form  {...form}>
        <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required", minLength: { value: 1, message: "Title cannot be empty" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-[#003092] dark:text-yellow-300">Title</FormLabel>
                <FormControl>
                  <Input className="border-2 border-[#CBA35C] dark:border-[#948979]" required {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required", minLength: { value: 1, message: "Author cannot be empty" } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-[#003092] dark:text-yellow-300">Author</FormLabel>
                <FormControl>
                  <Input className="border-2 border-[#CBA35C] dark:border-[#948979]" required {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className=" text-[#003092] dark:text-yellow-300">Genre</FormLabel>
                <Select
                  required
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  defaultValue={field.value || ""}
                  key={field.value || "genre-select"}
                >
                  <FormControl className="border-2 border-[#CBA35C] dark:border-[#948979]">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            rules={{ required: "ISBN is required" }}
            render={({ field }) => {
              const isValidISBN = field.value && /^\d{10}$|^\d{13}$/.test(field.value.trim());
              return (
                <FormItem>
                  <FormLabel className=" text-[#003092] dark:text-yellow-300">ISBN</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        required
                        type="text"
                        className="border-2 border-[#CBA35C] dark:border-[#948979]"
                        {...field}
                        value={field.value || ""}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          const isValid = /^\d{10}$|^\d{13}$/.test(value);
                          if (!isValid && value !== "") {
                            setError("isbn", {
                              type: "manual",
                              message: "ISBN must be exactly 10 or 13 digits",
                            });
                          } else {
                            clearErrors("isbn");
                            field.onChange(value);
                          }
                        }}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                      {isValidISBN && (
                        <CheckCircle2
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-[#003092] dark:text-yellow-300">Description</FormLabel>
                <FormControl>
                  <Textarea className="border-2 border-[#CBA35C] dark:border-[#948979]"{...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            rules={{
              required: "Copies is required",
              min: {
                value: 0,
                message: "Copies must be at least 0",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#003092] dark:text-yellow-300">Copies</FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-[#CBA35C] dark:border-[#948979]"
                    type="number"
                    min={0}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.valueAsNumber;
                      if (isNaN(value) || value < 0) {
                        field.onChange("");
                        form.clearErrors("copies");
                      } else {
                        field.onChange(value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full bg-[#CBA35C] hover:bg-[#FF7D29] hover:text-white cursor-pointer text-black hover:text-white" disabled={!isValid}>Update Book</Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}