import React from "react";
import { Kost } from '../utils/modals/Kost'
import { DtArea } from '../utils/modals/Area'
import { Price } from '../utils/modals/Price'
import Generateslug from '../utils/Generateslug'
import { Kontrakan } from "../utils/modals/Kontrakan";

const sitemapXml = (dataKos, dataKontrakan, dataArea, dataPrice) => {
  let latestPost = 0;
  let itemsXML = "";
  let kontrakanXML = "";
  let areasXML = "";
  let priceXML = "";

  dataPrice.map(price => {
    const priceURL = `https://tantekos.com/search/price/${price.max_price}`;
    priceXML += `
      <url>
        <loc>${priceURL}</loc>
      </url>`;
  });

  dataArea.map(area => {
    const areaURL = `https://tantekos.com/area/${Generateslug(area.title)}`;
    areasXML += `
      <url>
        <loc>${areaURL}</loc>
      </url>`;
  });

  dataKos.map(post => {
    const postDate = post.date_modified;
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const itemURL = `https://tantekos.com/${Generateslug(post.title)}`;
    itemsXML += `
      <url>
        <loc>${itemURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  dataKontrakan.map(post => {
    const postDate = post.date_modified;
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const itemURL = `https://tantekos.com/${Generateslug(post.title)}`;
    kontrakanXML += `
      <url>
        <loc>${itemURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://tantekos.com/</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/about</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/contact</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://tantekos.com/policy</loc>
        <priority>1.00</priority>
      </url>
      ${areasXML}
      ${priceXML}
      ${itemsXML}
      ${kontrakanXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(Kost, Kontrakan, DtArea, Price));
    res.end();
  }
}

export default Sitemap;