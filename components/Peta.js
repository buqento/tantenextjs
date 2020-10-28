import React, { useState } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import { shape } from 'prop-types'
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function Peta(props) {
    const lat = parseFloat(props.location.lat)
    const long = parseFloat(props.location.long)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: "150px",
        zoom: 12
    })

    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
            onViewportChange={viewport => { setViewport(viewport) }}
            mapStyle="mapbox://styles/buqento/ckg4bb6cc2hrr19k84gzrs97j"
        >
            <Marker
                latitude={lat}
                longitude={long}
                offsetLeft={-18} 
                offsetTop={-25}
            >
                <FaMapMarkerAlt size={30} />
            </Marker>
        </ReactMapGl>
    )

}

Peta.propTypes = {
    location: shape({})
}