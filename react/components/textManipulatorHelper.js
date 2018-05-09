import {ElementsManager} from "./TextManipulatorElementsManager";

export const TextManipulator = {
    glueID:(sTxt) => {
        const re = /(\"clauseinputnumericid(.|\s)*?(\d+)(.|\s)*?<input\s+)([^i])/ig;
        let mt=null;
        while (mt=re.exec(sTxt)){
            sTxt=sTxt.replace(mt[0],mt[1]+"id=\"A"+mt[3]+"\" name=\"DoSave\" "+mt[5]);
        };
        return sTxt;
    },
    updateElementsAttr:(sTxtToUpdate,sTxtToUpdateBy)=>{
        ElementsManager.createList(sTxtToUpdateBy);
        const re = /<input[^>]*id=\"([^\"]+)\"[^>]*>/ig;
        const sTxtToUpdateOrg=sTxtToUpdate; /* since the elements are going to grow in size, not decrease, so maybe it's a redundant step. but you don't really know what the day will bring.*/
        let mt=null;
        while (mt=re.exec(sTxtToUpdateOrg)){
            const sElmOrg=mt[0],sID=mt[1];
            let sElmNew=mt[0].replace(/[/]?\s*[>]/,"");
            let oElement=null;
            if (oElement=ElementsManager.getElementByID(sID)){
                for (const sProp in oElement){
                    switch (sProp){
                        case "name":
                        case "id":
                        case "style":
                        case "sType":
                        case "sID":
                            break;
                        case "cliss":
                            const re2=/class=\"([^\"]+)\"/ig;
                            const mt2=re2.exec(sElmOrg);
                        
                            if  (mt2){
                                const sNewClass=mt2[1]+" "+ oElement["cliss"];
                                sElmNew=sElmNew.replace(mt2[1],sNewClass);
                            }
                            else{
                                sElmNew+=" class=\""+oElement[sProp]+"\"";    
                            }
                            break;
                        default:
                            sElmNew+=" "+sProp+"=\""+oElement[sProp]+"\"";
                    }
                }
                sElmNew+="/>";
                sTxtToUpdate=sTxtToUpdate.replace(sElmOrg,sElmNew);
            };
        };
        return sTxtToUpdate;
    }
}