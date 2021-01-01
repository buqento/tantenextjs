import React from 'react'
import CampaignItem from './CampaignItem'
import fire from '../configurations/firebase'

class FeedsGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true,
            skeletonArr: [1, 2, 3, 4]
        }
    }
    async componentDidMount() {
        const docRef = await fire
            .firestore().collection('kosts').orderBy('date_modified', 'desc').limit(4)
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
            <div className="mb-3">
                    {
                        load ?
                            <div className="grid grid-cols-2 gap-3 mx-3">
                                {
                                    skeletonArr.map((item, index) =>
                                        <div key={index} className="rounded-xl overflow-hidden border">
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
                            <div className="grid grid-cols-2 gap-3 mx-3">
                                {
                                    !load && data && data
                                        .map((item, index) => <CampaignItem key={index} item={item} />)
                                }
                            </div>
                    }
            </div>
        )
    }
}
export default FeedsGrid