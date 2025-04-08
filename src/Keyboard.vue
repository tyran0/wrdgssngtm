<script setup>
import { ref, computed } from "vue";

/**
 * @typedef Cell
 * @prop {string} key
 * @prop {"input" | "delete" | "enter"} action
 */

/**
 * @typedef Props
 * @prop {boolean} isEnterDisabled
 * @prop {boolean} isDeleteDisabled
 * @prop {(key: string) => void} onInput
 * @prop {() => void} onDelete
 * @prop {() => void} onEnter
 */

/** @type {Props} */
const props = defineProps({
	isEnterDisabled: { type: Boolean, required: true },
	isDeleteDisabled: { type: Boolean, required: true },
});

const emit = defineEmits(["input", "delete", "enter"]);

/** @type {import("vue").Ref<Cell[][]>> */
const rows = ref([
	[
		{ key: "Q", action: "input" },
		{ key: "W", action: "input" },
		{ key: "E", action: "input" },
		{ key: "R", action: "input" },
		{ key: "T", action: "input" },
		{ key: "Y", action: "input" },
		{ key: "U", action: "input" },
		{ key: "I", action: "input" },
		{ key: "O", action: "input" },
		{ key: "P", action: "input" },
	],
	[
		{ key: "A", action: "input" },
		{ key: "S", action: "input" },
		{ key: "D", action: "input" },
		{ key: "F", action: "input" },
		{ key: "G", action: "input" },
		{ key: "H", action: "input" },
		{ key: "J", action: "input" },
		{ key: "K", action: "input" },
		{ key: "L", action: "input" },
	],
	[
		{ key: "Enter", action: "enter" },
		{ key: "Z", action: "input" },
		{ key: "X", action: "input" },
		{ key: "C", action: "input" },
		{ key: "V", action: "input" },
		{ key: "B", action: "input" },
		{ key: "N", action: "input" },
		{ key: "M", action: "input" },
		{ key: "Delete", action: "delete" },
	],
]);

const enterKeyCls = computed(() => {
	const cls = ["cell", "accent"];

	if (props.isEnterDisabled) cls.push("is-disabled");

	return cls.join(" ");
});

const deleteKeyCls = computed(() => {
	const cls = ["cell"];

	if (props.isDeleteDisabled) cls.push("is-disabled");

	return cls.join(" ");
});

/**
 * @param {Cell} cell
 */
const getClassName = (cell) => {
	if (cell.action === "input") return "cell";
	if (cell.action === "delete") return deleteKeyCls.value;
	if (cell.action === "enter") return enterKeyCls.value;
};

/**
 * @param {Cell} cell
 */
const handleClick = (cell) => {
	if (cell.action === "input") {
		emit("input", cell.key);

		return;
	}

	if (cell.action === "delete") {
		emit("delete");

		return;
	}

	if (props.isEnterDisabled) return;

	emit("enter");
};
</script>

<template>
	<div class="container">
		<div v-for="(row, i) in rows" :key="i" class="row">
			<div
				v-for="cell in row"
				:key="cell.key"
				:class="getClassName(cell)"
				@click="handleClick(cell)"
			>
				{{ cell.key }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin: 0.75rem 0;

	display: grid;
	justify-items: center;
	row-gap: 0.375rem;
}

.row {
	display: flex;
	column-gap: 0.375rem;
}

.cell {
	min-width: 1.5em;

	padding: 0.375em 0.25em;

	background-color: oklch(0.32 0 0);
	border: 1px solid oklch(0.36 0 0);
	border-radius: 0.125em;

	text-align: center;
	user-select: none;

	box-sizing: border-box;
}

.cell.is-disabled {
	color: oklch(1 0 0 / 0.25);
}

.cell.accent {
	background-color: oklch(0.7 0.15 155);
	border-color: oklch(0.74 0.15 155);
}
</style>
