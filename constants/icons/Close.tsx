import React from "react";
import Svg, { Path } from "react-native-svg";

import { IconsType } from "@/types/iconType";

const CloseIcon = ({ size = 20, color = "#171717" }: IconsType) => (
	<Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
		<Path
			d="M5 15L15 5M5 5L15 15"
			stroke={color}
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

export default CloseIcon;
