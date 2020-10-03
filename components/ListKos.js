import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Media, Container } from 'react-bootstrap'

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
            <>
                {
                    data.length > 0 ?
                        <div style={{ borderTop: '8px solid #f5f5f5' }}>
                            <Container className="mt-3">
                                {
                                    listData.map((item, index) =>
                                        <div key={index} className="pb-3">
                                            <Link href={`https://tantekos.com/${item.slug}`}>
                                                <Media>
                                                    <img
                                                        width={64}
                                                        height={64}
                                                        className="mr-3"
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                    />
                                                    <Media.Body>
                                                        <p>{item.title}</p>
                                                    </Media.Body>
                                                </Media>
                                            </Link>
                                        </div>
                                    )
                                }
                            </Container>
                        </div>
                        :
                        <Container className="mt-3">
                            <div>
                                Ups! Pencarian tidak ada hasil.
                            </div>
                            <Link href="/">Kembali ke Beranda</Link>
                        </Container>
                }
            </>
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