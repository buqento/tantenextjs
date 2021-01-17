import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Generateslug from '../utils/Generateslug'
class ListKosOthers extends Component {
    async handleHit(id, hit) {
        await fire.firestore().collection("kosts").doc(id).update({ hit }).catch(err => { console.log(err) })
    }
    render() {
        const { data, detail } = this.props
        let listData = []
        detail.category !== null ? listData = data.filter(i => (i.category === detail.category && i.location.district === detail.location.district)) : listData = data
        let url = '/search/all'
        if (listData.length > 5) url = '/search/bulan?province=' + Generateslug(detail.location.province) + '&city=' + Generateslug(detail.location.city) + '&district=' + Generateslug(detail.location.district)
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
                <div className="border-top">
                    <a href={url}>
                        <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3">
                            <span>Lihat {listData.length > 5 && listData.length - 5} {detail && detail.category} Lainnya</span>
                        </div>
                    </a>
                </div>
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