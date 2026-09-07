<?php get_header(); ?>
<main class="entry-content"><?php while (have_posts()) : the_post(); ?><article <?php post_class(); ?>><h1><?php the_title(); ?></h1><?php if (has_post_thumbnail()) the_post_thumbnail('large'); ?><?php the_content(); ?></article><?php endwhile; ?></main>
<?php get_footer(); ?>
