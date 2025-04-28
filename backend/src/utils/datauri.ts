import DataURIParser from "datauri/parser";
import path, { format } from "path"
const getDataUri = (file:any)=>{   //this file is get by using multer
  //console.log(file);
     const parser = new DataURIParser();
     const extName = path.extname(file?.originalname).toString();  // heplp to get extension of the filename like .jpg etc.
     return parser.format(extName,file.buffer);  
      
     /*
       it return a object like {
  base64: 'iVBORw0KGgoAAAANSUhEUgAAA...',
  mimetype: 'image/png',
  content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
}    */
}

export default getDataUri;