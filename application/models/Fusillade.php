<?php


class Fusillade extends CI_Model
{
	public function getFusillade(){
		$query = "SELECT * FROM fusillade";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
    }
    
    public function getDataBed($bed, $pseudo)
    {
        $query = "SELECT fusillade.*, isSupervisor
        FROM fusillade, users
        INNER JOIN service ON users.id = service.id_user
        WHERE bed='$bed' and username='$pseudo'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0];
    }

    public function setDataBed($bed, $data_patient, $data_medecin, $data_desc, $data_etat)
    {
        $havePatient = 0;
        if ($data_etat == 'État Critique')
            $data_etat = 3;
        if ($data_etat == 'État Instable')
            $data_etat = 2;
        if ($data_etat == 'État Stable')
            $data_etat = 1;

        if ($data_medecin == '' && $data_desc == '' && $data_patient == '')
            $havePatient = 0;
        else
            $havePatient = 1;


		$query = "UPDATE fusillade 
		SET patient='$data_patient', medecin='$data_medecin', description='$data_desc', etatPatient='$data_etat', havePatient='$havePatient'
        WHERE bed='$bed'";
		$queryResult = $this->db->query($query);
    }
}
