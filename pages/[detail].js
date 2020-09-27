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
import Currency from '../components/Currency'
import Firstupper from '../utils/Firstupper'

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
    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${data[0].title}",
          "item": "https://tantekos.com/${slug}"
        }]
     }`

    const structureTypeNewsArticle = `{
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${`https://tantekos.com/${slug}`}"
      },
      "headline": "${data[0].title}",
      "image": [${data[0].images.map(item => `"${item}"`)}],
      "dateModified":"${data[0].date_modified}",
      "datePublished":"${data[0].date_published}",
      "author": {
        "@type": "Person",
        "name": "Bvqento Richard"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Tantekos",
        "logo": {
          "@type": "ImageObject",
          "url": "https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true"
        }
      },
      "articleBody": "${data[0].description}",
      "url": "${`https://tantekos.com/${slug}`}"
    }`

    const structureDetailPage = {
      '@graph': [
        JSON.parse(structureTypeNewsArticle),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    };

    let headTitle = "";
    data[0].location_title.split("-").map(index => headTitle += Firstupper(index)+" ")

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
          <script type="application/ld+json">{JSON.stringify(structureDetailPage)}</script>
        </NextHead>
      }
      {
        data && data[0] &&
        <div className="main-layout">
          <HeadPage title={data[0].category +' '+headTitle} />
          <Slide imagesData={data[0].images} imageTitle={data[0].title} />
          <Container className="mb-3">
            <div className="pt-3">
              <h1>
                <Card.Title>{data[0].title}</Card.Title>
              </h1>
              <div className="pt-1">
                <p className={styles.headingtwo}>Deskripsi {data[0].category}</p>
                {data[0].description}
              </div>
              <div>
                <p className={styles.headingtwo}>Fasilitas {data[0].category}</p>
                {data[0].facilities.map((item, index) => <li key={index}>{item}</li>)}
              </div>
              <div>
                <p className={styles.headingtwo}>Lokasi {data[0].category}</p>
                {data[0].location_title}
              </div>
              {
                data[0].start_price > 0 &&
                <div>
                  <p className={styles.headingtwo}>Harga {data[0].category} Mulai</p>
                  {Currency(data[0].start_price)}
                </div>
              }
              <div className="border-top mt-3">
                {
                  data[0].post_url !== '' &&
                  <div className="pt-3">
                    <small>
                      <a href={data[0].post_url} target="blank">* Kunjungi link terkait</a>
                    </small>
                  </div>
                }
                <small>
                  * Data dapat berubah sewaktu-waktu, tanyakan data saat ini.
                </small>
              </div>
            </div>
          </Container>
          <div style={{ marginBottom: '55px' }}>
            <ListKos data={otherItems} category={data[0].category} />
          </div>
          <FooterDetail className="fix-footer footer-detail" contactUs={data[0].contact_us} />
        </div>
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