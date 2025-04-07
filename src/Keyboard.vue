<script setup>
import { ref, computed } from "vue";

/**
 * @typedef Props
 * @prop {number | undefined} maxlength
 * @prop {(value: string) => void} onSubmit
 * @prop {(pos: number, key: string) => void} onInsert
 * @prop {(pos: number) => void} onRemove
 */

/**
 * @typedef Cell
 * @prop {string} key
 * @prop {"submit" | "insert" | "remove"} action
 */

/** @type {Props} */
const props = defineProps({ maxlength: Number });
const emit = defineEmits(["submit", "insert", "remove"]);

/** @type {import("vue").Ref<Cell[][]>> */
const rows = ref([
	[
		{ key: "Q", action: "insert" },
		{ key: "W", action: "insert" },
		{ key: "E", action: "insert" },
		{ key: "R", action: "insert" },
		{ key: "T", action: "insert" },
		{ key: "Y", action: "insert" },
		{ key: "U", action: "insert" },
		{ key: "I", action: "insert" },
		{ key: "O", action: "insert" },
		{ key: "P", action: "insert" },
	],
	[
		{ key: "A", action: "insert" },
		{ key: "S", action: "insert" },
		{ key: "D", action: "insert" },
		{ key: "F", action: "insert" },
		{ key: "G", action: "insert" },
		{ key: "H", action: "insert" },
		{ key: "J", action: "insert" },
		{ key: "K", action: "insert" },
		{ key: "L", action: "insert" },
	],
	[
		{ key: "Enter", action: "submit" },
		{ key: "Z", action: "insert" },
		{ key: "X", action: "insert" },
		{ key: "C", action: "insert" },
		{ key: "V", action: "insert" },
		{ key: "B", action: "insert" },
		{ key: "N", action: "insert" },
		{ key: "M", action: "insert" },
		{ key: "Delete", action: "remove" },
	],
]);

const buf = ref("");
const pos = ref(0);

const isBufEmpty = computed(() => pos.value === 0);

const isEndOfLine = computed(() => {
	if (props.maxlength === undefined) return false;

	return pos.value === props.maxlength;
});

const isSubmitDisabled = computed(() => {
	if (isBufEmpty.value) return true;
	if (props.maxlength === undefined) return false;

	return !isEndOfLine.value;
});

/**
 * @param {Cell} cell
 */
const getCellClass = (cell) => {
	switch (cell.action) {
		case "submit":
			return `cell accent ${isSubmitDisabled.value ? "is-disabled" : ""}`;
		case "remove":
			return `cell ${isBufEmpty.value ? "is-disabled" : ""}`;
		default:
			return "cell";
	}
};

/**
 * @param {Cell} cell
 */
const handleCellClick = (cell) => {
	if (cell.action === "remove" && isBufEmpty.value) return;

	if (cell.action === "remove") {
		pos.value--;
		buf.value = buf.value.substring(0, pos.value);

		emit("remove", pos.value);

		return;
	}

	if (cell.action === "insert" && isEndOfLine.value) return;

	if (cell.action === "insert") {
		emit("insert", pos.value, cell.key);

		buf.value += cell.key;
		pos.value++;

		return;
	}

	if (isSubmitDisabled.value) return;

	emit("submit", buf.value);

	buf.value = "";
	pos.value = 0;
};
</script>

<template>
	<div class="container">
		<div v-for="(row, i) in rows" :key="i" class="row">
			<div
				v-for="cell in row"
				:key="cell.key"
				:class="getCellClass(cell)"
				@click="handleCellClick(cell)"
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
