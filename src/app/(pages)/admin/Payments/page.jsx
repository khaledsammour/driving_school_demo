import TablePaymentAdmin from '@/app/components/TablePaymentAdmin';
import { Tab } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { MdOutlinePayment } from "react-icons/md";


export default function page() {
    return (
        <>
            <div className="payment py-6">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <MdOutlinePayment className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">payments</span>
                    </div>
                    <div className="flex">
                        <Link
                            href="/admin/Payments/add"
                            className="text-green-600 text-base font-normal border border-green-600 py-1 px-2 rounded cursor-pointer hover:bg-green-50"
                        >
                            Add Payment
                        </Link>

                    </div>
                </div>

                <div className="table w-full py-6">
                    <TablePaymentAdmin />
                </div>
            </div>
        </>
    )
}
