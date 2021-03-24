const shuffle = (str) =>
	str
		.split('')
		.sort(() => Math.random() - 0.5)
		.join('');
const alphabets = 'abcdefghijklmnopqrstuvwxyz';

function generateARandomNumer(min = 0, max = 100) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const randomNo = generateARandomNumer();
let str = '';

for (var i = 0; i < randomNo; i++) {
	str += alphabets;
}

console.log(shuffle(str));

function strShuffle(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

strShuffle(15);
