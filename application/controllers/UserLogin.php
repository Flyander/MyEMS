<?php

//session_start();
class UserLogin extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
		$this->load->library('form_validation');
		$this->load->library('session');
		$this->load->model('loginDatabase');

	}

	/**
	 * Function to load an view
	 */
	public function index(){
		$this->load->view('template/header');
		$this->load->view('Login/loginForm');
	}

	/**
	 * Function to load when we send an form
	 */
	public function userLogin(){
		$this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
		$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');
		if($this->form_validation->run() == FALSE){
			if(isset($this->session->userdata['logged_in'])){
				$this->load->view('dashboard/welcome_message');
			}
			else{
				$this->load->view('login_form');
			}
		}
		else{
			$data = array(
				'username' => $this->input->post('username'),
				'password' => $this->input->post('password')
			);
			$result = $this->loginDatabase->login($data);
			if($result == TRUE) {
				$username = $this->input->post('username');
				$result = $this->loginDatabase->readUserInformation($username);
				if ($result != false) {
					$sessionData = array(
						'username' => $result[0]->username,
						'fullname' => $result[0]->Fullname,
					);
					$this->session->set_userdata('logged_in', $sessionData);
					$this->load->view('dashboard/welcome_message');

				}
			}
			else{
				$data = array(
					'error_message' => 'Invalid Username or Password'
				);
				$this->load->view('Login/loginForm', $data);
			}

		}
	}
	
}
