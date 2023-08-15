import React, { FC } from "react"

const AddedFile: FC<{name: string, handleDelete: ()=>void}> = ({name, handleDelete})=>{
    return(
    <div className="added-file">
        <span>
            {name}
        </span>
        <img src="/cross.svg" onClick={handleDelete}/>
    </div>
    )
    
}

export default AddedFile;