<script setup>
import { computed } from "vue";

const model = defineModel({ type: String, required: true });

const props = defineProps({
	isSubmitted: { type: Boolean, required: true },
	isInWord: { type: Boolean, required: true },
	isPosHit: { type: Boolean, required: true },
});

const matchType = computed(() => {
	if (!props.isInWord) return "miss";
	if (!props.isPosHit) return "partial";

	return "exact";
});
</script>

<template>
	<div class="cell" :class="isSubmitted && matchType">{{ model }}</div>
</template>

<style scoped>
.cell {
	--size: 70px;

	width: var(--size);
	height: var(--size);

	border: 2px solid oklch(0.48 0 0);

	font-size: calc(var(--size) * 0.5);
	line-height: var(--size);
	text-align: center;

	display: inline-block;

	user-select: none;
}

.exact {
	background-color: oklch(0.7 0.15 155);
	color: oklch(1 0 0);
}

.partial {
	background-color: oklch(1 0 0);
	color: oklch(0 0 0);
}

.miss {
	background-color: oklch(0.64 0 0);
	color: oklch(0 0 0 / 0.33);
}
</style>
