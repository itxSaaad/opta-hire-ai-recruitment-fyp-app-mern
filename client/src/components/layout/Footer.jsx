import PropTypes from 'prop-types';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socials = [
  {
    href: 'https://www.facebook.com',
    label: 'Facebook',
    Icon: FaFacebook,
  },
  {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    Icon: FaInstagram,
  },
  {
    href: 'https://www.linkedin.com',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
  {
    href: 'https://www.twitter.com',
    label: 'Twitter',
    Icon: FaTwitter,
  },
];

const SocialIcon = ({ href, label, Icon }) => (
  <Link
    to={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-primary hover:text-primaryLight transition hover:text-secondary hover:scale-110"
  >
    <Icon size={20} />
  </Link>
);

export default function Footer() {
  return (
    <footer className="text-darkText p-4 container mx-auto flex flex-row items-center justify-between space-y-2 md:space-y-0">
      <div className="text-xs md:text-sm text-gray-400">
        &copy; {new Date().getFullYear()} OptaHire. All Rights Reserved.
      </div>

      <div className="flex space-x-2 md:space-x-4">
        {socials.map((social, index) => (
          <SocialIcon key={index} {...social} />
        ))}
      </div>
    </footer>
  );
}

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};
