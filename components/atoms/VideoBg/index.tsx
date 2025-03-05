import { Box, PropsOf } from "@chakra-ui/react";
import { CSSProperties, ReactNode } from "react";

export type VideoBg = {
  source: string;
  type: "video/mp4" | "video/webm";
};

export const VideoBg = (props: {
  videos?: VideoBg[];
  children: ReactNode;
  videoProps?: PropsOf<"video">;
  videoStyleProps?: CSSProperties;
}) => {
  return (
    <Box position="relative" overflow="hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        {...props.videoProps}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          objectFit: "cover", // Ensures video fills the container
          ...props.videoStyleProps,
        }}
      >
        {props?.videos?.map((video) => (
          <source key={video.source} src={video.source} type={video.type} />
        ))}
        Your browser does not support the video tag.
      </video>
      {props.children}
    </Box>
  );
};
