import React from 'react'
import Link from 'next/link'
export default function Footer() {
    return <div className="text-center py-3">
        <div className="text-sm text-indigo-700">
            <Link href="about">Tentang Kami</Link> &middot; <Link href="contact">Kontak</Link> &middot; <Link href="policy">Kebijakan Privasi</Link>
        </div>
        <small className="text-gray-500">&copy; {new Date().getFullYear()} Tantekos, All rights reserved.</small>
    </div>
}