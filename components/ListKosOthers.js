import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Pagination from "react-js-pagination";
import Generateslug from '../utils/Generateslug'
class ListKosOthers extends Component {
    constructor(props) {
        super(props);
        this.state = { activePage: 1, countPerPage: 10 };
    }
    handlePageChange(pageNumber) { this.setState({ activePage: pageNumber }); }
    render() {
        const { data, item } = this.props
        const { countPerPage } = this.state
        let listData = [];
        item.category !== null ? listData = data.filter(i => i.category === item.category) : listData = data
        return (
            <div className="container">
                <div className="py-3 font-bold">
                    {`${item.category} lain di ${item.location.title}`}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    {
                        listData
                            .reverse()
                            .map((item, index) =>
                                <div key={index}>
                                    <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                        <div className="rounded-xl overflow-hidden shadow-sm border">
                                            <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=125/${item.images[0]}`} alt={item.title} />
                                            <div className="px-3 py-3 text-center">
                                                <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                                                <div className="text-current leading-tight clamp-3"><small>{item.title}</small></div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
                {
                    listData.length > countPerPage &&
                    <div className="mb-3">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={countPerPage}
                            totalItemsCount={listData.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                }
            </div>
        )
    }
}
ListKosOthers.propTypes = {
    data: arrayOf(shape({})),
    item: shape({})
}
ListKosOthers.defaultProps = {
    data: null,
    item: null,
}
export default ListKosOthers;