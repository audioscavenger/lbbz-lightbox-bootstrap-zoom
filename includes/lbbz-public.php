<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// https://adambrown.info/p/wp_hooks/hook
// https://rachievee.com/the-wordpress-hooks-firing-sequence/


// ======================================================================== // 
if ( ! function_exists( 'lbbz_enqueue_script_defer' )) { function lbbz_enqueue_script_defer($handle, $url) {
  wp_enqueue_script(
    $handle,
    $url,
    [],
    null,
    [ 'strategy' => 'defer' ],
  );
}}


// https://developer.wordpress.org/reference/hooks/the_content/
// all img should have: data-bs-toggle="modal" data-bs-target="#lbbz"
if ( ! function_exists( 'lbbz_insert_lightbox_html' )) { function lbbz_insert_lightbox_html($content){
  if ( is_singular() && in_the_loop() && is_main_query() ) {
    $modal = <<<HEREDOC
      <div id="lbbz" class="modal fade" tabindex="-1" aria-hidden="true">
        <div id="spinner" class=""></div>
        <div id="lbbz-bg" class="modal-dialog modal-dialog-centered">
          <div id="lbbz-content" class="modal-content lightbox_zoom_outer">
            <button id="lbbz-close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">❌</button>
              <div id="lbbz-body" class="modal-body">
                <img id="lbbz-img" decoding="async" loading="lazy" />
            </div>
          </div>
        </div>
        <button id="lbbz-prev-btn" type="button" class="btn btn-link">◀️</button>
        <button id="lbbz-next-btn" type="button" class="btn btn-link">▶️</button>
      </div>	
HEREDOC;
    return $content.$modal;
  }
}}
add_filter( 'the_content', 'lbbz_insert_lightbox_html' );


// Wordpress lbbz data add to all images: data-bs-toggle="modal" data-bs-target="#lbbz"
// noobs prefer the heavy DOM method... preg_replace is 100x faster
if ( ! function_exists( 'lbbz_add_lightbox_data_to_img' )) { function lbbz_add_lightbox_data_to_img( $content ) {
  if ( is_singular() && in_the_loop() && is_main_query() ) {
    global $post;
    $pattern ="/<a (.*?)href=(.*?)><img (.*?)class=\"(.*?)\"(.*?)>/i";
    $replacement = '<a $1href=$2><img data-bs-toggle="modal" data-bs-target="#lbbz" $3class="$4 img-fluid"$5>';
    $content = preg_replace($pattern, $replacement, $content);
    // $html = preg_replace( '/<img /', ' data-bs-toggle="modal" data-bs-target="#lbbz"', $html );
    return $content;
    }
  return $content;
}}
add_filter( 'the_content', 'lbbz_add_lightbox_data_to_img', 20 );  // use 20 to execute after shortcodes; to be fair, I believe 13 is okay


//Function to register and enqueue assets
// BUG: in LBBZ_NOCACHE, & is escaped: ?nocache=true%2F&#038;v=192851974
if ( ! function_exists( 'lbbz_load_assets' )) { function lbbz_load_assets() {
  if ( is_singular() ) {

    // https://getbootstrap.com/docs/5.3/getting-started/download/#cdn-via-jsdelivr
    // https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
    // https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js    // shall be loaded conditionally
    // https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js
    // https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js   // +popper

    // * 'enqueued', 'registered', 'queue', 'to_do', 'done'.
    if (!wp_style_is( 'bootstrap', 'enqueued' )) { wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' ); }
    wp_enqueue_style( 'lbbz-core', plugins_url( '/public/css/lbbz-core.css'.LBBZ_NOCACHE, LBBZ_PLUGIN ));

    // * 'enqueued', 'registered', 'queue', 'to_do', 'done'.
    if (!wp_script_is( 'bootstrap', 'enqueued' )) { lbbz_enqueue_script_defer( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' ); }
    lbbz_enqueue_script_defer( 'modal-button', plugins_url( '/public/js/lbbz-core.js'.LBBZ_NOCACHE, LBBZ_PLUGIN ));
  }
}}
add_action( 'wp_enqueue_scripts', 'lbbz_load_assets' );  // loaded

