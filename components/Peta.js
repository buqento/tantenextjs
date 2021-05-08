import React, { useState } from 'react'
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'
import { shape } from 'prop-types'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
export default function Peta(props) {
    const accessToken = "pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
    const type = props.type
    const lat = parseFloat(props.location.lat_lng.latitude)
    const long = parseFloat(props.location.lat_lng.longitude)
    const height = parseInt(props.height)
    const zoom = parseInt(props.zoom)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: height,
        zoom: zoom
    })
    const getCoordinates = (map, event) => {
        console.log(event);
    }
    viewport.width = "100%"
    viewport.height = height
    return (
        <>
            {
                props.type === "image" ?
                    <Image src={`https://api.mapbox.com/styles/v1/buqento/ckg4bb6cc2hrr19k84gzrs97j/static/pin-l-embassy+f74e4e(${long},${lat})/${long},${lat},10/414x100?access_token=${accessToken}`} />
                    :
                    <ReactMapGl
                        {...viewport}
                        mapboxApiAccessToken="pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
                        onViewportChange={viewport => { setViewport(viewport) }}
                        mapStyle="mapbox://styles/buqento/ckg4bb6cc2hrr19k84gzrs97j"
                        onClick={getCoordinates()}
                    >
                        <div className="ml-1 mt-1" style={{width:'30px'}}>
                            <FullscreenControl />
                        </div>
                        <div className="ml-1 mt-1" style={{ width: '30px' }}>
                            <GeolocateControl
                                positionOptions={{ enableHighAccuracy: true }}
                                trackUserLocation={true}
                            />
                        </div>
                        <Marker
                            latitude={lat}
                            longitude={long}
                            offsetLeft={-18}
                            offsetTop={-25}
                        >
                            <FaMapMarkerAlt size={30} className="text-danger" />
                        </Marker>
                    </ReactMapGl>
            }
        </>
    )

}
Peta.propTypes = {
    location: shape({})
}