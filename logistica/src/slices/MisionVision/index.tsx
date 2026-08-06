import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MisionVision`.
 */
export type MisionVisionProps = SliceComponentProps<Content.MisionVisionSlice>;

/**
 * Component for "MisionVision" Slices.
 */
const MisionVision: FC<MisionVisionProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
		</section>
	)
};

export default MisionVision