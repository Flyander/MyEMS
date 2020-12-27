<?php


class Patient extends CI_Model
{
	public function insertNewPatient($data_fullname, $data_num, $data_proche_nom, $data_proche_num, $data_gs, $data_poids, $data_taille, $data_dob, $imagePath){
		$query = "INSERT INTO patient(`fullname`, `numero`, `gs`, `height`, `weight`, `dob`, `name_proche`, `num_proche`, `imagePath`) 
		VALUES ('$data_fullname', '$data_num', '$data_gs', '$data_taille', '$data_poids', '$data_dob', '$data_proche_nom', '$data_proche_num', '$imagePath')";
		$queryResult = $this->db->query($query);
    }
	
	public function getAllPatient()
	{
		$query = "SELECT * 
		FROM patient
		ORDER BY fullname ASC";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}

	public function getPatientData($id)
	{
		$query = "SELECT * 
		FROM patient
		WHERE id='$id'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0];
	}

	public function getImageForSideBar($username)
	{
		$query = "SELECT imagePath
		FROM patient
		INNER JOIN users ON users.fullname = patient.fullname
		WHERE username = '$username'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		
		if ($result != null)
			return $result[0]['imagePath'];
		else
			return "";
		
	}
}
