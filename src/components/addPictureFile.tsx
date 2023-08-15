import React, { FC, useState } from "react"
import Input from "../UI/input/Input"
import { Fragment } from "react";
import AddedFile from "./AddedFile";

const AddPictureFile: FC<{setSelectedFiles: (arg: File[])=>void, selectedFiles: File[]}> = ({setSelectedFiles, selectedFiles})=>{

    return(
        <Fragment>
            <Input type="file" multiple onChange={(e)=>{
                let files = e.target.files
                if(files){
                    setSelectedFiles([...selectedFiles, ...files])
                }
                
                }}/>
                {selectedFiles.map((elem, index)=><AddedFile key={`${elem.name} ${index}`} name={elem.name} handleDelete={
                    ()=>{
                        setSelectedFiles(selectedFiles.filter(fl=>fl.name!==elem.name))
                    }
                }/>)}
        </Fragment>
    )
}

export default AddPictureFile;