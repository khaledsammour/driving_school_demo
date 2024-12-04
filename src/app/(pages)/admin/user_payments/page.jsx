import TableUsersPaymentAdmin from '@/app/components/TableUsersPaymentAdmin';
import React from 'react'
import { MdOutlinePayment } from "react-icons/md";


export default function page() {
    return (
        <>
            <div className="payment py-6">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <MdOutlinePayment className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">Users Payments</span>
                    </div>
                </div>

                <div className="table w-full py-6">
                    <TableUsersPaymentAdmin />
                </div>
            </div>
        </>
    )
}
