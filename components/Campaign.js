import React, { Component } from 'react'
import DragScroll from './DragScroll'
import CampaignItem from './CampaignItem'
import { string } from 'prop-types'
import fire from '../config/fire-config';

class Campaign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    componentDidMount() {
        const { filter } = this.props;
        fire.firestore().collection('kosts').where("category", "==", filter)
            .onSnapshot(snap => {
                const data = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                this.setState({ data })
            })
    }
    render() {
        const { data } = this.state;
        return (
            <div className="my-3">
                <DragScroll className="scroll-section flex">
                    <div className="flex ml-3">
                        {
                            data && data
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