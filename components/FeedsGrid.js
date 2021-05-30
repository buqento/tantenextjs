import React from 'react'
import CampaignItem from './CampaignItem'
import Generateslug from '../utils/Generateslug'
import fire from '../configurations/firebase'
import Message from './Message'
import CampaignItemSkeleton from './CampaignItemSkeleton'
import Link from 'next/link'
class FeedsGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true,
            limit: 5
        }
    }
    async componentDidMount() {
        const { limit } = this.state
        const docRef = await fire
            .firestore().collection('kosts')
            .where('is_active', '==', true)
            .orderBy('date_modified', 'desc').limit(limit)
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, load: false })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { data, limit, load } = this.state
        const { filterData, dataCallback } = this.props
        let url = '/search/all'
        if (filterData && filterData.length > limit) {
            if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province)
            }
            else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province) + '&city=' + Generateslug(dataCallback.city)
            } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province) + '&city=' + Generateslug(dataCallback.city) + '&district=' + Generateslug(dataCallback.district)
            }
        }
        return (
            <div className="mb-3">
                {
                    filterData ? <>
                        {
                            filterData.length > 0 ?
                                <>
                                    <div>
                                        {
                                            filterData.slice(0, limit).map((item, index) => <CampaignItem key={index} item={item} />)
                                        }
                                    </div>
                                    <Link href={url}>
                                        <div className="align-middle text-center text-indigo-700 font-bold uppercase underline my-3 py-3 mx-3">
                                            {
                                                filterData.length > limit ? <span>Lihat {filterData.length - limit} Kost Lainnya</span> : <span>Cari Lebih Banyak</span>
                                            }
                                        </div>
                                    </Link>
                                </>
                                :
                                <Message title="Tidak Ditemukan" message="Silahkan cari dengan kriteria lainnya" />
                        }
                    </> : load ? <CampaignItemSkeleton /> :
                        <div>
                            {!load && data && data
                                .map((item, index) =>
                                    <div className="my-3" key={index}>
                                        <CampaignItem key={index} item={item} />
                                    </div>
                                )}
                        </div>
                }
            </div>
        )
    }
}
export default FeedsGrid