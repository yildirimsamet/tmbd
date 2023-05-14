import Navbar from "../Navbar";

export const Layout = ({ children }) => (
    <div>
        <Navbar />
        <div>{children}</div>
    </div>
);