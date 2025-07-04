import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { IBook } from '@/types';
import { BookOpen, Eye, Pencil } from 'lucide-react';
import { Link } from 'react-router';
import { DeleteAlert } from './DeleteAlert';
import ErrorMessage from '@/components/errorMessage/ErrorMessage';

const BookTable = ({
    bookData,
    totalPages,
    page,
    isFetching,
    setPage,
    handleDelete
}: {
    bookData: IBook[];
    totalPages: number;
    page: number;
    isFetching: boolean;
    setPage: (value: React.SetStateAction<number>) => void;
    handleDelete: (id: string) => void;
}) => {
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 3;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i}
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(i);
                            }}
                            className={isFetching ? 'pointer-events-none opacity-50' : 'dark:text-yellow-300 dark:border-solid dark:border-yellow-300'}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            let startPage, endPage;
            if (page <= 2) {
                startPage = 1;
                endPage = 3;
            } else if (page >= totalPages - 1) {
                startPage = totalPages - 2;
                endPage = totalPages;
            } else {
                startPage = page - 1;
                endPage = page + 1;
            }
            if (page > 2) {
                items.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
            }
            for (let i = startPage; i <= endPage && i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i}
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(i);
                            }}
                            className={isFetching ? 'pointer-events-none opacity-50' : 'dark:text-yellow-300 dark:border-solid dark:border-yellow-300'}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            if (page < totalPages - 1) {
                items.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
            }
        }
        return items;
    };

    return (
        <div>
            <div className="overflow-x-auto mt-5 ">
                {bookData.length > 0 ? <>
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-[#CBA35C] dark:bg-[#754E1A] text-left">
                            <tr>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Title</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Author</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Genre</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">ISBN</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Copies</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Availability</th>
                                <th className="px-6 py-3 text-white dark:text-yellow-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-border dark:bg-background">
                            {bookData?.map((book: IBook) => (
                                <tr
                                    key={book._id}
                                    className="hover:bg-accent transition-colors bg-[#FFFADC] dark:bg-[#1D1F29]"
                                >
                                    <td className="px-6 py-4 font-medium text-primary">{book.title}</td>
                                    <td className="px-6 py-4">{book.author}</td>
                                    <td className="px-6 py-4">{book.genre}</td>
                                    <td className="px-6 py-4">{book.isbn}</td>
                                    <td className="px-6 py-4">{book.copies}</td>
                                    <td className="px-6 py-4">
                                        <span className={book.available ? "text-green-600 dark:font-bold" : "text-red-500 dark:font-bold"}>
                                            {book.available ? "Available" : "Not Available"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link to={`/books/${book._id}`}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="hover:bg-green-100 hover:text-green-600 text-gray-500 dark:text-green-300 cursor-pointer"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Details</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Link to={`/edit-book/${book._id}`}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="hover:bg-yellow-100 hover:text-yellow-600 text-gray-500 dark:text-yellow-300 cursor-pointer"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Edit</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <DeleteAlert handleDelete={handleDelete} bookId={book._id as string} />
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            disabled={!book.available}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-blue-100 hover:text-blue-600 text-gray-500 dark:text-blue-300 cursor-pointer"
                                                        >
                                                            <Link to={`/borrow/${book._id}`}>
                                                                <BookOpen className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Borrow</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </> : <>
                    <ErrorMessage message="No Book Found" />
                </>}

            </div>
            {totalPages > 1 && (
                <Pagination className="mt-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page > 1 && !isFetching) {
                                        setPage(page - 1);
                                    }
                                }}
                                className={page === 1 || isFetching ? 'pointer-events-none opacity-50' : 'dark:text-yellow-300'}
                            />
                        </PaginationItem>
                        {renderPaginationItems()}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (page < totalPages && !isFetching) {
                                        setPage(page + 1);
                                    }
                                }}
                                className={page === totalPages || isFetching ? 'pointer-events-none opacity-50 ' : 'dark:text-yellow-300'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default BookTable;