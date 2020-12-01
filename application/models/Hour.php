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

	public function getThemeFromUsername($username)
	{
		$querry = "SELECT theme FROM users WHERE username='$username'";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result[0]["theme"];
	}

	public function setThemeFromUsername($username, $theme)
	{
		$query = "UPDATE users
		SET theme='$theme'
		WHERE username='$username'";
		$queryResult = $this->db->query($query);
	}

	public function getHour($idUser, $dateStart, $dateEnd)
	{
		$querry = "SELECT id,dateStart, dateEnd, county,id_user FROM service WHERE dateStart BETWEEN '" . $dateStart . "' and '" . $dateEnd . "' AND dateEnd BETWEEN '" . $dateStart . "' and '" . $dateEnd . "' AND id_user = $idUser ";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result;
	}
	public function getDateStart($idUser)
	{
		$querry = "SELECT dateStart FROM service WHERE id= $idUser ";
		$querryR = $this->db->query($querry);
		$result = $querryR->result_array();
		return $result;
	}
	public function getDateEnd($idUser)
	{
		$querry = "SELECT dateEnd FROM service WHERE id= $idUser ";
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
	public function deleteHours($id){
		$query = "DELETE FROM service where id=".$id;
		$result = $this->db->query($query);
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
	public function updateHoursDataInDB($id,$dateStart,$dateEnd){
		$query = "UPDATE service set dateStart='$dateStart' where id=".$id;
		$result = $this->db->query($query);
		$query = "UPDATE service set dateEnd= '$dateEnd' where id=".$id;
		$result = $this->db->query($query);
	}
}
