import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import AdSense from 'react-adsense'
class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            locationText: "Jakarta Pusat",
            nearbyList: null,
            load: true
        }
    }
    componentDidMount() {
        const dt = fire.firestore().collection('kosts')
        dt.where('is_active', '==', true)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ data })
                if (typeof window !== 'undefined' && window.navigator.geolocation) {
                    window.navigator.geolocation.getCurrentPosition(
                        this.successfulLookup, this.showAlert
                    )
                }
            })
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
        const { locationText, nearbyList, load } = this.state
        const info = {
            title: 'Kost Terdekat Disekitar Kamu',
            description: 'Kost Terdekat Harian Bulanan Tahunan Murah',
            url: 'nearby'
        }
        return <div>
            <NavComponent />

            <div className="xs:mx-3 my-3 text-center">
                {/* horizontal ads */}
                <AdSense.Google
                    client='ca-pub-1434074630735871'
                    slot='5011678900'
                    className="w-full bg-gray-400 text-center"
                    format='auto'
                />
            </div>

            <Header info={info} />
            {load && <CampaignItemListSkeleton />}
            {
                !load && nearbyList && nearbyList.length > 0 &&
                <>
                    <div className="pb-3 px-3 font-bold bg-white"><span className="font-normal">{nearbyList.length} Room Near</span> {locationText}</div>
                    <div className="mb-3">
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
                                    .map((item, index) => <div><CampaignItemList key={index} item={item} nearby /></div>)
                            }
                        </div>
                    </div>
                    {/* <Ads /> */}
                </>
            }
            {
                nearbyList && nearbyList.length === 0 && <Message title="No Room" message="Use search to view more rooms" />
            }
            <Footer />
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </div>
    }
}
export default Nearby