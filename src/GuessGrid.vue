<script setup>
import { ref } from "vue";

import GuessRow from "./GuessRow.vue";

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

/**
@param {Event} e
 */
const handleChange = (e) => {
	/** @type {HTMLInputElement} */
	const input = e.currentTarget;
	const value = input.value.toUpperCase();
	const cells = rows.value[pos.value].cells;

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

	input.value = "";

	rows.value[pos.value].isSubmitted = true;

	if (pos.value === props.attempts - 1) {
		model.value = true;

		emit("fail");

		return;
	}

	pos.value++;

	if (hits === props.secret.length) {
		model.value = true;

		emit("pass", pos.value);
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

	<p>Note: Put your guess as a whole word in this field and press enter</p>
	<div>
		<input
			type="text"
			:maxlength="props.secret.length"
			@change="handleChange"
		/>
	</div>
</template>
