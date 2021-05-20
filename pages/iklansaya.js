import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import Layout from '../components/Layout'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import withAuth from '../helpers/withAuth';
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
class IklanSaya extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            load: true
        }
    }
    componentDidMount() {
        const { userdata } = this.props
        const dt = fire.firestore().collection('kosts')
        dt.where('user.uid', '==', userdata.uid)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ data, load: false })
            })
    }
    render() {
        const { load, data } = this.state
        return <Layout title="Iklan Saya" withHeader>
            {
                load ? <CampaignItemListSkeleton /> :
                    data && data.length > 0 &&
                    <>
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
                    </>
            }
            {
                data && data.length === 0 &&
                <div>
                    <Message title="Belum ada iklan" message="Kamu belum memiliki Iklan Aktif. Silahkan membuat iklan baru" />
                    <div className="mx-3 my-4">
                        <Link href="post">
                            <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3 cursor-pointer">
                                <span><MdAdd className="inline mb-1 mr-1" />Buat Iklan</span>
                            </div>
                        </Link>


                    </div>
                </div>
            }
        </Layout>
    }
}
export default withAuth(IklanSaya)