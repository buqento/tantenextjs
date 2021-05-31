import React from 'react'
import Link from 'next/link'
export default function Footer() {
    return <div className="text-center py-3 border-top">
        <div className="text-sm text-indigo-700">
            <Link href="/">Beranda</Link> &middot; <Link href="/about">Tentang Kami</Link> &middot; <Link href="/contact">Kontak</Link> &middot; <Link href="/policy">Kebijakan Privasi</Link>
        </div>
        <small className="text-gray-700">&copy; 2019-{new Date().getFullYear()} Tantekos. All Rights Reserved.</small>
    </div>
}