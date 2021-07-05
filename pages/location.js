import React from 'react'
import { string } from 'prop-types'
import Geocoder from 'react-mapbox-gl-geocoder'
import CampaignItemList from '../components/CampaignItemList'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Message from '../components/Message'
import fire from '../configurations/firebase'
import Header from '../components/Header'
class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: 'Universitas Atma Jaya Yogyakarta',
            listResult: null,
            placeName: null,
            viewport: {
                latitude: -7.780471209178254,
                longitude: 110.41408899968006
            }
        }
    }
    componentDidMount() {
        const input = document.getElementsByTagName("input")[0]
        const { viewport } = this.state
        input.setAttribute("placeholder", "Location/Area/Address")
        input.select()
        this.setState({ listResult: this.setData(viewport) })
    }
    setData = (viewport) => {
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
    onSelected = (viewport, item) => {
        const { keyword } = this.state
        this.setState({
            listResult: this.setData(viewport),
            placeName: item.place_name,
            keyword: keyword
        })
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
        const { viewport, listResult, placeName, keyword } = this.state
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
                <div className="my-3">
                    <Geocoder
                        className="border text-lg mx-3 p-0"
                        mapboxApiAccessToken={mapboxApiKey}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={{ country: "id" }} />
                </div>
                <div className="mx-3 my-2">
                    <h1 className="my-2 font-bold">
                        {
                            listResult &&
                            <>
                                {listResult.length > 0 && `${listResult.length} Room${listResult.length > 1 ? 's' : ''} Near `}
                                {listResult.length > 0 && !placeName ? keyword : ` `}
                                {listResult.length > 0 && placeName && placeName}
                                {listResult.length === 0 && placeName && <Message title="No Room" message={`No room near ${placeName}. Use search to view more rooms`} />}
                            </>
                        }
                    </h1>
                    {
                        listResult && listResult.length > 0 &&
                        <div className="divide-y">
                            {
                                listResult
                                    .sort(function compare(a, b) {
                                        const priceA = a.price.start_from
                                        const priceB = b.price.start_from
                                        let comparison = 0
                                        if (priceA > priceB) comparison = 1
                                        if (priceA < priceB) comparison = -1
                                        return comparison
                                    })
                                    .map((item, index) =>
                                        <div key={index}>
                                            <CampaignItemList item={item} />
                                        </div>
                                    )
                            }
                        </div>
                    }
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