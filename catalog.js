fetch('catalog.json').then(r=>{if(!r.ok) throw new Error('Catalog unavailable');return r.json();}).then(d=>{
  const g=document.getElementById('grid'), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  g.innerHTML=d.items.map(it=>{
    const img=`<picture>${it.imageWebp?`<source srcset="${esc(it.imageWebp)}" type="image/webp">`:''}<img src="${esc(it.image)}" alt="${esc(it.title)}" loading="lazy" width="${it.imageWidth||800}" height="${it.imageHeight||800}"></picture>`;
    return `<li class="card" data-category="${esc(it.category)}">${img}<h3>${esc(it.title)}</h3><p class="price">${esc(it.price)}</p>${it.legend?`<p class="legend">${esc(it.legend)}${it.legendCheck?' <span class="tag">CHECK</span>':''}</p>`:''}<p class="materials">${esc(it.materials)}</p><a href="${esc(it.etsyUrl)}" rel="noopener">View on Etsy<span class="sr"> – ${esc(it.title)}</span></a></li>`;
  }).join('');
  document.getElementById('review-list').innerHTML=d.reviews.map(r=>`<figure class="review"><p class="stars" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}</p><blockquote><p>${esc(r.text)}</p></blockquote><figcaption><strong>${esc(r.reviewer)}</strong> · <span>${esc(r.date)}</span><p class="review-item"><a href="${esc(r.item_url)}" rel="noopener">${esc(r.item_title)}</a></p></figcaption></figure>`).join('');
}).catch(()=>{document.getElementById('grid').textContent='Catalog could not load. Please visit the Etsy shop.';});
