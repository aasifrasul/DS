function Node(value) {
  this.value = value;
  this.previous = null;
  this.next = null;
}

function CircularLinkedList() {
  this.head = null;
}

CircularLinkedList.prototype.push = function(val) {
  var head = this.head,
    temp = head,
    node = new Node(val);

  if (!head) {
    node.next = node;
    node.previous = node;
    this.head = node;
  } else {
    while (temp.next != head) {
      temp = temp.next;
    }

    node.next = head;
    node.previous = temp;

    head.previous = node;
    temp.next = node;
  }
}
