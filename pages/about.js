import React from 'react';
import Image from "next/image";
import { PostWidget, Categories, SocialIcons, Pages, Newsletter } from "../components";
import BannerImg from "../public/banner-cropped.jpg";
import VulavulaDre from "../public/vulavula-dre.jpg"

const About = () => {
  return (
    <div className="container mx-auto px-4 md:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md">
              <Image
                src={BannerImg}
                alt="View of the bay and green hills at sunset from Vulavula Dre"
                className="object-top h-full w-full erounded-t-lg"
              />
            </div>
            <figcaption className="text-sm text-gray-700 mb-6 pl-4 lg:pl-0">
              View of the bay from Vulavula Dre at sunset.
            </figcaption>
            <div className="p-4 lg:p-0">
              <h1 className="text-3xl font-semibold mb-2">
                About Vulavula Dre
              </h1>
              <p className="text-xl">Bula Re! Welcome to my blog.</p>
              <br />
              <p>
                My name is Luke, born and raised in Suva but lived in Savusavu
                in the northen part of Fiji.
              </p>
              <br className="hidden md:block" />
              <figure className="m-auto my-6 md:float-right md:ml-4 md:my-0">
                <Image
                  src={VulavulaDre}
                  alt="Vulavula Dre, my great-grandfather's house."
                />
                <figcaption className="text-sm text-gray-700">
                  Vulavula Dre, my great-grandfather's house.
                </figcaption>
              </figure>
              <p>
                Vulavula-dre was a name of our late great-great grand fathers
                house back in my village, <b>Namalata Kubulau Bua</b>. It has
                some pretty awesome story and how it came to life. I envisioned
                big life and hoping to share part of my journey into this
                platform and how it can either trigger something in you and
                believe in greater things are ahead of us.{" "}
              </p>
              <br />
              <p>
                Namalata Kubulau Bua is located north of Navatu and west of
                Kiobo in the District of Kubulau, Bua. Vanua Levu, Fiji.
              </p>
              <br />
              <br />
              <h2 className="text-2xl mb-4">Follow or contact Luke</h2>
              <SocialIcons />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Newsletter />
            <Pages />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About