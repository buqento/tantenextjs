import React from 'react'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
export default function Ads() {
    return <Link href="post">
        <div className="text-center text-white my-3 py-3 px-3 border bg-indigo-700 cursor-pointer">
            <p>Ingin melihat kost Kamu di tantekos?</p>
            <p>Naikan profit Kamu sekarang dengan memasang iklan. Ayo mulai beriklan gratis di tantekos.</p>
            <div className="rounded-full align-middle rouded border text-center text-white font-bold uppercase mt-2 py-3 mx-3">
                <span><MdAdd className="inline mb-1 mr-1" />Pasang iklan Gratis</span>
            </div>
        </div>
    </Link>
}