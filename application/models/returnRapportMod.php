<?php


class returnRapportMod extends  CI_Model
{
	public function canCreateRapport($id)
	{
		$condition = "id = $id AND grade_name != 'intern' AND grade_name != 'probies' AND grade_name != 'interne'  ";
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return true;
		} else {
			return false;
		}
	}
	public function getReturnedRapport(){
		$querry = "SELECT * FROM returnedrapport ";
		return $this->db->query($querry)->result_array();
	}
	public  function AddNewReturnRapport($id_user,$date,$description,$fullname,$author){
		$querry = "INSERT INTO returnedrapport (`date`,`description`,`id_redactor`,`id_concerned`,`fullname`)values (\"".$date.'","'.$description.'","'.$fullname.'",'.$author.','.$id_user.')';

		return $this->db->query($querry);

	}

	public function getReturnRapportFromUserId($value){
		$query = " SELECT  * FROM returnedrapport where fullname like  '%".$value."%' ";
		return $this->db->query($query)->result_array();

	}
}
