import React from 'react'

export default function Footer() {
    return <div className="footer-detail">
        <p className="text-center pt-3">
            <small>&copy; {new Date().getFullYear()} Tantekos, All rights reserved.</small>
        </p>
    </div>
}