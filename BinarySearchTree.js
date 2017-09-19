
var Node = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
};

var BinarySearchTree = function() {
  this._root = null;
}

BinarySearchTree.prototype = {

  constructor: BinarySearchTree,

  add: function(value) {
    var node = new Node(value),
      current;

    if (this._root === null) {
      this._root = node;
    } else {
      current = this._root;
      while (true) {
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }
        } else if (value > current.value) {
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }
        } else {
          break;
        }
      }
    }
  },

  contains: function(value) {
    var found = false,
      current = this._root

    while (!found && current) {

      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return found;
  },

  remove: function(value) {

    var found = false,
      parent = null,
      current = this._root,
      childCount,
      replacement,
      replacementParent;

    while (!found && current) {

      if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      } else {
        found = true;
      }
    }

    if (found) {
      childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);

      if (current === this._root) {
        switch (childCount) {
          case 0:
            this._root = null;
            break;
          case 1:
            this._root = (current.right === null ? current.left : current.right);
            break;
          case 2:
            replacement = this._root.left;
            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }
            if (replacementParent !== null) {
              replacementParent.right = replacement.left;
              replacement.right = this._root.right;
              replacement.left = this._root.left;
            } else {
              replacement.right = this._root.right;
            }

            this._root = replacement;
        }
      } else {
        switch (childCount) {
          case 0:
            if (current.value < parent.value) {
              parent.left = null;
            } else {
              parent.right = null;
            }
            break;
          case 1:
            if (current.value < parent.value) {
              parent.left = (current.left === null ? current.right : current.left);
            } else {
              parent.right = (current.left === null ? current.right : current.left);
            }
            break;
          case 2:
            replacement = current.left;
            replacementParent = current;
            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            replacementParent.right = replacement.left;
            replacement.right = current.right;
            replacement.left = current.left;

            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
        }
      }
    }
  },

  traverseDF: function(callback) {
    var recurse = function(node) {
      callback.call(bst, bst.value);
      if (node.left) {
        recurse(node.left);
      } else {
        recurse(node.right);
      }
    };
    recurse(this._root);
  },

  traverseBF: function(callback) {
    var queue = new Queue();

    queue.enqueue(this._root);

    currentTree = queue.dequeue();

    while (currentTree) {
      for (var i = 0, length = currentTree.children.length; i < length; i++) {
        queue.enqueue(currentTree.children[i]);
      }

      callback(currentTree);
      currentTree = queue.dequeue();
    }
  },

  size: function() {
    var length = 0;
    this.traverse(node => length++);
    return length;
  },

  toArray: function() {
    var result = [];
    this.traverse(node => result.push(node.value));
    return result;
  },

  toString: function() {
    return this.toArray().toString();
  },

  traverse: function(process) {
    function inOrder(node) {
      if (node) {
        if (node.left !== null) {
          inOrder(node.left);
        }
        process.call(this, node);
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    inOrder(this._root);
  }
};

var bst = new BinarySearchTree();
