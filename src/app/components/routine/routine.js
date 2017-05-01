// Array of objects with properties such as--
// input -- what will be typed out in prompt
// prompt -- what the prompt will be updated to when input is finished
// output -- this will be an available output menu for selections/animations
// history -- this will be promptly added onto the history after input is finished.
// delay -- in milliseconds before the next action is to take place.

const script = () => [
  {
    input: "cd repositories",
    prompt: "~/repositories"
  },
  "how are you today?"
];

export default script;
