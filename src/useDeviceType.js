import { computed } from "vue";

import useScreenOrientation from "./useScreenOrientation";

/** @import {Direction} from "./useScreenOrientation" */
/** @import {Version} from "./useScreenOrientation" */
/** @import {Angle} from "./useScreenOrientation" */

/** @typedef {[Direction, Version, Angle]} IsPortraitNaturalParameters */

/** @param {IsPortraitNaturalParameters} args */
const isPortraitNatural = (...args) => {
	/** @type {typeof args[]} */
	const values = [
		["portrait", "primary", 0],
		["landscape", "primary", 90],
		["portrait", "secondary", 180],
		["landscape", "secondary", 270],
	];

	return values.some(([direction, version, angle]) => {
		if (args[0] !== direction) return false;
		if (args[1] !== version) return false;
		if (args[2] !== angle) return false;

		return true;
	});
};

const useDeviceType = () => {
	const { direction, version, angle } = useScreenOrientation();

	const type = computed(() => {
		return isPortraitNatural(direction.value, version.value, angle.value)
			? "mobile"
			: "desktop";
	});

	const isMobile = computed(() => type.value === "mobile");
	const isDesktop = computed(() => type.value === "desktop");

	return { isMobile, isDesktop };
};

export default useDeviceType;
