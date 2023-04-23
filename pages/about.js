import React from 'react';
import Image from "next/image";
import { PostWidget, Categories } from "../components";
import BannerImg from "../public/banner-cropped.jpg";
import VulavulaDre from "../public/vulavula-dre.jpg"

const About = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
              <Image
                src={BannerImg}
                alt="View of bay and green hills at sunset from Vulavula Dre"
                className="object-top h-full w-full erounded-t-lg"
              />
            </div>
            <div className="p-4 lg-p-0">
              <h1>About</h1>
              <p>Bula Re!</p>
              <p>Welcome to my blog.</p>
              <p>
                My name is Luke, born and raised in Suva but lived in Savusavu
                in the northen part of Fiji.
              </p>
              <p>
                Vulavula-dre was a name of our late great-great grand fathers
                house back in my village, <b>Namalata Kubulau Bua</b>. It has
                some pretty awesome story and how it came to life. I envisioned
                big life and hoping to share part of my journey into this
                platform and how it can either trigger something in you and
                believe in greater things are ahead of us.
              </p>
              <p>
                Namalata Kubulau Bua is located north of Navatu and west of
                Kiobo in the District of Kubulau, Bua. Vanua Levu, Fiji.
              </p>
              <Image src={VulavulaDre} alt='The Vulavual Dre house' />
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About