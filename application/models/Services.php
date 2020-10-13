<?php


class Services extends CI_Model
{
	public function isAvailable(){
		$query = "SELECT * FROM users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isAvailable=1 or isAvailable=2
		ORDER BY county DESC, gradeName ASC";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}

	public function nbDispatch($name){
		$query = "SELECT * from users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isSupervisor=1 AND username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();

		return count($result);
	}
	public function startService($hour){

		$idd = "SELECT id from users where username ='$hour'";
		$idUser  = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = ".$idUser[0]['id']." ORDER BY id DESC";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$id = $idS[0]['id'];

		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET service.isAvailable=1 
		WHERE username='$hour' AND service.id =".$id;
		$queryResult = $this->db->query($query);
		var_dump($queryResult);

	}
	public function endService($hour){
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=0 
		WHERE username='$hour'";
		$queryResult = $this->db->query($query);
		$idd = "SELECT id from users where username ='$hour'";
		$id  = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = ".$id[0]['id'];
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$idService = $idS[0]['id'];
		$queryy = "UPDATE service set dateEnd = '".date('d-m-YY H:i:s')."' WHERE id_user = ".$id[0]['id']." AND id=".$idService;
		$this->db->query($queryy);

		$queryyS = "UPDATE service set type=0 WHERE id_user = ".$id[0]['id']." AND id=".$idService;
		$this->db->query($queryyS);
		  }

	public function pauseCurrentService($name)
	{
		$idd = "SELECT id from users where username ='$name'";
		$idUser  = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = ".$idUser[0]['id']." ORDER BY id DESC";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$id = $idS[0]['id'];

		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=2
		WHERE username='$name' AND service.id = $id";
		$queryResult = $this->db->query($query);
	}
	public function supervisor($name){
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=1 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=0 
		WHERE username != '$name'";
		$queryResult = $this->db->query($query);
	}
	public function endSupervisor($name){
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=0 
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function myService($idUser){

	}

	public function userGrade($name){
		$query = "SELECT gradeName 
		FROM users 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["gradeName"];
	}

	public function getName($name) {
		$query = "SELECT fullname 
		FROM users 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["fullname"];
	}

	public function getOptionForPlayer($username)
	{
		$query = "SELECT * 
		FROM users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE username = '$username'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0];
	}
	public function CreateServices($id){
		$today = date("d-m-YY H:i:s");
		$query  = "INSERT INTO `service`(`dateStart`, `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ('".$today."', '2999-09-30 00:00:00',0, 1, 1, ".$id.")";
		$this->db->query($query);
	}

	public function getCounty($username){
		$query = "SELECT county
		FROM users 
		INNER JOIN service ON users.id = service.id_user
		WHERE username = '$username'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["county"];
	}

	public function setCounty($county, $name)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET county = '$county' 
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function getPharmacieState($name)
	{
		$query = "SELECT * from users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isPharmacieOpen=1 AND username = '$name'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return count($result);
	}

	public function openPharmacie($username)
	{
		$query = "UPDATE users
		JOIN service ON users.id = service.id_user 
		JOIN grade ON users.grade_name = grade.name 
		SET isPharmacieOpen=1
		WHERE username='$username' AND isPharmacieGrade=1";
		$queryResult = $this->db->query($query);
	}

	public function closePharmacie($name)
	{
		$query = "UPDATE users
		JOIN service ON users.id = service.id_user  
		SET isPharmacieOpen=0
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function closePharmacieAll()
	{
		$query = "UPDATE service 
		SET isPharmacieOpen=0";
		$queryResult = $this->db->query($query);
	}

	public function getIfPharmacien($username)
	{
		$query = "SELECT isPharmacieGrade
		FROM users 
		INNER JOIN service ON users.id = service.id_user
		INNER JOIN grade ON users.grade_name = grade.name
		WHERE username = '$username'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["isPharmacieGrade"];
	}
}
