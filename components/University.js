import React from 'react'
import { Campus } from '../utils/modals/Campus'
class University extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listResult: null }
    }
    componentDidMount() {
        const { viewport } = this.props
        const result = this.setData(viewport, Campus)
        this.setState({ listResult: result, load: false })
    }
    setData = (viewport, data) => {
        let res = []
        for (var i = 0; i < data.length; i++) {
            const latitude = parseFloat(data[i].latlng.split(", ")[0])
            const longitude = parseFloat(data[i].latlng.split(", ")[1])
            const d = this.getDistance(viewport.latitude, viewport.longitude, latitude, longitude, "K")
            if (d <= 1) res.push({ name: data[i].name, slug: data[i].slug })
        }
        return res
    }
    getDistance = (lat1, lon1, lat2, lon2, unit) => {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) dist = 1
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") dist = dist * 1.609344
        if (unit == "N") dist = dist * 0.8684
        return dist
    }
    render() {
        const { listResult } = this.state
        return <div>
            {
                listResult && listResult.length > 0 &&
                <div className="my-3">
                    <h2 className="font-bold">Nearest Campus</h2>
                    <ul className="list-disc ml-4">
                        {
                            listResult
                                .map((item, index) =>
                                    <li key={index}>{item.name}</li>
                                )
                        }
                    </ul>
                </div>

            }
        </div>
    }
}
export default University