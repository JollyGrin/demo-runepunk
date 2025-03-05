import { ReactNode } from "react";
import { containerStyle } from ".";
import { Box, Text } from "@chakra-ui/react";

export const DashBody = (props: { children: ReactNode }) => (
  <Box position="relative" h="800px" w="100%" isolation="isolate">
    <Box px="5rem" h="inherit">
      {props.children}
    </Box>
    <Box position="absolute" top="0" w="100%" zIndex={-1}>
      <Box {...containerStyle}>
        <Body />
      </Box>
      <Box {...containerStyle}>
        <Body />
      </Box>
    </Box>
  </Box>
);

const Body = () => (
  <svg
    // width="1282"
    // height="444"
    viewBox="0 0 1282 444"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.760742 193.356L9.68682 202.532V212.935L0.760742 203.759V193.356Z"
      fill="white"
    />
    <path
      d="M0.760742 212.936L9.68682 222.112V232.515L0.760742 223.338V212.936Z"
      fill="white"
    />
    <path
      d="M0.760742 232.515L9.68682 241.691V252.094L0.760742 242.872V232.515Z"
      fill="white"
    />
    <path
      d="M0.760742 252.094L9.68682 261.27V271.673L0.760742 262.451V252.094Z"
      fill="white"
    />
    <path
      d="M0.760742 271.672L9.68682 280.849V398.233L0.760742 389.011V271.672Z"
      fill="white"
    />
    <path
      d="M1272.83 127.577L1281.76 136.799V147.156L1272.83 137.98V127.577Z"
      fill="white"
    />
    <path
      d="M1272.83 147.155L1281.76 156.377V166.734L1272.83 157.558V147.155Z"
      fill="white"
    />
    <path
      d="M1272.83 166.735L1281.76 175.957V186.314L1272.83 177.138V166.735Z"
      fill="white"
    />
    <path
      d="M1272.83 186.315L1281.76 195.537V205.894L1272.83 196.718V186.315Z"
      fill="white"
    />
    <path
      d="M1272.83 205.893L1281.76 215.07V225.472L1272.83 216.296V205.893Z"
      fill="white"
    />
    <path
      d="M14.265 67.7786L1.76074 80.6655V169.915L14.265 182.801V443.24H1269.26V424.364L1281.76 411.522V236.314L1269.26 223.427V0.556152H14.265V67.7786Z"
      fill="#0C0C0C"
    />
  </svg>
);

const style = { transition: "all 0.25s ease" };
