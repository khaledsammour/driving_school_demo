import TablePaymentUSer from '@/app/components/TablePaymentUSer';
import { Tab } from '@mui/material';
import React from 'react'
import { MdOutlinePayment } from "react-icons/md";


export default function page() {
    return (
        <>
            <div className="payment">
                <div className="flex items-center py-5 px-2">
                    <MdOutlinePayment className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                    <span className="text text-xl font-bold ml-2 text-blue-600">Payment </span>
                </div>

                <div className="table w-full py-6">
                    <TablePaymentUSer />
                </div>
            </div>
        </>
    )
}
