# Wrdgssngtm

A simple game of guessing five letter words

## Project Requirements

- [x] Emulated keyboard on mobile [^1]
- [x] Handle user input from physical keyboard

[^1]: I'm not using a single input element, because that won't let me have letters in individual cells on the grid. And I'm not using multiple inputs either. This is bad in terms of user experience, since nobody would want to click on each cell and enter a letter. Though on desktop, I can handle user input using `"keypress"` event listeners
