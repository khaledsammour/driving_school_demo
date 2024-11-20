
import TableTestimonials from '@/app/components/TableTestimonals';

import React from 'react'
import { VscPreview } from "react-icons/vsc";
export default function page() {
    return (
        <>
            <div className="users py-6">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <VscPreview className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">Testimonials</span>
                    </div>
                </div>

                <div className="table w-full py-6 ">
                    <TableTestimonials />
                </div>
            </div>
        </>
    )
}
