import React from 'react'
import { arrayOf, shape } from 'prop-types'
class Facilities extends React.Component {
    render() {
        const { items } = this.props;
        const facility = ['Kamar Mandi Dalam', 'AC', 'Wifi', 'Kasur', 'Lemari Pakaian', 'Meja', 'Kursi', 'Exhaust Fan', 'Kipas Angin', 'TV', 'Shower', 'Kloset Duduk', 'Kloset Jongkok', 'Parkir Mobil', 'Parkir Motor', 'R. Jemur', 'R. Cuci', 'R. Tamu', 'Kamar Mandi Luar', 'Dapur']
        return (
            <div className="grid grid-cols-3 gap-3 mx-3">
                {
                    items.map((item, index) =>
                        facility.includes(item) &&
                        < div key={index} className="mt-2 ml-n2" >
                            {/* room */}

                            {item === 'Kamar Mandi Dalam' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/bath_tube_icon_149739.png" alt="Kamar Mandi Dalam" className="inline mr-1" width={24} />KM.Dalam</div>}

                            {item === 'AC' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/air_conditioner_icon_149740.png" alt="AC" className="inline mr-1" width={24} />AC</div>}
                            
                            {item === 'Kasur' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/bed_icon_149738.png" alt="Kasur" className="inline mr-1" width={24} />Kasur</div>}

                            {item === 'Lemari Pakaian' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/cupboard_icon_149733.png" alt="Lemari Pakaian" className="inline mr-1" width={24} />Lemari</div>}

                            {item === 'Meja' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/table_icon_149720.png" alt="Meja" className="inline mr-1" width={22} />Meja</div>}

                            {item === 'Kursi' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/chair_icon_149736.png" alt="Kursi" className="inline mr-1" width={24} />Kursi</div>}

                            {item === 'Wifi' && <div><img src="https://cdn.icon-icons.com/icons2/614/PNG/512/wifi-medium-signal-symbol-1_icon-icons.com_56451.png" alt="Wifi" className="inline mr-1" width={22} />Wifi</div>}
                            
                            {item === 'Exhaust Fan' && <div><img src="https://cdn.icon-icons.com/icons2/2449/PNG/512/hardware_fan_component_icon_148858.png" alt="Exhaust Fan" className="inline mr-1" width={24} />Exhaust</div>}

                            {item === 'TV' && <div><img src="https://cdn.icon-icons.com/icons2/1863/PNG/512/live-tv_118973.png" alt="TV" className="inline mr-1" width={24} />TV</div>}

                            {item === 'Kipas Angin' && <div><img src="https://cdn.icon-icons.com/icons2/1862/PNG/512/circularfan_118424.png" alt="Kipas Angin" className="inline mr-1" width={24} />Kipas</div>}

                            {/* bathroom */}
                            {item === 'Shower' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/shower_icon_149724.png" alt="Shower" className="inline mr-1" width={24} />Shower</div>}

                            {item === 'Kloset Duduk' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/toilet_wc_icon_149719.png" alt="Kloset Duduk" className="inline mr-1" width={24} />K.Duduk</div>}

                            {item === 'Kloset Jongkok' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/toilet_squad_icon_149721.png" alt="Kloset Jongkok" className="inline mr-1" width={24} />K.Jongkok</div>}

                            {/* share */}

                            {item === 'Parkir Motor' && <div><img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/parking_icon_137324.png" alt="Parkir Motor" className="inline mr-1" width={24} />P.Motor</div>}

                            {item === 'Parkir Mobil' && <div><img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/parking_icon_137324.png" alt="Parkir Mobil" className="inline mr-1" width={24} />P.Mobil</div>}

                            {item === 'R. Jemur' && <div><img src="https://cdn.icon-icons.com/icons2/37/PNG/512/wardrobe_4486.png" alt="R.Jemur" className="inline mr-1" width={24} />R.Jemur</div>}
                            
                            {item === 'R. Cuci' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/washing_machine_icon_149716.png" alt="R.Cuci" className="inline mr-1" width={24} />R.Cuci</div>}

                            {item === 'R. Tamu' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/chair_icon_149737.png" alt="R.Tamu" className="inline mr-1" width={24} />R.Tamu</div>}

                            {item === 'Kamar Mandi Luar' && <div><img src="https://cdn.icon-icons.com/icons2/2475/PNG/512/bath_tube_icon_149739.png" alt="Kamar Mandi Luar" className="inline mr-1" width={24} />KM.Luar</div>}

                            {item === 'Dapur' && <div><img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-kitchen_90730.png" alt="Dapur" className="inline mr-1" width={24} />Dapur</div>}

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