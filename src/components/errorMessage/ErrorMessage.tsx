import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-center items-center h-60">
            <div className="text-center">
                <div className="flex items-center gap-2 justify-center dark:font-bold">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-500 ">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;