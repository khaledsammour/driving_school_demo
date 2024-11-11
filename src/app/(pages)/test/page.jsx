"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgLogin from '@/app/assets/login.jpg';
import { Login } from '@/app/services/authService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FileDownload from 'js-file-download';

export default function Page() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([
        {
            id: 1,
            name: 'The consent process will be: (check all that are true)',
            isCheckbox: false,
            isRadio: false,
            children: [
                {
                    id: 1.1,
                    name: 'Waived (Use "CHECKLIST: Waiver of Consent HHS (HRP-300)," "CHECKLIST: Waiver of Consent Emergency Research (HRP-301), or "Checklist: Waiver of Consent Leftover Specimens (HRP-302)"',
                    isCheckbox: true,
                    isRadio: false,
                    children: []
                },
                {
                    id: 1.2,
                    name: 'Obtained in accordance with all criteria in Section 2',
                    isCheckbox: true,
                    isRadio: false,
                    children: []
                },
            ]
        }
    ]);
    const [checked, setChecked] = React.useState([false, false]);

    const handleChange1 = (arr) => {
        setSelectedItems(prevSelectedItems => {
            const localSelectedItems = [...prevSelectedItems];  // Create a copy of the previous state

            arr.forEach(id => {
                if (localSelectedItems.includes(id)) {
                    // Remove the item if it's already selected
                    localSelectedItems.splice(localSelectedItems.indexOf(id), 1);
                } else {
                    // Add the item if it's not selected
                    localSelectedItems.push(id);
                }
            });

            return localSelectedItems;  // Return the new state
        });
    };

    const handleChange2 = (id) => {
        setSelectedItems(prevSelectedItems => {
            const localSelectedItems = [...prevSelectedItems];  // Create a copy of the previous state

            if (localSelectedItems.includes(id)) {
                // Remove the item if it's already selected
                localSelectedItems.splice(localSelectedItems.indexOf(id), 1);
            } else {
                // Add the item if it's not selected
                localSelectedItems.push(id);
            }

            return localSelectedItems;  // Return the new state
        });
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const router = useRouter();
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var fileName = 'test'
        const response = await fetch('https://api.gardencity-jo.com/garden_city_api/GenerateTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                booleans: checked
            }),
        });

        if (!response.ok) {
            console.error('Failed to download PDF');
            return;
        }
        // Use response.blob() to handle binary data
        const pdfBlob = await response.blob();
        FileDownload(pdfBlob, fileName + '.pdf')

    };
    function containsAny(arr1, arr2) {
        return arr1.some(item => arr2.includes(item));
    }

    const getIndeterminate = (selectedItems, children) => {
        const allChecked = children.every(child => selectedItems.includes(child.id));
        const noneChecked = children.every(child => !selectedItems.includes(child.id));
        return !allChecked && !noneChecked;
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1 mt-10">
                            <div className="mx-auto">
                                <form className='mt-12' onSubmit={handleSubmit}>
                                    <div>
                                        {items.map(e => (
                                            <div key={e.id}>
                                                <FormControlLabel
                                                    label={e.name}
                                                    control={
                                                        <Checkbox
                                                            // checked={getIndeterminate(selectedItems, e.children.map(c => c.id) )}
                                                            checked={e.children.every(child => selectedItems.includes(child.id))}
                                                            indeterminate={getIndeterminate(selectedItems, e.children.map(c => c.id))}
                                                            onChange={() => handleChange1(e.children.map(c => c.id))}
                                                        />
                                                    }
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                    {e.children.map(c => (<FormControlLabel
                                                        key={c.id}
                                                        label={c.name}
                                                        checked={selectedItems.includes(c.id)}
                                                        control={<Checkbox onChange={() => handleChange2(c.id)} />}
                                                    />))}
                                                </Box>
                                            </div>
                                        ))}
                                        {/* <FormControlLabel
                                            label="The consent process will be: (check all that are true)"
                                            control={
                                                <Checkbox
                                                    checked={checked[0] && checked[1]}
                                                    indeterminate={checked[0] !== checked[1]}
                                                    onChange={handleChange1}
                                                />
                                            }
                                        />
                                        {children} */}
                                    </div>
                                    {/* <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    /> */}
                                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M15 12h6M18 15l3-3-3-3" />
                                            <path d="M12 2v20M2 12h10" />
                                        </svg>
                                        <span className="ml-3">Export</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
