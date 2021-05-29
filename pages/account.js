import React from 'react'
import Router from 'next/router'
import { Container } from 'react-bootstrap'
import { FaList } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link';
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import { signOut, useSession } from 'next-auth/client'
export default function Account() {
    const [session, loading] = useSession()
    const handleLogout = () => {
        signOut(()=>{
            Router.push('/')
        })
    }
    return <>
        <NavComponent />
        {
            !loading && session &&
            <Container className="divide-y-2 divide">
                <div className="flex py-3">
                    <div><img src={session.user.image} alt={session.user.name} width={50} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
                    <div className="ml-2">
                        <div>Hallo,</div>
                        <div className="text-lg font-bold">{session.user.name}</div>
                    </div>
                </div>
                <Link href="iklansaya">
                    <div className="py-3 cursor-pointer">
                        <FaList className="inline mb-1 mr-1" /> Iklan Saya
                </div>
                </Link>
                <div className="py-3 cursor-pointer" onClick={handleLogout}>
                    <FiLogOut className="inline mb-1 mr-1" /> Logout
                </div>
            </Container>
        }
        <div className="xs:block sm:hidden md:hidden lg:hidden">
            <NavMobile />
        </div>
    </>
}