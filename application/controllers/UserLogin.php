<?php

session_start();
class UserLogin extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
		$this->load->library('form_validation');
		$this->load->library('session');
		$this->load->model('login_databse');

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
	}
}
