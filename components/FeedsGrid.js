import React from 'react'
import CampaignItemList from './CampaignItemList'
import fire from '../configurations/firebase'
import { BiWinkSmile } from 'react-icons/bi'
class FeedsGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true,
            limit: 5,
            skeletonArr: [1, 2, 3]
        }
    }
    async componentDidMount() {
        const docRef = await fire
            .firestore().collection('kosts').orderBy('date_modified', 'desc').limit(3)
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
        const { data, limit, load, skeletonArr } = this.state
        const { filterData } = this.props
        return (
            <div className="mb-3">
                {
                    filterData ?
                        <>

                            {
                                filterData.length > 0
                                    ?
                                    <>
                                        <div className="mx-3 divide-y-2">
                                            {
                                                filterData
                                                    .slice(0, limit)
                                                    .map((item, index) => <CampaignItemList key={index} item={item} />)
                                            }
                                        </div>
                                        <a href="/search">
                                            <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3">
                                                {
                                                    filterData.length > limit ?
                                                        <span>Lihat {filterData.length - limit} Kost Lainnya</span> : <span>Cari Lebih Banyak</span>
                                                }
                                            </div>
                                        </a>
                                    </>
                                    :
                                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                        <p className="font-bold">Tidak Ditemukan</p>
                                        <p className="text-sm"><BiWinkSmile size={22} className="inline mr-1 mb-1" />Silahkan cari dengan kriteria lainnya</p>
                                    </div>
                            }
                        </>

                        :
                        load ?
                            <div className="mx-3">
                                {
                                    skeletonArr.map((item, index) =>
                                        <div key={index} className="border border-gray-300 rounded-md p-4 max-w-sm w-full mx-auto my-3">
                                            <div className="animate-pulse flex space-x-4">
                                                <div className="bg-gray-400 h-24 w-24"></div>
                                                <div className="flex-1 space-y-4 py-1">
                                                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
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
                            <div className="mx-3 divide-y-2">
                                {
                                    !load && data && data
                                        .map((item, index) => <CampaignItemList key={index} item={item} />)
                                }
                            </div>
                }
            </div>
        )
    }
}
export default FeedsGrid