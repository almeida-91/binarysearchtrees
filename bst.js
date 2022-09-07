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

    levelOrder(fn){
        let node = this.root;
        if (node == null) return;
        let levelArray = [];
        levelArray.push(node);
        while(levelArray.length > 0){
            if (fn == null) console.log(levelArray.shift().data);
            else console.log(fn(levelArray.shift().data));
            if (node.left != null) levelArray.push(node.left);
            if (node.right != null) levelArray.push(node.right);
            node = levelArray[0];
        }
    }

    inOrder(node,fn,array=[]){
        if (node == null) return;
        this.inOrder(node.left,fn,array);

        if (fn == null) array.push(node.data);
        else array.push(fn(node.data));

        this.inOrder(node.right,fn,array);
        return array;
    }

    preOrder (node,fn,array=[]){
        if (node == null) return;

        if (fn == null) array.push(node.data);
        else array.push(fn(node.data));

        this.preOrder(node.left,fn,array);    
        this.preOrder(node.right,fn,array);

        return array;
    }

    postOrder(node, fn, array=[]){
        if (node == null) return;

        this.postOrder(node.left,fn,array);  
        this.postOrder(node.right,fn,array);

        if (fn == null) array.push(node.data);
        else array.push(fn(node.data));    

        return array;
    }

    height(node){
        if (node == null) return -1;
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight,rightHeight)+1;
    }

    depth(node){
        if (node == this.root) return 0;
        let depth = 0;
        let currentNode = this.root;
        while (currentNode!=node){
            if (currentNode.data > node.data){
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
            depth++;
        }
        return depth;
    }
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
    return newBst;
}

function double(n){
    return n*2;
}