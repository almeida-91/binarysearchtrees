class node {
    constructor(value){
        this.data = value;
        this.left = null;
        this.right =null;
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class bsearchTree {
    constructor (array){
        array = array.sort((a,b)=> a-b);
        array = getUniques(array);
        
        this.root = this.buildTree(array,0,array.length-1);
    }
    
    buildTree(array,start,end){

        if (start > end) return null;
    
        let mid = parseInt((start+end)/2);
        
        let newNode = new node(array[mid]);

        newNode.left = this.buildTree(array,start,mid-1);
        newNode.right = this.buildTree(array,mid+1,end);
        
        return newNode;
    }

    insert(value){
        if (this.root == null) {
            this.root = newNode(value);
            return this.root;
        }

        let prevNode = null;
        let currentNode = this.root;

        while (currentNode!=null){
            prevNode = currentNode;
            if (currentNode.data == value) return "Node already exists!";
            if (value > currentNode.data){
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        currentNode = new node(value);
        value > prevNode.data ?
        prevNode.right = currentNode : prevNode.left = currentNode;
        return prettyPrint(this.root);
    }

    delete(value, node = this.root) {
        if (node == null) return null;
        if (value > node.data) node.right = this.delete(value,node.right);
        else if (value < node.data) node.left = this.delete(value,node.left,node);
        // found node with value to delete
        else{
            // node has no children / one child
            if (node.left == null) return node.right;

            else if (node.right == null) return node.left;
            
            // node has 2 children
            node.data = this.findMin(node.right);
            node.right = this.delete(node.data,node.right);
        }
        return node;
    }

    find(value, modify = false){
        let prevNode = null;
        let currentNode = this.root;
        while (currentNode.data != value){
            prevNode = currentNode;
            if (value > currentNode.data){
                currentNode = currentNode.right;
            } else if (value < currentNode.data){
                currentNode = currentNode.left;
            }
            if (currentNode == null) break;
        }
        if (modify == false){
            return (currentNode != null ) ? currentNode : 'Node not found..';
        } else {
            return [prevNode,currentNode];
        }
    }

    findMin(node){
        let min = node.data;
        while (node.left!=null){
            min = node.left.data;
            node = node.left;
        }
        return min;
    }

    levelOrder()
}

let bst = new bsearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bst.root);

function getUniques(array){
    let result = [];
    for (let i = 0 ; i < array.length ; i++){
        if (array[i] != array[i+1]) result.push(array[i]);
    }
    console.log(result);
    return result;
}


function generateTree(){
    let array = [];
    while (array.length != 100){
        let newNumber = (Math.random()*1000).toFixed(0);
        array.push(newNumber);
    }
    array = array.sort((a,b)=>{ return (a < b) ? -1 : 1 });
    let newBst = new bsearchTree(array);
    prettyPrint(newBst.root);
    console.log(array);
}