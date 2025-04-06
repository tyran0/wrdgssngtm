# Wrdgssngtm

A simple game of guessing five letter words

## Project Requirements

- [x] Display letters in mint green if they're in the word and at the right place
- [x] Display letters in white if they're in the word, but placed somewhere else
- [x] Display letters in gray if they're not in the word
- [ ] Emulated keyboard on mobile [^1]

[^1]: I'm not using a single input element, because that won't let me have letters in individual cells on the grid. And I'm not using multiple inputs either. This is bad in terms of user experience, since nobody would want to click on each cell and enter a letter. Though on desktop, I can handle user input using `"keypress"` event listeners
