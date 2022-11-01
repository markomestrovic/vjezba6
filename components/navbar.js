import { navigationItems } from '../constants/navbar';
import { useRouter } from 'next/router';

const NavBar = () => {
    const router = useRouter();
    const currentPage = router.pathname;

    return (
        <nav className="inline-flex list-none font-medium text-hci-lila">
            {navigationItems.map(({ label, path }) => (
                <li
                    key={label}
                    className={`px-5 py-2 whitespace-nowrap hover:bg-hci-lila hover:bg-opacity-50 hover:text-white cursor-pointer ${
                        currentPage === path
                            ? 'text-hci-lila-light bg-hci-lila bg-opacity-60'
                            : ''
                    }`}
                >
                    {label}
                </li>
            ))}
        </nav>
    );
};

export default NavBar;
