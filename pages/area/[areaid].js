import React from 'react'
import { string } from 'prop-types'
import { DataKos } from '../../utils/modals/fakeDb'
import HeadPage from '../../components/HeadPage'
import ListKos from '../../components/ListKos'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.areaid }
    }

    render() {
        const { slug } = this.props;
        const data = DataKos.filter(item => item.location_title === slug)
        return (
            <div className="main-layout">
                <HeadPage title={slug} />
                <ListKos data={data} />
            </div>
        )
    }
}

Detail.propTypes = {
    slug: string
}

Detail.defaultProps = {
    slug: ''
}
export default Detail;