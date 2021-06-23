import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import Footer from '../components/Footer'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import { useSession } from 'next-auth/client'
const withSession = Component => props => {
    const [session, loading] = useSession()
    if (Component.prototype.render) {
        return <Component session={session} loading={loading} {...props} />
    }
    throw new Error([])
};
class IklanSaya extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true
        }
    }
    render() {
        const { session } = this.props
        const { data, load } = this.state
        if (session) {
            const dt = fire.firestore().collection('kosts')
            dt.where('user.email', '==', session.user.email)
                .orderBy('date_modified', 'desc')
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    this.setState({ data, load: false })
                })
        }
        return <>
            <NavComponent />
            {
                load ? <CampaignItemListSkeleton /> :
                    data && data.length > 0 &&
                    <div className="my-2">
                        <div className="mx-3 divide-y">
                            {
                                data
                                    .sort(function compare(a, b) {
                                        const itemA = a.price.start_from
                                        const itemB = b.price.start_from
                                        let comparison = 0
                                        if (itemA > itemB) comparison = 1
                                        if (itemA < itemB) comparison = -1
                                        return comparison
                                    })
                                    .map((item, index) => <div><CampaignItemList key={index} item={item} myads /></div>)
                            }
                        </div>
                    </div>
            }
            {
                data && data.length === 0 &&
                <div>
                    <Message title="No Ad" message="You have no ads. Create Your ad for free now" />
                </div>
            }
            <Footer />
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    }
}
export default withSession(IklanSaya)