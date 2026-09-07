<?php
if (!defined('ABSPATH')) exit;

define('WISH_CANDLE_VERSION', '0.1.0');
define('WISH_CANDLE_ASSET_CDN', 'https://nataliwisher.com/wish-candle/assets');

function wish_candle_setup() {
    load_theme_textdomain('wish-candle', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', ['height' => 160, 'width' => 400, 'flex-height' => true, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    register_nav_menus([
        'primary' => __('Primary menu', 'wish-candle'),
        'footer_shop' => __('Footer shop menu', 'wish-candle'),
        'footer_support' => __('Footer support menu', 'wish-candle'),
    ]);
}
add_action('after_setup_theme', 'wish_candle_setup');

function wish_candle_assets() {
    wp_enqueue_style('wish-candle-style', get_stylesheet_uri(), [], WISH_CANDLE_VERSION);
    wp_enqueue_script('wish-candle-theme', get_template_directory_uri() . '/assets/theme.js', [], WISH_CANDLE_VERSION, true);
    wp_localize_script('wish-candle-theme', 'wishCandle', [
        'cartUrl' => function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/cart/'),
        'shopUrl' => function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/'),
    ]);
}
add_action('wp_enqueue_scripts', 'wish_candle_assets');

function wish_candle_asset($name) {
    return esc_url(WISH_CANDLE_ASSET_CDN . '/' . ltrim($name, '/'));
}

function wish_candle_cart_count() {
    return function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
}

function wish_candle_customize($customizer) {
    $customizer->add_section('wish_candle_store', ['title' => __('Wish Candle store details', 'wish-candle'), 'priority' => 30]);
    $settings = [
        'wish_announcement' => ['Announcement', 'Home delivery up to 5 business days! Free from 299 NIS', 'sanitize_text_field'],
        'wish_phone' => ['Phone', '+972 553 161 567', 'sanitize_text_field'],
        'wish_email' => ['Email', 'info@wishcandle.shop', 'sanitize_email'],
        'wish_address' => ['Address', 'Karl Popper 5, Netanya, Israel', 'sanitize_text_field'],
        'wish_instagram' => ['Instagram URL', '', 'esc_url_raw'],
        'wish_facebook' => ['Facebook URL', '', 'esc_url_raw'],
    ];
    foreach ($settings as $id => $data) {
        $customizer->add_setting($id, ['default' => $data[1], 'sanitize_callback' => $data[2]]);
        $customizer->add_control($id, ['section' => 'wish_candle_store', 'label' => __($data[0], 'wish-candle'), 'type' => 'text']);
    }
}
add_action('customize_register', 'wish_candle_customize');

function wish_candle_menu_fallback() {
    echo '<a href="' . esc_url(home_url('/')) . '">Home</a>';
    echo '<a href="' . esc_url(home_url('/about/')) . '">About us</a>';
    echo '<a href="' . esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/shop/')) . '">Shop</a>';
    echo '<a href="' . esc_url(home_url('/wholesale/')) . '">Wholesales</a>';
    echo '<a href="' . esc_url(home_url('/blog/')) . '">Blog</a>';
    echo '<a href="' . esc_url(home_url('/contacts/')) . '">Contacts</a>';
}

function wish_candle_loop_columns() { return 4; }
add_filter('loop_shop_columns', 'wish_candle_loop_columns');
add_filter('woocommerce_enqueue_styles', '__return_empty_array');

function wish_candle_wc_wrapper_start() { echo '<main class="wc-main">'; }
function wish_candle_wc_wrapper_end() { echo '</main>'; }
remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
add_action('woocommerce_before_main_content', 'wish_candle_wc_wrapper_start', 10);
add_action('woocommerce_after_main_content', 'wish_candle_wc_wrapper_end', 10);

function wish_candle_cart_fragments($fragments) {
    $fragments['.cart-count'] = '<span class="cart-count">' . esc_html(wish_candle_cart_count()) . '</span>';
    return $fragments;
}
add_filter('woocommerce_add_to_cart_fragments', 'wish_candle_cart_fragments');
