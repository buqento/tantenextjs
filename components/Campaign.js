import React from 'react'
import DragScroll from './DragScroll'
import CampaignItem from './CampaignItem'
import { string } from 'prop-types'
import fire from '../configurations/firebase'

class Campaign extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true,
            skeletonArr: [1, 2, 3]
        }
    }
    async componentDidMount() {
        const { filter } = this.props
        const docRef = await fire
            .firestore().collection('kosts').where("category", "==", filter)
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, load: false })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { data, load, skeletonArr } = this.state;
        return (
            <div className="my-3">
                <DragScroll className="scroll-section flex">
                    {
                        load ?
                            <div className="flex ml-3">
                                {
                                    skeletonArr.map((item, index) =>
                                        <div key={index} className="rounded-xl overflow-hidden border mr-3 mb-2" style={{ width: '200px' }}>
                                            <div className="animate-pulse w-full h-48 bg-gray-300" />
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
                                    !load && data && data
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
                                        .slice(0, 10)
                                        .map((item, index) => <CampaignItem key={index} item={item} customStyle="mr-3 mb-2" />)
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