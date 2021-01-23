import React from 'react';
import Message from '../components/Message';
export default function Custom404() {
    return <div class="flex h-screen">
        <div class="m-auto">
            <Message title="Kesalahan 404" message="Halaman Tidak Ditemukan" url="/" urlTitle="Kembali ke Beranda" />
        </div>
    </div>
}