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
import { Radio, RadioGroup } from '@mui/material';

export default function Page() {
    const [items, setItems] = useState([
        {
            id: '1',
            name: 'Criteria for approval 45 CFR §46.111 and 21 CFR §56.111',
            isCheckbox: false,
            isRadio: false,
            isChecked: false,
            children: [
                {
                    id: '1.1',
                    name: 'Risks to subjects are minimized by using procedures which are consistent with sound research design and which do not unnecessarily expose subjects to risk (see Footnotes 1 and 2)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.2',
                    name: 'Risks to subjects are minimized whenever appropriate, by using procedures already being performed on the subjects for other purposes',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.3',
                    name: 'Risks to subjects are reasonable in relation to anticipated benefits, if any, to subjects, and the importance of the knowledge that may reasonably be expected to result (see Footnote 3)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.4',
                    name: 'Selection of subjects is equitable (see Footnote 4)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.5',
                    name: 'One of the following is true:',
                    isCheckbox: false,
                    isRadio: true,
                    isChecked: false,
                    children: [
                        {
                            id: '1.5.1',
                            name: 'The research involves no more than <Minimal Risk> to subjects',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                        {
                            id: '1.5.2',
                            name: 'There are adequate provisions for monitoring the data collected to ensure the safety of subjects (see Footnote 5)',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                    ]
                },
                {
                    id: '1.6',
                    name: 'There are adequate provisions to protect the privacy of subjects',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.7',
                    name: 'There are adequate provisions to maintain the confidentiality of data',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '1.8',
                    name: 'One of the following is true:',
                    isCheckbox: false,
                    isRadio: true,
                    isChecked: false,
                    children: [
                        {
                            id: '1.8.1',
                            name: 'Subjects are not likely to be vulnerable to coercion or undue influence',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                        {
                            id: '1.8.2',
                            name: 'Additional safeguards are included to protect the rights and welfare of subject vulnerable to coercion or undue influence',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                    ]
                },
                {
                    id: '1.9',
                    name: 'The consent process will be: (check all that are true)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: [
                        {
                            id: '1.9.1',
                            name: 'Waived (Use "CHECKLIST: Waiver of Consent HHS (HRP-300)," "CHECKLIST: Waiver of Consent Emergency Research (HRP-301), or "Checklist: Waiver of Consent Leftover Specimens (HRP-302)"',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                        {
                            id: '1.9.2',
                            name: 'Obtained in accordance with all criteria in Section 2',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                    ]
                },
                {
                    id: '1.10',
                    name: 'Consent documentation will be: (check all that are true)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: [
                        {
                            id: '1.10.1',
                            name: 'Waived (Use "CHECKLIST: Waiver of Documentation of Consent (HRP-303)")',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                        {
                            id: '1.10.2',
                            name: 'Documented using the short form (See "WORKSHEET: Short Form (HRP-404)")',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                        {
                            id: '1.10.3',
                            name: 'Documented in accordance with all criteria in Section 3',
                            isCheckbox: false,
                            isRadio: false,
                            isChecked: false,
                            children: []
                        },
                    ]
                },
            ]
        },
        {
            id: '2',
            name: 'Consent process 45 CFR §46.116 and 21 CFR §50.20',
            isCheckbox: false,
            isRadio: false,
            isChecked: false,
            children: [
                {
                    id: '2.1',
                    name: 'The consent process will be legally effective',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '2.2',
                    name: 'Circumstances provide the prospective subject or LAR sufficient opportunity to consider whether to participate',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '2.3',
                    name: 'Circumstances minimize the possibility of coercion or undue influence',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '2.4',
                    name: 'The information will be provided in language understandable to the subject or LAR',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '2.5',
                    name: 'There is no exculpatory language (see Footnote 6)',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '2.6',
                    name: 'The required and appropriate additional elements of consent in Section 4 will be disclosed',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
            ]
        },
        {
            id: '3',
            name: 'Consent documentation 45 CFR §46.117, 21 CFR §50.27, and ICH-GCP 4.8.8',
            isCheckbox: false,
            isRadio: false,
            isChecked: false,
            children: [
                {
                    id: '3.1',
                    name: 'The document is accurate and complete',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.2',
                    name: 'The document embodies the required and appropriate additional elements of consent in Section 4',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.3',
                    name: 'The document will be signed and dated by the subject or LAR',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.4',
                    name: 'The document will be signed and dated by the person obtaining consent',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.5',
                    name: 'A signed and dated copy will be given to the person signing the form',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.6',
                    name: 'The investigator will give the subject or LAR adequate opportunity to read it before it is signed and dated',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
                {
                    id: '3.7',
                    name: 'For clinical research: If the subject cannot read, an <Impartial Witness> will witness the consent process and sign and date the form',
                    isCheckbox: true,
                    isRadio: false,
                    isChecked: false,
                    children: []
                },
            ]
        }
    ]);

    const toggleChecked = (items, id, isRadio = false) => {
        return items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isChecked: !item.isChecked
                };
            } else {
                if (isRadio) {
                    return {
                        ...item,
                        isChecked: false
                    };
                }
            }

            if (item.children && item.children.length > 0) {
                return {
                    ...item,
                    children: toggleChecked(item.children, id, item.isRadio)
                };
            }

            return item;
        });
    };

    const handleChange2 = (id) => {
        setItems(prevSelectedItems => {
            const updatedItems = toggleChecked(prevSelectedItems, id);
            return updatedItems;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var localItems = items.map(item => ({
            ...item,
            children: item.children.map(child => ({
                ...child,
                children: child.children.map(grandchild => ({ ...grandchild }))
            }))
        }));
        for (let index = 0; index < localItems.length; index++) {
            var element = localItems[index];
            for (let firstIndex = 0; firstIndex < element.children.length; firstIndex++) {
                var firstElement = element.children[firstIndex];
                if (firstElement.children.length > 0 && firstElement.isRadio == false) {
                    for (let secondIndex = 0; secondIndex < firstElement.children.length; secondIndex++) {
                        var secondElement = firstElement.children[secondIndex];
                        if (secondElement.isChecked == true) {
                        } else {
                            firstElement.children.splice(secondIndex, 1);
                            secondIndex--;
                        }
                    }
                }
                if (firstElement.children.length == 0) {
                    if (firstElement.isChecked == true) {
                    } else {
                        element.children.splice(firstIndex, 1);
                        firstIndex--;
                    }
                }
                if (firstElement.isRadio == true) {
                    var found = firstElement.children.find(e => e.isChecked == true);
                    if (found) {
                        firstElement.name = found?.name;
                        firstElement.isChecked = true;
                        firstElement.children = [];
                    } else {
                        element.children.splice(firstIndex, 1);
                        firstIndex--;
                    }
                }
            }
        }
        console.log(localItems)
        var fileName = 'test'
        const response = await fetch('https://api.gardencity-jo.com/garden_city_api/GenerateTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: localItems
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
                                        {items.map(item => (
                                            <div key={item.id}>
                                                <p className='font-semibold'>{item.id}. {item.name}</p>
                                                {item.children.map(e => (<div key={e.id}>
                                                    {e.isCheckbox ? <FormControlLabel
                                                        label={e.id + ' ' + e.name}
                                                        control={
                                                            <Checkbox
                                                                onChange={() => handleChange2(e.id)}
                                                            />
                                                        }
                                                    /> : <p className='p-2'>{e.id} {e.name}</p>}
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                                        {e.isRadio && <RadioGroup onChange={(event) => handleChange2(event.target.value)}>
                                                            {e.children.map(c => (<FormControlLabel
                                                                key={c.id}
                                                                label={c.name}
                                                                value={c.id}
                                                                control={<Radio />}
                                                            />))}
                                                        </RadioGroup>}
                                                        {e.isCheckbox && e.children.map(c => (<FormControlLabel
                                                            key={c.id}
                                                            label={c.name}
                                                            control={<Checkbox onChange={() => handleChange2(c.id)} />}
                                                        />))}
                                                    </Box>
                                                </div>))}
                                            </div>
                                        ))}
                                    </div>
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
