import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Ads from '../components/Ads'
import Footer from '../components/Footer'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import SocialButton from '../components/SocialButton'
import router from 'next/router'
class IklanSaya extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: false,
            user: null,
            data: null,
            load: true
        }
        this.onLoginSuccess = this.onLoginSuccess.bind(this)
        this.onLoginFailure = this.onLoginFailure.bind(this)
    }
    onLoginSuccess(user) {
        this.setState({ logged: true, user })
        if (user._profile) {
            const dt = fire.firestore().collection('kosts')
            dt.where('user.uid', '==', user._profile.id)
                .orderBy('date_modified', 'desc')
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    this.setState({ data, load: false })
                })
        }
    }
    onLoginFailure(err) {
        console.log(err);
        router.push('/login')
    }
    render() {
        const { load, data } = this.state
        return <>
            <SocialButton
                provider="facebook"
                appId="3234331779955939"
                onLoginSuccess={this.onLoginSuccess}
                onLoginFailure={this.onLoginFailure}
                key={'facebook'}
                onInternetFailure={() => { return true }}
                autoLogin={true}
            ></SocialButton>
            <NavComponent />
            {
                load ? <CampaignItemListSkeleton /> :
                    data && data.length > 0 &&
                    <div className="mb-3">
                        <div className="mx-3 divide-y">
                            {
                                data
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
                                    .map((item, index) => <CampaignItemList key={index} item={item} myads />)
                            }
                        </div>
                    </div>
            }
            {
                data && data.length === 0 &&
                <div>
                    <Message title="Belum ada iklan" message="Kamu belum memiliki Iklan Aktif. Silahkan membuat iklan baru secara gratis" />
                </div>
            }
            <div className="mb-4">
                <Ads />
            </div>
            <Footer />
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    }
}
export default IklanSaya