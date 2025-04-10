import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";

/** @import {Ref} from "vue" */

/** @typedef {"landscape" | "portrait"} Direction */
/** @typedef {"primary" | "secondary"} Version */
/** @typedef {number} Angle */

const useScreenOrientation = () => {
	/** @type {Ref<Direction>} */
	const direction = ref();
	/** @type {Ref<Version>} */
	const version = ref();
	/** @type {Ref<Angle>} */
	const angle = ref();

	const detect = () => {
		/** @type {[Direction, Version]} */
		const tokens = screen.orientation.type.split("-");

		direction.value = tokens[0];
		version.value = tokens[1];
		angle.value = screen.orientation.angle;
	};

	onBeforeMount(detect);

	onMounted(() => {
		screen.orientation.addEventListener("change", detect);
	});

	onUnmounted(() => {
		screen.orientation.removeEventListener("change", detect);
	});

	return { direction, version, angle };
};

export default useScreenOrientation;
