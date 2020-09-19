import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'
import { Container, Card } from 'react-bootstrap'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import ListKos from '../components/ListKos'
import HeadPage from '../components/HeadPage'
import styles from '../styles/Home.module.css'

class Detail extends React.Component {
  static async getInitialProps(ctx) {
    const items = await fetch('https://5de747e7b1ad690014a4e0d2.mockapi.io/room')
    const dataItems = await items.json()
    return { allItems: dataItems, slug: ctx.query.detail }
  }

  render() {
    const { allItems, slug } = this.props;
    const data = allItems.filter(item => item.slug === slug)
    const otherItems = allItems.filter(item => item.slug !== slug)
    return <>
      {
        data && data[0] &&
        <NextHead>
          <meta property="og:title" content={data[0].title} />
          <meta property="og:description" content={data[0].description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://tantekos.com/${slug}`} />
          <meta property="og:image" content={data[0].images[0]} />
          <meta property="og:image:alt" content={data[0].title} />
          <meta property="og:locale" content="id" />
          <meta property="og:site_name" content="Tantekos" />
        </NextHead>
      }
      {
        data && data[0] &&
        <>
          <HeadPage />
          <Slide imagesData={data[0].images} imageTitle={data[0].title} />
          <Container className="mb-3">
            <div className="pt-3">
              <h1>
                <Card.Title>{data[0].title}</Card.Title>
              </h1>
              <div>{data[0].description}</div>
              <div>
                <p className={styles.headingtwo}>Fasilitas</p>
                {
                  data[0].facilities.map((item, index) => <li key={index}>{item}</li>)
                }
              </div>
            </div>
          </Container>
          <div style={{ marginBottom: '50px' }}>
            <ListKos data={otherItems} />
            </div>
          <FooterDetail className="fix-footer footer-detail" contactUs={data[0].contact_us} />
        </>
      }
    </>
  }
}

Detail.propTypes = {
  allItems: arrayOf(shape({})),
  slug: string
}

Detail.defaultProps = {
  allItems: null,
  slug: ''
}
export default Detail;