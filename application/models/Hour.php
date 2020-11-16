<?php


class Hour extends CI_Model
{
	public function getHour($idUser,$dateStart,$dateEnd){
		$querry = "SELECT id,dateStart, dateEnd, county,id_user FROM service WHERE dateStart BETWEEN '".$dateStart."' and '".$dateEnd."' AND dateEnd BETWEEN '".$dateStart."' and '".$dateEnd."' ";
		$querryR = $this->db->query($querry);
		//var_dump($querryR);
		$result = $querryR->result_array();
		var_dump($result);
		return $result;
	}
}
