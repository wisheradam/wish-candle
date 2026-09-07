# Wish Candle

Wish Candle storefront project. The repository contains the current static production site and an installable WordPress/WooCommerce theme for the new store at `wp.wishcandle.shop`.

## Live environments

| Environment | URL | Purpose |
| --- | --- | --- |
| Production domain | https://wishcandle.shop | Current customer-facing storefront |
| Portfolio-hosted version | https://nataliwisher.com/wish-candle | Static build hosted in Natali Wisher's AWS account |
| WordPress staging | https://wp.wishcandle.shop | New WordPress/WooCommerce store |
| WordPress origin | http://origin-wp.wishcandle.shop | Direct Lightsail origin; CloudFront is used for public HTTPS |

Do not switch the production store to WordPress until the catalog, checkout, payment, delivery, email notifications and legal pages have been tested.

## Repository structure

```text
dist/                           Static production website
wordpress-theme/
  wish-candle/                  WordPress theme source
  wish-candle.zip               Ready-to-upload theme package
  build-theme.sh                Rebuilds the ZIP package
.github/workflows/              Static-site deployment automation
```

## AWS infrastructure

### Static storefront

- S3 bucket: `nataliwisher-portfolio-533267008693`
- S3 deployment prefix: `wish-candle/`
- CloudFront distribution: `E1LBCAP3SYQ78D`
- Changes to `dist/**` on `main` deploy through GitHub Actions using AWS OIDC.
- No long-lived AWS credentials are stored in this repository.

### WordPress staging

- AWS Lightsail instance: `wishcandle-wordpress`
- Region / Availability Zone: `eu-central-1a`
- Lightsail plan: `micro_3_0` (USD 7/month at creation time)
- WordPress: 7.1 (updated from the original Bitnami image)
- WooCommerce: 11.1.0, installed and active
- Static public IP: `63.184.152.222`
- Origin hostname: `origin-wp.wishcandle.shop`
- Public hostname: `wp.wishcandle.shop`
- CloudFront distribution ID: `EX5Q2K1IEJYH7`
- CloudFront domain: `d1nixfru3oild6.cloudfront.net`
- TLS certificate: AWS Certificate Manager in `us-east-1`
- DNS: Amazon Route 53; domain remains registered with Dynadot

The public WordPress hostname points to CloudFront. CloudFront connects to the Lightsail origin over HTTP, while visitors use HTTPS.

CloudFront sends `X-Forwarded-Proto: https` to the origin. WordPress is configured with `WP_HOME` and `WP_SITEURL` set to `https://wp.wishcandle.shop`, proxy HTTPS detection enabled, and `FORCE_SSL_ADMIN` enabled.

## WordPress theme

The custom **Wish Candle** classic theme reproduces the approved storefront style and includes:

- Responsive header, navigation, homepage and footer
- WooCommerce catalog and product grids
- Product, cart, account and shop integration
- Live WooCommerce cart count
- Custom logo and three WordPress menu locations
- Customizer fields for the announcement, phone, email, address and social links
- Responsive mobile navigation
- Homepage sections for popular products, categories, sale products, wholesale, store imagery and reviews

The staging theme currently loads the approved design imagery from:

```text
https://nataliwisher.com/wish-candle/assets/
```

This avoids duplicating the image library while staging is being assembled. The assets can be moved into WordPress or a dedicated CDN before the final cutover.

The **Wish Candle** theme is installed and active on staging. The store remains in WooCommerce **Coming soon** mode. Products, payments, taxes, shipping, transactional email, legal pages and final business details still require configuration and testing before launch.

## Installing the theme

1. Sign in at `https://wp.wishcandle.shop/wp-admin/`.
2. Install and activate WooCommerce.
3. Open **Appearance → Themes → Add New → Upload Theme**.
4. Upload `wordpress-theme/wish-candle.zip`.
5. Activate **Wish Candle**.
6. Assign the Primary, Footer shop and Footer support menus.
7. Configure the logo and store details under **Appearance → Customize**.
8. Create the WooCommerce pages and set the homepage to a static page.
9. Add products, categories, payment, tax and delivery settings.

To rebuild the theme archive locally:

```bash
./wordpress-theme/build-theme.sh
```

### Updating the theme on Lightsail

If the WordPress upload screen cannot replace the active theme, update it from the Bitnami SSH terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/wisheradam/wish-candle/main/wordpress-theme/wish-candle.zip -o /tmp/wish-candle-theme.zip
sudo /opt/bitnami/wp-cli/bin/wp theme install /tmp/wish-candle-theme.zip --force --activate --path=/opt/bitnami/wordpress --allow-root
sudo chown -R bitnami:daemon /opt/bitnami/wordpress/wp-content/themes/wish-candle
sudo /opt/bitnami/wp-cli/bin/wp theme get wish-candle --field=version --path=/opt/bitnami/wordpress --allow-root
```

The custom theme declares its GitHub repository as the update source so WordPress does not replace it with a similarly named theme from the public catalog.

## WooCommerce category slugs

The homepage links expect these product category slugs:

| Category | Slug |
| --- | --- |
| Shaped candles | `shaped-candles` |
| Gift sets and cards | `candle-gift-sets` |
| Candles in jars | `candles-in-jars` |
| Candle holders | `candlesticks` |
| Materials for candles | `candle-accessories` |
| Home fragrances | `home-fragrances` |
| Sales | `sales` |
| Massage candles | `massage-candles` |

## Design source

Figma project:
https://www.figma.com/design/269jxTWoaLXBiqwzZb2hyo/Wish-candle-shop?node-id=43-13623

## Security

- Never commit WordPress, Dynadot or AWS passwords, access keys, tokens or private certificates.
- The initial Bitnami WordPress password must be retrieved directly on the server and changed after the first login.
- Keep WordPress, WooCommerce, plugins and the theme updated.
- Back up the database and uploads before major changes or production cutover.
