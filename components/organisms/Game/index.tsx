import { Unity, useUnityContext } from "react-unity-webgl";

const buildDir = (location: string) => `/webgl/Build/${location}`;

export const GameUnity = () => {
  const { unityProvider, isLoaded, loadingProgression, ...rest } =
    useUnityContext({
      loaderUrl: buildDir("Builds.loader.js"),
      dataUrl: buildDir("Builds.data.br"),
      frameworkUrl: buildDir("Builds.framework.js.br"),
      codeUrl: buildDir("Builds.wasm.br"),
    });

  return (
    <>
      {!isLoaded && <p>Loading... {Math.round(loadingProgression * 100)}%</p>}
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
};
