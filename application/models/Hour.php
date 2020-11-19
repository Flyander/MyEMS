<?php


class Hour extends CI_Model
{
	public function getHour($idUser, $dateStart, $dateEnd)
	{
		$querry = "SELECT id,dateStart, dateEnd, county,id_user FROM service WHERE dateStart BETWEEN '" . $dateStart . "' and '" . $dateEnd . "' AND dateEnd BETWEEN '" . $dateStart . "' and '" . $dateEnd . "' AND id_user = $idUser ";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result;
	}

	public function getTotalHour($hourArray)
	{
		$i = 0;
		$hourT = array();
		foreach ($hourArray as $hour) {
			$dateStart = new DateTime($hour['dateStart']);
			$dateEnd = new DateTime($hour['dateEnd']);
			$hourT[$i] = $dateStart->diff($dateEnd);
			$i++;
		}
		return $hourT;
	}
}
