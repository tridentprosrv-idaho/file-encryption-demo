import JSZip from "jszip";

export default function Zip(files: FileList): Promise<string>{
    var zip = new JSZip();
    for(var i = 0; i< files.length; i++){
        const file:File = files[i];
        zip.file(file.name, file);
    }
    return zip.generateAsync({type : "string"});
}