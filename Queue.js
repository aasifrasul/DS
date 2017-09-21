var Queue = (function() {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  };

  var Queue = function() {
    this.first = null;
    this.size = 0;
  };

  Queue.prototype.enqueue = function(data) {
    var node = new Node(data);

    if (!this.first) {
      this.first = node;
    } else {
      var temp = this.first;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = node;
    }

    this.size += 1;
    return node;
  };

  Queue.prototype.dequeue = function() {
    if (!this.first) {
      return null;
    }
    var temp = this.first;
    this.first = this.first.next;
    this.size -= 1;
    return temp;
  };

  Queue.prototype.print = function() {
    var curr = this.first;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }

  Queue.prototype.hasNext = function() {
    return this.first.next != undefined;
  }

  Queue.prototype.isEmpty = function() {
    return this.first == null;
  }

  return Queue;
})();

var queue = new Queue();
