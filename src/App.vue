<script setup>
import { ref } from "vue";

import GuessRow from "./GuessRow.vue";

const secret = "GUESS";

const letters = ref(
	Array.from({ length: secret.length }, () => ({
		key: "",
		isInWord: false,
		isPosHit: false,
	}))
);

const guess = ref("");
const isSubmitted = ref(false);

const submit = () => {
	if (guess.value.length !== secret.length) return;

	letters.value = letters.value.map((value, i) => {
		const key = guess.value.at(i).toUpperCase();

		if (key === undefined) return value;

		const isInWord = secret.includes(key);
		const isPosHit = secret.at(i) === key;

		return { key, isInWord, isPosHit };
	});

	isSubmitted.value = true;
};
</script>

<template>
	<h1>Word Guessing Time</h1>

	<article>
		<GuessRow :letters="letters" :is-submitted="isSubmitted" />
	</article>

	<input v-model="guess" type="text" :maxlength="secret.length" />
	<button @click="submit">Submit</button>
</template>

<style>
@import url("css/index.css");
</style>
