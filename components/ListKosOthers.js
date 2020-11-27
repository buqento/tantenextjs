import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
// import Pagination from "react-js-pagination";
import Generateslug from '../utils/Generateslug'
import moment from 'moment';
class ListKosOthers extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { activePage: 1, countPerPage: 10 };
    // }
    // handlePageChange(pageNumber) { this.setState({ activePage: pageNumber }); }
    render() {
        const { data, detail } = this.props
        // const { countPerPage } = this.state
        let listData = [];
        detail.category !== null ? listData = data.filter(i => (i.category === detail.category && i.location.district === detail.location.district)) : listData = data
        return (
            <>
                {
                    listData.length > 0 &&
                    <div>
                        <div className="py-3 font-bold">
                            {`${detail.category} lain di ${detail.location.district}`}
                        </div>
                        {
                            listData
                                .reverse()
                                .map((kost, index) =>
                                    <Link key={index} href={`../${Generateslug(kost.title)}`}>
                                        <div className="rounded-xl w-full overflow-hidden mb-3">
                                            <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                            <div className="mx-3">
                                                <div className="font-bold">{Currency(kost.start_price, false)}</div>
                                                <div className="leading-none clamp-3"><small>{kost.title}</small></div>
                                                <small className="text-gray-700">{moment(kost.date_modified).fromNow()}</small>
                                            </div>
                                        </div>
                                    </Link>
                                )
                        }
                        {/* {
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
                } */}
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