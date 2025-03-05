import { HeadMeta } from "@/components/atoms/Head";
import { DashNav } from "@/components/organisms/Dash/Layout/Nav";
import { GameUnity } from "@/components/organisms/Game";

export default function GamePage() {
  return (
    <>
      <HeadMeta />
      <main>
        <DashNav />
        <GameUnity />
      </main>
    </>
  );
}
