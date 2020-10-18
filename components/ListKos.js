import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Card, Container } from 'react-bootstrap'

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
                                            <Link href={`https://tantekos.com/${item.slug}`}>
                                                <Card variant="top">
                                                    <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=155/${item.images[0]}`} />
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