import React, { useState } from 'react'
import fire from '../../config/fire-config';
import Generateslug from '../../utils/Generateslug'

const Addnew = () => {
    const strToArray = (str) => {return str.trim().split(", ")}
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [keywords, setKeywords] = useState("")
    const [images, setImages] = useState("")
    const [province, setProvince] = useState("Bali")
    const [district, setDistrict] = useState("Denpasar Utara")
    const [near, setNear] = useState("")
    const [lat_lng, setLatlng] = useState("")
    const [category, setCategory] = useState("Kost")
    const [contact_phone, setContactPhone] = useState("")
    const [contact_fb, setContactFb] = useState("")
    const [facilities, setFacilities] = useState("")
    const [start_price, setStartPrice] = useState("")
    const [post_url, setPostUrl] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        fire.firestore().collection("kosts")
            .add({
                date_modified: Date.now(),
                date_published: Date.now(),
                slug: Generateslug(title),
                title: title,
                description: description,
                keywords: keywords,
                images: strToArray(images),
                location: { province: province, district: district, near: near, lat_lng: new fire.firestore.GeoPoint(Number(strToArray(lat_lng)[0]), Number(strToArray(lat_lng)[1])) },
                category: category,
                contact_us: { facebook_url: contact_fb, phone: contact_phone },
                facilities: strToArray(facilities),
                start_price: start_price,
                post_url: post_url,
                is_active: false
            })
            .then(() => { alert('Data saved') })
            .catch((error) => { alert(error.message) })

        setTitle("")
        setDescription("")
        setKeywords("")
        setImages("")
        setProvince("")
        setDistrict("")
        setNear("")
        setLatlng("")
        setCategory("")
        setContactPhone("")
        setContactFb("")
        setFacilities("")
        setStartPrice("")
        setPostUrl("")
    }
    return (
        <form className="bg-white px-8 py-8" onSubmit={handleSubmit}>

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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">province</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}>
                    <option>Bali</option>
                    <option>Papua</option>
                    <option>Papua Barat</option>
                    <option>Maluku</option>
                    <option>Jawa Barat</option>
                    <option>Jakarta Pusat</option>
                    <option>Jakarta Selatan</option>
                    <option>Jakarta Timur</option>
                    <option>Jakarta Utara</option>
                    <option>Yogyakarta</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">district</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}>
                    <option>Denpasar Utara</option>
                    <option>Denpasar Selatan</option>
                    <option>Denpasar Barat</option>
                    <option>Denpasar Timur</option>
                    <option>Kuta Selatan</option>
                    <option>Kuta Utara</option>
                    <option>Kuta</option>

                    <option>Kebayoran Baru</option>
                    <option>Pesanggrahan</option>
                    <option>Cakung</option>
                    <option>Jatinegara</option>
                    <option>Duren Sawit</option>
                    <option>Menteng</option>
                    <option>Cempaka Putih</option>
                    <option>Kemayoran</option>
                    <option>Senen</option>
                    <option>Cilincing</option>

                    <option>Depok</option>
                    <option>Kasihan</option>

                    <option>Leitimur Selatan</option>
                    <option>Teluk Ambon</option>
                    <option>Baguala</option>
                    <option>Sirimau</option>
                    <option>Nusaniwe</option>  

                    <option>Tapos</option>                    
                    <option>Limo</option>    
                    
                    <option>Kemayoran</option>   

                    <option>Jayapura Selatan</option>    
                    <option>Abepura</option>    
                    <option>Koya Barat</option>    
                    <option>Sentani</option>    
                    <option>Kota Jayapura</option>
                    <option>Kota Sorong</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="near">near</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="near" type="text" placeholder="near"
                    value={near}
                    onChange={(e) => setNear(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">title</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="title" type="text" placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">description</label>
                <textarea className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" rows={5} placeholder="description" value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keywords">keywords</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="keywords" type="text" placeholder="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">images</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="images" type="text" placeholder="images"
                    value={images}
                    onChange={(e) => setImages(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lat_lng">lat_lng</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="lat_lng" type="text" placeholder="lat_lng"
                    value={lat_lng}
                    onChange={(e) => setLatlng(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_fb">contact_fb</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_fb" type="text" placeholder="contact_fb"
                    value={contact_fb}
                    onChange={(e) => setContactFb(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">contact_phone</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_phone" type="text" placeholder="contact_phone"
                    value={contact_phone}
                    onChange={(e) => setContactPhone(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facilities">facilities</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="facilities" type="text" placeholder="facilities"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_price">start_price</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="start_price" type="text" placeholder="start_price"
                    value={start_price}
                    onChange={(e) => setStartPrice(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_url">post_url</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="post_url" type="text" placeholder="post_url"
                    value={post_url}
                    onChange={(e) => setPostUrl(e.target.value)}
                />
            </div>
            <button className="bg-blue-700 hover:bg-blue-600 focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Add New</button>
        </form>
    )
}
export default Addnew





