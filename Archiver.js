function Archiver() {
	var temperature = null;
	var archive = [];

	Object.defineProperty(this, 'temperature', {
		get() {
			console.log('get!');
			return temperature;
		},
		set(value) {
			temperature = value;
			archive.push({
				val: temperature
			});
		}
	});

	this.getArchive = function () {
		return archive;
	};
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
