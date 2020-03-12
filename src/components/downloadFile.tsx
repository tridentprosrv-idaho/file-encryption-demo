import React from "react";
import IDownloadFileProps from "./IDownloadFileProps";
import { lookup } from "mime-types";

export default function DownloadFile(props: IDownloadFileProps): JSX.Element {
  const { name, url } = props;
  const mimeType: string | false = lookup(name);
  const renderIframe = () => <iframe src={url} />;
  let renderFile: () => JSX.Element = renderIframe;
  switch (mimeType) {
    case "image/bmp":
    case "image/gif":
    case "image/vnd.microsoft.con":
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/tiff":
    case "image/webp":
      renderFile = () => <img className={"download-img"} src={url} />;
      break;
    case "application/pdf":
    case "text/plan":
    case "application/xhtml+xml":
    case "text/html":
      renderFile = renderIframe;
      break;
    case "audio/ogg":
    case "audio/mpeg":
    case "audio/midi":
    case "audio/x-midi":
    case "audio/opus":
    case "audio/wav":
    case "audio/webm":
    case "audio/3gpp":
    case "audio/3gpp2":
      renderFile = () => (
        <audio controls>
          <source src={url} type={mimeType}></source>
        </audio>
      );
      break;
    case "video/x-msvideo":
    case "video/mpeg":
    case "video/ogg":
    case "video/mp2t":
    case "video/webm":
    case "video/3gpp":
    case "video/3gpp2":
      renderFile = () => (
        <video controls>
          <source src={url} type={mimeType}></source>
        </video>
      );
      break;
    default:
      renderFile = () => <a href={url}>{name}</a>;
      break;
  }

  return (
    <article>
      <h3>{name}</h3>
      {renderFile()}
    </article>
  );
}
