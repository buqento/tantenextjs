import React from 'react'
import { string } from 'prop-types'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = { locationText: null }
    }
    componentDidMount() {
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
        const { kosts } = this.props
        const data = JSON.parse(kosts)
        let nearbyList = []
        let locationText
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(latitude, longitude, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 2) nearbyList.push({
                distance: (d).toFixed(1),
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
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=111ed9e8cfcb4f7a83d8b17c1671a4f0`)
            .then(response => response.json())
            .then(response => { locationText = response.results[0].formatted })
            .then(() => this.setState({ locationText, nearbyList }))
    }
    render() {
        const { locationText, nearbyList } = this.state
        const seo = {
            title: 'Nearby - Kost terdekat di sekitar lokasi Kamu',
            description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
            url: 'nearby'
        }
        return <div>
            <NavComponent />
            <Header seo={seo} />
            {!nearbyList && <CampaignItemListSkeleton />}
            {
                nearbyList && nearbyList.length > 0 &&
                <>
                    <h1 className="py-3 px-3 font-bold bg-white">{nearbyList.length} Room{nearbyList.length > 1 ? 's' : ''} Near {locationText}</h1>
                    <div className="mx-3 mb-2 divide-y">
                        {
                            nearbyList
                                .sort(function compare(a, b) {
                                    const dtA = a.distance
                                    const dtB = b.distance
                                    let comparison = 0
                                    if (dtA > dtB) comparison = 1
                                    if (dtA < dtB) comparison = -1
                                    return comparison
                                })
                                .map((item, index) => <div key={index}><CampaignItemList item={item} nearby /></div>)
                        }
                    </div>
                </>
            }
            {
                nearbyList && nearbyList.length === 0 && <Message title="No Room" message="Use search to view more rooms" />
            }
            <Footer />
            <NavMobile />
        </div>
    }
}
export const getServerSideProps = async () => {
    let kosts = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where('is_active', '==', true)
        .get()
    querySnapshot.forEach(doc => {
        kosts.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return {
        props: {
            kosts: JSON.stringify(kosts)
        }
    }
}
Nearby.propTypes = {
    kosts: string
}
Nearby.defaultProps = {
    kosts: null
}
export default Nearby