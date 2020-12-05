import React from 'react'
import { Campus } from '../../../utils/modals/Campus'
import HeadPage from '../../../components/HeadPage'
import Generateslug from '../../../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'

class AllCampus extends React.Component {
    render() {
        return (
            <>
                <div className="main-layout">
                    <HeadPage title="Kost &amp; Kontrakan Dekat Kampus" />
                    <div className="container divide-y divide-gray-400">
                        {
                            Campus
                                .sort(function (a, b) {
                                    var nameA = Generateslug(a.name.toUpperCase());
                                    var nameB = Generateslug(b.name.toUpperCase());
                                    if (nameA < nameB) return -1;
                                    if (nameA > nameB) return 1;
                                    return 0;
                                })
                                .map((item, index) =>
                                    <div className="py-3 px-3" key={index}>
                                        <a href={`../../area/kampus/${Generateslug(item.name)}`}>
                                            <div>
                                                <span>{item.name}</span>
                                                <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
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
}
export default AllCampus;