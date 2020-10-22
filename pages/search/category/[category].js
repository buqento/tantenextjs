import React from 'react'
import { string } from 'prop-types'
import { Kost } from '../../../utils/modals/Kost'
import HeadPage from '../../../components/HeadPage'
import ListKosAll from '../../../components/ListKosAll'

class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.category }
    }

    render() {
        const { slug } = this.props;
        const data = Kost.filter(item => item.category === slug)
        return (
            <>                
                <div className="main-layout">
                    <HeadPage title={`Semua ${slug}`} />
                    <ListKosAll data={data} />
                </div>
            </>
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