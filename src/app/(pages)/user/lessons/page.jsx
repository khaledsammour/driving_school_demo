import TableLessons from '@/app/components/TableLessons';
import Link from 'next/link';

import React from 'react'
import { MdOutlinePlayLesson } from "react-icons/md";


export default function page() {
    return (
        <>
            <div className="lessons">

                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <MdOutlinePlayLesson className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">Lessons</span>
                    </div>
                    <div className="flex">
                        <Link
                            href="/user/lessons/add"
                            className="text-green-600 text-base font-normal border border-green-600 py-1 px-2 rounded cursor-pointer hover:bg-green-50"
                        >
                            Add New Lesson
                        </Link>

                    </div>
                </div>
                <div className="table w-full py-6">
                    <TableLessons type="user" />
                </div>
            </div>
        </>
    )
}
