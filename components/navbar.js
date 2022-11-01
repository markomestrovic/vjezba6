import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    //TODO: Add styling for the current page

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label }) => (
                <li
                    key={label}
                    className="px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer"
                >
                    {label}
                </li>
            ))}
        </nav>
    );
};

export default NavBar;
