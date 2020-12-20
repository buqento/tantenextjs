import React from 'react'
import Generateslug from '../utils/Generateslug'
import { DtProvinsi } from '../utils/modals/Provinsi'
class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'Kost',
            province: 'Yogyakarta',
            ac: true,
            data: []
        }
        this.handleSearch = this.handleSearch.bind(this)
    }
    handleChange = (event) => {
        const nam = event.target.name;
        const val = event.target.value;
        this.setState({ [nam]: val })
    }
    handleSearch(event) {
        event.preventDefault()
        const { category, province, ac } = this.state;
        this.props.callbackFromParent({ category, province, ac });
    }
    toggleAc = () => {
        this.setState({ ac: !this.state.ac });
    }
    render() {
        const { category, province } = this.state;
        return <>
            <form className="bg-white px-4 py-2 border-bottom" onSubmit={this.handleSearch}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Kategori</label>
                    <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                        value={category}
                        name="category"
                        onChange={this.handleChange}>
                        <option>Kost</option>
                        <option>Kontrakan</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Area</label>
                    <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
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
                <button className="bg-blue-700 hover:bg-blue-600 focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Terapkan</button>
            </form>
        </>
    }
}
export default Search;