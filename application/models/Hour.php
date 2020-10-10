<?php


class Hour extends CI_Model
{
	public function getHour($idUser,$dateStart,$dateEnd){
		$querry = "SELECT * from services where dateStart ='$dateStart' AND dateEnd='$dateEnd' AND id_user =$idUser ";
		$querryR = $this->db->querry($querry);
		$result = $querryR->result_array();
		return $result[0];


	}
}
