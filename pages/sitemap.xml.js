import React from "react";
import { DataKos } from '../utils/modals/fakeDb'
import { DataArea } from '../utils/modals/fakeDb'

const sitemapXml = (dataKos, dataArea) => {
  let latestPost = 0;
  let itemsXML = "";
  let areasXML = "";

  dataArea.map(area => {
    const areaURL = `https://tantekos.com/area/${area.slug}`;
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
    const itemURL = `https://tantekos.com/${post.slug}`;
    itemsXML += `
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
      ${areasXML}
      ${itemsXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(DataKos, DataArea));
    res.end();
  }
}

export default Sitemap;