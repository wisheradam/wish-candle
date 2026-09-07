# Wish Candle

Standalone source repository for the Wish Candle project page.

## Production

Published under Natali Wisher's existing AWS hosting:

- https://nataliwisher.com/wish-candle
- S3 bucket: `nataliwisher-portfolio-533267008693`
- CloudFront distribution: `E1LBCAP3SYQ78D`
- Deploy path: `wish-candle`

Changes to `dist/**` on `main` deploy automatically through GitHub Actions using AWS OIDC. No long-lived AWS credentials are stored in the repository.

## Design

Target design source:
`https://www.figma.com/design/269jxTWoaLXBiqwzZb2hyo/Wish-candle-shop?node-id=43-13623`

The current page is a temporary holding page until Figma access permits the production design to be implemented faithfully.
