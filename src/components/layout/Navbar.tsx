import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider";
import { Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router";

const Navbar: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const location = useLocation();
  const navItems = [
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/create-book" },
    { name: "Borrow Summary", href: "/borrow-summary" },
  ];
  return (
    <nav className="bg-[#F8E1B7] dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-5 h-16 flex justify-between items-center gap-3">
        <div className="flex items-center">
          <span className="text-xl [@media(max-width:411px)]:text-[15px] font-bold text-[#754E1A] dark:text-yellow-300 ml-2">
            Library Management System
          </span>
        </div>
        <div className="ml-auto hidden [@media(min-width:743px)]:flex items-center space-x-3">
          {navItems.map((item) =>
            <Link key={item.name} to={item.href}>
              <Button
                className={`
                    text-[#F8E1B7] 
                    border-none 
                    dark:text-yellow-300 
                    cursor-pointer
                  ${(location.pathname === item.href)
                    ? "bg-[#4B352A] text-white hover:bg-[#FFBF78] dark:bg-[#FFB433] dark:text-[#1D1F29] dark:hover:bg-[#FFA55D] dark:hover:text-black"
                    : "bg-[#A86523] text-white hover:bg-[#FFBF78] dark:hover:bg-[#FFA55D] dark:hover:text-black"
                  }
               `}
                variant="outline"
              >
                {item.name}
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            size="icon"
            className=" text-gray-500 cursor-pointer dark:border-yellow-400"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-300" />
            )}
          </Button>
        </div>
        <div className="[@media(min-width:743px)]:hidden">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button className="dark:text-yellow-300 dark:border-yellow-400 dark:border" variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link
                    to={item.href}
                    className={`w-full text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white   ${(location.pathname === item.href)
                      && "bg-[#CBA35C] text-white dark:text-gray-900 dark:bg-[#FFB433]"
                      }`}
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="icon"
            className="ml-2 text-gray-500 cursor-pointer dark:border-yellow-400"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-300" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
