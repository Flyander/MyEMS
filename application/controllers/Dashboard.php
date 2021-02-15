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
		$this->load->library('form_validation');
		$this->load->model('Services');
		$this->load->model('Fusillade');
		$this->load->model('Hour');
		$this->load->model('Patient');
		$this->load->model('AppointmentMod');
		if (!isset($this->session->userdata['sessionData'])) {
			redirect('/UserLogin');
		}
	}


	public function index()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['county'] = $this->Services->getCounty($this->session->sessionData['username']);
		$data['isPharmacien'] =  $this->Services->getIfPharmacien($this->session->sessionData['username']);
		$data['isPharmacieOpen'] = $this->Services->getPharmacieState($this->session->sessionData['username']);
		$data['onService'] = $this->Services->isOnService($this->session->sessionData['id']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		$this->load->view('template/footer');
	}

	public function getDispatch()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] = $isAvailable;
		if(!empty($isAvailable) )
		{
			$val = $this->Services->getSpeFromUser($isAvailable);
			if(!empty($val))
			$data['onServiceName'][0]['spe'] = $val;
			else{
				$data['onServiceName'][0]['spe'] = "N/A";
			}
		}
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isPharmacien'] =  $this->Services->getIfPharmacien($this->session->sessionData['username']);
		$data['county'] = $this->Services->getCounty($this->session->sessionData['username']);
		$data['isPharmacieOpen'] = $this->Services->getPharmacieState($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		
		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	public function getSpeFromUser()
	{
		$id = $this->input->post('id');
		$data['spe'] = $this->Services->getSpeFromUser( $this->Services->isAvailable());
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
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  0;
		$data['supervisor'] = 0;
		$data['isAdmin'] = 0;
		redirect('/UserLogin/logout');
	}

	public function pds(){
		if(!$this->Services->isOnService($this->session->sessionData['id'])) {
			if(!$this->Services->isOnPause($this->session->sessionData['id'])) {
				$this->Services->CreateServices($this->session->sessionData['id']);
				$this->Services->startService($this->session->sessionData['username']);
			}
			else{
				$this->Services->startService($this->session->sessionData['username']);
			}
		}
		$data = $this->session->userdata('sessionData');
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  1;
		$data['isSupervisor'] = 0;
		if(!empty($isAvailable) ) $data['onServiceName'][0]['spe'] = $this->Services->getSpeFromUser($data['onServiceName']);
		else $data['OnServiceName'][0]['spe'] = "N/A";
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}

	public function getSpe(){
		//$id = $this->input->post('id');
		if(!empty($isAvailable) ) $data['spe'] = $this->Services->getSpeFromUser( $this->Services->isAvailable());
		$return['data'] = $data;
		$return['code'] = 200;
		echo json_encode($return);

	}
	public function speService(){

		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  2;
		//var_dump($data);
		$data['isSupervisor'] = 0;
		if(!empty($isAvailable) ) $data['onServiceName'][0]['spe'] = $this->Services->getSpeFromUser($data['onServiceName']);
		else $data['OnServiceName'][0]['spe'] = "N/A";
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->Services->takeSpeServices($this->session->sessionData['id']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header');
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');

	}
	public function endSpeService(){

		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  1;
		$data['isSupervisor'] = 0;
		if(!empty($isAvailable) ) $data['onServiceName'][0]['spe'] = $this->Services->getSpeFromUser($data['onServiceName']);
		else $data['OnServiceName'][0]['spe'] = "N/A";
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$this->Services->takeSpeServices($this->session->sessionData['id']);
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
		//$this->load->view('template/header');
		//$this->load->view('dashboard/dispatch_global',$data);
		//redirect('/Dashboard/index');

	}

	public function fds(){

		$this->Services->endService($this->session->sessionData['username']);
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$this->Services->endDispatch($this->session->sessionData['username']);
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

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}
	public function dispatch(){

		$this->Services->dispatch($this->session->sessionData['id']);
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['isSupervisor'] = 1;
		$data['fname'] = $this->session->sessionData['fullname'];
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$this->session->unset_userdata('sessionData');
		$this->session->set_userdata('sessionData', $data);
		$this->load->view('template/header',$data);
		$this->load->view('dashboard/dispatch_global',$data);
		redirect('/Dashboard/index');
	}

//	public function dispatch(){
//
//		$this->Services->dispatch($this->session->sessionData['id']);
//		$data = $this->session->userdata('sessionData');
//		$data['onServiceName'] =  $this->Services->isAvailable();
//		$data['isSupervisor'] = 2;
//		$data['fname'] = $this->session->sessionData['fullname'];
//		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
//
//		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
//
//		$this->session->unset_userdata('sessionData');
//		$this->session->set_userdata('sessionData', $data);
//		$this->load->view('template/header',$data);
//		$this->load->view('dashboard/dispatch_global',$data);
//		redirect('/Dashboard/index');
//	}

	public function endSupervisor(){
		$this->Services->endSupervisor($this->session->sessionData['username']);
		$this->Services->endDispatch($this->session->sessionData['username']);
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
	public function endDispatch(){
		$this->Services->endDispatch($this->session->sessionData['username']);
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
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$county = $this->Services->getCounty($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);

		if ($county == 'LS')
		{
			$this->load->view('dashboard/dispatch_fusillade',$data);
		}
		else
		{
			$this->load->view('dashboard/dispatch_fusillade_bc',$data);
		}

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
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/documentation',$data);
		$this->load->view('template/footer');
	}
	public function procedure(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/procedure',$data);
		$this->load->view('template/footer');

	}
	public function tarification(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/tarification',$data);
		$this->load->view('template/footer');

	}

	public function listAccount() 
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['collAccount'] = $this->Services->getAllAccount();

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/admin/listAccount',$data);
		$this->load->view('template/footer');
	}

	public function newAccount()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/admin/newAccount',$data);
		$this->load->view('template/footer');
	}
	public function newSpe()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/admin/newSpe',$data);
		$this->load->view('template/footer');
	}
	public function showRdv(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['actualRdv'] = $this->AppointmentMod->getAppointmentInProgress();
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/rdv/showRdv',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('template/footer');
	}
		public function createAppointment(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$data['userInfo'] = $this->Services->getUserInfo();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['actualRdv'] = $this->AppointmentMod->getAppointmentInProgress();
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/rdv/rdv',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('template/footer');
	}
	public function showRdvEnd(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['actualRdv'] = $this->AppointmentMod->getAppointmentEnded();
		$data['usernameRdv'] = $this->AppointmentMod->getUsernameFromId($data['actualRdv']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/rdv/showRdvEnd',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('template/footer');
	}
	public function showRdvTaken(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['actualRdv'] = $this->AppointmentMod->getAppointmentTaken();
		$data['usernameRdv'] = $this->AppointmentMod->getUsernameFromId($data['actualRdv']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/rdv/showRdvTaken',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('template/footer');
	}

	public function listSpe(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/admin/listSpe',$data);
		$this->load->view('template/footer');
	}
	public function deleteSpeInDB(){
		$spename = $this->input->post('spe');
		$this->Services->deleteSpeDB($spename);
		$return['message'] = 'OK';
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function testPage(){
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$this->load->view('template/header');
	//	$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/testpage',$data);
		$this->load->view('template/footer');

	}

	public function getSelectSpe()
	{
		$type_rdv = $this->input->post('type_rdv');

		$return['collUserWithSpe'] = $this->AppointmentMod->getUserWithSpe($type_rdv);
		echo json_encode($return);
	}

	public function getSelectAllUser()
	{
		$return['collUser'] = $this->Services->getUserInfo();
		echo json_encode($return);
	}

	public function delAppointment(){
		$id = $this->input->post('id');
		$this->AppointmentMod->deleteAppointment($id);
		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}
	public function ValidateAppointment(){
		$idRdv = $this->input->post('idRdv');
		$idUser = $this->input->post('idUser');

		$this->AppointmentMod->validateAppointment($idRdv,$idUser);
		$return['message'] = 'OK';
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function leaveAppointment(){
		$idRdv = $this->input->post('idRdv');
		$this->AppointmentMod->leaveAppointment($idRdv);
		$return['message'] = 'OK';
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function takeAppointment(){
		$idRdv = $this->input->post('idRdv');
		$idUser = $this->input->post('idUser');

		$this->AppointmentMod->takeAppointment($idRdv,$idUser);
		$return['message'] = 'OK';
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function newAddSpe()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/admin/addSpeToUser',$data);
		$this->load->view('template/footer');
	}
public function newDeleteSpe()
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['userName'] = $this->Services->allUsername();
		$data['allSpe'] = $this->Services->allSpe();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('template/footer');
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/admin/DeleteSpeFromUser',$data);

	}
	public function deleteSpeFromUser(){
		$id = $this->input->post('id');
		$spe = $this->input->post('spe');
		$this->Services->DeleteSpeUser($id,$spe);
		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}
	public function addAppointment(){
		$fullname = $this->input->post('fullname');
		$num = $this->input->post('phone');
		$mail = $this->input->post('mail');
		$msg = $this->input->post('msg');
		$reason = $this->input->post('reason');
		$this->AppointmentMod->addAppointmentInDb($fullname,$num,$mail,$msg,$reason);

		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}
	public function addAppointmentPanel(){
		$fullname = $this->input->post('fullname');
		$num = $this->input->post('phone');
		$mail = $this->input->post('mail');
		$msg = $this->input->post('msg');
		$userId = $this->input->post('id');
		$reason = $this->input->post('reason');
		$this->AppointmentMod->addAppointmentPanelInDb($fullname,$num,$mail,$msg,$reason,$userId);

		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}
	public function getSpeUser(){
		$id = $this->input->post('id');
		$data['allSpeUser'] = $this->Services->getSpeFromUserId($id);
		$return['data'] = $data;
		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}

	public function addNewUserInDB()
	{
		$data_prenom = $this->input->post('data_prenom');
		$data_nom = $this->input->post('data_nom');
		$data_grade = $this->input->post('data_grade');
		$data_mdp = $this->input->post('data_mdp');
		$data_isAdmin = $this->input->post('data_isAdmin');
		$data_num = $this->input->post('data_num');

		$data_fullname = "{$data_prenom} {$data_nom}";
		$data_username = strtolower($data_prenom[0]) . strtolower($data_nom);
		$data_num = str_replace(' ', '', $data_num);
		$data_num = str_replace('-', '', $data_num);

		$this->Services->addUser($data_fullname, $data_username, $data_grade, $data_mdp, $data_isAdmin, $data_num);

		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	public function addNewSpeInDB()
	{
		$data_spe = $this->input->post('data_spe');
		$check = $this->Services->addSpe($data_spe);
		if($check ){
			$return['message'] = 'OK';
			$return['code'] = 200;
		}else{
			$return['message'] = 'KO';
			$return['code'] = 500;
		}
		echo json_encode($return);
	}
	public  function addSpeUser(){
		$data_spe = $this->input->post('data_spe');
		$data_usr = $this->input->post('data_user');
		$this->Services->addUserSpe($data_usr,$data_spe);
		
		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);

	}

	public function deleteUserInDB()
	{
		$username = $this->input->post('username');

		$this->Services->deleteUser($username);

		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	public function deleteHoursInDB()
	{
		$id = $this->input->post('id');

		$this->Hour->deleteHours($id);

		$return['message'] = 'OK';
		$return['code'] = 200;

		echo json_encode($return);
	}

	public function getUserData()
	{
		$username = $this->input->post('username');

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['dataAccount'] = $this->Services->getUserDataInDB($username);

		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	public function getHourData()
	{
		$id = $this->input->post('id');
		$data['dateStart'] = $this->Hour->getDateStart($id)[0];
		$data['dateEnd'] = $this->Hour->getDateEnd($id)[0];

		$return['data'] = $data;
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function printHourW(){
		$id = $this->input->post('id');
		$nbSemaineTemp = $this->input->post('nbSemaineTemp');

		$dateStart = strftime("%Y/%m/%d 00-00-00",strtotime($this->input->post('dateStart')));
		$dateEnd = strftime("%Y/%m/%d 00-00-00",strtotime($this->input->post('dateEnd')));

		$data['hourWeek'] = $this->Hour->getHour($id, $dateStart, $dateEnd);
		$data['totalHours'] = $this->Hour->getTotalHour($data['hourWeek']);
		$data['totalHourWeek'] = $this->Hour->getHourWeek($data['totalHours']);

		$temp = $nbSemaineTemp + 1;
		$data['paramAdd'] = date("Y-m-d", strtotime("first saturday of january + $temp week"));

		$temp = $nbSemaineTemp - 1;
		$data['paramRemove'] = date("Y-m-d", strtotime("first saturday of january + $temp week"));

		$return['data'] = $data;
		$return['code'] = 200;

		echo json_encode($return);
	}
	public function getUserHourData()
	{
		$username = $this->input->post('username');

		$premierJour = strftime("%Y/%m/%d 00-00-00", strtotime("-1 sunday"));
		$lastJour = strftime("%Y/%m/%d 23-59-59", strtotime(" friday"));

		$id_user = $this->Hour->getIdFromUsername($username);
		$data['data_fullname'] = $this->Hour->getFullnameFromUsername($username);


		$data['hourWeek'] = $this->Hour->getHour($id_user, $premierJour, $lastJour);
		$data['totalHours'] = $this->Hour->getTotalHour($data['hourWeek']);
		$data['totalHourWeek'] = $this->Hour->getHourWeek($data['totalHours']);

		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	
	public function setDataModalAdmin() {
		$data_fullname = $this->input->post('data_fullname');
		$data_username = $this->input->post('data_username');
		$data_grade = $this->input->post('data_grade');
		$data_num = $this->input->post('data_num');
		$oldUsername = $this->input->post('oldUsername');

		$data_num = str_replace(' ', '', $data_num);
		$data_num = str_replace('-', '', $data_num);

		$this->Services->updateUserDataInDB($data_fullname, $data_username, $data_grade, $oldUsername, $data_num);

		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	public function setDataModalHours() {
		$data_start = $this->input->post('data_start');
		$data_end = $this->input->post('data_end');
		$data_id = $this->input->post('id');
		$data_start = str_replace('T',' ',$data_start);
		$data_end = str_replace('T',' ',$data_end);
		$data_start = $data_start . ":00";
		$data_end = $data_end .":00";
		$this->Hour->updateHoursDataInDB($data_id, $data_start, $data_end);
		$return['message'] = 'OK';
		$return['code'] = 200;
		echo json_encode($return);
	}

	public function myHours(){
		$premierJour = strftime("%Y/%m/%d 00-00-00", strtotime("-1 Saturday"));
		$lastJour = strftime("%Y/%m/%d 23-59-59", strtotime(" friday"));
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['collGrade'] = $this->Services->getAllGrade();
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['hourWeek'] = $this->Hour->getHour($this->session->sessionData['id'],$premierJour,$lastJour);
		$data['totalHours'] = $this->Hour->getTotalHour($data['hourWeek']);
		$data['totalHourWeek'] = $this->Hour->getHourWeek($data['totalHours']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
		$data['nbSemaine'] = 0;
		

		/*for ($i = 0; $i < 54; $i++) {
			$d = new DateTime(date("Y-m-d", strtotime("first saturday of january + $i week")));
			$t = new DateTime(date("Y-m-d", strtotime("today")));
			print_r($d->format("W"));die();
			if ($d->format("W") == $t->format("W") - 1)
			{
				$data['nbSemaine'] = $i + 1 ;
			}	
		}*/
		$t = new DateTime(date("Y-m-d", strtotime("today")));
		$data['nbSemaine'] = $t->format("W");
		
		$this->session->set_userdata('sessionData', $data);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('modal/modal_fusillade',$data);
		$this->load->view('dashboard/listHour',$data);
		$this->load->view('template/footer');

	}

	public function endServiceOptionDispatch()
	{
		$username = $this->input->post('username');

		$this->Services->endService($username);
		$this->Services->endSupervisor($username);

		$return['message'] = "Fin de service effectué";
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function gestionPatient()
	{
		$data = $this->session->userdata('sessionData');

		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/patient/gestion_patient',$data);
		$this->load->view('template/footer');
	}

	public function encoderPatient()
	{
		$data = $this->session->userdata('sessionData');

		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/patient/encoder_patient',$data);
		$this->load->view('template/footer');
	}

	public function addPatient() 
	{
		$data_prenom = $this->input->post('newPatient-prenom');
		$data_nom = $this->input->post('newPatient-nom');
		$data_num = $this->input->post('newPatient-num');
		$data_proche_nom = $this->input->post('newPatient-procheNom');
		$data_proche_num = $this->input->post('newPatient-procheNum');
		$data_poids = $this->input->post('newPatient-poids');
		$data_taille = $this->input->post('newPatient-taille');
		$data_dob = $this->input->post('newPatient-dob');
		$data_gs = $this->input->post('newPatient-gs');


		$data_fullname = "{$data_prenom} {$data_nom}";
		$data_image = strtolower($data_prenom) . "_" . strtolower($data_nom) . ".png";
		$data_num = str_replace(' ', '', $data_num);
		$data_num = str_replace('-', '', $data_num);

		$data_proche_num = str_replace(' ', '', $data_proche_num);
		$data_proche_num = str_replace('-', '', $data_proche_num);

		

		$image_path = realpath(APPPATH . '../uploads');
		$config['upload_path'] = $image_path;
		$config['file_name'] = $data_image;
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = 2000;
        $config['max_width'] = 1500;
		$config['max_height'] = 1500;
		$config['overwrite'] = true;

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload('profile_pic')) 
		{
            $error = array('error' => $this->upload->display_errors());

            $this->load->view('dashboard/errorView', $error);
        } 
		else 
		{

			//$resultOfUpload = $this->upload->data();

			$path = base_url() .'uploads/' . $data_image;

			$this->Patient->insertNewPatient($data_fullname, $data_num, $data_proche_nom, $data_proche_num, $data_gs, $data_poids, $data_taille, $data_dob, $path);

			$data = $this->session->userdata('sessionData');

			$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
			$data['name'] = $this->Services->getName($this->session->sessionData['username']);
			$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
			$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

			$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
			$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);
	
			$this->load->view('template/header');
			$this->load->view('template/sidebar',$data);
			$this->load->view('dashboard/patient/gestion_patient',$data);
			$this->load->view('template/footer');
        }
	}
	
	public function researchPatient()
	{
		$data = $this->session->userdata('sessionData');

		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['collPatient'] = $this->Patient->getAllPatient();
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/patient/research_patient',$data);
		$this->load->view('template/footer');
	}


	public function dataPatient()
	{
		$data_id = $this->input->get('id');

		$data = $this->session->userdata('sessionData');

		
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		$data['stateTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);

		$data['patient'] = $this->Patient->getPatientData($data_id);
		$data['imagePath'] = $this->Patient->getImageForSideBar($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/patient/data_patient',$data);
		$this->load->view('template/footer');
	}

	public function changeStateTheme()
	{
		$theme = $this->input->post('theme');

		if ($theme == 'light')
			$this->Hour->setThemeFromUsername($this->session->sessionData['username'], 'dark');
		else
			$this->Hour->setThemeFromUsername($this->session->sessionData['username'], 'light');

		$return['newTheme'] = $this->Hour->getThemeFromUsername($this->session->sessionData['username']);
		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
}
