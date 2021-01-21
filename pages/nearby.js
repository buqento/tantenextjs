import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Layout from '../components/Layout'
import { BiWinkSmile } from 'react-icons/bi'
class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            locationText: null,
            nearbyList: null,
            load: false,
            skeletonArr: [1, 2, 3, 4, 5]
        }
    }
    componentDidMount() {
        const dt = fire.firestore().collection('kosts')
        dt.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data })
        })
        if (typeof window !== 'undefined' && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                this.successfulLookup, this.showAlert
            )
        }
    }
    showAlert = () => { console.log('Your location is unknown!') }
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
        console.log(latitude);
        console.log(longitude);
        const { data } = this.state
        let nearbyList = []
        let locationText = 't'
        for (var i = 0; i < data.length; i++) {
            // if this location is within 5KM of the user, add it to the list
            const d = this.getDistance(latitude, longitude, data[i].location.lat_lng.w_, data[i].location.lat_lng.T_, "K")
            if (d <= 5) nearbyList.push(data[i])
        }
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=111ed9e8cfcb4f7a83d8b17c1671a4f0`)
            .then(response => response.json())
            .then(response => { locationText = response.results[0].formatted })
            .then(() => this.setState({ locationText, nearbyList }))
    }
    render() {
        const { locationText, nearbyList, load, skeletonArr } = this.state
        return <Layout>
            <div className="mb-3 mx-3">{locationText}</div>
            {
                load ?
                    <div className="mx-3 divide-y-2">
                        {
                            skeletonArr.map((item, index) =>
                                <div key={index} className="max-w-sm w-full mx-auto py-2">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="bg-gray-400 rounded-xl h-24 w-24"></div>
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-6 bg-gray-400 rounded w-1/4"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-400 rounded"></div>
                                                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    :
                    nearbyList && nearbyList.length > 0 ? <>{nearbyList.map((item, index) => <CampaignItemList key={index} item={item} />)}</> :
                        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                            <p className="font-bold">Tidak Ditemukan</p>
                            <p className="text-sm"><BiWinkSmile size={22} className="inline mr-1 mb-1" />Temukan kost menggunakan pencarian</p>
                        </div>
            }
        </Layout>
    }
}
export default Nearby