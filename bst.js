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
        array = array.sort((a,b)=>{ return (a < b) ? -1 : 1 });
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
        return prettyPrint(bst.root);
    }

    delete(value) {
        let prevNode = null;
        let currentNode = this.root;

        while ( currentNode != null ){
            if (currentNode.data == value) break;
            prevNode = currentNode;
            if (currentNode.data > value){
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;
            }
        }

        if (currentNode.left == null && currentNode.right == null){
            
            currentNode = null;
        } else if (currentNode.right == null){
            currentNode = currentNode.left;
        }
        return prettyPrint(this.root);
    }

    find(value){
        let currentNode = this.root;
        while (currentNode.data != value){
            if (value > currentNode.data){
                currentNode = currentNode.right;
            } else if (value < currentNode.data){
                currentNode = currentNode.left;
            }
            if (currentNode == null) break;
        }
        return (currentNode != null ) ? currentNode : 'Node not found..';
    }
}

let bst = new bsearchTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(bst.root);

function getUniques(array){
    let result = [];
    for (let i=0;i<array.length;i++){
        if (array[i] != array[i+1]) result.push(array[i]);
    }
    console.log(result);
    return result;
}