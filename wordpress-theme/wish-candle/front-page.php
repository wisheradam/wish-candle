<?php
get_header();
$categories = [
 ['shaped-candles','Shaped candles','catalog-1.png'], ['candle-gift-sets','Gift sets and cards','catalog-2.png'],
 ['candles-in-jars','Candles in jars','catalog-3.png'], ['candlesticks','Candle holders','catalog-4.png'],
 ['candle-accessories','Materials for candles','catalog-5.png'], ['home-fragrances','Home fragrances','catalog-6.png'],
 ['sales','Sales','catalog-7.png'], ['massage-candles','Massage candles','catalog-8.png'],
];
$copy = 'We create high-quality scented candles made from natural soy wax, which add a special atmosphere to any of your events. Our candles are crafted with love and attention to detail to ensure long and even burning.';
?>
<section class="hero" style="min-height:680px"><div class="hero-media"></div><div class="hero-content"><h1><?php echo esc_html(get_bloginfo('description') ?: 'Handmade Aromatic Soy Candles'); ?></h1><a class="outline-btn" href="<?php echo esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/')); ?>">Shop now</a></div></section>

<section class="section"><div class="container"><h2 class="section-title">Popular Goods</h2>
<?php if (class_exists('WooCommerce')) { echo do_shortcode('[products limit="4" columns="4" orderby="popularity"]'); } else { echo '<p class="wish-empty-products">Install WooCommerce to display products here.</p>'; } ?>
<div class="section-cta"><a class="link-line" href="<?php echo esc_url(home_url('/shop/')); ?>">View catalog</a></div></div></section>

<section class="wholesale"><div class="wholesale-bg"></div><div class="wholesale-content"><h2>Wholesale</h2><p>Our candles will fill your event with an incredible atmosphere of warmth and comfort</p><a class="outline-btn" href="<?php echo esc_url(home_url('/wholesale/')); ?>">Learn more</a></div></section>

<section class="section"><div class="container"><h2 class="section-title">Catalog</h2><div class="catalog-grid">
<?php foreach ($categories as $category) :
  $term = get_term_by('slug', $category[0], 'product_cat');
  $url = $term && !is_wp_error($term) ? get_term_link($term) : home_url('/product-category/' . $category[0] . '/'); ?>
  <a class="catalog-card" href="<?php echo esc_url($url); ?>"><img src="<?php echo wish_candle_asset($category[2]); ?>" alt="<?php echo esc_attr($category[1]); ?>" loading="lazy"><div class="label"><span><?php echo esc_html($category[1]); ?></span><span>→</span></div></a>
<?php endforeach; ?>
</div></div></section>

<section class="section"><div class="container"><h2 class="section-title">Promotional goods</h2>
<?php if (class_exists('WooCommerce')) { echo do_shortcode('[sale_products limit="4" columns="4"]'); } else { echo '<p class="wish-empty-products">Sale products will appear after WooCommerce setup.</p>'; } ?>
</div></section>

<section class="section"><div class="container store-layout"><div class="store-main"><img src="<?php echo wish_candle_asset('store-main.png'); ?>" alt="Wish Candle store atmosphere" loading="lazy"></div><div class="store-side"><div class="store-thumbs"><img src="<?php echo wish_candle_asset('store-2.png'); ?>" alt="Candles" loading="lazy"><img src="<?php echo wish_candle_asset('store-3.png'); ?>" alt="Candles" loading="lazy"><img src="<?php echo wish_candle_asset('store-4.png'); ?>" alt="Candles" loading="lazy"></div><div class="store-copy"><h2>Our Store</h2><p><?php echo esc_html($copy); ?></p><a class="link-line" href="<?php echo esc_url(home_url('/about/')); ?>">Learn more</a></div></div></div></section>

<section class="section" id="instagram"><div class="container"><h2 class="section-title">Follow us on Instagram</h2><div class="instagram-grid"><div class="instagram-tile"></div><div class="instagram-tile"></div><div class="instagram-tile"></div><div class="instagram-tile"></div></div></div></section>
<section class="section"><div class="container"><h2 class="section-title">Customer reviews</h2><div class="review-grid">
<?php foreach ([
 ['Very satisfied with the candles! They burn evenly, the aroma is amazing and not overpowering! Fast delivery, highly recommend!','Customer review'],
 ['The candles are excellent! They look beautiful in the interior. I will order more.','Customer review'],
 ['Received the candles as a gift — aromatic, stylish and crafted with care.','Customer review'],
] as $review) : ?><article class="review"><div><div class="quotes">“</div><p class="review-text"><?php echo esc_html($review[0]); ?></p></div><div class="review-meta"><strong><?php echo esc_html($review[1]); ?></strong></div></article><?php endforeach; ?>
</div></div></section>
<?php get_footer(); ?>
