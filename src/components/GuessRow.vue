<script setup>
import GuessCell from "@components/GuessCell.vue";

/**
 * @typedef LetterGuess
 * @prop {string} key
 * @prop {boolean} isInWord
 * @prop {boolean} isPosHit
 */

/**
 * @typedef Props
 * @prop {LetterGuess[]} letters
 * @prop {boolean} isSubmitted
 */

/** @type {Props} */
const props = defineProps(["letters", "isSubmitted"]);
</script>

<template>
	<div class="row">
		<GuessCell
			v-for="(letter, i) in props.letters"
			:key="i"
			v-model="letter.key"
			:is-submitted="props.isSubmitted"
			:is-in-word="letter.isInWord"
			:is-pos-hit="letter.isPosHit"
		/>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	justify-content: center;
}
</style>
