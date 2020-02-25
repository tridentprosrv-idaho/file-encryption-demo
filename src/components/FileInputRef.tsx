import React from "react";

export default class FileInputRef{
    private static _fileInputRef: React.RefObject<HTMLInputElement>;
    public static GetRef(): React.Ref<HTMLInputElement>{
        FileInputRef.init();
        return FileInputRef._fileInputRef;
    }
    public static GetFileInput(): HTMLInputElement|null{
        FileInputRef.init();
        return FileInputRef._fileInputRef.current;
    }


    private static init() {
        if (!FileInputRef._fileInputRef) {
            FileInputRef._fileInputRef = React.createRef<HTMLInputElement>();
        }
    }
}