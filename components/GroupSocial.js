import React, { Component } from 'react'
import { BiChevronRight } from "react-icons/bi"
class Area extends Component {
    render() {
        return (
            <div className="my-3 mx-3 divide-y">
                <div className="py-2">
                    <a href="https://www.facebook.com/groups/485414032435519" target="blank">
                        <span>Rumah/Kost/Kontrakan DKI Jakarta</span>
                        <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                    </a>
                </div>
                <div className="py-2">
                    <a href="https://www.facebook.com/groups/221285929390212" target="blank">
                        <span>Rumah/Kost/Kontrakan Yogyakarta</span>
                        <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                    </a>
                </div>

                <div className="py-2">
                    <a href="https://www.facebook.com/groups/762731311013431" target="blank">
                        <span>Rumah/Kost/Kontrakan Bali</span>
                        <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                    </a>
                </div>

                <div className="py-2">
                    <a href="https://www.facebook.com/groups/tantekos" target="blank">
                        <span>Rumah/Kost/Kontrakan Maluku</span>
                        <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                    </a>
                </div>

                <div className="py-2">
                    <a href="https://www.facebook.com/groups/811913479639737" target="blank">
                        <span>Rumah/Kost/Kontrakan Papua</span>
                        <span className="float-right"><BiChevronRight size={28} className="inline ml-1 mb-1" /></span>
                    </a>
                </div>

            </div>
        )
    }
}
export default Area