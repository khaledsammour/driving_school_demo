import TableLessons from '@/app/components/TableLessons';

import React from 'react'
import { MdOutlinePlayLesson } from "react-icons/md";


export default function page() {
    return (
        <>
            <div className="lessons">
                <div className="flex items-center py-5 px-2">
                    <MdOutlinePlayLesson className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                    <span className="text text-xl font-bold ml-2 text-blue-600">Lessons </span>
                </div>

                <div className="table w-full py-6">
                    <TableLessons />
                </div>
            </div>
        </>
    )
}
