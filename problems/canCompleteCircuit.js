
var canCompleteCircuit = function(gas, cost) {
	let remaining = 0, i, j, k;
    const hash = {};
    for (i = 0; i < gas.length; i++) {
        hash[i] = 
    }
    /*
    for (i = 0; i < gas.length; i++) {
    	remaining = 0;
    	j = i;
    	k = 0;

    	while(k < gas.length) {
    		if (j === gas.length - 1) {
                j = 0;
            }
            remaining += gas[j + 1] - cost[j];
            console.log(remaining, i, j, k)
    		j++
    		k++;
    	}

        if (remaining >= cost[j]) {
            return i;
        }
    	
    }*/

    return -1
};

canCompleteCircuit([2,3,4],[3,4,3]);
