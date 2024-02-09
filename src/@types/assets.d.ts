declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

declare module "*.png" {
	const content: React.FunctionComponent<React.PNGAttributes<PNGElement>>;
	export default content;
}