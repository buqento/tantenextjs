import React, { useState, useEffect } from 'react'
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'
import { shape } from 'prop-types'
import { FaMapMarkerAlt } from 'react-icons/fa';
export default function Peta(props) {
    const [windowWIdth, setWindowWidth] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth)
        }
    })
    const accessToken = "pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
    const type = props.type
    const lat = parseFloat(props.location.lat_lng.latitude)
    const long = parseFloat(props.location.lat_lng.longitude)
    const zoom = parseInt(props.zoom)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: 200,
        zoom: zoom
    })
    viewport.width = "100%"
    viewport.height = windowWIdth > 768 ? 400 : 200
    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
            onViewportChange={viewport => { setViewport(viewport) }}
            mapStyle="mapbox://styles/buqento/ckg4bb6cc2hrr19k84gzrs97j"
        >
            <div className="ml-2 mt-2" style={{ width: '29px', zIndex: -1 }}>
                <FullscreenControl label="Perbesar Peta" />
            </div>
            <div className="ml-2 mt-2" style={{ width: '29px' }}>
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    label="Lokasi Anda"
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
    )
}
Peta.propTypes = {
    location: shape({})
}