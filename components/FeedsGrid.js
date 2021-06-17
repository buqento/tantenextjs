import React from 'react'
import CampaignItem from './CampaignItem'
import Link from 'next/link'
import Ads from './Ads'
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
                                    index === 5 &&
                                    <div className="mx-3 my-2">
                                        <Ads />
                                    </div>
                                }
                                <CampaignItem key={index} item={item} />
                            </div>
                        )
                    }
                </div>
                <Link href="/location">
                    <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline py-3 mx-3">View More Rooms</div>
                </Link>
            </div>
        )
    }
}
export default FeedsGrid