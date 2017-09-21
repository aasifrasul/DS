var OrderedHash = (function() {
  var OrderedHash = function() {
    this.keys = [];
    this.vals = {};
  }

  OrderedHash.prototype.exists = function(k) {
    return k in this.vals;
  };

  OrderedHash.prototype.push = function(k, v) {
    if (!this.exists(k))
      this.keys.push(k);
    this.vals[k] = v;
  };
  /**
   * Find the index of a key (linear search is O(n)).
   * @returns {Number} The index of the key, if present, or -1.
   */
  OrderedHash.prototype.find = function(k) {
    if (this.exists(k)) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === k) {
          return i;
        }
      }
    }
    return -1;
  };
  /**
   * Inserts a key and value at the specified position.
   * @returns {Boolean} true if inserted or false if the key already exists.
   */
  OrderedHash.prototype.insert = function(pos, k, v) {
    if (this.exists(k)) {
      return false;
    }
    this.keys.splice(pos, 0, k);
    this.vals[k] = v;
    return true;
  };
  /**
   * Removes one or more elements starting at the specified position.
   */
  OrderedHash.prototype.remove = function(pos, howMany) {
    if (howMany === void 0) {
      howMany = 1;
    }
    var k = this.keys.splice(pos, howMany);
    for (var i = 0; i < this.keys.length; i++) {
      delete this.vals[k[i]];
    }
  };
  /**
   * Removes an element by key (linear search is O(n)).
   * @returns {Boolean} true if removed, false otherwise.
   */
  OrderedHash.prototype.delete = function(k) {
    if (this.exists(k)) {
      for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === k) {
          this.remove(i);
          return true;
        }
      }
    }
    return false;
  };

  OrderedHash.prototype.value = function(k) {
    return this.vals[k];
  };

  OrderedHash.prototype.length = function() {
    return this.keys.length;
  };

  return OrderedHash;
})();

var oHash = new OrderedHash;
