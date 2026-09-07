<!doctype html>
<html <?php language_attributes(); ?>>
<head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><?php wp_head(); ?></head>
<body <?php body_class(); ?>><?php wp_body_open(); ?>
<div class="announcement" id="announcement"><?php echo esc_html(get_theme_mod('wish_announcement', 'Home delivery up to 5 business days! Free from 299 NIS')); ?><button type="button" aria-label="Close announcement" data-close-announcement>×</button></div>
<header class="site-header">
  <div class="header-top"><a class="phone" href="tel:<?php echo esc_attr(preg_replace('/[^+0-9]/', '', get_theme_mod('wish_phone', '+972 553 161 567'))); ?>"><?php echo esc_html(get_theme_mod('wish_phone', '+972 553 161 567')); ?></a><span></span><div class="language"><?php echo esc_html(strtoupper(substr(get_locale(), 0, 2))); ?> <span>⌄</span></div></div>
  <div class="brand-row">
    <div class="socials"><a href="<?php echo esc_url(get_theme_mod('wish_facebook', '#')); ?>" aria-label="Facebook">f</a><a href="<?php echo esc_url(get_theme_mod('wish_instagram', '#')); ?>" aria-label="Instagram">i</a></div>
    <?php if (has_custom_logo()) { the_custom_logo(); } else { ?><a class="brand-wordmark" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Wish Candle home"><strong>WISH</strong><small>soy candle</small></a><?php } ?>
    <div class="header-icons">
      <button class="icon-btn search-btn" aria-label="Search" type="button">⌕</button>
      <a class="icon-btn wishlist-btn" href="<?php echo esc_url(home_url('/wishlist/')); ?>" aria-label="Wishlist">♡</a>
      <a class="icon-btn cart-btn" href="<?php echo esc_url(function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/')); ?>" aria-label="Cart">▢<span class="cart-count"><?php echo esc_html(wish_candle_cart_count()); ?></span></a>
      <a class="icon-btn account-btn" href="<?php echo esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : wp_login_url()); ?>" aria-label="Account">○</a>
      <button class="hamburger" type="button" aria-label="Open menu" data-open-menu>☰</button>
    </div>
  </div>
  <nav class="nav-row" aria-label="Primary"><?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'items_wrap' => '<ul class="nav-links">%3$s</ul>', 'fallback_cb' => 'wish_candle_menu_fallback']); ?></nav>
</header>
<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile primary"><button class="close-menu" type="button" aria-label="Close menu" data-close-menu>×</button><?php wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'items_wrap' => '<ul class="mobile-nav-links">%3$s</ul>', 'fallback_cb' => 'wish_candle_mobile_menu_fallback']); ?></nav>
