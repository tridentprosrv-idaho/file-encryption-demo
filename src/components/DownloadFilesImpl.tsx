import React  from "react";
import IBlobDataUrl from "./IBlobDataUrl";
import DownloadFile from "./downloadFile";
import IDownloadFilesProps from "./IDownloadFilesProps";

export default function DownloadFilesImpl(props:IDownloadFilesProps): JSX.Element{
    const { downloadData} = props;
    return <section className="download-files">
    {
      downloadData.map( (data:IBlobDataUrl, index:number)=> 
        <DownloadFile key={"download"+index.toString()} name={data.name} url={data.dataUrl} /> )
    }
  </section>
}