import { colors } from "@/styles/defaultTheme";
import { ButtonHeroProps } from ".";

export const ButtonHeroBottom = ({
  fill = colors.brand.shadow,
  stroke = colors.pure.white,
}: ButtonHeroProps) => (
  <svg
    viewBox="0 0 271 17"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "translateY(-1px)" }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.8333 17H51.5L53.5 13L58.5 13L60.5 17L271 17V0H0V17H25.1667L26.5 15L30.5 15L31.8333 17ZM255 13H266V4L255 13ZM230.5 14.5L200 14.5V13.5L230.5 13.5V14.5ZM198 14.5H196V13.5H198V14.5ZM192 14.5H194V13.5H192V14.5Z"
      fill={fill}
      style={style}
    />
    <path
      d="M265.5 12.5H256.401L265.5 5.05512V12.5Z"
      stroke={stroke}
      style={style}
    />
  </svg>
);

const style = { transition: "all 0.25s ease" };
