// const structureTypeNewsArticle = `{
//       "@context": "https://schema.org",
//       "@type": "NewsArticle",
//       "mainEntityOfPage": {
//         "@type": "WebPage",
//         "@id": "${`https://tantekos.com/${slug}`}"
//       },
//       "headline": "${data[0].title}",
//       "image": [${data[0].images.map(item => `"${item}"`)}],
//       "dateModified":"${data[0].date_modified}",
//       "datePublished":"${data[0].date_published}",
//       "author": {
//         "@type": "Person",
//         "name": "Bvqento Richard"
//       },
//       "publisher": {
//         "@type": "Organization",
//         "name": "Tantekos",
//         "logo": {
//           "@type": "ImageObject",
//           "url": "https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true"
//         }
//       },
//       "articleBody": "${data[0].description}",
//       "url": "${`https://tantekos.com/${slug}`}"
//     }`


// const structureTypeProduct = `{
//       "@context": "https://schema.org",
//       "@type": "Product",
//       "name": "${data[0].title}",
//       "image": [${data[0].images.map(item => `"${item}"`)}],
//       "description": "${data[0].description}",
//       "sku": "TANTEKOS-${data[0].category.toUpperCase() + data[0].id}",
//       "brand": {
//         "@type": "Brand",
//         "name": "Tantekos"
//       },
//       "review": {
//         "@type": "Review",
//         "reviewRating": {
//           "@type": "Rating",
//           "ratingValue": "4",
//           "bestRating": "5"
//         },
//         "author": {
//           "@type": "Person",
//           "name": "Bvqento Richard"
//         }
//       },
//       "aggregateRating": {
//         "@type": "AggregateRating",
//         "ratingValue": "4.4",
//         "reviewCount": "89"
//       },
//       "offers": {
//         "@type": "Offer",
//         "url": "${`https://tantekos.com/${slug}`}",
//         "priceCurrency": "IDR",
//         "price": "${data[0].start_price}",
//         "priceValidUntil": "2025-12-25",
//         "itemCondition": "https://schema.org/UsedCondition",
//         "availability": "https://schema.org/InStock"
//       }
//     }`
