import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Kost } from '../utils/modals/Kost'
import CampaignItem from './CampaignItem'
import { string } from 'prop-types'

class Campaign extends Component {
    render() {
        const { filter } = this.props;
        return (
            <div className="mt-3 mb-3">
                <DragScroll className="scroll-section d-flex pl-16">
                    <div className="d-flex ml-3">
                        {
                            Kost
                                .filter(item => item.category === filter)
                                .sort(function(a, b){return b.id - a.id})
                                .slice(0, 5)
                                .map((item, index) => <CampaignItem key={index} item={item} />
                                )
                        }
                    </div>
                </DragScroll>
            </div>
        )
    }
}
Campaign.propTypes = {
    filter: string
}
Campaign.defaultProps = {
    filter: null
}
export default Campaign