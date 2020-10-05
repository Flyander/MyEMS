<?php

//session_start();
class UserLogin extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->helper(array('url','form','language'));
		$this->load->library('form_validation');
		$this->load->library('session');
		$this->load->model('Logindatabase_model','logindatabase_model');
		$this->load->model('Services');
	}

	/**
	 * Function to load an view
	 */
	public function index(){
		$this->load->view('template/headerLogin');
		$this->load->view('Login/loginForm');
	}
	public function userRegister(){
		$this->load->view('template/headerLogin');
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
			$result = $this->Logindatabase_model->registerUser($data);
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
			if(isset($this->session->userdata['sessionData'])){
				//$this->load->view('template/headerLogin');
				//redirect('/dashboard/login');
				//$this->load->view('dashboard/dispatch_global');
			}
			else{
				$this->load->view('template/headerLogin');
				$this->load->view('Login/loginForm');
			}
		}
		else{
			$data = array(
				'username' => $this->input->post('username'),
				'password' => $this->input->post('password')
			);
			$result = $this->Logindatabase_model->login($data);
			if($result == TRUE) {
				$username = $this->input->post('username');
				$result = $this->Logindatabase_model->readUserInformation($username);
				$onServiceName = $this->Services->isAvailable();
				if ($result != false) {
					$sessionData = array(
						'id' => $result[0]->id,
						'username' => $result[0]->username,
						'fullname' => $result[0]->Fullname,
						'onService'=> $result[0]->isAvailable,
						'grade' => $result[0]->grade,
						'onServiceName' => $this->Services->isAvailable()
					);
					$this->load->view('template/headerLogin');
					$this->session->set_userdata('sessionData', $sessionData);
					redirect('/Dashboard/index');
				}
			}
			else{
				$data = array(
					'error_message' => 'Identifiants invalides.'
				);
				$this->load->view('template/headerLogin');
				$this->load->view('Login/loginForm', $data);
			}

		}
	}
	public function logout() {
		$sessionInfo = array(
			'username' => ''
		);
		$this->session->unset_userdata('sessionData', $sessionInfo);
		$this->load->view('template/headerLogin');
		$this->load->view('Login/loginForm');
	}

	public function pull() {
		//if ( $_POST['payload'] ) {
			shell_exec('cd /var/www/MyEMS/ && git reset –hard HEAD && git pull');
		//}
	}

	public function pds(){
		$username = $this->input->get('id');
		$this->Services->startService($username);
		$this->load->view('template/headerLogin');
		$result = $this->Logindatabase_model->readUserInformation($username);
		$onServiceName = $this->Services->isAvailable();
		$sessionData = array(
			'username' => $result[0]->username,
			'fullname' => $result[0]->Fullname,
			'onServiceName' => $onServiceName
		);
//		$this->session->set_userdata('sessionData', $sessionData);
//		redirect('/Dashboard/index');

	}

}
