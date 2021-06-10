import React from 'react'
import CampaignItem from './CampaignItem'
import Link from 'next/link'
import AdSense from 'react-adsense'
class FeedsGrid extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div className="mb-3">
                <div>
                    {
                        data.map((item, index) =>
                            <div key={index}>
                                {
                                    index === 1 &&
                                    <div className="mx-3 my-2">
                                        <AdSense.Google
                                            client='ca-pub-1434074630735871'
                                            slot='3178716891'
                                            className="h-64 w-full"
                                            format='auto'
                                        />
                                    </div>
                                }
                                <CampaignItem key={index} item={item} />
                            </div>
                        )
                    }
                </div>
                <Link href="/location">
                    <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline my-3 py-3 mx-3">Cari Kost Lainnya</div>
                </Link>
            </div>
        )
    }
}
export default FeedsGrid