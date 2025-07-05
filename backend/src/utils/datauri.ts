import { error } from "console";
import DataURIParser from "datauri/parser";
import path, { format } from "path"
const getDataUri = (file:any)=>{   //this file is get by using multer
     if(!file){
          throw new Error("File is undefined");
     }
     const parser = new DataURIParser();
     const extName = path.extname(file?.originalname).toString();  // heplp to get extension of the filename like .jpg etc.
     return parser.format(extName,file.buffer);  
}

export default getDataUri;