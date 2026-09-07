const ROOT='/wish-candle';
const A=ROOT+'/assets';
const CATEGORIES=[
  {slug:'shaped-candles',name:'Shaped candles',img:'catalog-1.png'},
  {slug:'candle-gift-sets',name:'Gift sets and cards',img:'catalog-2.png'},
  {slug:'candles-in-jars',name:'Candles in jars',img:'catalog-3.png'},
  {slug:'candlesticks',name:'Candle holders',img:'catalog-4.png'},
  {slug:'candle-accessories',name:'Materials for candles',img:'catalog-5.png'},
  {slug:'home-fragrances',name:'Home fragrances',img:'catalog-6.png'},
  {slug:'sales',name:'Sales',img:'catalog-7.png'},
  {slug:'massage-candles',name:'Massage candles',img:'catalog-8.png'}
];
const PRODUCT_IMAGES=['popular-1.png','popular-2.png','popular-3.png','popular-4.png','promo-1.png','promo-2.png','promo-3.png','promo-4.png'];
const HOME_COPY='We create high-quality scented candles made from natural soy wax, which add a special atmosphere to any of your events. Our candles are crafted with love and attention to detail to ensure long and even burning. Perfect for holidays and gifts, our candles will be a wonderful addition to any interior.';
const REVIEWS=[
  ['Very satisfied with the candles! They burn evenly, the aroma is amazing and not overpowering! Fast delivery, highly recommend!','Peter, Belgium','12/06/2024'],
  ['The candles are excellent!!! They look very beautiful in the interior, I will order more.','Peter, Belgium','12/06/2024'],
  ['Received the candles as a gift — just delightful! Aromatic and stylish, everything is top-notch.','Peter, Belgium','12/06/2024']
];
function href(path=''){return `${ROOT}${path}`}
function categoryHref(slug){return `${ROOT}/category/?type=${encodeURIComponent(slug)}`}
function iconButton(label,symbol,extra=''){return `<button class="icon-btn ${extra}" aria-label="${label}" type="button">${symbol}</button>`}
function header(active=''){
  const cart=Number(localStorage.getItem('wishCart')||0);
  return `<div class="announcement" id="announcement">Home delivery up to 5 business day! Free from 299 NIS<button type="button" aria-label="Close announcement" data-close-announcement>×</button></div>
  <header class="site-header">
    <div class="header-top"><a class="phone" href="tel:+972553161567">+972 553 161 567</a><span></span><div class="language">EN <span>⌄</span></div></div>
    <div class="brand-row">
      <div class="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">i</a></div>
      <a href="${href('')}" aria-label="Wish Candle home"><img class="brand-logo" src="${A}/logo.png" alt="Wish Candle" /></a>
      <div class="header-icons">
        ${iconButton('Search','⌕','search-btn')}${iconButton('Wishlist','♡','wishlist-btn')}
        <button class="icon-btn cart-btn" type="button" aria-label="Cart">▢<span class="cart-count">${cart}</span></button>
        ${iconButton('Account','○','account-btn')}
        <button class="hamburger" type="button" aria-label="Open menu" data-open-menu>☰</button>
      </div>
    </div>
    <nav class="nav-row" aria-label="Primary">
      <a class="${active==='home'?'active':''}" href="${href('')}">Home</a>
      <a class="${active==='about'?'active':''}" href="${href('/about/')}">About us</a>
      <a class="${active==='shop'||active==='category'?'active':''}" href="${href('/shop/')}">Shop</a>
      <a class="${active==='wholesale'?'active':''}" href="${href('/wholesale/')}">Wholesales</a>
      <a href="${href('/#instagram')}">Blog</a>
      <a class="${active==='contacts'?'active':''}" href="${href('/contacts/')}">Contacts</a>
    </nav>
  </header>
  <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile primary"><button class="close-menu" type="button" aria-label="Close menu" data-close-menu>×</button>
    <a href="${href('')}">Home</a><a href="${href('/about/')}">About us</a><a href="${href('/shop/')}">Shop</a><a href="${href('/wholesale/')}">Wholesales</a><a href="${href('/#instagram')}">Blog</a><a href="${href('/contacts/')}">Contacts</a>
  </nav>`;
}
function footer(){
  return `<footer>
    <div class="footer-top"><a href="${href('')}"><img class="footer-logo" src="${A}/logo.png" alt="Wish Candle" /></a><div class="footer-socials"><div class="icons"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">i</a></div><span>Our social networks</span></div></div>
    <div class="footer-main">
      <div class="footer-columns">
        <div class="footer-col"><h3>Shop</h3>${CATEGORIES.map(c=>`<a href="${categoryHref(c.slug)}">${c.name}</a>`).join('')}</div>
        <div class="footer-col"><h3>Online store</h3><a href="${href('')}">Home</a><a href="${href('/about/')}">About us</a><a href="${href('/shop/')}">Shop</a><a href="${href('/wholesale/')}">Wholesales</a><a href="${href('/#instagram')}">Blog</a></div>
        <div class="footer-col"><h3>Support</h3><a href="${href('/privacy-policy/')}">Privacy policy</a><a href="${href('/delivery-terms/')}">Delivery Terms</a></div>
        <div class="footer-col"><h3>Contacts and Working hours</h3><p>Karl Popper 5, Netanya, Israel</p><a href="mailto:info@wishcandle.shop">info@wishcandle.shop</a><a href="tel:+972553161567">+972553161567</a><br><p><strong>Working hours:</strong></p><p><strong>Every day:</strong> 08:00 – 20:00</p></div>
      </div>
      <div class="newsletter"><h3>Receive exclusive offers by subscribing to our newsletter</h3><form class="newsletter-form" data-newsletter><input type="email" aria-label="Email" placeholder="EMAIL" required><button type="submit">Subscribe</button></form><p class="privacy-note">By clicking the button, you consent to the processing of personal data and agree to the privacy policy</p></div>
    </div>
    <div class="footer-bottom"><div class="payments"><span class="payment">VISA</span><span class="payment">Mastercard</span><span class="payment">PayPal</span><span class="payment">Apple Pay</span><span class="payment">Samsung Pay</span></div><span>@wishcandle.shop-2024</span></div>
  </footer><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}
function productCard(img,index=0){return `<article class="product-card"><button class="fav" type="button" aria-label="Add to wishlist" data-fav>♡</button><div class="photo"><img src="${A}/${img}" alt="Scented soy wax candle" loading="lazy"></div><div class="product-info"><h3 class="product-name">Scented soy wax candle</h3><div class="price">99.00</div><button class="solid-btn" type="button" data-buy data-product="Scented soy wax candle ${index+1}">Buy now</button></div></article>`}
function productGrid(images=PRODUCT_IMAGES.slice(0,4),full=false){return `<div class="product-grid ${full?'full':''}">${images.map((x,i)=>productCard(x,i)).join('')}</div>`}
function catalogGrid(className='catalog-grid'){
  return `<div class="${className}">${CATEGORIES.map(c=>`<a class="catalog-card" href="${categoryHref(c.slug)}"><img src="${A}/${c.img}" alt="${c.name}" loading="lazy"><div class="label"><span>${c.name}</span><span>→</span></div></a>`).join('')}</div>`;
}
function reviews(){return `<div class="review-grid">${REVIEWS.map(r=>`<article class="review"><div><div class="quotes">“</div><p class="review-text">${r[0]}</p></div><div class="review-meta"><strong>${r[1]}</strong><span>${r[2]}</span></div></article>`).join('')}</div>`}
function renderHome(){return `<div class="hero"><div class="hero-media"></div>${header('home')}<div class="hero-content"><h1>Handmade Aromatic Soy Candles</h1><a class="outline-btn" href="${href('/shop/')}">Shop now</a></div></div>
<section class="section"><div class="container"><h2 class="section-title">Popular Goods</h2><div class="carousel-wrap"><button class="round-arrow" aria-label="Previous">←</button>${productGrid(PRODUCT_IMAGES.slice(0,4))}<button class="round-arrow" aria-label="Next">→</button></div><div class="section-cta"><a class="link-line" href="${href('/shop/')}">View catalog</a></div></div></section>
<section class="wholesale"><div class="wholesale-bg"></div><div class="wholesale-content"><h2>Wholesale</h2><p>Our candles will fill your event with an incredible atmosphere of warmth and comfort</p><a class="outline-btn" href="${href('/wholesale/')}">Learn more</a></div></section>
<section class="section"><div class="container"><h2 class="section-title">Catalog</h2>${catalogGrid()}</div></section>
<section class="section"><div class="container"><h2 class="section-title">Promotional goods</h2><div class="carousel-wrap"><button class="round-arrow" aria-label="Previous">←</button>${productGrid(PRODUCT_IMAGES.slice(4,8))}<button class="round-arrow" aria-label="Next">→</button></div><div class="section-cta"><a class="link-line" href="${href('/shop/')}">View catalog</a></div></div></section>
<section class="section"><div class="container store-layout"><div class="store-main"><img src="${A}/store-main.png" alt="Wish Candle store atmosphere" loading="lazy"></div><div class="store-side"><div class="store-thumbs"><img src="${A}/store-2.png" alt="Candles" loading="lazy"><img src="${A}/store-3.png" alt="Candles" loading="lazy"><img src="${A}/store-4.png" alt="Candles" loading="lazy"></div><div class="store-copy"><h2>Our Store</h2><p>${HOME_COPY}</p><a class="link-line" href="${href('/about/')}">Learn more</a></div></div></div></section>
<section class="section" id="instagram"><div class="container"><h2 class="section-title">Follow us on Instagram</h2><div class="instagram-grid"><div class="instagram-tile"></div><div class="instagram-tile"></div><div class="instagram-tile"></div><div class="instagram-tile"></div></div></div></section>
<section class="section"><div class="container"><h2 class="section-title">Customer reviews</h2>${reviews()}</div></section>${footer()}`}
function pageHero(title,copy=''){return `<section class="page-hero"><div><h1>${title}</h1>${copy?`<p>${copy}</p>`:''}</div></section>`}
function renderAbout(){return `${header('about')}${pageHero('About us')}<section class="section"><div class="container about-collage"><div class="large"><img src="${A}/store-main.png" alt="Wish Candle" /></div><div class="small-stack"><img src="${A}/store-2.png" alt="Candles"><img src="${A}/store-3.png" alt="Candles"><img src="${A}/store-4.png" alt="Candles"><img src="${A}/hero.png" alt="Candles"></div></div></section><section class="section-tight"><div class="container about-copy"><h2>Our Store</h2><p>${HOME_COPY}</p></div></section>${footer()}`}
function renderShop(){return `${header('shop')}${pageHero('Shop')}<section class="section"><div class="container">${catalogGrid('shop-grid')}</div></section>${footer()}`}
function renderContacts(){return `${header('contacts')}${pageHero('Contacts')}<section class="section"><div class="container contact-layout"><div class="contact-image" role="img" aria-label="Wish Candle atmosphere"></div><div class="contact-card"><h2>Contacts and Working hours</h2><div class="contact-list"><div class="contact-item"><small>Address</small><p>Karl Popper 5, Netanya, Israel</p></div><div class="contact-item"><small>Email</small><a href="mailto:info@wishcandle.shop">info@wishcandle.shop</a></div><div class="contact-item"><small>Phone</small><a href="tel:+972553161567">+972 553 161 567</a></div><div class="contact-item"><small>Working hours</small><p><strong>Every day:</strong> 08:00 – 20:00</p></div></div><div class="contact-actions"><a class="outline-btn" href="mailto:info@wishcandle.shop">Email us</a><a class="outline-btn" href="tel:+972553161567">Call us</a></div></div></div></section>${footer()}`}
function renderWholesale(){return `${header('wholesale')}<section class="wholesale wholesale-page"><div class="wholesale-bg"></div><div class="wholesale-content"><h2>Wholesale</h2><p>Our candles will fill your event with an incredible atmosphere of warmth and comfort</p><a class="outline-btn" href="mailto:info@wishcandle.shop?subject=Wholesale%20enquiry">Contact us</a></div></section><section class="section"><div class="container center"><h2 class="section-title">Wish Candle</h2><p class="section-copy">${HOME_COPY}</p><div style="margin-top:34px"><a class="link-line" href="mailto:info@wishcandle.shop?subject=Wholesale%20enquiry">info@wishcandle.shop</a></div></div></section>${footer()}`}
function renderCategory(){const params=new URLSearchParams(location.search);const slug=params.get('type')||CATEGORIES[0].slug;const cat=CATEGORIES.find(c=>c.slug===slug)||CATEGORIES[0];return `${header('category')}${pageHero(cat.name)}<section class="section"><div class="container">${productGrid(PRODUCT_IMAGES,true)}</div></section><section class="section-tight"><div class="container center"><a class="link-line" href="${href('/shop/')}">Back to shop</a></div></section>${footer()}`}
function renderLegal(kind){const privacy=kind==='privacy';const title=privacy?'Privacy Policy':'Delivery Terms';return `${header('')} ${pageHero(title)}<section class="section"><div class="container legal-wrap"><div class="legal-card"><div class="legal-status">Layout ready</div><h2>${title}</h2><p>The approved page layout is published and ready for the final policy copy.</p><p>We have intentionally not invented or substituted legal terms that are not currently accessible from the approved Figma source.</p><p>For questions, please contact <a class="link-line" href="mailto:info@wishcandle.shop">info@wishcandle.shop</a>.</p></div></div></section>${footer()}`}
function mount(){const app=document.getElementById('app');const page=document.body.dataset.page||'home';const renderers={home:renderHome,about:renderAbout,shop:renderShop,contacts:renderContacts,wholesale:renderWholesale,category:renderCategory,'privacy-policy':()=>renderLegal('privacy'),'delivery-terms':()=>renderLegal('delivery')};app.innerHTML=(renderers[page]||renderHome)();bindUI();}
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),2200)}
function bindUI(){
  const ann=document.getElementById('announcement');if(localStorage.getItem('wishAnnClosed')==='1'&&ann)ann.remove();
  document.querySelector('[data-close-announcement]')?.addEventListener('click',()=>{document.getElementById('announcement')?.remove();localStorage.setItem('wishAnnClosed','1')});
  const menu=document.getElementById('mobileMenu');document.querySelectorAll('[data-open-menu]').forEach(b=>b.addEventListener('click',()=>{menu?.classList.add('open');document.body.classList.add('menu-open')}));document.querySelectorAll('[data-close-menu]').forEach(b=>b.addEventListener('click',()=>{menu?.classList.remove('open');document.body.classList.remove('menu-open')}));
  document.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('active');b.textContent=b.classList.contains('active')?'♥':'♡';showToast(b.classList.contains('active')?'Added to wishlist':'Removed from wishlist')}));
  document.querySelectorAll('[data-buy]').forEach(b=>b.addEventListener('click',()=>{const next=Number(localStorage.getItem('wishCart')||0)+1;localStorage.setItem('wishCart',String(next));document.querySelectorAll('.cart-count').forEach(x=>x.textContent=String(next));showToast('Added to cart')}));
  document.querySelectorAll('[data-newsletter]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.reset();showToast('Thank you for subscribing')}));
  document.querySelector('.search-btn')?.addEventListener('click',()=>{const q=prompt('Search Wish Candle');if(q&&q.trim())location.href=`${ROOT}/shop/?q=${encodeURIComponent(q.trim())}`});
  document.querySelector('.cart-btn')?.addEventListener('click',()=>showToast(`${localStorage.getItem('wishCart')||0} item(s) in cart`));
  document.querySelector('.wishlist-btn')?.addEventListener('click',()=>showToast('Wishlist is available on product cards'));
  document.querySelector('.account-btn')?.addEventListener('click',()=>showToast('Account area is not connected yet'));
}
document.addEventListener('DOMContentLoaded',mount);
