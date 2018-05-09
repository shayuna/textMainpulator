export const ElementsManager = {
    arElements:[],
    createList:function(sTxt){
        const re = /[<]([^\s]*)[^<]*\s+id=\"?([^\s\"]+)\"?[^<]*[>]/ig;
        let mt=null;

        while (mt=re.exec(sTxt)){
            const sType=mt[1].toLowerCase(),sID=mt[2];
            if (sType==="input"){
                let oElement=new Element(sType,sID);
                const sElementTxt=mt[0];
                const re2=/\s+([^=]+)=[\"]([^\"]*)[\"]/ig
                let mt2=null;
                while (mt2=re2.exec(sElementTxt)){
                    let sAttrNm=mt2[1],sAttrVl=mt2[2];
                    if (sAttrNm==="class")sAttrNm="cliss";
                    oElement[sAttrNm]=sAttrVl;
                }
                this.arElements.push (oElement);
            };
        }
//        console.log (this.arElements);
    },
    getElementByID(sID){
        const arElm = this.arElements.filter(function(itm,ii){
            return sID==itm.sID;
        });
        return arElm.length>0 ? arElm[0] : null;
    },
};

class Element {
    constructor(sType,sID){
        this.sType=sType;
        this.sID=sID;
    };
};


/* - just to practice the way we did things until not so long ago. it's also more close to the iron, less abstracted, less translated, the way things are under the hood, but more verbose, and more cumbersome, less readable and hence less maintainable and aesthetically accessible, is there such a beast ? aesthetically accessible ? */
/*
const Element = function (sID){
    this.sID=sID;
    console.log ("here's the id - "+this.sID);
}
*/