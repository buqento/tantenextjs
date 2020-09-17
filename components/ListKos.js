import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import { Media, Container } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

class ListKos extends Component {
    render() {
        const { data } = this.props
        return (
            <div style={{borderTop: '8px solid gainsboro'}}>
            <p className={`ml-3 ${styles.headingtwo}`}>Kos Lainnya</p>

                <Container className="mt-3">
                {
                    data.map((item, index) =>
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
    data: arrayOf(shape({}))
}

ListKos.defaultProps = {
    data: null
}

export default ListKos;