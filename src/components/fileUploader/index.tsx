import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploaderRegular, UploadCtxProvider, OutputFileEntry } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import clsx from "clsx";

import { FileEntry } from "@/types";

const localeDefinitionOverride = {
  en: {
    "upload-file": "Upload photo",
    "upload-files": "Upload photos",
    "choose-file": "Choose photo",
    "choose-files": "Choose photos",
    "drop-files-here": "Drop photos here",
    "select-file-source": "Select photo source",
    "edit-image": "Edit photo",
    "no-files": "No photos selected",
    "caption-edit-file": "Edit photo",
    "files-count-allowed": "Only {{count}} {{plural:photo(count)}} allowed",
    "files-max-size-limit-error": "Photo is too big. Max photo size is {{maxFileSize}}.",
    "header-uploading": "Uploading {{count}} {{plural:photo(count)}}",
    "header-succeed": "{{count}} {{plural:photo(count)}} uploaded",
    "header-total": "{{count}} {{plural:photo(count)}} selected",
    "photo__one": "photo",
    "photo__many": "photos",
    "photo__other": "photos",
  },
};

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  theme?: "light" | "dark";
  uploaderClassName?: string;
}

const FileUploader: React.FC<IFileUploaderProps> = ({
  fileEntry,
  onChange,
  theme = "light",
  uploaderClassName = "",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = useCallback(
    (uuid: string) => {
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) });
    },
    [fileEntry.files, onChange]
  );

  const resetUploaderState = () => {
    ctxProviderRef.current?.uploadCollection.clearAll();
  };

  const handleModalCloseEvent = () => {
    resetUploaderState();
    onChange({ files: [...fileEntry.files, ...uploadedFiles] });
    setUploadedFiles([]);
  };

  const handleChangeEvent = (files: any) => {
    const successful = files.allEntries.filter((f: any) => f.status === "success");
    setUploadedFiles(successful);
  };

  return (
    <div className={clsx("file-uploader-root", theme === "dark" && "dark")}>
      <FileUploaderRegular
        imgOnly
        multiple
        confirmUpload={false}
        removeCopyright
        pubkey="62c8077c3253e9e01d7d"
        sourceList="local, camera, gdrive"
        localeDefinitionOverride={localeDefinitionOverride}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        classNameUploader={clsx("uc-light", uploaderClassName)}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        {fileEntry?.files?.map((file) => (
          <div key={file.uuid} className="relative">
            <img
              className="w-full h-auto rounded border"
              src={`${file.cdnUrl}/-/preview/-/resize/x200/`}
              alt={file.fileInfo?.originalFilename || ""}
              title={file.fileInfo?.originalFilename || ""}
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-slate-800 border-2 border-slate-800 flex items-center justify-center"
              onClick={() => handleRemoveClick(file.uuid)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
