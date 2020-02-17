import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
 
export default {
 pack (name, data) {
    let zipFile: JSZip = new JSZip();

    data.forEach(i => {
        zipFile.file(i.filename, i.filecontent);
    });

    zipFile.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
        FileSaver.saveAs(blob, name || "简介数据.blive");
    });
  }
}