import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import Currency from './Currency'
import Pagination from "react-js-pagination";
import Generatelink from '../utils/Generatelink'

class ListKosAll extends Component {
    constructor(props) {
        super(props);
        this.state = { activePage: 1, countPerPage: 10 };
    }
    handlePageChange(pageNumber) { this.setState({ activePage: pageNumber }); }
    render() {
        const { data, category } = this.props
        const { activePage, countPerPage } = this.state
        let listData = [];
        category !== null ? listData = data.filter(i => i.category === category) : listData = data
        let lastId = 10;
        let firstId = 1;
        lastId = activePage * countPerPage
        firstId = lastId - countPerPage + 1
        return (
            <div className="container pb-3">
                <div className="row">
                    {
                        data.length > 0 ?
                            <>
                                {
                                    listData
                                        .reverse()
                                        .filter(item => item.id >= firstId && item.id <= lastId)
                                        .map((item, index) =>
                                            <div key={index} className="col-6 pt-3">
                                                <Link href={`https://tantekos.com/${Generatelink(item.title)}`}>
                                                    <Card variant="top">
                                                        <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=155/${item.images[0]}`} alt={item.title} />
                                                        <ListGroup className="list-group-flush text-center">
                                                            <ListGroupItem variant="secondary font-weight-bold">{Currency(item.start_price, false)}</ListGroupItem>
                                                        </ListGroup>
                                                        <div className="m-2 text-center kost-title">{item.title}</div>
                                                    </Card>
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
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={countPerPage}
                        totalItemsCount={data.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
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