import { ButtonHeroProps } from ".";
import { colors } from "@/styles/defaultTheme";

export const ButtonHeroContent = ({
  fill = colors.brand.shadow,
  stroke = colors.brand.highlight,
  children = "",
}: ButtonHeroProps & { children?: string }) => (
  <svg
    width="271"
    height="39"
    viewBox="0 0 271 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H15V39H12.6323H9.90502H0V38L8 36V3L0 1V0Z"
      fill={fill}
      style={quickStyle}
    />
    <path
      d="M6 4.75983L0 3.3999V35.7994L6 34.4999V4.75983Z"
      fill={stroke}
      style={style}
    />
    <path
      d="M24.5 33.1096V4.0531L29.5 2.65854V34.3596L24.5 33.1096Z"
      stroke={stroke}
      style={style}
    />
    <path d="M0 0H15V39H0V38L8 36V3L0 1V0Z" fill={fill} style={quickStyle} />
    <path
      d="M12 0H271V1L263 3V36L271 38V39H12V0Z"
      fill={fill}
      style={quickStyle}
    />
    <path
      d="M265 4.75983L271 3.3999V35.7994L265 34.4999V4.75983Z"
      fill={stroke}
      style={style}
    />

    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill={stroke}
      fontSize="24"
      fontFamily="var(--body)"
      fontWeight={700}
      style={style}
    >
      {children}
    </text>
  </svg>
);

const style = { transition: "all 0.75s ease" };
const quickStyle = { transition: "all 0.25s ease" };
