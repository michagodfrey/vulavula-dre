import Link from "next/link";
import Image from "next/image";
import Banner from '../public/banner-cropped.jpg';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-4/5 h-80 relative">
        <Image
          src={Banner}
          alt="Page not found"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <h1 className="text-4xl font-bold text-white mt-6">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-900 mt-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <p className="mt-6 px-6 py-3 bg-pink-600 text-white text-lg rounded-lg hover:bg-pink-700 transition mb-8">
          Go Back Home
        </p>
      </Link>
    </div>
  );
};

export default Custom404;
