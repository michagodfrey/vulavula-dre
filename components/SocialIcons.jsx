import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from '../public/icons/facebook-svgrepo-com.svg';
import InstagramIcon from '../public/icons/instagram-svgrepo-com.svg';
import ViberIcon from '../public/icons/viber-svgrepo-com.svg';
import WhatsappIcon from '../public/icons/whatsapp-svgrepo-com.svg';
import EnvelopeIcon from '../public/icons/envelope.svg';

const SocialIcons = () => {
  return (
    <div className="flex">
        <Link href="https://www.facebook.com/groups/510896943433875.uluiburotu.777" className="mr-4 hover:-translate-y-2 transition-transform bg-white">
            <Image src={FacebookIcon} alt="Facebook logo" />
        </Link>
        <Link href="https://www.instagram.com/accounts/login/?next=%2Fbeyond_enterprise%2F&source=omni_redirect" className="mr-4 hover:-translate-y-2 transition-transform bg-white">
            <Image src={InstagramIcon} alt="Instagram logo" />
        </Link>
        <Link href="tel:+6799749762" className="mr-4 hover:-translate-y-2 transition-transform bg-white">
            <Image src={ViberIcon} alt="Viber logo" />
        </Link>
        <Link href="tel:+6799749762" className="mr-4 hover:-translate-y-2 transition-transform bg-white" >
            <Image src={WhatsappIcon} alt="Whatsapp logo" />
        </Link>
        <Link href="mailto:keluburotu@gmail.com" className="hover:-translate-y-2 transition-transform bg-white">
            <Image src={EnvelopeIcon} alt="Envelope icon" />
        </Link>
    </div>
  )
}

export default SocialIcons