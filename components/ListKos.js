import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import CampaignItem from './CampaignItem'

class ListKos extends Component {
    render() {
        const { data, category } = this.props
        const skeletonArr = [1, 2, 3, 4, 5]
        let listData = [];
        if (category !== null) {
            listData = data.filter(i => i.category === category)
        } else {
            listData = data
        }
        return (
            <div className="container pb-3">
                <div className="grid grid-cols-2 gap-3">
                    {
                        !data &&
                        skeletonArr.map((item, index) =>
                            <div key={index}>
                                <div className="border rounded-xl overflow-hidden">
                                    <div className="animate-pulse w-full h-40 bg-gray-300" />
                                    <div className="px-3 py-3">
                                        <div className="animate-pulse px-2 my-1 w-32 h-4 bg-gray-300" />
                                        <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        data && data.length > 0 &&
                        <>
                            {
                                listData.map((item, index) => <CampaignItem key={index} item={item} />)
                            }
                        </>
                    }
                </div>
            </div>
        )
    }
}
ListKos.propTypes = {
    data: arrayOf(shape({})),
    category: string
}
ListKos.defaultProps = {
    data: null,
    category: null
}
export default ListKos;