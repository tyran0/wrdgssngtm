<script setup>
import { ref } from "vue";

import GuessGrid from "@components/GuessGrid.vue";

const isFinished = ref(false);
const isWin = ref(false);
const statusLine = ref("");
const attempsLine = ref("");
const retryLine = ref("");

/**
 * @param {number} attempts
 */
const handlePass = (attempts) => {
	const noun = attempts === 1 ? "attempt" : "attempts";

	isWin.value = true;
	statusLine.value = "You have won";
	attempsLine.value = `It took you ${attempts} ${noun}`;
	retryLine.value = "Play again?";
};

const handleFail = () => {
	statusLine.value = "You have lost";
	retryLine.value = "Give it another try?";
};

const retry = () => {
	isFinished.value = false;
	isWin.value = false;
};
</script>

<template>
	<h1>Word Guessing Time</h1>

	<GuessGrid
		v-if="!isFinished"
		v-model="isFinished"
		secret="GUESS"
		:attempts="5"
		@pass="handlePass"
		@fail="handleFail"
	/>

	<template v-else>
		<h2>{{ statusLine }}</h2>
		<p v-if="isWin">{{ attempsLine }}</p>
		<button @click="retry">{{ retryLine }}</button>
	</template>
</template>

<style>
@import url("css/index.css");
</style>
