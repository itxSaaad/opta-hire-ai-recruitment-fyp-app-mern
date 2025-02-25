import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/images/logo.png';

const NavLinks = [
  { title: 'Jobs', link: '/jobs', sectionId: null },
  {
    title: 'For Recruiters',
    link: '/#for-recruiters',
    sectionId: '#for-recruiters',
  },
  {
    title: 'For Interviewers',
    link: '/#for-interviewers',
    sectionId: '#for-interviewers',
  },
  { title: 'Pricing', link: '/#pricing', sectionId: '#pricing' },
  { title: 'About', link: '/#about', sectionId: '#about' },
];

export default function Navbar() {
  const [isHover, setIsHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { pathname } = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = document.querySelectorAll('section');
      let currentSection;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = `#${section.id}`;
        }
      });

      const activeNavItem = NavLinks.find(
        (navItem) => navItem.sectionId === currentSection
      )?.title;

      setActiveSection(activeNavItem);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname === '/jobs') {
      setActiveSection('Jobs');
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all p-4 ${
        isScrolled ? 'bg-darkBackground' : 'bg-transparent md:bg-transparent'
      } text-darkText`}
    >
      <nav className="flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-1"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            src={Logo}
            alt="OptaHire Logo"
            className={`w-10 h-10 transform transition-transform duration-500 ease-in-out ${
              isHover ? 'rotate-180 scale-110' : ''
            }`}
          />
          <span className="text-2xl font-semibold text-white">OptaHire</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {NavLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className={`text-md hover:text-primary transition duration-500 ease-in-out ${
                link.title === activeSection ? 'text-primary' : ''
              }`}
            >
              {link.title}
            </a>
          ))}
        </div>

        <Link
          to="/login"
          className="hidden md:flex text-lg bg-secondary text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Login / Register
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-darkText hover:text-primary transition duration-500 ease-in-out focus:outline-none"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 transform transition-transform duration-500 ease-in-out hover:rotate-180" />
            ) : (
              <FiMenu className="w-6 h-6 transform transition-transform duration-500 ease-in-out" />
            )}
          </button>

          <div
            className={`absolute top-16 left-0 w-full bg-darkBackground text-darkText z-10 shadow-md px-4 pb-4 transform transition-transform duration-500 ease-out ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {NavLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className={`block text-md hover:text-primary transition duration-300 ease-in-out px-4 py-2 ${
                  link.title === activeSection
                    ? 'text-primary'
                    : 'text-darkText'
                }`}
                onClick={toggleMenu}
              >
                {link.title}
              </a>
            ))}
            <Link
              to="/login"
              className="block text-lg bg-secondary text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out mt-4"
              onClick={toggleMenu}
            >
              Login / Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
