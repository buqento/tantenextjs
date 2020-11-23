import React, { Component } from 'react'
import DragScroll from './DragScroll'
import CampaignItem from './CampaignItem'
import { string } from 'prop-types'
import fire from '../config/fire-config'

class Campaign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            skeletonArr: [1, 2, 3]
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
        const { data, skeletonArr } = this.state;
        return (
            <div className="my-3">
                <DragScroll className="scroll-section flex">
                    {
                        !data ?
                            <div className="flex ml-3">
                                {
                                    skeletonArr.map((item, index) =>
                                        <div key={index} className="rounded-xl overflow-hidden shadow-md mr-3 mb-2" style={{ width: '140px' }}>
                                            <div className="animate-pulse w-full h-32 bg-gray-300" />
                                            <div className="px-3 py-3">
                                                <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
                                                <div className="animate-pulse px-2 my-1 w-12 h-4 bg-gray-300" />
                                                <div className="animate-pulse px-2 my-1 w-6 h-4 bg-gray-300" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div className="flex ml-3">
                                {
                                    data
                                        .sort(
                                            function compare(a, b) {
                                                const dtModifiedA = a.date_modified;
                                                const dtModifiedB = b.date_modified;
                                                let comparison = 0;
                                                if (dtModifiedA < dtModifiedB) {
                                                    comparison = 1;
                                                } else if (dtModifiedA > dtModifiedB) {
                                                    comparison = -1;
                                                }
                                                return comparison;
                                            }
                                        )
                                        .slice(0, 8)
                                        .map((item, index) => <CampaignItem key={index} item={item} />)
                                }
                            </div>
                    }
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