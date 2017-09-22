var LinkedList = (function () {
  var Node = function(data) {
    this.data = data;
    this.next = null;
  }

  var LinkedList = function() {
    this.length = 0;
    this.head = null;
  }

  LinkedList.prototype.increment = function() {
    this.length++;
  }

  LinkedList.prototype.decrement = function() {
    this.length--;
  }

  LinkedList.prototype.size: function() {
    return this.length;
  };

  LinkedList.prototype.toArray: function() {
    var result = [],
      current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  };

  LinkedList.prototype.toString: function() {
    return this.toArray().toString();
  };

  LinkedList.prototype.add = function(value) {
    var node = new Node(value),
      cur = this.head;

    this.increment();

    if (!cur) {
      this.head = node;
      return node;
    }

    while (cur.next) {
      cur = cur.next;
    }

    cur.next = node;
    return node;
  };

  LinkedList.prototype.insertAfter = function(data, toNodeData) {
    var current = this.head;
    while(current) {
      if(current.data === toNodeData) {
        var node = new Node(data);
        if(current === this.tail) {
          this.tail.next = node;
          this.tail = node;
        } else {
          node.next = current.next;
          current.next = node;
        }
        this.numberOfValues++;
      }
      current = current.next;
    }
  };

  LinkedList.prototype.traverse = function(fn) {
    var current = this.head;
    while(current) {
      if(fn) {
        fn(current);
      }
      current = current.next;
    }
  };

  LinkedList.prototype.addTop = function(value) {
    var node = new Node(value),
      cur = this.head;

    this.increment();

    if (!cur) {
      this.head = node;
      return node;
    }

    node.next = cur;
    this.head = node;
    return node;
  };

  LinkedList.prototype.print = function(key = 'data') {
    var curr = this.head;
    while (curr) {
      console.log(curr[key]);
      curr = curr.next;
    }
  }

  LinkedList.prototype.clone = function(pos) {
    var cur = this.head,
      clonedLL = new LinkedList();

    while (cur) {
      clonedLL.add(cur.data);
      cur = cur.next;
    }

    return clonedLL;
  }

  LinkedList.prototype.get = function(pos) {
    var cur = this.head,
      count = 0;

    if (pos > this.length) {
      return "Doesn't Exist!"
    }
    while (count < pos) {
      cur = cur.next;
      count++;
    }
    return cur;
  }

  LinkedList.prototype.remove = function(pos) {
    var cur = this.head,
      count = 0,
      prevNode = null;
    if (pos > this.length) {
      return "Doesn't Exist!"
    }
    if (pos === 0) {
      this.head = cur.next;
      this.decrement();
      return this.head;
    }
    while (count < pos) {
      prevNode = cur;
      cur = cur.next;
      count++;
    }
    prevNode.next = cur.next;
    cur = null;
    this.decrement();

    return this.head;
  }

  LinkedList.prototype.delete = function(value) {
    let cur = this.head;

    if (!cur) {
      return null;
    }

    if (cur.data == value) {
      this.head = cur.next;
      this.decrement();
      return cur;
    }

    while (cur.next) {
      const previous = cur;
      cur = cur.next;
      if (cur.data == value) {
        previous.next = cur.next;
        this.decrement();
        return cur;
      }
    }

    return null;
  };

  LinkedList.prototype.searchNodeAt = function(pos) {
    let cur = this.head;
    let count = 0;

    if (!cur) {
      return null;
    }

    while (cur.next) {
      count++;
      if (pos == count) {
        return cur;
      }
      cur = cur.next;
    }

    return null;
  };

  LinkedList.prototype.searchNodeByValue = function(val) {
    let cur = this.head;

    if (!cur) {
      return null;
    }

    if (cur.data == val) {
      return cur;
    }

    while (cur.next) {
      cur = cur.next;
      if (cur.data == val) {
        return cur;
      }
    }

    return null;
  };

  LinkedList.prototype.remove = function(pos) {
    var cur = this.head,
      length = this.length,
      count = 0,
      message = { failure: 'Failure: non-existent node in this list.' },
      beforeNodeToDelete = null,
      nodeToDelete = null,
      deletedNode = null;

    if (typeof pos === 'undefined' || pos < 0 || pos > length) {
      throw new Error(message.failure);
    }

    if (!cur) {
      return null;
    }

    if (pos === 0) {
      this.head = cur.next;
      deletedNode = cur;
      cur = null;
      this.decrement();

      return deletedNode;
    }

    while (count < pos) {
      beforeNodeToDelete = cur;
      nodeToDelete = cur.next;
      count++;
    }

    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = Object.assign({}, nodeToDelete);
    nodeToDelete = null;
    this.decrement();

    return deletedNode;
  };

  LinkedList.prototype.reverse = function() {
    if (!this.head || !this.head.next) return this;

    var cur = this.head;
    var reversedLL = new LinkedList();

    while (cur) {
      reversedLL.addFirst(cur.data)
      cur = cur.next;
    }

    return reversedLL;
  }

  LinkedList.prototype.detectLoop = function() {
    var slow = this.head,
      fast = this.head;

    while (slow && fast) {
      slow = slow.next;
      fast = (fast.next || {}).next;

      if (slow == fast) {
        return true;
      }
    }
    return false;
  }

  LinkedList.prototype.findLoopStart = function() {
    var slow = this.head,
      fast = this.head;
    while (slow && fast) {
      slow = slow.next;

      if (!fast.next) {
        return null;
      }

      fast = fast.next.next;
      if (slow == fast) {
        slow = this.head;
        while (slow != fast) {
          slow = slow.next;
          fast = fast.next;
        }
        return slow;
      }
    }
  }

  LinkedList.prototype.pushSorted = function(val) {
    if (!val) {
      return null;
    }
    var head = this.head,
      cur = head,
      node = new Node(val),
      previous;

    this.increment();

    if (!this.head) {
      this.head = node;
      return this;
    }
    //value lower than head value
    if (val < this.head.data) {
      node.next = head;
      this.head = node;
      return this;
    }

    while (cur) {
      if (cur.data > val) {
        node.next = cur;
        previous.next = node;
        return this;
      }
      previous = cur;
      cur = cur.next;
    }
    node.next = null;
    previous.next = node;
    return this;
  }

  LinkedList.prototype.pushSortedDesc = function(val) {
    if (!val) {
      return null;
    }
    var head = this.head,
      cur = head,
      node = new Node(val),
      previous;

    this.increment();

    if (!this.head) {
      this.head = node;
      return this;
    }
    if (val > this.head.data) {
      node.next = head;
      this.head = node;
      return this;
    }

    while (cur) {
      if (cur.data < val) {
        node.next = cur;
        previous.next = node;
        return this;
      }
      previous = cur;
      cur = cur.next;
    }
    node.next = null;
    previous.next = node;
    return this;
  }

  LinkedList.prototype.kthFromEnd = function(k) {
    var node = this.head,
      i = 1,
      kthNode;
    if (k <= 0) return;

    while (node) {
      if (i == k) kthNode = this.head;
      else if (i - k > 0) {
        kthNode = kthNode.next;
      }
      i++;

      node = node.next;
    }
    return kthNode;
  }

  LinkedList.prototype.deleteKthFromEnd = function(k) {
    var node = this.head,
      i = 1,
      kthNode,
      previous;
    if (k <= 0) return this;

    while (node) {
      if (i == k) {
        kthNode = this.head;
      } else if (i - k > 0) {
        previous = kthNode;
        kthNode = kthNode.next;
      }
      i++;

      node = node.next;
    }
    if (!previous)
      this.head = this.head.next;
    else {
      previous.next = kthNode.next;
    }
    return this;
  }

  LinkedList.prototype.findLoopStart = function() {
    var slow = this.head,
      fast = this.head;
    while (slow && fast) {
      slow = slow.next;

      if (!fast.next) {
        return null;
      }

      fast = fast.next.next;
      if (slow == fast) {
        slow = this.head;
        while (slow != fast) {
          slow = slow.next;
          fast = fast.next;
        }
        return slow;
      }
    }
  }

  LinkedList.prototype.getLength = function() {
    var head = this.head,
      cur = head,
      pointer = head,
      anotherPtr,
      len = 0;
    var loopStartNode = head.findLoopStart();
    if (!loopStartNode) {
      while (cur) {
        cur = cur.next;
        len++;
      }
      return len;
    } else {
      anotherPtr = loopStartNode;
      while (pointer != anotherPtr) {
        len += 2;
        pointer = pointer.next;
        anotherPtr = anotherPtr.next;
      }
      return len;
    }
  }

  LinkedList.prototype.rotateByKthNode = function(k) {
    var prevHead = this.head,
      previous = this.head,
      cur = this.head,
      i = 1;
    while (cur.next) {
      if (i == k + 1) {
        this.head = cur;
        previous.next = null;
      }
      previous = cur;
      cur = cur.next;
      i++;
    }
    cur.next = prevHead;
    return this;
  }

  // Ascending Sort
  LinkedList.prototype.sort = function() {
    let cur = this.head;
    const newLL = new LinkedList;

    if (!cur) {
      return null;
    }

    while (cur.next) {
      newLL.pushSorted(cur.data);
      cur = cur.next;
    }

    return newLL;
  }

  // Descending sort
  LinkedList.prototype.sortDesc = function() {
    let cur = this.head;
    const newLL = new LinkedList;

    if (!cur) {
      return null;
    }

    while (cur.next) {
      newLL.pushSortedDesc(cur.data);
      cur = cur.next;
    }

    return newLL;
  }

  // Removes Duplicates
  // But first sort it
  LinkedList.prototype.dedupe = function() {
    const sortedLL = this.sort();
    let cur = sortedLL.head;

    if (!cur) {
      return null;
    }

    while (cur.next) {
      if (cur.data === cur.next.data) {
        cur.next = (cur.next || {}).next;
        sortedLL.decrement();
      } else {
        cur = cur.next;
      }
    }

    return sortedLL;
  }

  // Removes Duplicates without Modifying the List
  LinkedList.prototype.dedupeWithoutModifying = function() {
    const uniqueLL = {};
    const clonedLL = this.clone();
    let cur = clonedLL.head;

    if (!cur) {
      return null;
    }

    while (cur.next) {
      if (uniqueLL[cur.next.data]) {
        cur.next = (cur.next || {}).next;
        clonedLL.decrement();
      } else {
        uniqueLL[cur.data] = cur.data;
        cur = cur.next;
      }
    }

    return clonedLL;
  }

  LinkedList.prototype.fib = function(n) {
    if (n < 2) {
      return 1;
    }

    this.head = null;

    this.add(1);
    this.add(1);

    var cur = this.head;

    while (n-- > 2) {
      this.add(cur.data + cur.next.data);
      cur = cur.next;
    }
    this.print();
  }

  return LinkedList;
})();

var linkedList = new LinkedList();
