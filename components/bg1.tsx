import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Background1Props = {
	size: number;
	fill: string;
};

const Background1 = ({ size = 720, fill = "#D9D9D9" }: Background1Props) => (
	<View
		style={{
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
		}}
	>
		<Svg width={size / 2} height={size} viewBox="0 0 360 720" fill="none">
			<Path
				d="M267.062 0C249.755 18.6184 227.47 49.4017 236.326 67.959C249.183 94.8977 285.918 91.8367 285.918 128.571C285.918 168.979 192.245 210.612 335.51 348.979L360 370.309V720H0V119.267C24.2947 114.235 45.1585 102.277 42.8574 87.5508C39.7962 67.9591 37.3472 70.4077 61.8369 45.918C69.8214 37.9331 71.0576 20.7622 68.6162 0H267.062Z"
				fill={fill}
			/>
		</Svg>
	</View>
);

export default Background1;
