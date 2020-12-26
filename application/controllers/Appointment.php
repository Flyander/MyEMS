<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Appointment extends CI_Controller {

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
		parent::__construct();
		$this->load->helper(array('url','form','language'));
		$this->load->library('session');
		$this->load->library('form_validation');
		$this->load->model('AppointmentMod');

	}

		public function addAppointment(){
			$fullname = $this->input->post('fullname');
			$num = $this->input->post('phone');
			$mail = $this->input->post('mail');
			$msg = $this->input->post('msg');
			$reason = $this->input->post('reason');
			$check = $this->AppointmentMod->addAppointmentInDb($fullname,$num,$mail,$msg,$reason);
			if($check){
				$return['message'] = 'OK';
				$return['code'] = 200;
			}
			else{
				$return['message'] = 'KO';
				$return['code'] = 500;
			}

			echo json_encode($return);
		}

	public function index()
	{
		$this->load->view('template/header');

		$this->load->view('template/headerLogin');
		$this->load->view('Login/rdv');

	}

}
