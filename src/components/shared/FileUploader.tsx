import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-zinc-900 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-4 lg:p-10">
            <img src={fileUrl} alt="Post image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or Drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={76}
            alt="file upload"
          />
          <h3 className="base-medium text-zinc-500 font-normal mb-2 mt-2">
            Drag Photo here
          </h3>
          <p className="font-light small-regular text-zinc-600 mb-6">
            SVG, PNG, JPG, JPEG
          </p>
          <Button className="shad-button_dark_3">Select from Computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
