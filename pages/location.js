import React from 'react'
import { string } from 'prop-types'
import Geocoder from 'react-mapbox-gl-geocoder'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Message from '../components/Message'
import fire from '../configurations/firebase'
import Header from '../components/Header'
import ListComponent from '../components/ListComponent'
class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            listResult: JSON.parse(props.kosts),
            placeName: null,
            viewport: {
                latitude: -7.780471209178254,
                longitude: 110.41408899968006
            }
        }
        this.setData = this.setData.bind(this)
        this.onSelected = this.onSelected.bind(this)
        this.getDistance = this.getDistance.bind(this)
    }
    componentDidMount() {
        const input = document.getElementsByTagName("input")[0]
        input.setAttribute("placeholder", "Location/Area/Address")
        input.select()
    }
    setData(viewport) {
        const { kosts } = this.props
        const data = JSON.parse(kosts)
        let res = []
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(viewport.latitude, viewport.longitude, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 2) res.push({
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type
            })
        }
        return res
    }
    onSelected(viewport, item) {
        const { keyword } = this.state
        this.setState({
            listResult: this.setData(viewport),
            placeName: item.place_name,
            keyword: keyword
        })
    }
    getDistance(lat1, lon1, lat2, lon2, unit) {
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
        const { viewport, listResult, placeName } = this.state
        const mapboxApiKey = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        const seo = {
            title: 'Search - Cari kost di sekitar lokasi Kamu',
            description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
            url: 'location'
        }
        return (
            <>
                <NavComponent />
                <Header seo={seo} />
                <div className="my-2">
                    <Geocoder
                        className="border text-lg mx-2 p-0"
                        mapboxApiAccessToken={mapboxApiKey}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={{ country: "id" }} />
                </div>
                <div className="mx-2">
                    <h1 className="my-2">
                        {
                            listResult &&
                            <>
                                <span className="font-bold">
                                    {listResult.length > 0 && `${listResult.length} Room${listResult.length > 1 ? 's' : ''}`}
                                    {listResult.length > 0 && placeName && 'Near ' + placeName}
                                </span>
                                {listResult.length === 0 && placeName && <Message title="No Room" message={`No room near ${placeName}. Use search to view more rooms`} />}
                            </>
                        }
                    </h1>
                    {listResult && listResult.length > 0 && <ListComponent data={listResult} />}
                </div>
                <Footer />
                <NavMobile />
            </>
        )
    }
}
export const getServerSideProps = async () => {
    let kosts = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where('is_active', '==', true).get()
    querySnapshot.forEach(doc => {
        kosts.push({ id: doc.id, ...doc.data() })
    })
    return {
        props: { kosts: JSON.stringify(kosts) }
    }
}
Location.propTypes = {
    kosts: string
}
Location.defaultProps = {
    kosts: null
}
export default Location