<?php


class returnRapportMod extends  CI_Model
{
	public  function AddNewReturnRapport($id_user,$date,$description,$fullname,$author){
		$querry = "INSERT INTO returnedrapport (`date`,`description`,`id_redactor`,`id_concerned`,`fullname`)values (\"".$date.'","'.$description.'","'.$fullname.'",'.$author.','.$id_user.')';

		return $this->db->query($querry);

	}
}
