import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/trips">Trips</Link>
            <Link to="/bookings">Bookings</Link>
        </nav>
    );
}

export default Navbar;
