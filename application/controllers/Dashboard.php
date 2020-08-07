<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
	{
		$this->load->model('Services');
	}


	public function index()
	{
		$isAvailable = $this->Services->isAvailable();
		var_dump($isAvailable);
		$this->load->view('template/header');
		if (isset($isAvailable)){
			$data = array(
				'onService' => $isAvailable
			);
	}
		$this->load->view('dashboard/login',$data);
	}

	public function savepdsMyService(){

	}


}
