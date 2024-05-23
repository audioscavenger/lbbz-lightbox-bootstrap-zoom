<?php

/*
Plugin Name:  Lightbox Bootstrap Zoom
Plugin URI:   https://www.it-cooking.com/wordpress-plugin-lbbz-lightbox-bootstrap-zoom-v1-0/
Description:  Lightbox Gallery for WordPress, with zoom-in by scrolling.
Author:       Eric Derewonko
Version:      1.3.1
Author URI:   https://github.com/audioscavenger/
License:      AGPLv3
Requires WP: 6.5
Requires PHP: 5.3
Text Domain:  lbbz
Domain Path:  /languages
License URI:  https://www.gnu.org/licenses/agpl-3.0.html
*/

/*
  Copyright 2024 Eric Derewonko
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE, version 3, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software Foundation, Inc. <http://fsf.org/>
  51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


// https://developer.wordpress.org/plugins/plugin-basics/best-practices/
if (!defined('ABSPATH')) exit; // Exit if accessed directly

if (defined('LBBZ_PLUGIN')) exit;  // Prevent problems if plugin is included twice (#472)

define('LBBZ_PLUGIN', __FILE__);
define('LBBZ_PLUGIN_DIR', __DIR__);
define('LBBZ_URL', plugin_dir_url( __FILE__ ));
define('LBBZ_NAME', 'Lightbox Bootstrap Zoom');
define('LBBZ_MIN_PHP_VERSION', '5.3.0');

/* ============================================================= */
// https://codex.wordpress.org/Shortcode_API
// https://adambrown.info/p/wp_hooks/hook
// https://rachievee.com/the-wordpress-hooks-firing-sequence/

// https://getbootstrap.com/docs/5.3/helpers/color-background/
// https://getbootstrap.com/docs/5.3/utilities/colors/
// https://getbootstrap.com/docs/5.3/utilities/background/

// https://developer.wordpress.org/plugins/plugin-basics/best-practices/#folder-structure
// https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/
// https://developer.wordpress.org/plugins/wordpress-org/planning-submitting-and-maintaining-plugins/
// https://wordpress.org/plugins/developers/add/
/* ============================================================= */

// $lbbz_debug = false;
$lbbz_debug = true;
// BUG: in LBBZ_NOCACHE, & is escaped: ?nocache=true%2F&#038;v=192851974
if (!defined('LBBZ_NOCACHE')) { if ($lbbz_debug) {define('LBBZ_NOCACHE', '?nocache=true&v='.rand());} else {define('LBBZ_NOCACHE');} }


// ======================================================================== //		
// PHP Version notice if version < 5.3
// ======================================================================== // 
if ( is_admin() ) {
  require_once( 'includes/lbbz-admin.php' );
  
  //Only run this if the PHP version is less than 5.3
  if (version_compare(PHP_VERSION, LBBZ_MIN_PHP_VERSION, '<')) {
    add_action( 'admin_notices', 'lbbz_php_version_notice' );
  }
}
// ======================================================================== // 


// ======================================================================== // 
// register_activation_hook( __FILE__, 'pluginprefix_function_to_run' );
// register_deactivation_hook( __FILE__, 'pluginprefix_function_to_run' );
// ======================================================================== // 
require_once( 'includes/lbbz-public.php' );

/* // nopthing works as you wish, these days
if ( ! function_exists( 'lbbz_load' )) { function lbbz_load() {
  $currentScreen = get_current_screen();
  // ------------------------------------------------------------------------------ // posts     pages     post  page
     // echo('<pre>currentScreen      base='.$currentScreen->base.PHP_EOL);         // edit      edit      post  post
          // echo('currentScreen        id='.$currentScreen->id.PHP_EOL);           // edit-post edit-page post  page
  // echo('currentScreen post_type='.$currentScreen->post_type.'</pre>'PHP_EOL);    // post      page      post  page
  if( $currentScreen->id === "post" ) {
    require_once( 'includes/lbbz-public.php' );
    
    add_action( 'wp_enqueue_scripts', 'lbbz_load_assets', 12 );  // loaded
    add_action( 'admin_print_footer_scripts', 'lbbz_load_assets' );  // loaded
    
    add_filter( 'the_content', 'lbbz_insert_lightbox_html' );
    add_filter( 'the_content', 'lbbz_add_lightbox_data_to_img', 20 );  // use 20 to execute after shortcodes; to be fair, I believe 13 is okay
  }
}}
add_action( 'current_screen', 'lbbz_load' );
*/
