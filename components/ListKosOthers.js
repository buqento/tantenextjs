import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import Currency from './Currency'
import Pagination from "react-js-pagination";
import Generatelink from '../utils/Generatelink'

class ListKosOthers extends Component {
    constructor(props) {
        super(props);
        this.state = { activePage: 1, countPerPage: 10 };
    }
    handlePageChange(pageNumber) { this.setState({ activePage: pageNumber }); }
    render() {
        const { data, category } = this.props
        const { countPerPage } = this.state
        let listData = [];        
        category !== null ? listData = data.filter(i => i.category === category) : listData = data
        return (
            <div className="container pb-3">
                <div className="row">
                    {
                        data.length > 0 ?
                            <>
                                {
                                    listData
                                        .reverse()
                                        .map((item, index) =>
                                            <div key={index} className="col-6 pt-3">
                                                <Link href={`https://tantekos.com/${Generatelink(item.title)}`}>
                                                    <div className="rounded overflow-hidden shadow-sm">
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
                            </>
                            :
                            <Container className="mt-3">
                                <div>
                                    Ups! Pencarian tidak ada hasil.
                            </div>
                                <Link href="/">Kembali ke Beranda</Link>
                            </Container>
                    }
                </div>
                <div className="d-flex justify-content-center mt-3">
                    {
                        listData.length > 0 && <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={countPerPage}
                        totalItemsCount={listData.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                    }                    
                </div>
            </div>
        )
    }
}

ListKosOthers.propTypes = {
    data: arrayOf(shape({})),
    category: string
}

ListKosOthers.defaultProps = {
    data: null,
    category: null
}

export default ListKosOthers;