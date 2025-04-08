<script setup>
import { ref } from "vue";

import useKeyboard from "./useKeyboard";

import GuessRow from "./GuessRow.vue";
import Keyboard from "./Keyboard.vue";

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

const kb = useKeyboard(props.secret.length);

const pos = ref(0);

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
	const cells = rows.value[pos.value].cells;
	const i = kb.put(key);

	if (i === undefined) return;

	cells[i].key = key;
};

const handleDelete = () => {
	const cells = rows.value[pos.value].cells;
	const i = kb.remove();

	if (i === undefined) return;

	cells[i].key = "";
};

const handleEnter = () => {
	const cells = rows.value[pos.value].cells;
	const value = kb.flush();

	let hits = 0;

	if (model.value) return;
	if (value.length < props.secret.length) return;

	const left = props.secret.split("").map((key, i) => {
		if (value.at(i) !== key) return key;

		return null;
	});

	rows.value[pos.value].cells = cells.map((cell, i) => {
		const key = value.at(i);

		let isInWord = false;
		let isPosHit = false;

		if (key === undefined) return cell;
		if (props.secret.includes(key)) isInWord = true;

		if (props.secret.at(i) === key) {
			isPosHit = true;
			hits++;
		} else if (!left.includes(key)) {
			isInWord = false;
		}

		return { key, isInWord, isPosHit };
	});

	rows.value[pos.value].isSubmitted = true;

	pos.value++;

	if (hits === props.secret.length) {
		model.value = true;

		emit("pass", pos.value);

		return;
	}

	if (pos.value === props.attempts) {
		model.value = true;

		emit("fail");
	}
};
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

	<Keyboard
		:isEnterDisabled="!kb.isEndOfLine.value"
		:isDeleteDisabled="kb.isBufEmpty.value"
		@input="handleInput"
		@delete="handleDelete"
		@enter="handleEnter"
	/>
</template>
