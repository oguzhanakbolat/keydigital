export type IconsType = {
	size: number;
	color: string;
};

export type IconType = IconsType & {
	name: string;
	size?: number;
	color?: string;
};
