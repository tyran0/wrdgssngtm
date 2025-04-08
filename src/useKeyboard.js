import { ref, computed } from "vue";

/**
 * @param {number | undefined} size
 */
const useKeyboard = (size) => {
	const buf = ref("");
	const bufSize = ref(size || 1024);
	const pos = ref(0);

	const isBufEmpty = computed(() => pos.value === 0);
	const isEndOfLine = computed(() => pos.value === bufSize.value);

	/**
	 * @param {string} char
	 */
	const put = (char) => {
		const retval = pos.value;

		if (isEndOfLine.value) return;

		pos.value++;
		buf.value += char;

		return retval;
	};

	const remove = () => {
		if (isBufEmpty.value) return;

		pos.value--;
		buf.value = buf.value.slice(0, pos.value);

		return pos.value;
	};

	const flush = () => {
		const retval = buf.value;

		pos.value = 0;
		buf.value = "";

		return retval;
	};

	return {
		isBufEmpty,
		isEndOfLine,
		put,
		remove,
		flush,
	};
};

export default useKeyboard;
