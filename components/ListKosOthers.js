import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import CampaignItemList from '../components/CampaignItemList'
import Generateslug from '../utils/Generateslug'
import Link from 'next/link'
class ListKosOthers extends Component {
    render() {
        const { data: listData, detail } = this.props
        let url = '/search/all'
        if (listData.length > 10) url = '/search/bulan?province=' + Generateslug(detail.location.province) + '&city=' + Generateslug(detail.location.city) + '&district=' + Generateslug(detail.location.district)
        return (
            <>
                {
                    listData.length > 0 &&
                    <div>
                        <div className="py-3 font-bold">
                            <span className="font-normal">Kost Lainnya di </span>
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
                                    .slice(0, 10).map((item, index) => <div key={index}><CampaignItemList key={index} item={item} /></div>)
                            }
                        </div>
                    </div>
                }
                {
                    listData.length > 10 ?
                        <div>
                            <Link href={url}>
                                <div className="cursor-pointer align-middle text-center text-indigo-700 underline font-bold uppercase py-3">
                                    <span>Lihat {listData.length - 10} Lainnya</span>
                                </div>
                            </Link>
                        </div> :
                        <div>
                            <Link href='/location'>
                                <div className="cursor-pointer align-middle text-center text-indigo-700 underline font-bold uppercase py-3">Cari Kost Lainnya</div>
                            </Link>
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