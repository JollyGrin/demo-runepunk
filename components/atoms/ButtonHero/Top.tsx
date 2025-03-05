import { colors } from "@/styles/defaultTheme";
import { ButtonHeroProps } from ".";

export const ButtonHeroTop = ({
  fill = colors.brand.shadow,
  stroke = colors.pure.white,
}: ButtonHeroProps) => (
  <svg
    preserveAspectRatio="none"
    viewBox="0 0 271 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "translateY(1px)" }}
  >
    <g clipPath="url(#clip0_92_439)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M231.5 0H212.5L210.5 4L205.5 4L203.5 0H141V5H138V0H136V2H135V0H133V5H130V0H13L0 11V21H271V0H239.5L237.5 3L233.5 3L231.5 0Z"
        fill={fill}
        style={style}
      />
      <path
        d="M0.5 0.5H9.5993L0.5 7.94488V0.5Z"
        stroke={stroke}
        style={style}
      />
    </g>
    <defs>
      <clipPath id="clip0_92_439">
        <rect width="100%" height="100%" fill={stroke} style={style} />
      </clipPath>
    </defs>
  </svg>
);

const style = { transition: "all 0.25s ease" };
