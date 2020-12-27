import React from 'react'
import Generateslug from '../utils/Generateslug'
import { DtProvinsi } from '../utils/modals/Provinsi'
import { DtArea } from '../utils/modals/Area'
class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'Kost',
            province: 'Yogyakarta',
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
        const { category, province, district, facilityRoom } = this.state;
        this.props.callbackFromParent({ category, province, district, facilityRoom });
    }
    toggleAc = () => {
        this.setState({ ac: !this.state.ac });
    }
    render() {
        const { showHideForm, category, province, district, facilityRoom } = this.state;
        return <>
            {
                showHideForm &&
                <form className="bg-white px-3 pb-2 border-bottom" onSubmit={this.handleSearch}>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Kategori</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category"
                            value={category}
                            name="category"
                            onChange={this.handleChange}>
                            <option>Kost</option>
                            <option>Kontrakan</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Wilayah</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="province"
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
                                    .map((provinsi, index) => <option key={index}>{provinsi.title}</option>)
                            }
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Area</label>
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district"
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
                                    .filter(area => area.province === province)
                                    .map((area, index) => <option key={index}>{area.district}</option>)
                            }
                        </select>
                    </div>
                    {
                        category === 'Kost' &&
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facilityRoom">Fasilitas Kamar</label>
                            <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="facilityRoom"
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
                    <button className="bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white font-bold py-2 px-3 my-2 mr-3 rounded w-full uppercase" type="submit">Terapkan</button>
                </form>
            }
        </>
    }
}
export default Filter;