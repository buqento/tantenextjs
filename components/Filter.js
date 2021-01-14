import React from 'react'
import Generateslug from '../utils/Generateslug'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { City } from '../utils/modals/City'
import { DtArea } from '../utils/modals/Area'
import Cash from '../utils/Cash'
import InputRange from 'react-input-range'
import { Form } from 'react-bootstrap'
class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            duration: 'Bulan',
            province: 'Daerah Istimewa Yogyakarta',
            city: '---Semua---',
            district: '---Semua---',
            rangePrice: { min: 50000, max: 10000000 },
            facilities: {
                kamarMandiDalam: true,
                ac: true,
                wifi: true,
                kasur: true,
                lemariPakaian: true,
                meja: true,
                kursi: false,
                exhaustFan: false,
                tv: false,
                kipasAngin: false
            },
            data: [],
            showHideForm: true
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleCancleFilter = this.handleCancleFilter.bind(this)
    }
    handleChange = (event) => {
        const nam = event.target.name
        const val = event.target.value
        this.setState({ [nam]: val })
        nam === 'province' && this.setState({ city: '---Semua---', district: '---Semua---' })
        nam === 'city' && this.setState({ district: '---Semua---' })
    }
    handleCancleFilter() {
        const { showHideForm } = this.state
        this.setState({ showHideForm: !showHideForm })
    }
    handleSearch(event) {
        event.preventDefault()
        const { duration, province, city, district, rangePrice, facilities } = this.state
        let facilitiesRoom = []
        facilities.ac && facilitiesRoom.push("AC")
        facilities.wifi && facilitiesRoom.push("Wifi")
        facilities.kamarMandiDalam && facilitiesRoom.push("Kamar Mandi Dalam")
        facilities.kasur && facilitiesRoom.push("Kasur")
        facilities.lemariPakaian && facilitiesRoom.push("Lemari Pakaian")
        facilities.meja && facilitiesRoom.push("Meja")
        facilities.kursi && facilitiesRoom.push("Kursi")
        facilities.exhaustFan && facilitiesRoom.push("Exhaust Fan")
        facilities.tv && facilitiesRoom.push("TV")
        facilities.kipasAngin && facilitiesRoom.push("Kipas Angin")
        this.props.callbackFromParent({ duration, province, city, district, facilitiesRoom, rangePrice });
    }
    toggleAc = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                ac: !facilities.ac
            }
        }))
    }
    toggleWifi = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                wifi: !facilities.wifi
            }
        }))
    }
    toggleKamarMandiDalam = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kamarMandiDalam: !facilities.kamarMandiDalam
            }
        }))
    }
    toggleKasur = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kasur: !facilities.kasur
            }
        }))
    }
    toggleLemariPakaian = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                lemariPakaian: !facilities.lemariPakaian
            }
        }))
    }
    toggleMeja = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                meja: !facilities.meja
            }
        }))
    }
    toggleKursi = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kursi: !facilities.kursi
            }
        }))
    }
    toggleExhaustFan = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                exhaustFan: !facilities.exhaustFan
            }
        }))
    }
    toggleTv = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                tv: !facilities.tv
            }
        }))
    }
    toggleKipasAngin = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kipasAngin: !facilities.kipasAngin
            }
        }))
    }
    render() {
        const { showHideForm, duration, province, city, district, facilities, rangePrice } = this.state
        return <>
            {
                showHideForm &&
                <form className="bg-white uppercase" onSubmit={this.handleSearch}>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">Tipe</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="duration"
                            value={duration}
                            name="duration"
                            onChange={this.handleChange}>
                            <option value="Hari">Harian</option>
                            <option value="Bulan">Bulanan</option>
                            <option value="Tahun">Tahunan</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Provinsi</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="province"
                            name="province"
                            value={province}
                            onChange={this.handleChange}>
                            {
                                DtProvinsi
                                    .sort(function (a, b) {
                                        var nameA = Generateslug(a.title.toUpperCase());
                                        var nameB = Generateslug(b.title.toUpperCase());
                                        if (nameA < nameB) return -1;
                                        if (nameA > nameB) return 1;
                                        return 0;
                                    })
                                    .map((province, index) => <option key={index}>{province.title}</option>)
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota/Kabupaten</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city"
                            name="city"
                            value={city}
                            onChange={this.handleChange}>
                            <option>{city}</option>
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
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Kecamatan</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district"
                            name="district"
                            value={district}
                            onChange={this.handleChange}>
                            <option>{district}</option>
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
                    <div className="text-gray-700 mt-2">
                        <label className="block text-sm font-bold mb-n1" htmlFor="facilityRoom">Fasilitas Kamar</label>
                        <div className="capitalize grid grid-cols-3 gap-3 mx-3">
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="ac" label="AC" checked={facilities.ac} onChange={this.toggleAc} custom />
                            </div>
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="wifi" label="Wifi" checked={facilities.wifi} onChange={this.toggleWifi} custom />
                            </div>
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="kamarMandiDalam" label="KM.Dalam" checked={facilities.kamarMandiDalam} onChange={this.toggleKamarMandiDalam} custom />
                            </div>
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="kasur" label="Kasur" checked={facilities.kasur} onChange={this.toggleKasur} custom />
                            </div>
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="lemariPakaian" label="Lemari" checked={facilities.lemariPakaian} onChange={this.toggleLemariPakaian} custom />
                            </div>
                            <div className="mb-n1">
                                <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="meja" label="Meja" checked={facilities.meja} onChange={this.toggleMeja} custom />
                            </div>
                            {/* <div className="mb-n1">
                                    <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="kursi" label="Kursi" checked={facilities.kursi} onChange={this.toggleKursi} custom />
                                </div>
                                <div className="mb-n1">
                                    <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="exhaustFan" label="Exhaust" checked={facilities.exhaustFan} onChange={this.toggleExhaustFan} custom />
                                </div>
                                <div className="mb-n1">
                                    <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="tv" label="TV" checked={facilities.tv} onChange={this.toggleTv} custom />
                                </div>
                                <div className="mb-n1">
                                    <Form.Check type="checkbox" className="mt-2 mr-sm-2" id="kipasAngin" label="Kipas" checked={facilities.kipasAngin} onChange={this.toggleKipasAngin} custom />
                                </div> */}
                        </div>
                    </div>
                    <div className="my-3">
                        <label className="block text-gray-700 text-sm font-bold mb-n1" htmlFor="maxPrice">Harga Sewa</label>
                        <div className="text-center text-gray-700 mb-n4">
                            {Cash(rangePrice.min)} - {Cash(rangePrice.max)}
                        </div>
                        <div className="my-4 mx-3">
                            <InputRange
                                step={50000}
                                maxValue={10000000}
                                minValue={50000}
                                formatLabel={rangePrice => `${Cash(rangePrice)}`}
                                value={this.state.rangePrice}
                                onChange={rangePrice => this.setState({ rangePrice })} />
                        </div>
                    </div>
                    <div className="border-top pt-3 mt-3">
                        <button className="bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white font-bold py-3 px-3 my-2 mr-3 rounded-full w-full uppercase" type="submit">Mulai Mencari</button>
                    </div>
                </form>
            }
        </>
    }
}
export default Filter;