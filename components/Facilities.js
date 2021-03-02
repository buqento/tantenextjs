import React from 'react'
import { array, bool } from 'prop-types'
class Facilities extends React.Component {
    render() {
        const { items, inline } = this.props;
        const facility = ['Kamar Mandi Dalam', 'AC', 'Wifi', 'Springbed', 'Kasur', 'Lemari Pakaian', 'Meja', 'Kursi', 'Exhaust Fan', 'Kipas Angin', 'TV', 'Shower', 'Kloset Duduk', 'Kloset Jongkok', 'Parkir Mobil', 'Parkir Motor', 'R.Jemur', 'R.Cuci', 'R.Tamu', 'Kamar Mandi Luar', 'Dapur']
        return (
            <>
                {
                    inline ?
                        <div className="clamp-1">
                            {
                                items.map((item, index) =>
                                    <span key={item} className="text-sm">{index !== 0 && <>&middot;</>} {item}&nbsp;
                                </span>
                                )
                            }
                        </div>
                        :
                        <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
                            {
                                items.map((item, index) =>
                                    facility.includes(item) &&
                                    < div key={index} className="ml-n2 mb-n2 px-1 py-1 border rounded-xl text-sm" >
                                        {/* room */}
                                        {item === 'Kamar Mandi Dalam' && <div><img src="../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Dalam" className="inline mr-1" width={24} height={24} />K.Dalam</div>}
                                        {item === 'AC' && <div><img src="../static/images/icons/air_conditioner_icon_149740.svg" alt="AC" className="inline mr-1" width={24} height={24} />AC</div>}
                                        {item === 'Kasur' && <div><img src="../static/images/icons/bed_icon_149738.svg" alt="Kasur" className="inline mr-1" width={24} height={24} />Kasur</div>}
                                        {item === 'Springbed' && <div><img src="../static/images/icons/bed_icon_149738.svg" alt="Springbed" className="inline mr-1" width={24} height={24} />Springbed</div>}
                                        {item === 'Lemari Pakaian' && <div><img src="../static/images/icons/cupboard_icon_149733.svg" alt="Lemari Pakaian" className="inline mr-1" width={24} height={24} />Lemari</div>}
                                        {item === 'Meja' && <div><img src="../static/images/icons/table_icon_149720.svg" alt="Meja" className="inline mr-1" width={22} height={22} />Meja</div>}
                                        {item === 'Kursi' && <div><img src="../static/images/icons/chair_icon_149736.svg" alt="Kursi" className="inline mr-1" width={24} height={24} />Kursi</div>}
                                        {item === 'Wifi' && <div><img src="../static/images/icons/wifi-medium-signal-symbol-1_icon-icons.com_56451.svg" alt="Wifi" className="inline mr-1" width={22} height={22} />Wifi</div>}
                                        {item === 'Exhaust Fan' && <div><img src="../static/images/icons/hardware_fan_component_icon_148858.svg" alt="Exhaust Fan" className="inline mr-1" width={24} height={24} />Exhaust</div>}
                                        {item === 'TV' && <div><img src="../static/images/icons/live-tv_118973.svg" alt="TV" className="inline mr-1" width={24} height={24} />TV</div>}
                                        {item === 'Kipas Angin' && <div><img src="../static/images/icons/circularfan_118424.svg" alt="Kipas Angin" className="inline mr-1" width={24} height={24} />Kipas</div>}
                                        {/* bathroom */}
                                        {item === 'Shower' && <div><img src="../static/images/icons/shower_icon_149724.svg" alt="Shower" className="inline mr-1" width={24} height={24} />Shower</div>}
                                        {item === 'Kloset Duduk' && <div><img src="../static/images/icons/toilet_wc_icon_149719.svg" alt="Kloset Duduk" className="inline mr-1" width={24} height={24} />K.Duduk</div>}
                                        {item === 'Kloset Jongkok' && <div><img src="../static/images/icons/toilet_squad_icon_149721.svg" alt="Kloset Jongkok" className="inline mr-1" width={24} height={24} />K.Jongkok</div>}
                                        {/* share */}
                                        {item === 'Parkir Motor' && <div><img src="../static/images/icons/parking_icon_137324.svg" alt="Parkir Motor" className="inline mr-1" width={24} height={24} />P.Motor</div>}
                                        {item === 'Parkir Mobil' && <div><img src="../static/images/icons/parking_icon_137324.svg" alt="Parkir Mobil" className="inline mr-1" width={24} height={24} />P.Mobil</div>}
                                        {item === 'R.Jemur' && <div><img src="../static/images/icons/wardrobe_4486.png" alt="R.Jemur" className="inline mr-1" width={24} height={24} />R.Jemur</div>}
                                        {item === 'R.Cuci' && <div><img src="../static/images/icons/washing_machine_icon_149716.svg" alt="R.Cuci" className="inline mr-1" width={24} height={24} />R.Cuci</div>}
                                        {item === 'R.Tamu' && <div><img src="../static/images/icons/chair_icon_149737.svg" alt="R.Tamu" className="inline mr-1" width={24} height={24} />R.Tamu</div>}
                                        {item === 'Kamar Mandi Luar' && <div><img src="../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Luar" className="inline mr-1" width={24} height={24} />K.Luar</div>}
                                        {item === 'Dapur' && <div><img src="../static/images/icons/-kitchen_90730.svg" alt="Dapur" className="inline mr-1" width={24} height={24} />Dapur</div>}
                                    </div>
                                )
                            }
                        </div>
                }
            </>
        )
    }
}
Facilities.propTypes = {
    items: array,
    inline: bool
}
Facilities.defaultProps = {
    items: null,
    inline: false
}
export default Facilities