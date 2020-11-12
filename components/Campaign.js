import React, { Component } from 'react'
import DragScroll from './DragScroll'
import { Kost } from '../utils/modals/Kost'
import { Kontrakan } from '../utils/modals/Kontrakan'
import CampaignItem from './CampaignItem'
import { string } from 'prop-types'

class Campaign extends Component {
    render() {
        const { filter } = this.props;
        let data = null
        filter === 'Kost' ? data = Kost : data = Kontrakan
        return (
            <div className="my-3">
                <DragScroll className="scroll-section flex">
                    <div className="flex ml-3">
                        {
                            data
                                .sort(function (a, b) { return b.id - a.id })
                                .slice(0, 8)
                                .map((item, index) => <CampaignItem key={index} item={item} />)
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