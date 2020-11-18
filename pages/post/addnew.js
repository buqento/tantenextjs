import React, { useState } from 'react'
import fire from '../../config/fire-config';

const Addnew = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [keywords, setKeywords] = useState("")
    const [images, setImages] = useState("2cN7A42.webpm")
    const [province, setProvince] = useState("Bali")
    const [district, setDistrict] = useState("Denpasar Utara")
    const [category, setCategory] = useState("Kost")
    const [contact_us, setContactUs] = useState("")
    const [facilities, setFacilities] = useState("")
    const [start_price, setStartPrice] = useState("")
    const [post_url, setPostUrl] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        fire.firestore().collection("kosts")
            .add({
                // id: 72,	
                date_modified: Date.now(),
                date_published: Date.now(),
                title: title,
                description: description,
                keywords: keywords,
                images: ['2cN7A42.webpm'],
                location: { province: province, district: district, near: '', latitude: -8.677245, longitude: 115.195614 },
                category: category,
                contact_us: { facebook_url: '', phone: contact_us },
                facilities: [facilities],
                start_price: start_price,
                post_url: post_url,
                is_active: false
            })
            .then(() => { alert('contact saved') })
            .catch((error) => { alert(error.message) })

        setTitle("")
        setDescription("")
        setKeywords("")
        setImages("")
        setProvince("")
        setDistrict("")
        setCategory("")
        setContactUs("")
        setFacilities("")
        setStartPrice("")
        setPostUrl("")
    }
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Province</label>
                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}>
                    <option>Bali</option>
                    <option>Papua</option>
                    <option>Maluku</option>
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
                    <option>Kuta Selatan</option>
                    <option>Kuta Utara</option>
                    <option>Kuta</option>
                </select>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_us">contact_us</label>
                <input className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_us" type="text" placeholder="contact_us"
                    value={contact_us}
                    onChange={(e) => setContactUs(e.target.value)}
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





