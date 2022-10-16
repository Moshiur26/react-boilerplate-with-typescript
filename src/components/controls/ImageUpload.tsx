import React, { useState , useEffect} from "react";
import {AiOutlinePlus,AiFillCloseCircle} from 'react-icons/ai';

interface ImageUploadProps {
    setSelectedImgFiles:(files:any[])=> void,
    showLabel: boolean,
    setAllImgFiles:(files:any[])=> void
}
export const ImageUpload:React.FC<ImageUploadProps>= ({setSelectedImgFiles, showLabel, setAllImgFiles = () =>{}}) =>{
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [allFiles, setAllFiles] = useState<any[]>([]);
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(()=>{
        setSelectedImgFiles(selectedFiles);
        setAllImgFiles(allFiles);
    },[selectedFiles,setSelectedImgFiles, allFiles, setAllImgFiles])

    const handleImageChange = (e:any) => {
        const MAX_LENGTH = 5;
        const SUPPORTED_FORMAT = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
        if(selectedFiles.length >= MAX_LENGTH){
            e.preventDefault()
            return
        }else{
            let imageFiles = Array.from<File>(e.target.files).every(file =>(
                SUPPORTED_FORMAT.includes(file.type)
            ))
            if(imageFiles){
                const arr:any[] = [...allFiles]
                const filesArray = Array.from(e.target.files).slice(0,5-selectedFiles.length).map((file:any) =>{
                    arr.push(file)
                    e.target.value = null;
                    return  URL.createObjectURL(file)
                })
                setAllFiles(arr);
                setSelectedFiles((prevImages) => prevImages.concat(filesArray));
                Array.from(e.target.files).map(
                (file:any) => URL.revokeObjectURL(file) 
            )
                setErrorMsg('')
            }else{
                setErrorMsg(': Only supported Image formats are:(.jpg, .jpeg, .webp and .png)') 
            }
        }
    };
    
    const handleRemoveImg = (index:number)=>{
        const blobFiles = [...selectedFiles]
        const imageFiles = [...allFiles]
        blobFiles.splice(index, 1)
        imageFiles.splice(index, 1)
        setSelectedFiles(blobFiles)
        setAllFiles(imageFiles)
    }
    return (
        <div className="imageUploadWrapper">
            {
                showLabel && (
                    <div className="imgUploadHeader">
                        {/* {localeString('uploadImage')}&nbsp; */}
                        { errorMsg && (<span className="imgFormatError">{errorMsg}</span>)}
                    </div>
                )
            }
            <input 
                multiple
                type="file" 
                id="file"  
                name = 'reason_images'
                onChange={(e) => handleImageChange(e)}
            />
            <div className="retrunImageUploadMain">           
                <div className="imageUploadPreview">
                    {
                        selectedFiles.length > 0 &&
                        selectedFiles.map((photo:any, index:number) => (
                            <div className="returnImageWrapper" key={photo}>
                                <img src={photo} alt={`photo-${index}`} width={100} height={100} />
                                <span 
                                    className="cancelUploadedImage" 
                                    onClick={()=> handleRemoveImg(index)}>
                                        <AiFillCloseCircle color='red'/>
                                </span>
                            </div>
                        ))
                    }
                </div>
                {
                    selectedFiles.length < 5?
                    (
                        <div className="returnImageUpload">
                            <div className="imageUploadLabelHolder">
                                <label htmlFor="file" className="imageUploadLabel">
                                    <AiOutlinePlus size={30}/>
                                </label>
                            </div>
                        </div>
                    ):'' 
                }
            </div>
        </div>
        );
    };
