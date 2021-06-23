import React from 'react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
export default function Ads() {
    return <Link href="post">
        <div className="text-center text-white py-4 px-3 border bg-indigo-700 cursor-pointer">
            <p>Did You want to see your rooms at Tantekos?</p>
            <p>Create Your ad for free now.</p>
            <div className="rounded-full align-middle rouded border text-center text-white font-bold uppercase mt-2 py-3 mx-3">
                <span>Create Free Ad</span>
            </div>
        </div>
    </Link>
}