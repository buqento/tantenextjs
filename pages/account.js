import React from 'react'
import { FaList } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import Link from 'next/link';
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import { signOut, useSession } from 'next-auth/client'
import Header from '../components/Header'
export default function Account() {
    const [session, loading] = useSession()
    const handleLogout = () => signOut({ callbackUrl: '/' })
    const seo = {
        title: 'My Account',
        description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
        url: 'account'
    }
    return <>
        <NavComponent />
        <Header seo={seo} />
        {
            !loading && session &&
            <div className="mx-3 divide-y-2 divide">
                <div className="flex py-3">
                    <div><img src={session.user.image} alt={session.user.name} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
                    <div className="ml-2">
                        <div>Hallo,</div>
                        <div className="text-lg font-bold">{session.user.name}</div>
                    </div>
                </div>
                <Link href="/iklansaya">
                    <div className="py-3 cursor-pointer">
                        <FaList className="inline mb-1 mr-1" /> My Ads
                </div>
                </Link>
                {
                    session.user.email === 'buqento@gmail.com' &&
                    <Link href="/addnew">
                        <div className="py-3 cursor-pointer"><MdAdd className="inline mb-1 mr-1" /> Create New Ads</div>
                    </Link>
                }
                <div className="py-3 cursor-pointer" onClick={handleLogout}>
                    <FiLogOut className="inline mb-1 mr-1" /> Logout
                </div>
            </div>
        }
        <NavMobile />
    </>
}