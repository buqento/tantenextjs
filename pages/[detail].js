import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'
import Link from 'next/link'
import { Container, Card } from 'react-bootstrap'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import ListKos from '../components/ListKos'
import HeadPage from '../components/HeadPage'
import styles from '../styles/Home.module.css'
import { Kost } from '../utils/modals/Kost'
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
    let notFound = false;
    const data = Kost.filter(item => item.slug === slug)
    if (!data[0]) notFound = true;
    const otherItems = Kost.filter(item => item.slug !== slug)
    let locationTitle = "";
    data[0] && data[0].location.title.split("-").map(index => locationTitle += Firstupper(index) + " ")

    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${data[0] && data[0].title}",
          "item": "https://tantekos.com/${slug}"
        }]
     }`

    const structureTypeHostel = `{
      "@context": "https://schema.org",
      "@type": "Hostel",
      "image": [${data[0] && data[0].images.map(item => `"${item}"`)}],
      "@id": "https://tantekos.com",
      "name": "${data[0] && data[0].title}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${locationTitle}",
        "addressLocality": "Ambon",
        "addressRegion": "Maluku",
        "postalCode": "97117",
        "addressCountry": "ID"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Bvqento Richard"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -3.702935,
        "longitude": 128.163195 
      },
      "url": "${`https://tantekos.com/${slug}`}",
      "telephone": "${data[0] && data[0].contact_us.phone || '+6285243322433'}",
      "priceRange": "Rp50.000 - Rp1.500.000",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "IDR",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "375"
      },
      "contactPoint" : { 
        "@type" : "ContactPoint",
        "telephone" : "+6285243322433",
        "contactType" : "customer service"
      } 
    }`

    const structureDetailPage = data[0] && {
      '@graph': [
        JSON.parse(structureTypeHostel),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    };

    return <>
      {notFound && <>
        <div className="main-layout">
          <HeadPage title='Tantekos' />
          <Container className="mt-3">
            <div>Ups! Pencarian tidak ada hasil.</div>
            <Link href="/">Kembali ke Beranda</Link>
          </Container>
        </div>
      </>}
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureDetailPage) }} />
        </NextHead>
      }
      {
        data && data[0] &&
        <div className="main-layout">
          <HeadPage title={data[0].category + ' ' + locationTitle} />
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
                {locationTitle}
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
                      <a href={data[0].post_url} target="blank">* Lihat tautan asli</a>
                    </small>
                  </div>
                }
                <small>
                  * Data dapat berubah sewaktu-waktu
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