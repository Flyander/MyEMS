<?php


class Services extends CI_Model
{
	public function isAvailable(){
		$query = "SELECT * FROM users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isAvailable=1 or isAvailable=2";
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
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET service.isAvailable=1 
		WHERE username='$hour'";
		$queryResult = $this->db->query($query);
	}
	public function endService($hour){
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=0 
		WHERE username='$hour'";
		$queryResult = $this->db->query($query);

	}

	public function pauseCurrentService($name)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=2
		WHERE username='$name'";
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
		$query = "SELECT grade_name 
		FROM users 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["grade_name"];
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
}
