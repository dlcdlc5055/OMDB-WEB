import getAPIURL from "./getAPIURL";
import axios from "axios";

async function getSearchResults(query,page=1,year=null,type=null){
    let URL=getAPIURL(["s",query],year!==null?["y",year]:null,type!==null?["type",type]:null,["page",page])
    let res=await axios(URL)
    return res.data
}

export default getSearchResults;