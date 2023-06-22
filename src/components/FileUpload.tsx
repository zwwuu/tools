import { ReactNode } from "react";
import clsx from "clsx";
import { DropzoneProps, useDropzone } from "react-dropzone";

type FileUploadProps = {
  name: string;
  id?: string;
  className?: string;
  children: ReactNode;
  dropzoneProps: DropzoneProps;
};

const FileUpload = ({ className, children, name, id, dropzoneProps }: FileUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone(dropzoneProps);
  return (
    <div
      {...getRootProps()}
      className={clsx("cursor-pointer border border-dashed bg-base-200 p-4 transition hover:bg-base-100", className)}
    >
      <input {...getInputProps()} id={id} name={name} />
      <div>{children}</div>
    </div>
  );
};

export default FileUpload;
