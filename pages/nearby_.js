import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import Header from '../components/Header'
import Layout from '../components/Layout'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            locationText: null,
            nearbyList: null,
            load: true,
            locationPermit: null
        }
        this.handlePermission = this.handlePermission.bind(this)
    }
    componentDidMount() {
        const dt = fire.firestore().collection('kosts')
        dt.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data })
            if (typeof window !== 'undefined' && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    this.successfulLookup, console.warn('Location permission denied!')
                )
            }
        })
        this.handlePermission()
    }
    handlePermission() {
        const report = (state) => {
            alert(state)
            this.setState({ locationPermit: state, load: false })
            // if (state === 'prompt') {
            //     this.setState({ locationPermit: state })
            // } else {
            //     this.setState({ locationPermit: state, load: false })
            // }
        }
        if (typeof window !== 'undefined' && window.navigator.geolocation) {
            window.navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state == 'granted') {
                    report(result.state);
                } else if (result.state == 'prompt') {
                    report(result.state);
                } else if (result.state == 'denied') {
                    report(result.state);
                }
                result.onchange = function () {
                    report(result.state);
                }
            });
        }
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
    successfulLookup = position => {
        const { latitude, longitude } = position.coords
        const { data } = this.state
        let nearbyList = []
        let nearItem = {}
        let locationText
        for (var i = 0; i < data.length; i++) {
            // if this location is within 5KM of the user, add it to the list
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
            if (d <= 5) nearbyList.push(nearItem)
        }
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=111ed9e8cfcb4f7a83d8b17c1671a4f0`)
            .then(response => response.json())
            .then(response => { locationText = response.results[0].formatted })
            .then(() => this.setState({ locationText, nearbyList, load: false }))
    }
    render() {
        const { locationText, nearbyList, load, locationPermit } = this.state
        return <Layout title="Terdekat" withHeader>
            <Header />
            {
                locationPermit === 'denied' &&
                <div className="px-2 py-1">
                    <Message title="Pengaturan Lokasi" message="Tidak dapat mengakses lokasi Kamu" />
                </div>
            }
            {
                load ? <CampaignItemListSkeleton /> :
                    nearbyList && nearbyList.length > 0 &&
                    <div className="mb-3">
                        <div className="mb-2 mx-3 font-bold"><span className="font-normal">Kost di sekitar</span> {locationText}</div>
                        <div className="mx-3 divide-y">
                            {
                                nearbyList
                                    .sort(
                                        function compare(a, b) {
                                            const dtA = a.distance;
                                            const dtB = b.distance;
                                            let comparison = 0;
                                            if (dtA > dtB) {
                                                comparison = 1;
                                            } else if (dtA < dtB) {
                                                comparison = -1;
                                            }
                                            return comparison;
                                        }
                                    )
                                    .map((item, index) => <CampaignItemList key={index} item={item} nearby />)
                            }
                        </div>
                    </div>
            }
            {
                nearbyList && nearbyList.length === 0 && <Message title="Tidak Ditemukan" message="Temukan kost menggunakan pencarian" />
            }
        </Layout>
    }
}
export default Nearby