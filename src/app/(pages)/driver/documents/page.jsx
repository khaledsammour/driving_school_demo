import FileUploadDocument from '@/app/components/FileUploadDocument';
import React from 'react'
import { TbLicense } from "react-icons/tb";
export default function page() {
    return (
        <div className="Document">
            <div className="flex items-center py-5 px-2">
                <TbLicense className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                <span className="text text-xl font-bold ml-2 text-blue-600">Document </span>
            </div>

            <div className="table w-full py-6">
                <FileUploadDocument UserType="driver" TypeFile={"document"} />
            </div>
        </div>
    )
}
