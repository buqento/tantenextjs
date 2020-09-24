import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import { Media, Container } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

class ListKos extends Component {
    render() {
        const { data, category } = this.props
        return (
            <div style={{borderTop: '8px solid gainsboro'}}>
            <p className={`ml-3 ${styles.headingtwo}`}>{category} Lainnya</p>

                <Container className="mt-3">
                {
                    data.filter(i => i.category === category)
                    .map((item, index) =>
                        <div key={index} className="pb-3">
                            <Link href={item.slug}>
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