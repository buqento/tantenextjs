import React, { useState } from 'react'
import fire from '../configurations/firebase'
import Generateslug from '../utils/Generateslug'
import { DtArea } from '../utils/modals/Area'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { City } from '../utils/modals/City'

const Addnew = () => {
    const strToArray = (str) => { return str.trim().split(", ") }
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [durations, setDurations] = useState("")
    const [keywords, setKeywords] = useState("")
    const [images, setImages] = useState("")
    const [province, setProvince] = useState("Bali")
    const [city, setCity] = useState("Denpasar")
    const [district, setDistrict] = useState("Denpasar Utara")
    const [near, setNear] = useState("")
    const [lat_lng, setLatlng] = useState("")
    const [category, setCategory] = useState("Kost")
    const [type, setType] = useState("Campur")
    const [contact_phone, setContactPhone] = useState("")
    const [contact_whatsapp, setContactWhatsapp] = useState("")
    const [contact_fb, setContactFb] = useState("")
    const [facilities_room, setFacilitiesRoom] = useState("")
    const [facilities_bathroom, setFacilitiesBathroom] = useState("")
    const [facilities_share, setFacilitiesShare] = useState("")
    const [facilities_building, setFacilitiesBuilding] = useState("")
    const [start_from, setStartFrom] = useState("")
    const [duration, setDuration] = useState("Bulan")
    const [post_url, setPostUrl] = useState("")
    const [allImages, setAllimages] = useState("")
    const [arrayImages, setArrayImages] = useState("")

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

        // console.log(allImages);
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
                    console.log('data => ', data);
                    images.push(data.data.id + '.webp')
                    if (index + 1 === allImages.length) {
                        setArrayImages(images)
                        console.log('setArrayImages => ', images);
                        handleSubmit()
                    }
                })
        }
    }

    const handleSubmit = (e) => {
        console.log('arrayImages => ',arrayImages);
        console.log('images => ', images);
        console.log('strToArrayimages => ', strToArray(images));
        // let found = false
        // const docRef = fire
        //     .firestore().collection('kosts')
        //     .where('slug', '==', Generateslug(title))
        // docRef.onSnapshot(snap => {
        //     const data = snap.docs.map(doc => ({
        //         id: doc.id, ...doc.data()
        //     }))
        //     data.length > 0 && (found = true)
        // })
        // docRef.get()
        //     .then(() => {
        //         if (!found) {
        //             fire.firestore().collection("kosts")
        //                 .add({
        //                     date_modified: Date.now(),
        //                     date_published: Date.now(),
        //                     slug: Generateslug(title),
        //                     name: name,
        //                     title: title,
        //                     description: description,
        //                     durations: strToArray(durations),
        //                     keywords: keywords,
        //                     images: arrayImages,
        //                     location: {
        //                         province: province,
        //                         city: city,
        //                         district: district,
        //                         near: strToArray(near),
        //                         lat_lng: new fire.firestore.GeoPoint(Number(strToArray(lat_lng)[0]), Number(strToArray(lat_lng)[1]))
        //                     },
        //                     category: category,
        //                     type: strToArray(type),
        //                     contact_us: {
        //                         facebook_url: contact_fb,
        //                         phone: contact_phone,
        //                         whatsapp: contact_whatsapp
        //                     },
        //                     facility: {
        //                         room: strToArray(facilities_room),
        //                         bathroom: strToArray(facilities_bathroom),
        //                         share: strToArray(facilities_share),
        //                         building: strToArray(facilities_building)
        //                     },
        //                     price: {
        //                         start_from: parseInt(start_from),
        //                         duration: duration
        //                     },
        //                     post_url: post_url,
        //                     is_active: true,
        //                     hit: 1
        //                 })
        //                 .then(() => { alert('Data saved') })
        //                 .catch((error) => { alert(error.message) })

        //             setName("")
        //             setTitle("")
        //             setDescription("")
        //             setDurations("")
        //             setKeywords("")
        //             setImages("")
        //             setProvince("")
        //             setCity("")
        //             setDistrict("")
        //             setNear("")
        //             setLatlng("")
        //             setCategory("")
        //             setType("")
        //             setContactPhone("")
        //             setContactWhatsapp("")
        //             setContactFb("")
        //             setFacilitiesRoom("")
        //             setFacilitiesBathroom("")
        //             setFacilitiesShare("")
        //             setFacilitiesBuilding("")
        //             setStartFrom("")
        //             setDuration("")
        //             setPostUrl("")
        //         } else {
        //             alert('Judul tidak valid!')
        //         }
        //     })
        //     .catch(err => console.log(err))
    }
    return (
        <form className="bg-white px-8 py-8" onSubmit={onFileUpload}>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Images</label>
                <input type="file" multiple onChange={onFileChange} accept="image/*" />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">name</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text" placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">title</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="title" type="text" placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">description</label>
                <textarea className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" rows={5} placeholder="description" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keywords">keywords</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="keywords" type="text" placeholder="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">images</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="images" type="text" placeholder="images"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">province</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">city</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">district</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="near">near</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="near" type="text" placeholder="near"
                    value={near}
                    onChange={(e) => setNear(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="lat_lng">lat_lng:</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="lat_lng" type="text" placeholder="lat_lng"
                    value={lat_lng}
                    onChange={(e) => setLatlng(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">category</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option>Kost</option>
                    <option>Kontrakan</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="durations">durations</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="durations" type="text" placeholder="durations"
                    value={durations}
                    onChange={(e) => setDurations(e.target.value)}
                />
            </div>
            {
                category === "Kost" &&
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2" htmlFor="type">type: <span className="font-bold">Campur, Putra, Putri</span></label>
                    <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="type" type="text" placeholder="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
            }
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_fb">contact_fb</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_fb" type="text" placeholder="facebook"
                    value={contact_fb}
                    onChange={(e) => setContactFb(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">contact_phone</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_phone" type="text" placeholder="phone"
                    value={contact_phone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_whatsapp">contact_whatsapp</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_whatsapp" type="text" placeholder="whatsapp"
                    value={contact_whatsapp}
                    onChange={(e) => setContactWhatsapp(e.target.value)}
                />
            </div>
            {
                category === "Kost" ?
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="facilities_room">facility room: <span className="font-bold">Kamar Mandi Dalam, AC, Wifi, Springbed, Kasur, Lemari Pakaian, Meja, Kursi, Exhaust Fan, Kipas Angin, TV, Shower, Kloset Duduk, Kloset Jongkok, Parkir Mobil, Parkir Motor, R.Jemur, R.Cuci, R.Tamu, Kamar Mandi Luar, Dapur</span></label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="facilities_room" type="text" placeholder="facilities_room"
                                value={facilities_room}
                                onChange={(e) => setFacilitiesRoom(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="facilities_bathroom">facility bathroom: <span className="font-bold">Shower, Kloset Jongkok, Kloset Duduk</span></label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="facilities_bathroom" type="text" placeholder="facilities_bathroom"
                                value={facilities_bathroom}
                                onChange={(e) => setFacilitiesBathroom(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="facilities_share">facility share: <span className="font-bold">R. Jemur, R. Cuci, R. Tamu, Dapur, Parkir Mobil, Parkir Motor, Kamar Mandi Luar</span></label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="facilities_share" type="text" placeholder="facilities_share"
                                value={facilities_share}
                                onChange={(e) => setFacilitiesShare(e.target.value)}
                            />
                        </div>
                    </>
                    :
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="facilities_building">facility building: <span className="font-bold">Kamar Tidur, Kamar Mandi, Ruang Tamu, Garasi</span></label>
                        <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="facilities_building" type="text" placeholder="facilities_building"
                            value={facilities_building}
                            onChange={(e) => setFacilitiesBuilding(e.target.value)}
                        />
                    </div>
            }
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_from">start_from</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="start_from" type="text" placeholder="start_from"
                    value={start_from}
                    onChange={(e) => setStartFrom(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">duration</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}>
                    <option>Hari</option>
                    <option>Minggu</option>
                    <option>Bulan</option>
                    <option>Tahun</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_url">post_url</label>
                <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="post_url" type="text" placeholder="post_url"
                    value={post_url}
                    onChange={(e) => setPostUrl(e.target.value)}
                />
            </div>
            <button className="bg-blue-700 hover:bg-blue-600 focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Publish</button>
        </form>
    )
}
export default Addnew