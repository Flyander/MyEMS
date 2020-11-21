<?php


class Hour extends CI_Model
{
	public function getIdFromUsername($username)
	{
		$querry = "SELECT id FROM users WHERE username='$username'";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result[0]["id"];
	}

	public function getFullnameFromUsername($username)
	{
		$querry = "SELECT fullname FROM users WHERE username='$username'";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result[0]["fullname"];
	}

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
	public function getHourWeek($hourArray){
		$sum = 0;
		$i =0;
		foreach ($hourArray as $hour) {
			$sum += $hour->days*86400 + $hour->h*3600
			+ $hour->i*60 + $hour->s;



		}
		$hours = floor($sum / 3600);
		$minutes = floor(($sum / 60) % 60);
		$seconds = $sum % 60;
		$return = sprintf('%02d h %02d',$hours,$minutes);
		return $return;

	}
}
