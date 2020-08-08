<?php


class Services extends CI_Model
{
	public function isAvailable(){
		$query = "SELECT Fullname , grade FROM user WHERE isAvailable=1";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}
	public function startService($hour){
		$query = "UPDATE user SET  isAvailable=1 WHERE username='$hour'";
		$queryResult = $this->db->query($query);


	}
	public function endService($hour){

	}
	public function myService($idUser){

	}

}
