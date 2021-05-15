import React, { useState } from 'react'
import fire from '../configurations/firebase'
import Generateslug from '../utils/Generateslug'
import { DtArea } from '../utils/modals/Area'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { City } from '../utils/modals/City'
import withAuth from '../helpers/withAuth';
import { FiSend } from 'react-icons/fi'
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa';

function Post({ userdata }) {

    const user = {
        uid: userdata.uid,
        display_name: userdata.displayName,
        email: userdata.email,
        photo_url: userdata.photoURL
    }
    const initType = {
        Campur: true,
        Putra: false,
        Putri: false,
        Pasutri: false
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
        kursi: false,
        exhaustFan: false,
        kipasAngin: false,
        tv: false,
        ac: false,
        dapur: false
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
    const listFacility = [
        { name: 'kamarMandiDalam', title: 'Kamar Mandi Dalam' },
        { name: 'wifi', title: 'Wifi' },
        { name: 'springbed', title: 'Springbed' },
        { name: 'kasur', title: 'Kasur' },
        { name: 'lemariPakaian', title: 'Lemari Pakaian' },
        { name: 'meja', title: 'Meja' },
        { name: 'kursi', title: 'Kursi' },
        { name: 'exhaustFan', title: 'Exhaust Fan' },
        { name: 'kipasAngin', title: 'Kipas Angin' },
        { name: 'tv', title: 'TV' },
        { name: 'ac', title: 'AC' },
        { name: 'shower', title: 'Shower' },
        { name: 'klosetJongkok', title: 'Kloset Jongkok' },
        { name: 'klosetDuduk', title: 'Kloset Duduk' },
        { name: 'dapur', title: 'Dapur' },
        { name: 'parkirMotor', title: 'Parkir Motor' },
        { name: 'parkirMobil', title: 'Parkir Mobil' },
        { name: 'kamarMandiLuar', title: 'Kamar Mandi Luar' },
        { name: 'rJemur', title: 'R.Jemur' },
        { name: 'rCuci', title: 'R.Cuci' },
        { name: 'rTamu', title: 'R.Tamu' }
    ]
    const facilityTitle = (key) => listFacility.filter(facility => facility.name === key)
    const strToArray = (str) => { return str.trim().split(", ") }

    // map
    const accessToken = "pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
    const lat = parseFloat(-6.175428880001885)
    const long = parseFloat(106.82717876549592)
    const height = 200
    const zoom = 10
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: height,
        zoom: zoom
    })
    viewport.width = "100%"
    viewport.height = height
    // end map

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
        for (const property in facilityRoom) { facilityRoom[property] && arrFacilityRoom.push(facilityTitle(property)[0].title) }

        let arrFacilityBathroom = []
        for (const property in facilityBathroom) { facilityBathroom[property] && arrFacilityBathroom.push(facilityTitle(property)[0].title) }

        let arrFacilityShare = []
        for (const property in facilityShare) { facilityShare[property] && arrFacilityShare.push(facilityTitle(property)[0].title) }

        const campur = type.campur ? 'Kost campur, ' : ''
        const putra = type.putra ? 'Kost putra, ' : ''
        const putri = type.putri ? 'Kost putri, ' : ''
        const pasutri = type.pasutri ? 'Kost pasutri, ' : ''
        const hari = type.hari ? 'Kost harian, ' : ''
        const minggu = type.minggu ? 'Kost mingguan, ' : ''
        const bulan = type.bulan ? 'Kost bulanan, ' : ''
        const tahun = type.tahun ? 'Kost tahunan, ' : ''
        const keywords = 'Kost murah, ' + campur + putra + putri + pasutri + hari + minggu + bulan + tahun + 'Kost ' + province + ', Kost ' + city + ', Kost ' + district + ', ' + name

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
                                lat_lng: new fire.firestore.GeoPoint(viewport.latitude, viewport.longitude)
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
                            user: user,
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
            case 'Campur':
                setType((prevState) => ({ ...prevState, Campur: !type.Campur }));
                break;
            case 'Putra':
                setType((prevState) => ({ ...prevState, Putra: !type.Putra }));
                break;
            case 'Putri':
                setType((prevState) => ({ ...prevState, Putri: !type.Putri }));
                break;
            default:
                setType((prevState) => ({ ...prevState, Pasutri: !type.Pasutri }));
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
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text" placeholder="Nama Kost" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="small my-1 text-current">Contoh: <span className="font-bold text-green-500">Kost Exclusive Graha Chempaka</span></div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Judul</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="title" type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
                <div className="small my-1 text-current">Contoh: <span className="font-bold text-green-500">Kost Exclusive Graha Chempaka Badung Renon Denpasar Selatan Denpasar Bali</span></div>
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
                                <div className={`clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${durations[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleDurations(key)}>{key}</div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Tipe Kost</label>
                <div className="grid grid-cols-2 gap-0">
                    {
                        Object.keys(type).map((key, index) =>
                            <div key={index}>
                                <div className={`clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${type[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleType(key)}>{key}</div>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Peta Lokasi</label>
                <ReactMapGl
                    {...viewport}
                    mapboxApiAccessToken="pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
                    onViewportChange={viewport => { setViewport(viewport) }}
                    mapStyle="mapbox://styles/buqento/ckg4bb6cc2hrr19k84gzrs97j"
                >
                    <div className="ml-2 mt-2" style={{ width: '29px' }}>
                        <FullscreenControl label="Perbesar Peta" />
                    </div>
                    <div className="ml-2 mt-2" style={{ width: '29px' }}>
                        <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                            label="Lokasi Anda"
                        />
                    </div>
                    <Marker
                        latitude={viewport.latitude}
                        longitude={viewport.longitude}
                        offsetLeft={-18}
                        offsetTop={-25}
                    >
                        <FaMapMarkerAlt size={30} className="text-danger" />
                    </Marker>
                </ReactMapGl>
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
                                <div className={`clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${facilityRoom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityRoom(key)}>{facilityTitle(key)[0].title}</div>
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
                                <div className={`clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${facilityBathroom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityBathroom(key)}>{facilityTitle(key)[0].title}</div>
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
                                <div className={`clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${facilityShare[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityShare(key)}>{facilityTitle(key)[0].title}</div>
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
export default withAuth(Post);