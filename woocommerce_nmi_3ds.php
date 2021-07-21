<?php
/**
 * Plugin Name: woocommerce_nmi_3ds
 * Plugin URI: https://siores.com/
 * Description: Add-on created to manage shipments in Woocommerce
 * Version: 1.0.0
 * Author: Siores
 * Author URI: https://siores.com
 * Text Domain: woocommerce_nmi_3ds
 * Domain Path: /langs
 * Copyright: © 2021 Siores.
 * WC tested up to: 4.6
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @package cpgw
 */

add_action('wp_enqueue_scripts', 'css_api_invu');
function css_api_invu() {
	wp_enqueue_style( 'css_woocommerce_nmi_3ds', plugins_url( '/build/css/woocommerce_nmi_3ds.css', __FILE__ ) );
	wp_enqueue_style( 'css_woocommerce_nmi_3ds' );
	//wp_enqueue_script( 'css_woocommerce_nmi_3ds', plugins_url( '/js/relacion_js.js', __FILE__ ), array('jquery'), '1.0', true );
}
wp_enqueue_style( 'css_woocommerce_nmi_3ds', plugins_url( '/build/css/woocommerce_nmi_3ds.css', __FILE__ ) );
wp_enqueue_style( 'css_woocommerce_nmi_3ds' );

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Alg_WC_woocommerce_nmi_3ds' ) ) :

	/**
	 * Main Alg_WC_woocommerce_nmi_3ds Class
	 *
	 * @class   Alg_WC_woocommerce_nmi_3ds
	 * @version 1.6.2
	 * @since   1.0.0
	 */
	final class Alg_WC_woocommerce_nmi_3ds {

		/**
		 * Plugin version.
		 *
		 * @var   string
		 * @since 1.0.0
		 */
		public $version = '1.0.0';

		public $envios = [];

		/**
		 * The single instance of the class.
		 *
		 * @var   Alg_WC_woocommerce_nmi_3ds The single instance of the class
		 * @since 1.0.0
		 */
		protected static $_instance = null;

		/**
		 * Main Alg_WC_woocommerce_nmi_3ds Instance
		 *
		 * Ensures only one instance of Alg_WC_woocommerce_nmi_3ds is loaded or can be loaded.
		 *
		 * @version 1.0.0
		 * @since   1.0.0
		 * @static
		 * @return  Alg_WC_woocommerce_nmi_3ds - Main instance
		 */
		public static function instance() {
			if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		/**
		 * Alg_WC_woocommerce_nmi_3ds Constructor.
		 *
		 * @version 1.6.0
		 * @since   1.0.0
		 * @access  public
		 */
		public function __construct() {

			// Check for active plugins.
            /* COMENTADO POR LOS MOMENTOS PORQUE NO ME FUNCIONA
			if (
			! $this->is_plugin_active( 'woocommerce/woocommerce.php' ) ||
			( 'woocommerce_nmi_3ds.php' === basename( __FILE__ ) )
			) {
				return;
			}
            */

			// Include required files.
			$this->includes();

			// Admin.
            /*
			if ( is_admin() ) {
				$this->admin();
			}
            */

			$this->todos();

			$menus_nuevos = new Alg_WC_woocommerce_nmi_3ds_News;
			$menus_nuevos->menus_complemento();

			//AGREGAMOS AL MENU PRINCIPAL DEL COMPLEMENTO
            //add_action( 'admin_menu', array($menus_nuevos, 'shmeh_menu') );
		}

		/**
		 * Is plugin active.
		 *
		 * @param   string $plugin Plugin Name.
		 * @return  bool
		 * @version 1.6.0
		 * @since   1.6.0
		 */
		public function is_plugin_active( $plugin ) {
			return ( function_exists( 'is_plugin_active' ) ? is_plugin_active( $plugin ) :
			(
				in_array( $plugin, apply_filters( 'active_plugins', (array) get_option( 'active_plugins', array() ) ), true ) ||
				( is_multisite() && array_key_exists( $plugin, (array) get_site_option( 'active_sitewide_plugins', array() ) ) )
			)
			);
		}

		/**
		 * Include required core files used in admin and on the frontend.
		 *
		 * @version 1.2.0
		 * @since   1.0.0
		 */
		public function includes() {
			// Functions.
			//require_once 'includes/alg-wc-woocommerce_nmi_3ds-functions.php';//ESTE NO ME INTERESA TANTO
			// Core.
			$this->core = require_once 'includes/class-alg-wc-woocommerce_nmi_3ds-core.php';
		}


		public function todos(){
			$todos = new Alg_WC_woocommerce_nmi_3ds_News;

			$this->envios = $todos->todos;
		}

		/**
		 * Admin.
		 *
		 * @version 1.6.2
		 * @since   1.2.0
		 */
        /*
		public function admin() {
			// Action links.
			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'action_links' ) );
			// Settings.
			add_filter( 'woocommerce_get_settings_pages', array( $this, 'add_woocommerce_settings_tab' ) );
			// Version update.
			if ( get_option( 'alg_wc_woocommerce_nmi_3ds_version', '' ) !== $this->version ) {
				add_action( 'admin_init', array( $this, 'version_updated' ) );
			}
		}
        */

		/**
		 * Show action links on the plugin screen.
		 *
		 * @version 1.2.1
		 * @since   1.0.0
		 * @param   mixed $links Links.
		 * @return  array
		 */
        /*
		public function action_links( $links ) {
			$custom_links   = array();
			$custom_links[] = '<a href="' . admin_url( 'admin.php?page=wc-settings&tab=alg_wc_woocommerce_nmi_3ds' ) . '">' . __( 'Settings', 'woocommerce' ) . '</a>';
			if ( 'woocommerce_nmi_3ds.php' === basename( __FILE__ ) ) {
				$custom_links[] = '<a target="_blank" href="https://wpfactory.com/item/woocommerce_nmi_3ds-woocommerce/">' .
				__( 'Unlock All', 'woocommerce_nmi_3ds-woocommerce' ) . '</a>';
			}
			return array_merge( $custom_links, $links );
		}
        */

		/**
		 * Add Custom Payment Gateways settings tab to WooCommerce settings.
		 *
		 * @param   array $settings WC Settings Array.
		 * @return  array
		 * @version 1.2.0
		 * @since   1.0.0
		 */
		public function add_woocommerce_settings_tab( $settings ) {
            /*
			$settings[] = require_once 'includes/settings/class-alg-wc-settings-woocommerce_nmi_3ds.php';
			return $settings;
            */
		}

		/**
		 * Version updated.
		 *
		 * @version 1.2.0
		 * @since   1.2.0
		 */
		public function version_updated() {
			update_option( 'alg_wc_woocommerce_nmi_3ds_version', $this->version );
		}

		/**
		 * Get the plugin url.
		 *
		 * @version 1.0.0
		 * @since   1.0.0
		 * @return  string
		 */
		public function plugin_url() {
			return untrailingslashit( plugin_dir_url( __FILE__ ) );
		}

		/**
		 * Get the plugin path.
		 *
		 * @version 1.0.0
		 * @since   1.0.0
		 * @return  string
		 */
		public function plugin_path() {
			return untrailingslashit( plugin_dir_path( __FILE__ ) );
		}

	}

endif;

if ( ! function_exists( 'alg_wc_woocommerce_nmi_3ds' ) ) {
	/**
	 * Returns the main instance of alg_wc_woocommerce_nmi_3ds to prevent the need to use globals.
	 *
	 * @version 1.0.0
	 * @since   1.0.0
	 * @return  alg_wc_woocommerce_nmi_3ds
	 */
	function alg_wc_woocommerce_nmi_3ds() {
		return Alg_WC_woocommerce_nmi_3ds::instance();
	}
}

alg_wc_woocommerce_nmi_3ds();


/**
 * REGISTRAMOS ENVIOS PARA WOOCOMMERCE
 */
add_action('init', 'crear_Acciones_especiales');
function crear_Acciones_especiales(){
	$taxonomy = "metodoenvios";
	$terms = get_terms([
		'taxonomy' => $taxonomy,
		'hide_empty' => false,
	]);

	//if(count($terms) > 0){
		
	foreach ($terms as $key) {
		//echo "<h2>{$key->name}</h2>";
		$variable = "admin_action_{$key->slug}";
		//admin_action_sw_envio_cif
		//$variable = "admin_action_tienda";
		do_action( "admin_action_{$variable}" );

		//add_action( $variable, 'woocommerce_nmi_3ds_aplicar_envio' );

		$mandalo_Acciones = new Alg_WC_woocommerce_nmi_3ds_AccionesMasivas();

		add_action( $variable, array($mandalo_Acciones, 'woocommerce_nmi_3ds_aplicar_envio') );

	}

}

/**
 * Agregamos una tabla nueva a los tax
 */
//AGREGAMOS LOS METAS PERSONALIZADOS
$woocommerce_nmi_3ds_news = new Alg_WC_woocommerce_nmi_3ds_News();
add_action( 'metodoenvios_add_form_fields', array($woocommerce_nmi_3ds_news, 'metodoenvios_add_term_fields') );

//AGREGAMOS LA OPCION DE EDITAR
add_action( 'metodoenvios_edit_form_fields', array($woocommerce_nmi_3ds_news, 'metodoenvios_edit_term_fields'), 10, 2 );


//GUARDAMOS EL TAG
add_action( 'created_metodoenvios', array($woocommerce_nmi_3ds_news, 'metodoenvios_save_term_fields') );
add_action( 'edited_metodoenvios', array($woocommerce_nmi_3ds_news, 'metodoenvios_save_term_fields') );
 
