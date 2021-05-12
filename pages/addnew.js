import React, { useState } from 'react'
import fire from '../configurations/firebase'
import Generateslug from '../utils/Generateslug'
import { DtArea } from '../utils/modals/Area'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { City } from '../utils/modals/City'
import withAuth from '../helpers/withAuth';
import { FiSend } from 'react-icons/fi'

const Addnew = () => {
    const strToArray = (str) => { return str.trim().split(", ") }
    const initType = {
        campur: true,
        putra: false,
        putri: false,
        pasutri: false
    }
    const initDurations = {
        hari: false,
        minggu: false,
        bulan: true,
        tahun: false
    }
    const initFacilityRoom = {
        kamarMandiDalam: false,
        wifi: false,
        springbed: false,
        kasur: false,
        lemariPakaian: false,
        meja: false,
        exhaustFan: false,
        kipasAngin: false,
        tv: false,
        ac: false
    }
    const initFacilityBathroom = {
        shower: false,
        klosetJongkok: true,
        klosetDuduk: false
    }
    const initFacilityShare = {
        dapur: false,
        parkirMotor: true,
        parkirMobil: false,
        kamarMandiLuar: false,
        rJemur: false,
        rCuci: false,
        rTamu: false
    }
    const [type, setType] = useState(initType)
    const [durations, setDurations] = useState(initDurations);
    const [facilityRoom, setFacilityRoom] = useState(initFacilityRoom);
    const [facilityBathroom, setFacilityBathroom] = useState(initFacilityBathroom);
    const [facilityShare, setFacilityShare] = useState(initFacilityShare);
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvince] = useState("Bali")
    const [city, setCity] = useState("Denpasar")
    const [district, setDistrict] = useState("Denpasar Utara")
    const [near, setNear] = useState("")
    const [lat_lng, setLatlng] = useState("")
    const [contact_phone, setContactPhone] = useState("")
    const [contact_whatsapp, setContactWhatsapp] = useState("")
    const [contact_fb, setContactFb] = useState("")
    const [start_from, setStartFrom] = useState("")
    const [duration, setDuration] = useState("Bulan")
    const [post_url, setPostUrl] = useState("")
    const [allImages, setAllimages] = useState("")

    const onFileChange = event => {
        let f = event.target.files
        let i = []
        for (let index = 0; index < f.length; index++) {
            let file = f[index]
            i.push(file)
        }
        setAllimages(i)
    }

    const onFileUpload = (e) => {
        e.preventDefault();
        let images = []
        for (let index = 0; index < allImages.length; index++) {
            let file = allImages[index]
            const formdata = new FormData();
            formdata.append("image", file);
            fetch("https://api.imgur.com/3/image", {
                method: "post",
                headers: {
                    Authorization: "Client-ID e6aa071d345d18f"
                },
                body: formdata
            })
                .then(data => data.json())
                .then(data => {
                    images.push(data.data.id + '.webp')
                    if (index + 1 === allImages.length) {
                        handleSubmit(images)
                    }
                })
        }
    }

    const handleSubmit = (images) => {

        let arrType = []
        for (const property in type) { type[property] && arrType.push(property) }

        let arrDurations = []
        for (const property in durations) { durations[property] && arrDurations.push(property) }

        let arrFacilityRoom = []
        for (const property in facilityRoom) { facilityRoom[property] && arrFacilityRoom.push(property) }

        let arrFacilityBathroom = []
        for (const property in facilityBathroom) { facilityBathroom[property] && arrFacilityBathroom.push(property) }

        let arrFacilityShare = []
        for (const property in facilityShare) { facilityShare[property] && arrFacilityShare.push(property) }

        const campur = type.campur ? 'Kost campur, ' : ''
        const putra = type.putra ? 'Kost putra, ' : ''
        const putri = type.putri ? 'Kost putri, ' : ''
        const pasutri = type.pasutri ? 'Kost pasutri, ' : ''
        const hari = type.hari ? 'Kost harian, ' : ''
        const minggu = type.putra ? 'Kost mingguan, ' : ''
        const bulan = type.putri ? 'Kost bulanan, ' : ''
        const tahun = type.pasutri ? 'Kost tahunan, ' : ''
        const keywords = 'Kost Murah, ' + campur + putra + putri + pasutri + hari + minggu + bulan + tahun + 'Kost ' + province + ', Kost ' + city + ', Kost ' + district + ', ' + name

        let found = false
        const docRef = fire
            .firestore().collection('kosts')
            .where('slug', '==', Generateslug(title))
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            data.length > 0 && (found = true)
        })
        docRef.get()
            .then(() => {
                if (!found) {
                    fire.firestore().collection("kosts")
                        .add({
                            date_modified: Date.now(),
                            date_published: Date.now(),
                            slug: Generateslug(title),
                            name: name,
                            title: title,
                            description: description,
                            durations: arrDurations,
                            keywords: keywords,
                            images: images,
                            location: {
                                province: province,
                                city: city,
                                district: district,
                                near: strToArray(near),
                                lat_lng: new fire.firestore.GeoPoint(Number(strToArray(lat_lng)[0]), Number(strToArray(lat_lng)[1]))
                            },
                            category: "Kost",
                            type: arrType,
                            contact_us: {
                                facebook_url: contact_fb,
                                phone: contact_phone,
                                whatsapp: contact_whatsapp
                            },
                            facility: {
                                room: arrFacilityRoom,
                                bathroom: arrFacilityBathroom,
                                share: arrFacilityShare
                            },
                            price: {
                                start_from: parseInt(start_from),
                                duration: duration
                            },
                            post_url: post_url,
                            is_active: true,
                            hit: 1
                        })
                        .then(() => { alert('Data saved') })
                        .catch((error) => { alert(error.message) })

                    setName("")
                    setTitle("")
                    setDescription("")
                    setProvince("")
                    setCity("")
                    setDistrict("")
                    setNear("")
                    setLatlng("")
                    setContactPhone("")
                    setContactWhatsapp("")
                    setContactFb("")
                    setStartFrom("")
                    setDuration("")
                    setPostUrl("")
                } else {
                    alert('Judul tidak valid!')
                }
            })
            .catch(err => console.log(err))
    }

    const toggleType = (types) => {
        switch (types) {
            case 'campur':
                setType((prevState) => ({ ...prevState, campur: !type.campur }));
                break;
            case 'putra':
                setType((prevState) => ({ ...prevState, putra: !type.putra }));
                break;
            case 'putri':
                setType((prevState) => ({ ...prevState, putri: !type.putri }));
                break;
            default:
                setType((prevState) => ({ ...prevState, pasutri: !type.pasutri }));
                break;
        }
    }

    const toggleDurations = (duration) => {
        switch (duration) {
            case 'hari':
                setDurations((prevState) => ({ ...prevState, hari: !durations.hari }));
                break;
            case 'minggu':
                setDurations((prevState) => ({ ...prevState, minggu: !durations.minggu }));
                break;
            case 'bulan':
                setDurations((prevState) => ({ ...prevState, bulan: !durations.bulan }));
                break;
            default:
                setDurations((prevState) => ({ ...prevState, tahun: !durations.tahun }));
                break;
        }
    }

    const toggleFacilityRoom = (facility) => {
        switch (facility) {
            case 'kamarMandiDalam':
                setFacilityRoom((prevState) => ({ ...prevState, kamarMandiDalam: !facilityRoom.kamarMandiDalam }));
                break;
            case 'wifi':
                setFacilityRoom((prevState) => ({ ...prevState, wifi: !facilityRoom.wifi }));
                break;
            case 'springbed':
                setFacilityRoom((prevState) => ({ ...prevState, springbed: !facilityRoom.springbed }));
                break;
            case 'kasur':
                setFacilityRoom((prevState) => ({ ...prevState, kasur: !facilityRoom.kasur }));
                break;
            case 'lemariPakaian':
                setFacilityRoom((prevState) => ({ ...prevState, lemariPakaian: !facilityRoom.lemariPakaian }));
                break;
            case 'meja':
                setFacilityRoom((prevState) => ({ ...prevState, meja: !facilityRoom.meja }));
                break;
            case 'exhaustFan':
                setFacilityRoom((prevState) => ({ ...prevState, exhaustFan: !facilityRoom.exhaustFan }));
                break;
            case 'kipasAngin':
                setFacilityRoom((prevState) => ({ ...prevState, kipasAngin: !facilityRoom.kipasAngin }));
                break;
            case 'tv':
                setFacilityRoom((prevState) => ({ ...prevState, tv: !facilityRoom.tv }));
                break;
            default:
                setFacilityRoom((prevState) => ({ ...prevState, ac: !facilityRoom.ac }));
                break;
        }
    }

    const toggleFacilityBathroom = (facility) => {
        switch (facility) {
            case 'shower':
                setFacilityBathroom((prevState) => ({ ...prevState, shower: !facilityBathroom.shower }));
                break;
            case 'klosetJongkok':
                setFacilityBathroom((prevState) => ({ ...prevState, klosetJongkok: !facilityBathroom.klosetJongkok }));
                break;
            default:
                setFacilityBathroom((prevState) => ({ ...prevState, klosetDuduk: !facilityBathroom.klosetDuduk }));
                break;
        }
    }

    const toggleFacilityShare = (facility) => {
        switch (facility) {
            case 'dapur':
                setFacilityShare((prevState) => ({ ...prevState, dapur: !facilityShare.dapur }));
                break;
            case 'parkirMotor':
                setFacilityShare((prevState) => ({ ...prevState, parkirMotor: !facilityShare.parkirMotor }));
                break;
            case 'parkirMobil':
                setFacilityShare((prevState) => ({ ...prevState, parkirMobil: !facilityShare.parkirMobil }));
                break;
            case 'kamarMandiLuar':
                setFacilityShare((prevState) => ({ ...prevState, kamarMandiLuar: !facilityShare.kamarMandiLuar }));
                break;
            case 'rJemur':
                setFacilityShare((prevState) => ({ ...prevState, rJemur: !facilityShare.rJemur }));
                break;
            case 'rCuci':
                setFacilityShare((prevState) => ({ ...prevState, rCuci: !facilityShare.rCuci }));
                break;
            default:
                setFacilityShare((prevState) => ({ ...prevState, rTamu: !facilityShare.rTamu }));
                break;
        }
    }

    return (
        <form className="bg-white px-8 py-8" onSubmit={onFileUpload}>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Kost</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text" placeholder="Seroja Kostel Jambon" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Judul</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="title" type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="small my-1 text-green-500">Contoh: <span className="font-bold">Seroja Kostel Jambon Kost Murah Sewa Harian Mingguan Bulanan Trihanggo Gamping Sleman Daerah Istimewa Yogyakarta</span></div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Deskripsi Kost</label>
                <textarea className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" rows={5} placeholder="Deskripsi Kost" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_from">Harga Sewa / Durasi</label>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="start_from" type="number" placeholder="1500000" value={start_from} onChange={(e) => setStartFrom(e.target.value)} />
                    </div>
                    <div>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}>
                            <option>Hari</option>
                            <option>Minggu</option>
                            <option>Bulan</option>
                            <option>Tahun</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Jenis Sewa</label>
                <div className="capitalize grid grid-cols-2 gap-0">
                    {
                        Object.keys(durations).map((key, index) =>
                            <div key={index}>
                                <div className={`rounded cursor-pointer m-1 p-1 text-center ${durations[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleDurations(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Tipe Kost</label>
                <div className="capitalize grid grid-cols-2 gap-0">
                    {
                        Object.keys(type).map((key, index) =>
                            <div key={index}>
                                <div className={`rounded cursor-pointer m-1 p-1 text-center ${type[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleType(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Foto Kost</label>
                <input type="file" multiple onChange={onFileChange} accept="image/*" />
                <div className="small my-1 text-green-500 font-bold">Pilih beberapa foto sekaligus</div>
            </div>

            <div className="text-3xl font-bold border-b-2 mb-3">Lokasi</div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Provinsi</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}>
                    {
                        DtProvinsi
                            .sort(function (a, b) {
                                var nameA = Generateslug(a.title.toUpperCase());
                                var nameB = Generateslug(b.title.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .map((provinsi, index) => <option key={index}>{provinsi.title}</option>)
                    }
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota/Kabupaten</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                    {
                        City
                            .sort(function (a, b) {
                                var nameA = Generateslug(a.name.toUpperCase());
                                var nameB = Generateslug(b.name.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .filter(city => city.province === province)
                            .map((city, index) => <option key={index}>{city.name}</option>)
                    }
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Kecamatan</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}>
                    {
                        DtArea
                            .sort(function (a, b) {
                                var nameA = Generateslug(a.district.toUpperCase());
                                var nameB = Generateslug(b.district.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .filter(area => area.city === city)
                            .map((area, index) => <option key={index}>{area.district}</option>)
                    }
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="lat_lng">Latitude, Longitude</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="lat_lng" type="text" placeholder="-8.669823629718868, 115.20791945067694" value={lat_lng} onChange={(e) => setLatlng(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="near">Kampus Terdekat</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="near" type="text" placeholder="Universitas Atma Jaya Yogyakarta, Universitas Gadjah Mada" value={near} onChange={(e) => setNear(e.target.value)} />
                <div className="small my-1 text-green-500 font-bold">Tiap kampus dipisahkan oleh tanda koma ( , )</div>
            </div>

            <div className="text-3xl font-bold border-b-2 mb-3">Kontak</div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Nomor Handphone</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_phone" type="text" placeholder="+6285243322123" value={contact_phone} onChange={(e) => setContactPhone(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_whatsapp">Nomor Whatsapp</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_whatsapp" type="text" placeholder="6285243322123" value={contact_whatsapp} onChange={(e) => setContactWhatsapp(e.target.value)} />
            </div>

            <div className="text-3xl font-bold border-b-2 mb-3">Fasilitas</div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Kamar</label>
                <div className="capitalize grid grid-cols-3 gap-0">
                    {
                        Object.keys(facilityRoom).map((key, index) =>
                            <div key={index}>
                                <div className={`rounded cursor-pointer m-1 p-1 text-center ${facilityRoom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityRoom(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Kamar Mandi</label>
                <div className="capitalize grid grid-cols-3 gap-0">
                    {
                        Object.keys(facilityBathroom).map((key, index) =>
                            <div key={index}>
                                <div className={`rounded cursor-pointer m-1 p-1 text-center ${facilityBathroom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityBathroom(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Bersama</label>
                <div className="capitalize grid grid-cols-3 gap-0">
                    {
                        Object.keys(facilityShare).map((key, index) =>
                            <div key={index}>
                                <div className={`rounded cursor-pointer m-1 p-1 text-center ${facilityShare[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityShare(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="text-3xl font-bold border-b-2 mb-3">Facebook</div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_fb">Profil Facebook</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_fb" type="text" placeholder="Profil Facebook" value={contact_fb} onChange={(e) => setContactFb(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_url">Link Facebook</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="Link Facebook" type="text" placeholder="Link Facebook" value={post_url} onChange={(e) => setPostUrl(e.target.value)} />
            </div>

            <button className="bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white text-xl font-bold py-2 px-4 rounded w-100" type="submit"><FiSend className="inline mb-1" /> Publish</button>

        </form>
    )
}
export default withAuth(Addnew);