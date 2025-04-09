import { computed, ref } from "vue";

const useOrientation = () => {
	const orientation = computed(() => {
		switch (screen.orientation.type) {
			case "landscape-primary":
			case "landscape-secondary":
				return "landscape";
			case "portrait-primary":
			case "portrait-secondary":
				return "portrait";
		}
	});

	const isLandscape = computed(() => orientation.value === "landscape");
	const isPortrait = computed(() => orientation.value === "portrait");

	return { orientation, isLandscape, isPortrait };
};

export default useOrientation;
