import React from 'react'
import CampaignItem from './CampaignItem'
import CampaignItemSkeleton from './CampaignItemSkeleton'
import Link from 'next/link'
class FeedsGrid extends React.Component {
    render() {
        const { data, load } = this.props
        const limit = 5
        return (
            <div className="mb-3">
                {
                    load ? <CampaignItemSkeleton /> :
                        <>
                            <div>
                                {
                                    data.slice(0, limit).map((item, index) => <CampaignItem key={index} item={item} />)
                                }
                            </div>
                            <Link href="/location">
                                <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline my-3 py-3 mx-3">
                                    {
                                        data.length > limit ? <span>Lihat {data.length - limit} Kost Lainnya</span> : <span>Cari Lebih Banyak</span>
                                    }
                                </div>
                            </Link>
                        </>
                }
            </div>
        )
    }
}
export default FeedsGrid