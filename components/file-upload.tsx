"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = ({
  endpoint,
  value,
  onChange
}: FileUploadProps) => {

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].fileHash)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}

export default FileUpload