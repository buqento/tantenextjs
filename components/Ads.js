import React from 'react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
export default function Ads() {
    return <Link href="post">
        <div className="text-center text-white py-3 px-3 border bg-indigo-700 cursor-pointer">
            <p>Want to see your Rooms at Tantekos?</p>
            <p>Create Your ads for free now.</p>
            <div className="rounded-full align-middle rouded border text-center text-white font-bold uppercase mt-2 py-3 mx-3">
                <span>Create Free Ads</span>
            </div>
        </div>
    </Link>
}