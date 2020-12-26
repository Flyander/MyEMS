<?php


class AppointmentMod extends CI_Model
{
	public function addAppointmentInDb($fullname, $num, $mail, $msg, $reason){
		$querry = 'INSERT INTO appointment (applicant,phone,mail,description,subject,id_user) values ("'.$fullname.'","'.$num.'","'.$mail.'","'.$msg.'","'.$reason.'",0)';
		$result = $this->db->query($querry);

		return $result;
	}
	public function getAppointmentInProgress(){
		$querry = "SELECT * FROM appointment where type = 0";
		$result = $this->db->query($querry)->result_array();
		return $result;
	}

	public function getAppointmentEnded(){
		$querry = "SELECT * FROM appointment where type = 1";
		$result = $this->db->query($querry)->result_array();
		return $result;
	}
	public function deleteAppointment($id){
		$querry = "DELETE FROM appointment where id = $id";
		$this->db->query($querry);

	}

	public function validateAppointment($id,$user){
		$querry = "UPDATE appointment set `type`= 1  where id = $id";
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

}
