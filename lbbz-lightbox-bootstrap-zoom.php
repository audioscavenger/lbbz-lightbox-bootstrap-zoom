// version: 1.2.0
// 
// https://developer.wordpress.org/reference/hooks/the_content/
// all img should have: data-bs-toggle="modal" data-bs-target="#lightbox-modal"
function get_lightbox_html($content){
if ( is_singular() && in_the_loop() && is_main_query() ) {
$modal = <<<HEREDOC
<div id="lightbox-modal" class="modal fade" tabindex="-1" aria-hidden="true">
  <div id="spinner" class="lds-dual-ring"></div>
  <div id="lightbox-modal-bg" class="modal-dialog modal-dialog-centered">
    <div id="lightbox-modal-content" class="modal-content lightbox_zoom_outer">
      <button id="lightbox-modal-close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">❌</button>
        <div id="lightbox-modal-body" class="modal-body">
          <img id="lightbox-modal-img" decoding="async" loading="lazy" />
      </div>
    </div>
  </div>
  <button id="lightbox-modal-prev-btn" type="button" class="btn btn-link">◀️</button>
  <button id="lightbox-modal-next-btn" type="button" class="btn btn-link">▶️</button>
</div>	
HEREDOC;
return $content.$modal;
}
}
add_filter( 'the_content', 'get_lightbox_html' );

// Wordpress lightbox-modal data add to all images: data-bs-toggle="modal" data-bs-target="#lightbox-modal"
// noobs prefer the heavy DOM method... preg_replace is 100x faster
function add_lightbox_data_to_img( $content ) {
if ( is_singular() && in_the_loop() && is_main_query() ) {
	global $post;
	$pattern ="/<a (.*?)href=(.*?)><img (.*?)class=\"(.*?)\"(.*?)>/i";
	$replacement = '<a $1href=$2><img data-bs-toggle="modal" data-bs-target="#lightbox-modal" $3class="$4 img-fluid"$5>';
	$content = preg_replace($pattern, $replacement, $content);
	// $html = preg_replace( '/<img /', ' data-bs-toggle="modal" data-bs-target="#lightbox-modal"', $html );
	return $content;
	}
return $content;
}
add_filter( 'the_content', 'add_lightbox_data_to_img', 20 );  // use 20 to execute after shortcodes

/* for some reason, this crap add /body twice
// https://stackoverflow.com/questions/20473004/how-to-add-automatic-class-in-image-for-wordpress-post
function add_lightbox_data_to_img($content){
	if (is_single()) {
		$content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
		$document->loadHTML(utf8_decode($content), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD); // / body twice fix

		$imgs = $document->getElementsByTagName('img');
		foreach ($imgs as $img) {
			$img->setAttribute('data-bs-toggle','modal');
			$img->setAttribute('data-bs-target','#lightbox-modal');
		}

		$html = $document->saveHTML();
		return $html;
	}
}
add_filter('the_content', 'add_lightbox_data_to_img');
*/