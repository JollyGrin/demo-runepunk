import { HeadMeta } from "@/components/atoms/Head";
import { DashNav } from "@/components/organisms/Dash/Layout/Nav";
import { GltfWrapper } from "@/components/organisms/Map/Gltf";

export default function MapPage() {
  return (
    <>
      <HeadMeta />
      <main>
        <DashNav />
        <GltfWrapper />
      </main>
    </>
  );
}
