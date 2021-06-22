import React from 'react'
import CampaignItem from './CampaignItem'
class FeedsGrid extends React.Component {
    render() {
        const { data } = this.props
        return (
            <>
                {
                    data.map((item, index) =>
                        <div key={index}>
                            <CampaignItem key={index} item={item} />
                        </div>
                    )
                }
            </>
        )
    }
}
export default FeedsGrid