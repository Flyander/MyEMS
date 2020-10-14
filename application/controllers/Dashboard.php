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
		$this->load->model('Fusillade');
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
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['county'] = $this->Services->getCounty($this->session->sessionData['username']);
		$data['isPharmacien'] =  $this->Services->getIfPharmacien($this->session->sessionData['username']);
		$data['isPharmacieOpen'] = $this->Services->getPharmacieState($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		$this->load->view('template/footer');
	}

	public function getDispatch()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isPharmacien'] =  $this->Services->getIfPharmacien($this->session->sessionData['username']);
		$data['county'] = $this->Services->getCounty($this->session->sessionData['username']);
		$data['isPharmacieOpen'] = $this->Services->getPharmacieState($this->session->sessionData['username']);
		
		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function getOptionDispatch()
	{
		$id = $this->input->post('id');
		$isSupervisor = $this->input->post('isSupervisor');


		$data['playerInfo'] = $this->Services->getOptionForPlayer($id);

		if ($this->session->sessionData['username'] == $id)
			$data['isYourself'] = 1;
		else
			$data['isYourself'] = 0;

		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function logout()
	{
		$this->Services->endService($this->session->sessionData['username']);
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$this->Services->closePharmacie($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 0;
		redirect('/UserLogin/logout');
	}

	public function pds(){
		if(!$this->Services->isOnService($this->session->sessionData['id'])) {
			$this->Services->CreateServices($this->session->sessionData['id']);
			$this->Services->startService($this->session->sessionData['username']);

		}
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  1;
		$data['isSupervisor'] = 0;
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}

	public function pauseService(){

		$this->Services->pauseCurrentService($this->session->sessionData['username']);
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $this->Services->isAvailable();
		$data['isSupervisor'] = 0;
		$data['onService'] = 2;
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');

	}

	public function finPauseService(){

		$this->Services->startService($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $this->Services->isAvailable();
		$data['onService'] = 1;
		$data['isSupervisor'] = 0;
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');

	}

	public function fds(){

		$this->Services->endService($this->session->sessionData['username']);
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 0;
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');

	}

	public function supervisor(){

		$this->Services->supervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['isSupervisor'] = 1;
		$data['fname'] = $this->session->sessionData['fullname'];
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}

	public function endSupervisor(){
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['isSupervisor'] = 0;
		$data['fname'] = $this->session->sessionData['fullname'];
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}

	public function ouvrirPharmacie()
	{
		$this->Services->openPharmacie($this->session->sessionData['username']);
		redirect('/Dashboard/index');
	}

	public function fermerPharmacie()
	{
		$this->Services->closePharmacie($this->session->sessionData['username']);
		redirect('/Dashboard/index');
	}

	public function dispatchFusillade()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/dispatch_fusillade',$data);
		$this->load->view('template/footer');
	}

	public function getDataFusillade()
	{
		$data = $this->session->userdata('sessionData');

		$data['dataFusillade'] = $this->Fusillade->getFusillade();
		
		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function getDataModalBed()
	{
		$bed = $this->input->post('bed');

		$data = $this->session->userdata('sessionData');
		$data['dataBed'] = $this->Fusillade->getDataBed($bed, $this->session->sessionData['username']);

		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function setDataModalBed() {
		$bed = $this->input->post('id_bed');
		$data_patient = $this->input->post('data_patient');
		$data_medecin = $this->input->post('data_medecin');
		$data_desc = $this->input->post('data_desc');
		$data_etat = $this->input->post('data_etat');

		$this->Fusillade->setDataBed($bed, $data_patient, $data_medecin, $data_desc, $data_etat);

		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function setCounty()
	{
		$county = $this->Services->getCounty($this->session->sessionData['username']);

		if ($county == 'LS')
		{
			$this->Services->setCounty('BC', $this->session->sessionData['username']);
		}
		else
		{
			$this->Services->setCounty('LS', $this->session->sessionData['username']);
		}
		redirect('/Dashboard/index');
	}

	public function documentation()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/documentation',$data);
		$this->load->view('template/footer');
	}
	public function myHours(){

	}

}
