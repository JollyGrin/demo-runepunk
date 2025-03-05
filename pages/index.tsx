import { HEIGHT_NAV } from "@/components/atoms/Nav/constants";
import { VideoBg } from "@/components/atoms/VideoBg";
import { Nav } from "@/components/atoms/Nav";

import { Footer } from "@/components/organisms/Landing/Footer";
import { Hero } from "@/components/organisms/Landing/Hero";
import { LandingBody } from "@/components/organisms/Landing/Body";
import { LandingGameFeatures } from "@/components/organisms/Landing/GameFeatures";
import { LandingCombatTriangle } from "@/components/organisms/Landing/CombatTriangle";
import { HeadMeta } from "@/components/atoms/Head";

const lotsVideos: VideoBg[] = [
  {
    source: "banners/runepunk_crop_mini.mp4",
    type: "video/mp4",
  },
];

export default function Home() {
  return (
    <>
      <HeadMeta />
      <main>
        <Nav />
        <VideoBg
          videos={lotsVideos}
          videoStyleProps={{
            borderRadius: "0.25rem",
            objectPosition: "90%",
          }}
        >
          <Hero offsetHeight={HEIGHT_NAV} />
        </VideoBg>
        <LandingBody />
        <LandingGameFeatures />
        <LandingCombatTriangle />

        <Footer />
      </main>
    </>
  );
}
