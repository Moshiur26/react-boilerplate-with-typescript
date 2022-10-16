import { FC } from "react";
import { Upload, message, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { UploadFile } from "antd/lib/upload/interface";

interface FileUploaderControlProps {
  setImageFile: (file: any) => void;
  title?: string;
  errors: any;
  name: string;
  accept?: string;
  size?: number
  multiple?: boolean;
}

const getDimension = async (file: File, width: number, height: number) => {
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file"));
    };
    reader.onload = () => {
      let image = new Image();
      // image.src = reader.result || ""
      image.onload = function () {
        resolve({ width: width, height: height });
      };
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      resolve({ width: 0, height: 0 });
    }
  });
};


export const FileUploaderControl: FC<FileUploaderControlProps> = ({
  setImageFile,
  title = "Click to Upload",
  errors,
  name,
  accept,
  size = 5*1024*1024,
  multiple = false,
}) => {
  const props: UploadProps = {
    name: "file_upload",
    headers: {
      authorization: "authorization-text",
    },
    multiple: multiple,
    maxCount: multiple ? 10 : 1,
    listType: "picture",
    beforeUpload: (file: UploadFile) => {
      // return file.size > size;
      return false
      
    },
    onChange: (info) => {
      if(info.fileList.length > 0){
        if(multiple){
          setImageFile(info.fileList.map(item => item.originFileObj));
        } else {
          setImageFile(info.file);
        }
      } else {
        setImageFile(null);
      }
    },
    accept : accept
  };

  let errMsg = errors?.[name]?.message;

  return (
    <div>
      <Upload {...props}>
        <Button
          icon={<PaperClipOutlined className="relative -top-1" />}
          block
          size="large"
          className="file-upload-btn"
        >
          <span>{title}</span>
        </Button>
      </Upload>
      <p className="text-red-600 text-xs absolute font-light">{errMsg}</p>
    </div>
    
  );
};
