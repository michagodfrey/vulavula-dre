import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from '../public/icons/facebook-svgrepo-com.svg';
import InstagramIcon from '../public/icons/instagram-svgrepo-com.svg';
import EnvelopeIcon from '../public/icons/envelope.svg';
import XIcon from '../public/icons/icons8-x-logo.svg';

const SocialIcons = () => {
  return (
    <div className="flex">
      <Link
        href="https://www.facebook.com/groups/510896943433875.uluiburotu.777"
        className="mr-4 hover:-translate-y-1 transition-transform bg-white rounded-xl"
      >
        <Image src={FacebookIcon} alt="Facebook logo" className="rounded-lg" />
      </Link>
      <Link
        href="https://x.com/keluburotu"
        className="mr-4 hover:-translate-y-1 transition-transform bg-white rounded-xl"
      >
        <Image src={XIcon} alt="X Icon" className="rounded-lg" />
      </Link>
      <Link
        href="https://www.instagram.com/accounts/login/?next=%2Fbeyond_enterprise%2F&source=omni_redirect"
        className="mr-4 hover:-translate-y-1 transition-transform bg-white rounded-xl"
      >
        <Image
          src={InstagramIcon}
          alt="Instagram logo"
          className="rounded-lg"
        />
      </Link>
      <Link
        href="mailto:keluburotu@gmail.com"
        className="hover:-translate-y-1 transition-transform bg-white rounded-xl"
      >
        <Image src={EnvelopeIcon} alt="Envelope icon" className="rounded-lg" />
      </Link>
    </div>
  );
}

export default SocialIcons