class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right =null;
    }
}

class bsearchTree {
    constructor (){
        this.root = new Node(null);
    }
    buildTree(array,start,end){
        if (end < start) return null;
        array.sort();
        let mid = ((start+end)/2);
        if (mid == 3) return;
        this.root.value = array[mid];
        this.left = new bsearchTree();
        this.right = new bsearchTree();
        this.left.buildTree(array, start, mid-1);
        this.right.buildTree(array, mid+1,end);
    }
}

let bst = new bsearchTree();
bst.buildTree([1,2,3],0,2);