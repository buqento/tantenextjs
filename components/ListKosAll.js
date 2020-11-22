import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
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
        const { data } = this.props
        return (
            <div className="container pb-3">
                <div className="grid grid-cols-2 gap-3">
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
                            .map((item, index) =>
                                <div key={index}>
                                    <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                        <div className="rounded-xl overflow-hidden shadow-md">
                                            <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} />
                                            <div className="px-3 py-3 text-center">
                                                <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                                                {/* <div className="text-current leading-tight clamp-3"><small>{item.title}</small></div> */}
                                                <div className="text-current leading-none clamp-1"><small>{item.location.district}</small></div>
                                                <div className="text-current uppercase leading-none clamp-1"><small>{item.location.province}</small></div>

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
    category: string
}
ListKosAll.defaultProps = {
    data: null,
    category: null
}
export default ListKosAll;