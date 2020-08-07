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
		$this->load->model('Services');


	}

	/**
	 * Function to load an view
	 */
	public function index(){
		$this->load->view('template/header');
		$this->load->view('Login/loginForm');
	}
	public function userRegister(){
		$this->load->view('template/header');
		$this->load->view('Register/registerForm');

	}
	public function addUser(){
		$this->form_validation->set_rules('username', 'username', 'trim|required');
		$this->form_validation->set_rules('password', 'password', 'trim|required');
		$this->form_validation->set_rules('fullname', 'fullname', 'trim|required');
		$this->form_validation->set_rules('grade', 'grade', 'trim|required');
		if ($this->form_validation->run() == FALSE) {
			$this->load->view('Register/registerForm');
		} else {
			$data = array(
				'username' => $this->input->post('username'),
				'fullname' => $this->input->post('fullname'),
				'password' => $this->input->post('password'),
				'grade'=> $this->input->post('grade')
			);
			$result = $this->loginDatabase->registerUser($data);
			if ($result == TRUE) {
				$data['message_display'] = 'Registration Successfully !';
				$this->load->view('Login/loginForm', $data);
			} else {
				$data['message_display'] = 'Username already exist!';
				$this->load->view('Register/registerForm', $data);
			}
		}
	}


	/**
	 * Function to load when we send an form
	 */
	public function userLogin(){
		$this->form_validation->set_rules('username', 'pseudo', 'trim|required');
		$this->form_validation->set_rules('password', 'mot de passe', 'trim|required');
		if($this->form_validation->run() == FALSE){
			if(isset($this->session->userdata['logged_in'])){
				$this->load->view('template/header');
				$this->load->view('dashboard/login');
			}
			else{
				$this->load->view('template/header');
				$this->load->view('Login/loginForm');
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
				$onServiceName = $this->Services->isAvailable();
				if ($result != false) {
					$sessionData = array(
						'username' => $result[0]->username,
						'fullname' => $result[0]->Fullname,
						'onServiceName' => $onServiceName
						// TODO : Add les autres information nécessaire grade..
					);
					$this->load->view('template/header');
					$this->load->view('dashboard/login',$sessionData);

				}
			}
			else{
				$data = array(
					'error_message' => 'Identifiants invalides.'
				);
				$this->load->view('template/header');
				$this->load->view('Login/loginForm', $data);
			}

		}
	}
	public function logout() {
		$sessionInfo = array(
			'username' => ''
		);
		$this->session->unset_userdata('logged_in', $sessionInfo);
		$this->load->view('template/header');
		$this->load->view('Login/loginForm');
	}

	public function pds(){


	}
	
}
