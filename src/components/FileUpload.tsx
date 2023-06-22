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
  const { getRootProps, getInputProps, isDragReject, isDragActive } = useDropzone(dropzoneProps);

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "cursor-pointer border border-dashed p-4 transition hover:bg-base-100",
        isDragReject && "border-red-500",
        isDragActive ? "border-primary-500 bg-base-100" : "bg-base-200",
        className,
      )}
    >
      <input {...getInputProps()} id={id} name={name} />
      <div>{children}</div>
    </div>
  );
};

export default FileUpload;
