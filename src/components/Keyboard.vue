<script setup>
import { ref } from "vue";

/**
 * @typedef Props
 * @prop {boolean} isEnterDisabled
 * @prop {boolean} isDeleteDisabled
 * @prop {(key: string) => void} onInput
 * @prop {() => void} onEnter
 * @prop {() => void} onDelete
 */

/**
 * @typedef Key
 * @prop {"input" | "enter" | "delete"} action
 * @prop {string} value
 * @prop {boolean} isDisabled
 */

/** @type {Props} */
const props = defineProps({
	isEnterDisabled: { type: Boolean, default: false },
	isDeleteDisabled: { type: Boolean, default: false },
});

const emit = defineEmits(["input", "enter", "delete"]);

const layout = ref([
	"Q W E R T Y U I O P",
	"A S D F G H J K L",
	"{enter} Z X C V B N M {delete}",
]);

/**
 * @param {string} value
 */
const parseKey = (value) => {
	/** @type {Key} */
	const retval = { action: "input", value, isDisabled: false };

	let template;
	let isTemplate = false;

	if (value.startsWith("{") && value.endsWith("}")) isTemplate = true;
	if (!isTemplate) return retval;

	template = value.substring(1, value.length - 1);

	retval.action = template;

	if (template === "enter") {
		retval.value = "Enter";
		retval.isDisabled = props.isEnterDisabled;
	}

	if (template === "delete") {
		retval.value === "Delete";
		retval.isDisabled = props.isDeleteDisabled;
	}

	return retval;
};

/**
 * @param {Key} key
 */
const getClassName = (key) => {
	const cls = ["cell"];

	if (key.action === "enter") cls.push("accent");
	if (key.isDisabled) cls.push("is-disabled");

	return cls.join(" ");
};

/**
 * @param {Key} key
 */
const handleClick = (key) => {
	const args = [];

	if (key.action === "input") args.push(key.value);

	emit(key.action, ...args);
};
</script>

<template>
	<div class="container">
		<div v-for="row in layout" class="row">
			<div
				v-for="key in row.split(' ').map(parseKey)"
				:class="getClassName(key)"
				@click="handleClick(key)"
			>
				{{ key.value }}
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
