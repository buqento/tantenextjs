import React from 'react'
import { arrayOf, shape } from 'prop-types'
import CampaignItem from './CampaignItem_'
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
FeedsGrid.propTypes = {
    data: arrayOf(shape({})),
}
FeedsGrid.defaultProps = {
    data: null
}
export default FeedsGrid