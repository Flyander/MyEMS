<?php


class AppointmentMod extends CI_Model
{
	public function addAppointmentInDb($fullname, $num, $mail, $msg, $reason){
		$querry = 'INSERT INTO appointment (applicant,phone,mail,description,subject,id_user) values ("'.$fullname.'","'.$num.'","'.$mail.'","'.$msg.'","'.$reason.'",0)';
		$result = $this->db->query($querry);

		return $result;
	}
	public function addAppointmentPanelInDb($fullname, $num, $mail, $msg, $reason,$idUser){
		$querry = 'INSERT INTO appointment (applicant,phone,mail,description,subject,id_user,`type`) values ("'.$fullname.'","'.$num.'","'.$mail.'","'.$msg.'","'.$reason.'",'.$idUser.',2)';
		$result = $this->db->query($querry);
		$query = "UPDATE appointment set type= 0 where id_user =0";
		$this->db->query($query);
		return $result;
	}
	public function getAppointmentInProgress(){
		$querry = "SELECT * FROM appointment where type = 0 ";
		$result = $this->db->query($querry)->result_array();
		return $result;
	}

	public function getAppointmentEnded(){
		$querry = "SELECT * FROM appointment where type = 1 or type = 2";
		$result = $this->db->query($querry)->result_array();
		return $result;
	}
	public function getAppointmentTaken(){
		$querry = "SELECT * FROM appointment where type = 2";
		$result = $this->db->query($querry)->result_array();
		return $result;
	}
	public function deleteAppointment($id){
		$querry = "UPDATE appointment set type=2  where id = $id";
		$this->db->query($querry);

	}

	public function validateAppointment($id,$user){
		$querry = "UPDATE appointment set `type`= 1  where id = $id";
		$this->db->query($querry);
		$querry = "UPDATE appointment set id_user= $user  where id = $id";
		$this->db->query($querry);
	}
	public function leaveAppointment($id){
		$querry = "UPDATE appointment set `type`= 0 where id = $id";
		$this->db->query($querry);
	}
	public function takeAppointment($id,$user){
		$querry = "UPDATE appointment set `type`= 2  where id = $id";
		$this->db->query($querry);
		$querry = "UPDATE appointment set id_user= $user  where id = $id";
		$this->db->query($querry);
	}
	public function getUsernameFromId($array){
		$return  = array();
		$i = 0;
		foreach ($array as $a){
			$query = "SELECT fullname from users where id = ".$a['id_user'];
			$return[$i] = $this->db->query($query)->result_array()[0]['fullname'];
			$i++;

		}
		return $return;
	}

	public function getUserWithSpe($type_rdv)
	{
		$spe = "";
		switch ($type_rdv) {
			case "cp":
				$spe = "Psychologue";
				break;
			case "cv":
				$spe = "Vétérinaire";
				break;
			case "cc":
				$spe = "Cardiologue";
				break;
			case "co":
				$spe = "Otologie";
				break;
			case "cch":
				$spe = "Chirurgien";
				break;
		}

		$query = "SELECT users.id, gradeName, fullname 
		FROM users
		INNER JOIN grade ON users.grade_name = grade.name
		INNER JOIN have ON users.id = have.id 
		WHERE have.name = '$spe'";
		$result = $this->db->query($query)->result_array();
		return $result;
	}

}
