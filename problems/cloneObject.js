function cloneObject(obj) {
	const isInstance = this instanceof cloneObject;
	if (!isInstance) {
		// To ensure it is always invoked to create as a constructor
		throw new Error("Invoke the function using new keyword");
	}
	return obj;
}
const obj = {
	a: 1,
	b: 2,
};
const obj1 = new cloneObject(obj);
const obj2 = new cloneObject(obj);
console.log(obj1 === obj2);
obj1.a = 3;
console.log(obj1);
console.log("obj1.a === obj2.a", obj1.a === obj2.a);
