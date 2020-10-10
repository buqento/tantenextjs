import React, { useState } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import { shape } from 'prop-types'

export default function Peta(props) {

    const lat = parseFloat(props.location.lat)
    const long = parseFloat(props.location.long)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: "150px",
        zoom: 16
    })

    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA"
            onViewportChange={viewport => { setViewport(viewport) }}
        >
            <Marker
                latitude={lat}
                longitude={long}
            >
                <img src="static/images/Home-icon.png" width="30px" />
            </Marker>
        </ReactMapGl>
    )

}

Peta.propTypes = {
    location: shape({})
}