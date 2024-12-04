import TableDrivers from '@/app/components/TableDrivers';
import Link from 'next/link';
import React from 'react'
import { FaCar } from "react-icons/fa";

export default function page() {
    return (
        <>
            <div className="users py-6">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <FaCar className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">Drivers</span>
                    </div>
                    <div className="flex">
                        <Link
                            href="/admin/drivers/add"
                            className="text-green-600 text-base font-normal border border-green-600 py-1 px-2 rounded cursor-pointer hover:bg-green-50"
                        >
                            Add New
                        </Link>

                    </div>
                </div>

                <div className="table w-full py-6 ">
                    <TableDrivers />
                </div>
            </div>
        </>
    )
}
