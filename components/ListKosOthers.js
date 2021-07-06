import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import CampaignItemList from '../components/CampaignItemList'
import Generateslug from '../utils/Generateslug'
import Link from 'next/link'
class ListKosOthers extends Component {
    render() {
        const { data: listData, lengthOther, detail } = this.props
        const url = '/search/bulan?province=' + Generateslug(detail.location.province) + '&city=' + Generateslug(detail.location.city) + '&district=' + Generateslug(detail.location.district)
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="mt-3">
                        <div>
                            <div className="py-2 font-bold">
                                {lengthOther} Other Room{lengthOther > 1 ? 's' : ''} in {`${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}
                            </div>
                            <div className="divide-y">
                                {
                                    listData
                                        .sort(function compare(a, b) {
                                            const itemA = a.price.start_from
                                            const itemB = b.price.start_from
                                            let comparison = 0
                                            if (itemA > itemB) comparison = 1
                                            if (itemA < itemB) comparison = -1
                                            return comparison
                                        })
                                        .slice(0, 10).map((item, index) => <div key={index}><CampaignItemList key={index} item={item} /></div>)
                                }
                            </div>
                        </div>
                    </div>
                }
                {
                    lengthOther > 5 ?
                        <div>
                            <Link href={url}>
                                <div className="cursor-pointer align-middle text-center text-indigo-700 underline font-bold uppercase py-3">
                                    <span>View {lengthOther - 5} More</span>
                                </div>
                            </Link>
                        </div> :
                        <div>
                            <Link href='/location'>
                                <div className="cursor-pointer align-middle text-center text-indigo-700 underline font-bold uppercase py-3">Search Other Location</div>
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