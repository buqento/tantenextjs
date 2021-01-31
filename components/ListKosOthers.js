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
        const { data: listData, detail } = this.props
        let url = '/search/all'
        if (listData.length > 5) url = '/search/bulan?province=' + Generateslug(detail.location.province) + '&city=' + Generateslug(detail.location.city) + '&district=' + Generateslug(detail.location.district)
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="mt-3">
                        <div className="py-3 font-bold">
                            <span className="font-normal">Lainnya di </span>
                            <span>{`${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}</span>
                        </div>
                        <div className="divide-y">
                            {
                                listData
                                    .sort(
                                        function compare(a, b) {
                                            const dtModifiedA = b.date_modified;
                                            const dtModifiedB = a.date_modified;
                                            let comparison = 0;
                                            if (dtModifiedA > dtModifiedB) {
                                                comparison = 1;
                                            } else if (dtModifiedA < dtModifiedB) {
                                                comparison = -1;
                                            }
                                            return comparison;
                                        }
                                    )
                                    .slice(0, 5).map((item, index) => <CampaignItemList key={index} item={item} />)
                            }
                        </div>
                    </div>
                }
                {
                    listData.length > 5 &&
                    <div className="border-top">
                        <a href={url}>
                            <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3">
                                <span>Lihat {listData.length - 5} Lainnya</span>
                            </div>
                        </a>
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