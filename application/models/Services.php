<?php


class Services extends CI_Model
{
	public function isAvailable(){
		$query = "SELECT fullname, grade, spe FROM user WHERE isAvailable=1";
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
	public function myService($idUser){

	}

	public function userGrade($name){
		$query = "SELECT grade FROM user WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["grade"];
	}

}
