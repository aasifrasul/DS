Given 2 identical DOM trees (but not equal) and one element of the first DOM tree, how would you find this element in the second DOM tree?  

// Inputs
// 2 root nodes
// 1 node in 1 DOM tree
// Output
// Other node in corresponding tree w/ identical tree structure
function getChildren(node) {
	return Array.from(node.childNodes);
}

function getPathFromNode(node, root) {
	const path = [];
	while (node !== root && node && node.parentNode) {
		const index = getChildren(node.parentNode).findIndex((el) => el === node);
		path.push(index);
		node = node.parentNode;
	}
	return path.reverse();
}

function getCorrespondingNode(node, root1, root2) {
	const path = getPathFromNode(node, root1);
	let current = root2;
	path.forEach((index) => {
		current = current.childNodes[index];
	});
	return current;
}

const root1 = document.getElementById('root1');
const root2 = document.getElementById('root2');
const node1 = document.getElementById('node1');
const node2 = document.getElementById('node2');
console.log(getCorrespondingNode(node1, root1, root2) === node2); // true
console.log(getCorrespondingNode(node2, root2, root1) === node1); // true


const findCorrespondingNode = (rootA, rootB, target) => {
	if (rootA === target) return rootB;
	if (rootA.childElementCount) {
		for (let i = 0; i < rootA.childElementCount; i++) {
			let result = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
			if (result) {
				return result;
			}
		}
	}
};
