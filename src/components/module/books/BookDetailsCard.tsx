import { formatDate } from "@/lib/utils";
import type { IBook } from "@/types";
import {
    AlignLeft,
    BookCopy,
    CalendarCheck,
    CalendarClock,
    CheckCircle2,
    Hash,
    Layers,
    Type,
    User,
    XCircle
} from "lucide-react";

const BookDetailsCard = ({ book }: { book: IBook }) => {
    return (
        <div className="bg-[#FFFADC] dark:bg-[#1D1F29] rounded-3xl shadow-2xl p-8 sm:p-12 transition-all duration-300 hover:shadow-3xl border-2 border-[#CBA35B] dark:border-yellow-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DetailItem icon={<Type />} label="Title" value={book?.title} />
                <DetailItem icon={<User />} label="Author" value={book?.author} />
                <DetailItem icon={<Layers />} label="Genre" value={book?.genre} />
                <DetailItem icon={<Hash />} label="ISBN" value={book?.isbn} />
                <DetailItem icon={<BookCopy />} label="Copies" value={book?.copies} />
                <DetailItem
                    icon={book?.available ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
                    label="Available"
                    value={book?.available ? "Yes" : "No"}
                />
                <DetailItem
                    icon={<CalendarClock />}
                    label="Created At"
                    value={formatDate(book?.createdAt as Date)}
                />
                <DetailItem
                    icon={<CalendarCheck />}
                    label="Updated At"
                    value={formatDate(book?.updatedAt as Date)}
                />
            </div>
            <div className="mt-10">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-[#F97300] dark:text-yellow-300 mb-3">
                    <AlignLeft />
                    Description
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gray-100 dark:bg-[#2F3542] p-4 rounded-xl shadow-sm">
                    {book?.description || "No description provided."}
                </p>
            </div>
        </div>
    );
};

const DetailItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number | undefined;
}) => (
    <div className="flex items-start gap-4">
        <div className="p-2 bg-[#FDF3DA] dark:bg-[#383E4C] dark:text-yellow-300 rounded-xl shadow-sm">{icon}</div>
        <div>
            <p className="text-sm text-[#F97300] dark:text-yellow-300">{label}</p>
            <p className="text-base font-semibold text-[#27548A] dark:text-gray-100">{value}</p>
        </div>
    </div>
);

export default BookDetailsCard;