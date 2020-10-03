import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return <div className="footer text-center pt-3">
        <div className="mb-1">
            <a href="https://www.facebook.com/groups/tantekos" target="blank" className="mr-3"><FaFacebookF size={20} /></a><a href="#" className="mr-3"><FaTwitter size={20} /></a><a href="https://www.instagram.com/tantekos_official" target="blank"><FaInstagram size={20} /></a>
        </div>
        <small>&copy; {new Date().getFullYear()} Tantekos, All rights reserved.</small>
    </div>
}