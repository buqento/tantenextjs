import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { MdAcUnit, MdTv, MdToys, MdKitchen } from 'react-icons/md'
import { GiPoloShirt, GiTable } from 'react-icons/gi'
import { FaChair, FaShower, FaToilet, FaBath, FaParking, FaWifi, FaBed, FaCouch } from 'react-icons/fa'
import { CgSmartHomeWashMachine } from "react-icons/cg";
class Facilities extends React.Component {
    render() {
        const { items } = this.props;
        const facility = ['Kamar Mandi Dalam', 'AC', 'Wifi', 'Kasur', 'Lemari Pakaian', 'Meja', 'Kursi', 'Exhaust Fan', 'Kipas Angin', 'TV', 'Shower', 'Kloset Duduk', 'Kloset Jongkok', 'Parkir Mobil', 'Parkir Motor', 'R.Jemur', 'R.Cuci', 'R.Tamu', 'Kamar Mandi Luar', 'Dapur']
        return (
            <div className="grid grid-cols-3 gap-3 mx-3">
                {
                    items.map((item, index) =>
                        facility.includes(item) &&
                        < div key={index} className="mt-2 ml-n2" >
                            {/* room */}
                            {item === 'Kamar Mandi Dalam' && <div><FaBath className="inline mb-1 mr-1" />KM.Dalam</div>}
                            {item === 'AC' && <div><MdAcUnit className="inline mb-1 mr-1" />AC</div>}
                            {item === 'Wifi' && <div><FaWifi className="inline mb-1 mr-1" />WiFi</div>}
                            {item === 'Kasur' && <div><FaBed className="inline mb-1 mr-1" />Kasur</div>}
                            {item === 'Lemari Pakaian' && <div><GiPoloShirt className="inline mb-1 mr-1" />Lemari</div>}
                            {item === 'Meja' && <div><GiTable className="inline mb-1 mr-1" />Meja</div>}
                            {item === 'Kursi' && <div><FaChair className="inline mb-1 mr-1" />Kursi</div>}
                            {item === 'Exhaust Fan' && <div><MdToys className="inline mb-1 mr-1" />Exhaust</div>}
                            {item === 'Kipas Angin' && <div><MdToys className="inline mb-1 mr-1" />Kipas</div>}
                            {item === 'TV' && <div><MdTv className="inline mb-1 mr-1" /> TV</div>}
                            {/* bathroom */}
                            {item === 'Shower' && <div><FaShower className="inline mb-1 mr-1" />Shower</div>}
                            {item === 'Kloset Duduk' && <div><FaToilet className="inline mb-1 mr-1" />Kl.Duduk</div>}
                            {item === 'Kloset Jongkok' && <div><FaToilet className="inline mb-1 mr-1" />Kl.Jongkok</div>}
                            {/* share */}
                            {item === 'Parkir Mobil' && <div><FaParking className="inline mb-1 mr-1" />P.Mobil</div>}
                            {item === 'Parkir Motor' && <div><FaParking className="inline mb-1 mr-1" />P.Motor</div>}
                            {item === 'R. Jemur' && <div><GiPoloShirt className="inline mb-1 mr-1" />R.Jemur</div>}
                            {item === 'R. Cuci' && <div><CgSmartHomeWashMachine className="inline mb-1 mr-1" />R.Cuci</div>}
                            {item === 'R. Tamu' && <div><FaCouch className="inline mb-1 mr-1" />R.Tamu</div>}
                            {item === 'Kamar Mandi Luar' && <div><FaBath className="inline mb-1 mr-1" />KM.Luar</div>}
                            {item === 'Dapur' && <div><MdKitchen className="inline mb-1 mr-1" />Dapur</div>}
                        </div>
                    )
                }
            </div>
        )
    }
}
Facilities.propTypes = {
    items: arrayOf(shape())
}
Facilities.defaultProps = {
    items: null
}
export default Facilities