import React from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { arrayOf, shape, string } from 'prop-types'
import NextHead from 'next/head'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import HeadPage from '../components/HeadPage'
import ReactGa from 'react-ga'
import moment from 'moment';
import { FaExternalLinkAlt } from 'react-icons/fa';

class Detail extends React.Component {
  static async getInitialProps(ctx) {
    const data = await firebase
      .firestore().collection('kosts')
      .where('slug', '==', ctx.query.detail)
      .get()
      .then(doc => ({
        ...doc.docs[0].data(),
      }))
      .catch(err => console.log(err))
    return { slug: ctx.query.detail, detail: data }
  }
  componentDidMount() {
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
  }
  componentDidUpdate() {
    if (window.location.hostname !== 'localhost') {
      ReactGa.initialize('UA-132808614-2')
      ReactGa.pageview('/detail')
    }
  }
  render() {
    const { slug, detail } = this.props;
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
        "addressLocality": "",
        "addressRegion": "${detail && detail.location.province}",
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
      {
        detail &&
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
          <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/w=300/${detail.images[0]}`} />
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
        !detail &&
        <div>
          <div className="animate-pulse mx-3 my-3 w-40 h-6 bg-gray-300" />
          <div className="animate-pulse w-full h-40 bg-gray-300" />
          <div className="container">
            <div className="py-3">
              <div className="animate-pulse px-2 my-1 w-16 h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-6 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-48 h-6 bg-gray-300" />
            </div>
            <div className="mb-6">
              <div className="animate-pulse px-2 my-1 w-32 h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-48 h-4 bg-gray-300" />
            </div>
            <div className="mb-3">
              <div className="animate-pulse px-2 my-1 w-32 h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
              <div className="animate-pulse px-2 my-1 w-48 h-4 bg-gray-300" />
            </div>
          </div>
        </div>
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
                <p className="pb-1 font-bold">Lokasi {detail.category} <small>({detail.location.district}, {detail.location.province})</small></p>
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
  detail: arrayOf(shape({})),
  slug: string
}
Detail.defaultProps = {
  detail: null,
  slug: null
}
export default Detail;