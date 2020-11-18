<?php


class Patient extends CI_Model
{
	public function insertNewPatient($data_fullname, $data_num, $data_proche_nom, $data_proche_num, $data_poids, $data_taille, $data_dob, $imagePath){
		$query = "INSERT INTO patient(`fullname`, `numero`, `height`, `weight`, `dob`, `name_proche`, `num_proche`, `imagePath`) 
		VALUES ('$data_fullname', '$data_num', '$data_taille', '$data_poids', '$data_dob', '$data_proche_nom', '$data_proche_num', '$imagePath')";
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
}
