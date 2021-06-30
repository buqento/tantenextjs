import React from 'react'
import { array, bool } from 'prop-types'
class Facilities extends React.Component {
    render() {
        const { items, inline } = this.props;
        const facility = ['Kamar Mandi Dalam', 'AC', 'Wifi', 'Springbed', 'Kasur', 'Lemari Pakaian', 'Meja', 'Kursi', 'Exhaust Fan', 'Kipas Angin', 'TV', 'Shower', 'Water Heater', 'Bathtub', 'Wastafel', 'Kloset Duduk', 'Kloset Jongkok', 'Parkir Mobil', 'Parkir Motor', 'R.Jemur', 'R.Cuci', 'R.Tamu', 'Kamar Mandi Luar', 'Dapur']
        return (
            <>
                {
                    inline ?
                        <div className="clamp-1">
                            {
                                items.map((item, index) =>
                                    <span key={item} className="text-md">{index !== 0 && <>&middot;</>} {item}&nbsp;
                                </span>
                                )
                            }
                        </div>
                        :
                        <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
                            {
                                items.map((item, index) =>
                                    facility.includes(item) &&
                                    < div key={index} className="ml-n2 mb-n2 px-1 py-1 border text-xs" >
                                        {/* room */}
                                        {item === 'Kamar Mandi Dalam' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Dalam" className="mr-1" width={24} height={24} /> KM Dalam</div>}

                                        {item === 'AC' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/air_conditioner_icon_149740.svg" alt="AC" className="mr-1" width={24} height={24} />AC</div>}

                                        {item === 'Kasur' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/bed_icon_149738.svg" alt="Kasur" className="mr-1" width={24} height={24} />Kasur</div>}

                                        {item === 'Springbed' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/bed_icon_149738.svg" alt="Springbed" className="mr-1" width={24} height={24} />Springbed</div>}

                                        {item === 'Lemari Pakaian' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/cupboard_icon_149733.svg" alt="Lemari Pakaian" className="mr-1" width={24} height={24} />Lemari</div>}

                                        {item === 'Meja' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/table_icon_149720.svg" alt="Meja" className="mr-1" width={22} height={22} />Meja</div>}

                                        {item === 'Kursi' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/chair_icon_149736.svg" alt="Kursi" className="mr-1" width={24} height={24} />Kursi</div>}

                                        {item === 'Wifi' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/wifi-medium-signal-symbol-1_icon-icons.com_56451.svg" alt="Wifi" className="mr-1" width={22} height={22} />Wifi</div>}

                                        {item === 'Exhaust Fan' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/hardware_fan_component_icon_148858.svg" alt="Exhaust Fan" className="mr-1" width={24} height={24} />Exhaust</div>}

                                        {item === 'TV' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/live-tv_118973.svg" alt="TV" className="mr-1" width={24} height={24} />TV</div>}

                                        {item === 'Kipas Angin' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/circularfan_118424.svg" alt="Kipas Angin" className="mr-1" width={24} height={24} />Kipas</div>}
                                        {/* bathroom */}

                                        {item === 'Shower' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/shower_icon_149724.svg" alt="Shower" className="mr-1" width={24} height={24} />Shower</div>}

                                        {item === 'Water Heater' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/water_heater.svg" alt="Water Heater" className="mr-1" width={24} height={24} />Water Heater</div>}

                                        {item === 'Wastafel' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/wastafel.svg" alt="Wastafel" className="mr-1" width={24} height={24} />Wastafel</div>}

                                        {item === 'Bathtub' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/bath.svg" alt="Bathtub" className="mr-1" width={24} height={24} />Bathtub</div>}

                                        {item === 'Kloset Duduk' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/toilet_wc_icon_149719.svg" alt="Kloset Duduk" className="mr-1" width={24} height={24} />Kl Duduk</div>}

                                        {item === 'Kloset Jongkok' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/toilet_squad_icon_149721.svg" alt="Kloset Jongkok" className="mr-1" width={24} height={24} />Kl Jongkok</div>}

                                        {/* share */}
                                        {item === 'Parkir Motor' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/parking_icon_137324.svg" alt="Parkir Motor" className="mr-1" width={24} height={24} />P Motor</div>}

                                        {item === 'Parkir Mobil' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/parking_icon_137324.svg" alt="Parkir Mobil" className="mr-1" width={24} height={24} />P Mobil</div>}

                                        {item === 'R.Jemur' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/wardrobe_4486.png" alt="R.Jemur" className="mr-1" width={24} height={24} />Rg Jemur</div>}

                                        {item === 'R.Cuci' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/washing_machine_icon_149716.svg" alt="R.Cuci" className="mr-1" width={24} height={24} />Rg Cuci</div>}

                                        {item === 'R.Tamu' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/chair_icon_149737.svg" alt="R.Tamu" className="mr-1" width={24} height={24} />Rg Tamu</div>}

                                        {item === 'Kamar Mandi Luar' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Luar" className="mr-1" width={24} height={24} />KM Luar</div>}

                                        {item === 'Dapur' && <div style={{ textAlign: '-webkit-center' }}><img src="../static/images/icons/-kitchen_90730.svg" alt="Dapur" className="mr-1" width={24} height={24} />Dapur</div>}
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