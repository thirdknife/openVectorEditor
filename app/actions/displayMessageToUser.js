export default function displayError({ message, level }) {
	ac.throw(ac.string, message)
	ac.throw(ac.oneOfType(['info','error','warning']), level)
}