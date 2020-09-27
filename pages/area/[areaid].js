import React from 'react'
import { string } from 'prop-types'
import { DataKos } from '../../utils/modals/fakeDb'
import Firstupper from '../../utils/Firstupper'
import HeadPage from '../../components/HeadPage'
import ListKos from '../../components/ListKos'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.areaid }
    }

    render() {
        const { slug } = this.props;
        const data = DataKos.filter(item => item.location_title === slug)
        let headTitle = "";
        slug.split("-").map(index => headTitle += Firstupper(index)+" ")
        return (
            <div className="main-layout">
                <HeadPage title={headTitle} />
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