import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'
import { Container, Card } from 'react-bootstrap'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import ListKos from '../components/ListKos'
import HeadPage from '../components/HeadPage'
import styles from '../styles/Home.module.css'
import { DataKos } from '../utils/modals/fakeDb'

class Detail extends React.Component {
  static async getInitialProps(ctx) {
    // const items = await fetch('https://5de747e7b1ad690014a4e0d2.mockapi.io/room')
    // const dataItems = await items.json()
    return { slug: ctx.query.detail }
  }

  render() {
    const { slug } = this.props;
    const data = DataKos.filter(item => item.slug === slug)
    const otherItems = DataKos.filter(item => item.slug !== slug)
    const structureData = `{
      "@context": "https://schema.org",
      "@id": "#product",
      "@type": "IndividualProduct",
      "additionalType": "${`https://tantekos.com/${slug}`}",
      "description": "${data[0].description}",
      "name": "${data[0].title}",
      "image": "${data[0].images[0]}"
  }`
    return <>
      {
        data && data[0] &&
        <NextHead>
          <title>{data[0].title}</title>
          <meta name="googlebot" content="index, follow" />
          <meta name="robot" content="index, follow" />
          <meta name="application-name" content="Tantekos" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="title" content={data[0].title} />
          <meta name="description" content={data[0].description} />
          <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${data[0].keywords}`} />
          <meta property="og:title" content={data[0].title} />
          <meta property="og:description" content={data[0].description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://tantekos.com/${slug}`} />
          <meta property="og:image" content={data[0].images[0]} />
          <meta property="og:image:alt" content={data[0].title} />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Tantekos" />
          <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <link rel="canonical" content={`https://tantekos.com/${data[0].slug}`} />
          <script type="application/ld+json">{structureData}</script>
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
              <div>
                <p className={styles.headingtwo}>Deskripsi Kost</p>
                {data[0].description}
              </div>
              <div>
                <p className={styles.headingtwo}>Fasilitas Kost dan Kamar</p>
                {data[0].facilities.map((item, index) => <li key={index}>{item}</li>)}
              </div>
              <div>
                <p className={styles.headingtwo}>Lokasi Kost</p>
                {data[0].location_title}
              </div>
              <div className="border-top mt-3">
                <small>
                  * Data dapat berubah sewaktu-waktu, tanyakan data saat ini.
                </small>
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