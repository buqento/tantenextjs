import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Ads from '../components/Ads'
import Footer from '../components/Footer'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import { useSession } from 'next-auth/client'
const withSession = Component => props => {
    const [session, loading] = useSession()
    let data = []
    if (session) {
        const dt = fire.firestore().collection('kosts')
        dt.where('user.email', '==', session.user.email)
            .orderBy('date_modified', 'desc')
            .onSnapshot(snapshot => {
                data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            })
    }
    if (Component.prototype.render) {
        return <Component session={session} loading={loading} data={data} {...props} />
    }
    throw new Error([])
};
class IklanSaya extends React.Component {
    render() {
        const { loading, data } = this.props
        return <>
            <NavComponent />
            {
                loading ? <CampaignItemListSkeleton /> :
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
export default withSession(IklanSaya)