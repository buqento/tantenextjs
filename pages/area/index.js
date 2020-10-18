import React from 'react'
import { DtArea } from '../../utils/modals/Area'
import HeadPage from '../../components/HeadPage'
import { Card } from 'react-bootstrap'
import Link from 'next/link'

class AreaList extends React.Component {
    render() {
        return <>
            <div className="main-layout">
                <HeadPage title="Semua Area" />
            </div>
            <div className="container pb-3">
                <div className="row">
                    {
                        DtArea
                            .sort(function (a, b) {
                                var nameA = a.slug.toUpperCase();
                                var nameB = b.slug.toUpperCase();
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            })
                            .map((item, index) =>
                                <div key={index} className="col-6 pt-3">
                                    <Link href={`area/${item.slug}`}>
                                        <Card variant="top">
                                            <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=155/${item.image}`} />
                                            <div className="m-2 text-center text-uppercase">{item.title}</div>
                                        </Card>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    }
}

export default AreaList;