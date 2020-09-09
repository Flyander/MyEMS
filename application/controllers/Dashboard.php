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
		parent::__construct();
		$this->load->helper(array('url','form','language'));
		$this->load->library('session');
		$this->load->model('Services');
		if (!isset($this->session->userdata['sessionData'])) {
			redirect('/UserLogin');
		}
	}


	public function index()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/login',$data);
		$this->load->view('template/footer');
	}

	public function logout()
	{
		redirect('/UserLogin/logout');
	}

	public function pds(){

		$this->Services->startService($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  1;
		$data['supervisor'] = 0;
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');

	}

	public function pauseService(){

		$this->Services->pauseCurrentService($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $this->Services->isAvailable();
		$data['supervisor'] = 0;
		$data['onService'] = 2;
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');

	}

	public function finPauseService(){

		$this->Services->startService($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $this->Services->isAvailable();
		$data['onService'] = 1;
		$data['supervisor'] = 0;
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');

	}

	public function fds(){

		$this->Services->endService($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 0;
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');

	}
	public function supervisor(){

		$this->Services->supervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 1;
		$data['fname'] = $this->session->sessionData['fullname'];
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');
	}
	public function endSupervisor(){
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 0;
		$data['fname'] = $this->session->sessionData['fullname'];
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/login',$data);
		redirect('/Dashboard/index');
	}
}
