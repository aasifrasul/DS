function DoublyLinkedList() {
  this.head = null;
}

DoublyLinkedList.prototype.push = function(val) {
  const node = {
    value: val,
    next: null,
    previous: null
  }

  const head = this.head;
  let current = head;
  let previous = head;
  if (!head) {
    this.head = node;
  } else {
    while (current.next) {
      previous = current;
      current = current.next;
    }
    node.previous = current;
    current.next = node;
  }
}

DoublyLinkedList.prototype.reverse = function() {
  var head = this.head,
    current = this.head,
    tmp;
  while (current) {
    tmp = current.next;
    current.next = current.previous;
    current.previous = tmp;
    if (!tmp) {
      //set the last node as header
      this.head = current;
    }
    current = tmp;
  }
  return this;
}

DoublyLinkedList.prototype.deleteNode = function(val) {
  var current = dll.head,
    previous;

  //delete head
  if (current.value == val) {
    dll.head = current.next;
    //if there is only one node, then dll.head is null
    if (dll.head) dll.head.previous = null;
    return dll;
  }

  while (current.next) {
    if (current.value == val) {
      previous.next = current.next;
      current.next.previous = previous;
      return dll;
    }
    previous = current;
    current = current.next;
  }

  //delete last node
  if (current.value == val) {
    previous.next = null;
  }
  return dll;
}
