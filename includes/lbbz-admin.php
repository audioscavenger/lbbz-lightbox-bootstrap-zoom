<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly
// https://adambrown.info/p/wp_hooks/hook
// https://rachievee.com/the-wordpress-hooks-firing-sequence/


if ( ! function_exists( 'lbbz_php_version_notice' )) { function lbbz_php_version_notice() {
  $class = 'notice notice-error';
  $message = __( "<strong>".LBBZ_NAME." for WordPress</strong> requires PHP version 5.3 or later. You are running PHP version " . PHP_VERSION . ". Please upgrade to a supported version of PHP.", 'sample-text-domain' );

  printf( '<div class="%1$s"><p>%2$s</p></div>', $class, $message ); 
}}
