import React from 'react'
import CampaignItem from './CampaignItem'
import Link from 'next/link'
import AdSense from 'react-adsense'
class FeedsGrid extends React.Component {
    render() {
        const { data } = this.props
        return (
            <div>
                <div>
                    {
                        data.map((item, index) =>
                            <div key={index}>
                                {
                                    index === 2 &&
                                    <div className="mx-3 my-2">
                                        <AdSense.Google
                                            client='ca-pub-1434074630735871'
                                            slot='5011678900'
                                            className="w-full bg-gray-400 text-center"
                                            format='auto'
                                        />
                                    </div>
                                }
                                <CampaignItem key={index} item={item} />
                            </div>
                        )
                    }
                    <div className="mx-3 my-3">
                        {/* vertical ads */}
                        <AdSense.Google
                            client='ca-pub-1434074630735871'
                            slot='3178716891'
                            className="w-full bg-gray-400 text-center"
                            format='auto'
                        />
                    </div>
                </div>
                <Link href="/location">
                    <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline py-3 mx-3">Cari Kost Lainnya</div>
                </Link>
            </div>
        )
    }
}
export default FeedsGrid