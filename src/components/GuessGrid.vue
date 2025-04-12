<script setup>
import { ref, shallowRef, watchEffect, onUnmounted } from "vue";

import useDeviceType from "@hooks/useDeviceType";

import GuessRow from "@components/GuessRow.vue";
import Keyboard from "@components/Keyboard.vue";

/**
 * @typedef Props
 * @prop {string} secret
 * @prop {number} attempts
 * @prop {(attempts: number) => void} onPass
 * @prop {() => void} onFail
 */

const model = defineModel({ type: Boolean, required: true });

/** @type {Props} */
const props = defineProps({
	secret: { type: String, required: true },
	attempts: { type: Number, required: true },
});

const emit = defineEmits(["pass", "fail"]);

const { isMobile } = useDeviceType();

const pos = shallowRef({ row: 0, cell: 0 });

const rows = ref(
	Array.from({ length: props.attempts }, () => ({
		isSubmitted: false,
		cells: Array.from({ length: props.secret.length }, () => ({
			key: "",
			isInWord: false,
			isPosHit: false,
		})),
	}))
);

const handleInput = (key) => {
	const cells = rows.value[pos.value.row].cells;

	if (pos.value.cell === props.secret.length) return;

	cells[pos.value.cell].key = key;
	pos.value = { ...pos.value, cell: pos.value.cell + 1 };
};

const handleDelete = () => {
	const cells = rows.value[pos.value.row].cells;

	if (pos.value.cell === 0) return;

	pos.value = { ...pos.value, cell: pos.value.cell - 1 };
	cells[pos.value.cell].key = "";
};

const handleEnter = () => {
	const cells = rows.value[pos.value.row].cells;

	const left = props.secret.split("").map((key, i) => {
		if (cells[i].key === key) return "";

		return key;
	});

	let hits = 0;

	if (model.value) return;
	if (pos.value.cell !== props.secret.length) return;

	rows.value[pos.value.row].cells = cells.map((cell, i) => {
		const key = cell.key;

		let isInWord = false;
		let isPosHit = false;

		if (key === props.secret.at(i)) {
			isInWord = true;
			isPosHit = true;
			hits++;

			return { key, isInWord, isPosHit };
		}

		if (props.secret.includes(key)) isInWord = true;
		if (isInWord && !left.includes(key)) isInWord = false;

		return { key, isInWord, isPosHit };
	});

	rows.value[pos.value.row].isSubmitted = true;
	pos.value = { row: pos.value.row + 1, cell: 0 };

	if (hits === props.secret.length) {
		model.value = true;

		emit("pass", pos.value.row);
	} else if (pos.value.row === props.attempts) {
		model.value = true;

		emit("fail");
	}
};

/**
 * A function to handle user input on desktop
 * @param {KeyboardEvent} e
 */
const handleKeyDown = (e) => {
	if (e.key === "Enter") {
		handleEnter();

		return;
	}

	if (e.key === "Backspace") {
		handleDelete();

		return;
	}

	// TODO: figure out how to get only letters
	handleInput(e.key.toUpperCase());
};

watchEffect(() => {
	if (isMobile.value) {
		document.removeEventListener("keydown", handleKeyDown);

		return;
	}

	document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
	if (isMobile.value) return;

	document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
	<article>
		<GuessRow
			v-for="(row, i) in rows"
			:key="i"
			:letters="row.cells"
			:isSubmitted="row.isSubmitted"
		/>
	</article>

	<template v-if="isMobile">
		<Keyboard
			:is-enter-disabled="pos.cell !== props.secret.length"
			:is-delete-disabled="pos.cell === 0"
			@input="handleInput"
			@delete="handleDelete"
			@enter="handleEnter"
		/>
	</template>
</template>
