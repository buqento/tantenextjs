import React from 'react'
import CampaignItem from './CampaignItem'
import Ads from './Ads'
class FeedsGrid extends React.Component {
    render() {
        const { data } = this.props
        return (
            <>
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
            </>
        )
    }
}
export default FeedsGrid