import React from 'react'
import Generateslug from '../utils/Generateslug'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { City } from '../utils/modals/City'
import { DtArea } from '../utils/modals/Area'
class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'Kost',
            city: 'Yogyakarta',
            district: '---Semua---',
            facilityRoom: '---Semua---',
            ac: true,
            data: [],
            showHideForm: true
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleCancleFilter = this.handleCancleFilter.bind(this)
    }
    handleChange = (event) => {
        const nam = event.target.name;
        const val = event.target.value;
        this.setState({ [nam]: val })
    }
    handleCancleFilter() {
        const { showHideForm } = this.state
        this.setState({ showHideForm: !showHideForm })
    }
    handleSearch(event) {
        event.preventDefault()
        const { category, city, district, facilityRoom } = this.state;
        this.props.callbackFromParent({ category, city, district, facilityRoom });
    }
    toggleAc = () => {
        this.setState({ ac: !this.state.ac });
    }
    render() {
        const { showHideForm, category, city, district, facilityRoom } = this.state;
        return <>
            {
                showHideForm &&
                <form className="bg-white" onSubmit={this.handleSearch}>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Kategori</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category"
                            value={category}
                            name="category"
                            onChange={this.handleChange}>
                            <option>Kost</option>
                            <option>Kontrakan</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota/Kabupaten</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city"
                            name="city"
                            value={city}
                            onChange={this.handleChange}>
                            {
                                City
                                    .sort(function (a, b) {
                                        var nameA = Generateslug(a.name.toUpperCase());
                                        var nameB = Generateslug(b.name.toUpperCase());
                                        if (nameA < nameB) return -1;
                                        if (nameA > nameB) return 1;
                                        return 0;
                                    })
                                    .map((city, index) => <option key={index}>{city.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Area</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district"
                            name="district"
                            value={district}
                            onChange={this.handleChange}>
                            <option>---Semua---</option>
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
                    {
                        category === 'Kost' &&
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facilityRoom">Fasilitas Kamar</label>
                            <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="facilityRoom"
                                value={facilityRoom}
                                name="facilityRoom"
                                onChange={this.handleChange}>
                                <option>---Semua---</option>
                                <option>Kamar Mandi Dalam</option>
                                <option>AC</option>
                                <option>Wifi</option>
                                <option>Lemari Pakaian</option>
                                <option>TV</option>
                                <option>Kasur</option>
                                <option>Meja</option>
                                <option>Kursi</option>
                            </select>
                        </div>
                    }
                    {/* <div className="mb-4">
                    <input
                        className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                        id="type"
                        type="checkbox"
                        placeholder="type"
                        checked={this.state.ac}
                        name="ac"
                        onChange={this.toggleAc}
                    /> AC
                </div> */}
                <div className="border-top pt-3 mt-3">
                    <button className="bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white font-bold py-3 px-3 my-2 mr-3 rounded-full w-full uppercase" type="submit">Terapkan</button>
                </div>
                </form>
            }
        </>
    }
}
export default Filter;