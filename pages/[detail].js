import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import HeadPage from '../components/HeadPage'
import Peta from '../components/Peta'
import ReactGa from 'react-ga'
import moment from 'moment';
import { FaExternalLinkAlt } from 'react-icons/fa';
import fire from '../config/fire-config';

class Detail extends React.Component {
  static async getInitialProps(ctx) {
    return { slug: ctx.query.detail }
  }
  constructor(props) {
    super(props)
    this.state = {
      detail: null,
      notFound: false
    }
  }
  componentDidMount() {
    const { slug } = this.props;
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
    fire
      .firestore()
      .collection("kosts")
      .where("slug", "==", slug)
      .get()
      .then((snapshot) => {
        // if (snapshot.exists) {
        //   console.log("No such document!");
        //   this.setState({ notFound: true })
        // }
        snapshot.docs.forEach(doc => {
          this.setState({ detail: doc.data() })
        })
      })
  }
  componentDidUpdate() {
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
  }
  render() {
    const { detail, notFound } = this.state;
    const { slug } = this.props;
    // const otherItems = Kost.concat(Kontrakan).filter(item => Generateslug(item.title) !== slug && Generateslug(item.location.title) === Generateslug(data[0].location.title) && data[0].category === item.category)
    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${detail && detail.title}",
          "item": "https://tantekos.com/${slug}"
        }]
     }`
    const structureTypeHostel = `{
      "@context": "https://schema.org",
      "@type": "Hostel",
      "image": [${detail && detail.images.map(item => `"https://cdn.statically.io/img/i.imgur.com/w=300/${item}"`)}],
      "@id": "https://tantekos.com",
      "name": "${detail && detail.title}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${detail && detail.location.district}",
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
        "latitude": "${detail && detail.location.lat_lng.w_}",
        "longitude": "${detail && detail.location.lat_lng.T_}" 
      },
      "url": "${`https://tantekos.com/${slug}`}",
      "telephone": "${detail && detail.contact_us.phone || '+6285243322433'}",
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
    const structureDetailPage = detail && {
      '@graph': [
        JSON.parse(structureTypeHostel),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    };
    return <>
      {notFound && <>
        <div className="container-center text-center">
          <p>404 | Halaman Tidak Ditemukan</p>
        </div>
      </>}
      {
        detail && !notFound &&
        <NextHead>
          <title>{detail.title}</title>
          <meta name="googlebot" content="index, follow" />
          <meta name="robot" content="index, follow" />
          <meta name="application-name" content="Tantekos" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="title" content={detail.title} />
          <meta name="description" content={detail.description} />
          <meta name="keywords" content={`tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian, ${detail.keywords}`} />
          <meta property="og:title" content={detail.title} />
          <meta property="og:description" content={detail.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://tantekos.com/${slug}`} />
          <meta property="og:image" content="https://i.imgur.com/YwRu6Be.jpg" />
          <meta property="og:image:alt" content={detail.title} />
          <meta property="og:image:width" content="300" />
          <meta property="og:image:height" content="300" />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Tantekos" />
          <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <link rel="canonical" content={`https://tantekos.com/${slug}`} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureDetailPage) }} />
        </NextHead>
      }
      {
        detail &&
        <div className="main-layout">
          <HeadPage page="detail" title={detail.category + ' di ' + detail.location.district} />
          <Slide imagesData={detail.images} imageTitle={detail.title} />
          <div className="container mb-3">
            <div className="pt-3">
              <small className="text-gray-700">{moment(detail.date_modified).fromNow()}</small>
              <h1 className="mt-0 mb-3 text-xl">{detail.title}</h1>
              <div className="mb-3">
                <p className="font-bold">Deskripsi {detail.category}</p>
                {detail.description}
              </div>
              <div className="mb-3">
                <p className="font-bold">Fasilitas {detail.category}</p>
                <ul className="mx-4">
                  {detail && detail.facilities && detail.facilities.map((item, index) => <li className="list-disc" key={index}>{item}</li>)}
                </ul>
              </div>
              <div className="mb-3">
                <p className="pb-1 font-bold">Lokasi {detail.category} <small>( {detail.location.province})</small></p>
                <Peta location={detail.location} />
              </div>
              <div className="border-top mt-3">
                {
                  detail.post_url !== '' &&
                  <div className="pt-3 text-sm text-indigo-700">
                    <a href={detail.post_url} target="blank" rel="noreferrer">* Lihat tautan asli <FaExternalLinkAlt className="ml-1 inline" /> </a>
                  </div>
                }
                <small>
                  * Data dapat berubah sewaktu-waktu
                </small>
              </div>
            </div>
          </div>
          <FooterDetail data={detail} />
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
  slug: null
}
export default Detail;