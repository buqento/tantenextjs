import React from 'react'
import { string } from 'prop-types'
import { Campus } from '../utils/modals/Campus'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
const CampusList = (props) => {
    const { name, locationProvince } = props
    const filterItems = (keyword) => {
        let query = keyword.toLowerCase()
        return Campus.filter(item => item.name.toLowerCase().indexOf(query) >= 0 && item.province === locationProvince)
    }
    const data = filterItems(name)
    return (
        <>
            <div className="main-layout">
                {
                    data.length > 0 && <div className="px-3 pt-3 text-lg font-bold">{locationProvince}</div>
                }
                <div className="container divide-y divide-gray-400">
                    {
                        data.length > 0 && data
                            .sort(function (a, b) {
                                var nameA = Generateslug(a.name.toUpperCase());
                                var nameB = Generateslug(b.name.toUpperCase());
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .map((item, index) =>
                                <div className="py-2 px-3" key={index}>
                                    <a href={`../../area/kampus/${Generateslug(item.name)}`}>
                                        <div className="d-flex">
                                            <span className="w-full">{item.name}</span>
                                            <span className="ml-0.5 float-right self-center"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                                        </div>
                                    </a>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}
CampusList.propTypes = {
    name: string,
}
CampusList.defaultProps = {
    name: null
}
export default CampusList