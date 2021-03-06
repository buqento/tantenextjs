import React from 'react'
import Link from 'next/link'
export default function Footer() {
    return <div className="h-20">
        <div className="xs:hidden text-center py-3 border-top">
            <div className="text-sm text-indigo-700">
                <Link href="/">Home</Link> &middot; <Link href="/about">About Us</Link> &middot; <Link href="/contact">Contact</Link> &middot; <Link href="/policy">Privacy Policy</Link>
            </div>
            <small className="text-gray-700">&copy; 2019-{new Date().getFullYear()} Tantekos. All Rights Reserved.</small>
        </div>
    </div>
}