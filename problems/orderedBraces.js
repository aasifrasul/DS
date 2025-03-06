function orderedBraces(str) {
	const stack = [];
	const matchingBraces = {
		')': '(',
		']': '[',
		'}': '{',
	};

	for (let char of str) {
		// Closing brace
		if (char in matchingBraces) {
			const topOfStack = stack.pop();
			if (topOfStack !== matchingBraces[char]) {
				return 'Invalid'; // Mismatched or no opening brace
			}
		} else if ('({['.includes(char)) {
			// Opening brace
			stack.push(char);
		} // Ignore other characters
	}

	return stack.length === 0 ? 'Valid' : 'Invalid'; // Stack should be empty if all braces matched
}

console.log(orderedBraces('{}dfhhfg}')); // Valid
console.log(orderedBraces('{[}]')); // Invalid
console.log(orderedBraces('{([])}')); // Valid
console.log(orderedBraces('{{{{')); // Invalid
console.log(orderedBraces('}}}}}')); // Invalid
console.log(orderedBraces('')); // Valid (empty string is considered valid)
console.log(orderedBraces('{')); // Invalid
console.log(orderedBraces('(')); // Invalid
