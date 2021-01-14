import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
class ListKosOthers extends Component {
    async handleHit(id, hit) {
        await fire.firestore().collection("kosts").doc(id).update({ hit }).catch(err => { console.log(err) })
    }
    render() {
        const { data, detail } = this.props
        let listData = [];
        detail.category !== null ? listData = data.filter(i => (i.category === detail.category && i.location.district === detail.location.district)) : listData = data
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="mt-3">
                        <div className="py-3 font-bold">
                            <span className="font-normal">{`${detail.category} lain di `}</span>
                            <span>{`${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}</span>
                        </div>
                        <div className="divide-y-2">
                            {
                                listData.reverse().slice(0, 5).map((item, index) => <CampaignItemList key={index} item={item} />)
                            }
                        </div>
                    </div>
                }
            </>
        )
    }
}
ListKosOthers.propTypes = {
    data: arrayOf(shape({})),
    detail: shape({}),
    item: shape({})
}
ListKosOthers.defaultProps = {
    data: null,
    detail: null,
    item: null,
}
export default ListKosOthers;