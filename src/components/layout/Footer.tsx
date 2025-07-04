
const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-[#1D1F29] py-4">
            <div className="mx-auto max-w-7xl px-10 text-center">
                <p className="text-gray-600 dark:text-yellow-300">
                    © {new Date().getFullYear()} Library App. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
export default Footer;