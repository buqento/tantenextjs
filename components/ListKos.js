import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
import Currency from './Currency'
import Generatelink from '../utils/Generatelink'

class ListKos extends Component {
    render() {
        const { data, category } = this.props
        let listData = [];
        if (category !== null) {
            listData = data.filter(i => i.category === category)
        } else {
            listData = data
        }
        return (
            <div className="container pb-3">
                <div className="row">
                    {
                        data.length > 0 ?
                            <>
                                {
                                    listData.map((item, index) =>
                                        <div key={index} className="col-6 pt-3">
                                            <Link href={`https://tantekos.com/${Generatelink(item.title)}`}>
                                                <Card variant="top">
                                                    <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=155/${item.images[0]}`} alt={item.title} />
                                                    <ListGroup className="list-group-flush text-center">
                                                        <ListGroupItem className="font-bold">{Currency(item.start_price, false)}</ListGroupItem>
                                                    </ListGroup>
                                                    <div className="m-2 text-center leading-tight clamp-3">{item.title}</div>
                                                </Card>
                                            </Link>
                                        </div>
                                    )
                                }
                            </>
                            :
                            <Container>
                                <div className="container-center text-center">
                                    <Link href="/">Kembali ke Beranda</Link>
                                </div>
                            </Container>
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