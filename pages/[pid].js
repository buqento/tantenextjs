import React from 'react'
import { useRouter } from 'next/router'
import { DataKos } from '../utils/modals/fakeDb'
import { Container, Card } from 'react-bootstrap'
import NextHead from 'next/head'
import Slide from '../components/Slide'
import FooterDetail from '../components/FooterDetail'
import ListKos from '../components/ListKos'
import HeadPage from '../components/HeadPage'
import styles from '../styles/Home.module.css'

const Post = () => {
    const router = useRouter()
    const { pid } = router.query
    const dt = DataKos.filter(item => item.slug === pid)
    const otherItems = DataKos.filter(item => item.slug !== pid)
    return (
        <>
            <NextHead>
                {/* <title>{pid && dt && dt[0].title}</title> */}
                <link rel="canonical" content={`https://tantekos.com/${pid && dt && dt[0].slug}`}></link>
                <meta property="og:title" content={pid && dt && dt[0].title} />
                <meta property="og:description" content={pid && dt && dt[0].description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://tantekos.com/${pid && dt && dt[0].slug}`} />
                <meta property="og:image" content={pid && dt && dt[0].images[0]} />
                <meta property="og:image:alt" content={pid && dt && dt[0].title} />
                <meta property="og:locale" content="id" />
                <meta property="og:site_name" content="Tantekos" />
            </NextHead>
            <HeadPage />
            <Slide imagesData={pid && dt && dt[0].images} imageTitle={pid && dt && dt[0].title} />
            <Container className="mb-3">
                {
                    pid && dt &&
                    <div className="pt-3">
                        <h1>
                            <Card.Title>{dt[0].title}</Card.Title>
                        </h1>
                        <div>{dt[0].description}</div>
                        <div>
                            <p className={styles.headingtwo}>Fasilitas</p>
                            {
                                dt[0].facilities.map((item, index) => <li key={index}>{item}</li>)
                            }
                        </div>
                    </div>
                }
            </Container>
            <div style={{ marginBottom: '26px' }}>
                <ListKos data={otherItems} />
            </div>
            <FooterDetail className="fix-footer footer-detail" contactUs={pid && dt && dt[0].contact_us} />
        </>
    )
}

export default Post