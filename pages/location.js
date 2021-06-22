import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import CampaignItemList from '../components/CampaignItemList'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Message from '../components/Message'
import fire from '../configurations/firebase'

class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            data: null,
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
        input.setAttribute("placeholder", "Location/Area/Address")
        input.select()
        const { viewport } = this.state
        const dt = fire.firestore().collection('kosts')
        dt.where('is_active', '==', true).onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            this.setState({ data, listResult: this.setData(viewport, data), load: false })
        })
    }
    setData = (viewport, data) => {
        let res = []
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(viewport.latitude, viewport.longitude, data[i].location.lat_lng.w_, data[i].location.lat_lng.T_, "K")
            if (d <= 1) res.push({
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
        const { keyword, data } = this.state
        this.setState({
            listResult: this.setData(viewport, data),
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
        const { viewport, listResult, placeName, load, keyword } = this.state
        const mapboxApiKey = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        return (
            <>
                <NavComponent />
                <div className="my-3">
                    <Geocoder
                        className="border text-lg mx-3 p-0"
                        mapboxApiAccessToken={mapboxApiKey}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={{ country: "id" }} />
                </div>
                {load && !placeName && <CampaignItemListSkeleton />}
                { !load &&
                    <div className="mx-3 my-2">
                        <div className="my-2">
                            {
                                listResult &&
                                <>
                                    {
                                        listResult.length > 0 &&
                                        `${listResult.length} Room${listResult.length > 1 ? 's' : ''} Near `
                                    }
                                    {
                                        listResult.length > 0 &&
                                            !placeName ? <strong>{keyword}</strong> : ` `
                                    }
                                    {
                                        listResult.length > 0 &&
                                        placeName && <strong>{placeName}</strong>
                                    }
                                    {
                                        listResult.length === 0 && placeName &&
                                        <Message title="No Room" message={`No room near ${placeName}. Use search to view more rooms`} />
                                    }
                                </>
                            }
                        </div>
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
                }
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
export default MapView;