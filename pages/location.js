import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import CampaignItemList from '../components/CampaignItemList'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Footer from '../components/Footer'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Message from '../components/Message'
import fire from '../configurations/firebase'
import AdSense from 'react-adsense'

const mapboxApiKey = 'pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA'

class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            data: null,
            keyword: 'Jakarta Pusat',
            listResult: null,
            placeName: null,
            viewport: {
                latitude: -6.177167845630349,
                longitude: 106.82731084626721
            }
        }
    }
    componentDidMount() {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "Masukan nama lokasi/area/alamat");
        const dt = fire.firestore().collection('kosts')
        dt.where('is_active', '==', true)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ data, load: false })
                this.initData()
            })
    }
    initData = () => {
        const { data, viewport } = this.state
        let initList = []
        let initItem = {}
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(viewport.latitude, viewport.longitude, data[i].location.lat_lng.w_, data[i].location.lat_lng.T_, "K")
            initItem = {
                distance: (d).toFixed(1),
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type
            }
            if (d <= 5) initList.push(initItem)
        }
        this.setState({ listResult: initList })
    }
    onSelected = (viewport, item) => {
        const { data, keyword } = this.state
        const latitude = viewport.latitude
        const longitude = viewport.longitude
        let nearList = []
        let nearItem = {}
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(latitude, longitude, data[i].location.lat_lng.w_, data[i].location.lat_lng.T_, "K")
            nearItem = {
                distance: (d).toFixed(1),
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type
            }
            if (d <= 1) nearList.push(nearItem)
        }
        this.setState({ listResult: nearList, placeName: item.place_name, keyword: keyword })
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
        return (
            <>
                <NavComponent />
                <div>
                    <Geocoder
                        className="border text-lg mx-3 my-3"
                        mapboxApiAccessToken={mapboxApiKey}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={{ country: "id" }}
                        updateInputOnSelect
                        initialInputValue={keyword}
                    />
                </div>
                {
                    load ? <CampaignItemListSkeleton /> :
                        <div className="mx-3 my-3">
                            <div>
                                {
                                    listResult &&
                                    <>
                                        {
                                            listResult.length > 0 &&
                                            `${listResult.length} kost di area `
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
                                            listResult.length === 0 &&
                                            <Message title="Tidak Ditemukan" message={`Tidak ditemukan kost area ${placeName}. Silahkan cari di area lainnya`} />
                                        }
                                    </>
                                }
                            </div>
                            {
                                listResult && listResult.length > 0 &&
                                <div className="divide-y">
                                    {
                                        listResult.map((item, index) =>
                                            <div key={index}>
                                                {
                                                    index === 1 &&
                                                    <div className="my-1 border-bottom">
                                                        <AdSense.Google
                                                            client='ca-pub-1434074630735871'
                                                            slot='7863233219'
                                                            className="h-32 w-full"
                                                            format=''
                                                        />
                                                    </div>
                                                }
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