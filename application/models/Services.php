<?php


class Services extends CI_Model
{
	public function isAvailable(){
		$query = "SELECT fullname, grade, spe, isAvailable, supervisor FROM user WHERE isAvailable=1 or isAvailable=2";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}
	public function startService($hour){
		$query = "UPDATE user SET isAvailable=1 WHERE username='$hour'";
		$queryResult = $this->db->query($query);


	}
	public function endService($hour){
		$query = "UPDATE user SET isAvailable=0 WHERE username='$hour'";
		$queryResult = $this->db->query($query);

	}

	public function pauseCurrentService($name)
	{
		$query = "UPDATE user SET isAvailable=2 WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function myService($idUser){

	}

	public function userGrade($name){
		$query = "SELECT grade FROM user WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["grade"];
	}

	public function getName($name) {
		$query = "SELECT fullname FROM user WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["fullname"];
	}

}
