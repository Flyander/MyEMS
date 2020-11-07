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
		$data['onService'] = $this->Services->isOnService($this->session->sessionData['id']);
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
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
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
		
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
		$data['isAdmin'] = 0;
		redirect('/UserLogin/logout');
	}

	public function pds(){
		if(!$this->Services->isOnService($this->session->sessionData['id'])) {
			if(!$this->Services->isOnPause($this->session-sessionData['id'])) {
				$this->Services->CreateServices($this->session->sessionData['id']);
				$this->Services->startService($this->session->sessionData['username']);
			}
			else{
				$this->Services->startService($this->session->sessionData['username']);
			}
		}
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] =  $this->Services->isAvailable();
		$data['onService'] =  1;
		$data['isSupervisor'] = 0;
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
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
		//$this->load->view('template/header');
		//$this->load->view('dashboard/dispatch_global',$data);
		//redirect('/Dashboard/index');

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
		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);
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
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/documentation',$data);
		$this->load->view('template/footer');
	}

	public function listAccount() 
	{
		$isAvailable = $this->Services->isAvailable();
		$data = $this->session->userdata('sessionData');
		$data['onServiceName'] = $isAvailable;
		$data['userGrade'] = $this->Services->userGrade($this->session->sessionData['username']);
		$data['name'] = $this->Services->getName($this->session->sessionData['username']);
		$data['nbSupervisor'] = $this->Services->nbDispatch($this->session->sessionData['username']);
		$data['collAccount'] = $this->Services->getAllAccount();

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

		$data['collGrade'] = $this->Services->getAllGrade();

		$data['isAdmin'] = $this->Services->isAdmin($this->session->sessionData['username']);

		$this->load->view('template/header');
		$this->load->view('template/sidebar',$data);
		$this->load->view('dashboard/admin/newAccount',$data);
		$this->load->view('template/footer');
	}

	public function addNewUserInDB()
	{
		$data_prenom = $this->input->post('data_prenom');
		$data_nom = $this->input->post('data_nom');
		$data_grade = $this->input->post('data_grade');
		$data_mdp = $this->input->post('data_mdp');
		$data_isAdmin = $this->input->post('data_isAdmin');

		$data_fullname = "{$data_prenom} {$data_nom}";
		$data_username = strtolower($data_prenom[0]) . strtolower($data_nom);

		$this->Services->addUser($data_fullname, $data_username, $data_grade, $data_mdp, $data_isAdmin);

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

	public function getUserData()
	{
		$username = $this->input->post('username');

		$data['collGrade'] = $this->Services->getAllGrade();
		$data['dataAccount'] = $this->Services->getUserDataInDB($username);

		$return['data'] = $data;
		$return['code'] = 200;
		 
		echo json_encode($return);
	}
	
	public function setDataModalAdmin() {
		$data_fullname = $this->input->post('data_fullname');
		$data_username = $this->input->post('data_username');
		$data_grade = $this->input->post('data_grade');
		$oldUsername = $this->input->post('oldUsername');

		$this->Services->updateUserDataInDB($data_fullname, $data_username, $data_grade, $oldUsername);

		$return['message'] = 'OK';
		$return['code'] = 200;
		 
		echo json_encode($return);
	}

	public function myHours(){

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

}
