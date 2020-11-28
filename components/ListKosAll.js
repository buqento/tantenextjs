import React, { Component } from 'react'
import { arrayOf, shape, string, bool } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Generateslug from '../utils/Generateslug'
class ListKosAll extends Component {
    constructor(props) {
        super(props);
        this.state = { activePage: 1, countPerPage: 10 };
    }
    handlePageChange(pageNumber) { this.setState({ activePage: pageNumber }); }
    render() {
        const { data, load } = this.props
        const skeletonArr = [1, 2, 3, 4, 5]
        return (
            <div className="container pb-3">
                <div className="grid grid-cols-2 gap-3">
                    {
                        load &&
                        skeletonArr.map((index) =>
                            <div key={index}>
                                <div className="shadow-md rounded-xl overflow-hidden">
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
                            .map((item, index) =>
                                <div key={index}>
                                    <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                        <div className="rounded-xl overflow-hidden shadow-md">
                                            <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} />
                                            <div className="px-3 py-3 text-center">
                                                <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                                                <div className="text-current leading-none clamp-1"><small>{item.location.district}</small></div>
                                                <div className="text-current uppercase leading-none clamp-1"><small>{item.location.province}</small></div>
                                                <div>
                                                    {
                                                        item.facilities.includes("AC") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-indigo-500 bg-gray-200 mr-1">AC</span>
                                                    }
                                                    {
                                                        item.facilities.includes("Kamar Mandi Dalam") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-indigo-500 bg-gray-200">KM. Dalam</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}
ListKosAll.propTypes = {
    data: arrayOf(shape({})),
    category: string,
    load: bool
}
ListKosAll.defaultProps = {
    data: null,
    category: null,
    load: true
}
export default ListKosAll;