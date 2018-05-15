
const NodesManager = {
    arTrees:[],
    maxID:0,
    add:function(name,pid){
        const oNode = new Node({id:this.getNewID(),name,pid}),oParent=this.getNodeByID(pid);
        if (oParent)oParent.children.push(oNode);
    },
    getNewID:function(){
        this.maxID+=1;
        return this.maxID;
    },
    delNodeByID:function(id){
        const oNode=this.getNodeByID(id);
        let bResult=false;
        if (oNode){
            const oParent=this.getNodeByID(oNode.pid);
            if (oParent){
                for (let ii=0;ii<oParent.children.length;ii++){
                    if (oParent.children[ii].id===id){
                        oParent.children.splice(ii,1);
                        bResult=true;
                    }
                }
            }
        }
        return bResult;
    },
    addFromList:function(arList){
        arList.forEach((elm)=>{
            if (elm.id>this.maxID)this.maxID=elm.id;
            this.addNode(elm);
        })
        this.createTrees();
    },
    addNode:function(elm){
        const oNode=new Node(elm);
        this.arTrees.push(oNode);
    },
    createTrees:function(){
        this.arTrees.forEach((elm,ii)=>{
            if (elm.pid!==null){
                this.appendToParent(elm);
            }                
        });
        for (let ii=0;ii<this.arTrees.length;ii++){
            if (this.arTrees[ii].pid!==null){
                this.arTrees.splice(ii,1);
                ii--;
            }
        }
    },
    createFlatList:function(){
        let arList=[];
        this.arTrees.forEach((elm)=>{
            this.appendToList(arList,elm);
        });
        return arList;
    },
    appendToParent:function(elm){
        this.arTrees.forEach((parent,ii)=>{
            if (elm.pid===parent.id){
                parent.children.push(elm);
            }
        });
    },
    appendToList:function(arList,elm){
        arList.push({id:elm.id,name:elm.name,pid:elm.pid});
        elm.children.forEach((elmIn)=>{
            this.appendToList(arList,elmIn);
        });
    },
    getNodeByID:function(id){
        let oNode=null;
        for (let ii=0;ii<this.arTrees.length;ii++){
            oNode=this.searchInNode(this.arTrees[ii],id);
            if (oNode)break;
        }
        return oNode;
    },
    searchInNode:function(oNode,id){
        let oNewNode=null;
        if (oNode.id===id){
            oNewNode=oNode;
        }
        else{
            for (let ii=0;ii<oNode.children.length;ii++){
                oNewNode=this.searchInNode(oNode.children[ii],id);
                if(oNewNode) break;
            }
        }
        return oNewNode;
    },
}


class Node {
    constructor({id,name,pid}){
        this.id=id;
        this.name=name;
        this.pid=pid;
        this.children=[];
        /* can't i use the same as same es15 enhancement ? */
    }
}

module.exports=NodesManager;