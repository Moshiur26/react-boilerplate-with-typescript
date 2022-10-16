import {useEffect, FC} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextProps {
  name: string;
  register: any;
  setValue: any;
  watch: any;
  errors?: any;
  placeholder?: string;
  className?: string;
  data?: string;
};

export const RichTextControl: FC<RichTextProps> = ({
  name,
  register,
  setValue,
  watch,
  errors,
  placeholder="",
  className="",
  data,
}) => {

    useEffect(()=>{
        register(name)
    },[])

    let errMsg = errors?.[name]?.message;
    
  return (
    <div className="relative">
    <CKEditor
      config={{placeholder: placeholder}}    
      editor={ ClassicEditor }
      data={data}
      onChange={ ( event: any, editor: any ) => {
          setValue(name, editor.getData())
      }
    }
    />
    <p className="text-red-600 text-xs absolute font-light">{errMsg}</p>
    </div>
  )
}
