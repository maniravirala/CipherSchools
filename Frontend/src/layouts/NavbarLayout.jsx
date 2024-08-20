import Navbar from "@/components/Navbar";

const NavbarLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
        <Navbar />
        {children}
        </div>
    );
    };

export default NavbarLayout;