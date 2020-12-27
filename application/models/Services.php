<?php


class Services extends CI_Model
{
	public function isAvailable()
	{
		$query = "SELECT * FROM users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isAvailable=1 or isAvailable=2
		ORDER BY county DESC, gradeName ASC";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}

	public function isAdmin($name)
	{
		$query = "SELECT isAdmin 
		FROM users 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["isAdmin"];
	}

	public function getAllAccount()
	{
		$query = "SELECT * 
		FROM users
		INNER JOIN grade ON users.grade_name = grade.name
		ORDER BY isAdmin DESC, typeGrade DESC, gradeName ASC";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}

	public function nbDispatch($name)
	{
		$query = "SELECT * from users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isSupervisor=1 AND username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();

		return count($result);
	}

	public function startService($hour)
	{

		$idd = "SELECT id from users where username ='$hour'";
		$idUser = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = " . $idUser[0]['id'] . " ORDER BY id DESC";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$id = $idS[0]['id'];

		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET service.isAvailable=1 
		WHERE username='$hour' AND service.id =" . $id;
		$queryResult = $this->db->query($query);
		//var_dump($queryResult);
	}

	public function stopPause($hour)
	{

		$idd = "SELECT id from users where username ='$hour'";
		$idUser = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = " . $idUser[0]['id'] . " ORDER BY id DESC";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$id = $idS[0]['id'];

		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET service.isAvailable=1 
		WHERE username='$hour' AND service.id =" . $id;
		$queryResult = $this->db->query($query);
		//var_dump($queryResult);
	}

	public function isOnService($id)
	{
		$condition = "id_user = $id AND isAvailable =1  ";
		$this->db->select('*');
		$this->db->from('service');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();
		if ($query->num_rows() == 1) {
			return true;
		} else {
			return false;
		}
	}

	public function isOnPause($id)
	{
		$condition = "id_user = $id AND isAvailable =2 ";
		$this->db->select('*');
		$this->db->from('service');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();
		if ($query->num_rows() == 1) {
			return true;
		} else {
			return false;
		}
	}

	public function endService($hour)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=0 
		WHERE username='$hour'";
		$queryResult = $this->db->query($query);
		$idd = "SELECT id from users where username ='$hour'";
		$id = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = " . $id[0]['id'] . " order by id desc";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$idService = $idS[0]['id'];
		$queryy = "UPDATE service set dateEnd = current_timestamp()  WHERE id_user = " . $id[0]['id'] . " AND id=" . $idService;
		$this->db->query($queryy);

		$queryyS = "UPDATE service set type=0 WHERE id_user = " . $id[0]['id'] . " AND id=" . $idService;
		$this->db->query($queryyS);
	}

	public function pauseCurrentService($name)
	{
		$idd = "SELECT id from users where username ='$name'";
		$idUser = ($this->db->query($idd)->result_array());

		$idServiceQuerry = "SELECT id from service where id_user = " . $idUser[0]['id'] . " ORDER BY id DESC";
		$idS = ($this->db->query($idServiceQuerry)->result_array());
		$id = $idS[0]['id'];

		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isAvailable=2
		WHERE username='$name' AND service.id = $id";
		$queryResult = $this->db->query($query);
	}

	public function supervisor($name)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=1 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=0 
		WHERE username != '$name'";
		$queryResult = $this->db->query($query);
	}

	public function endSupervisor($name)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET isSupervisor=0 
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function myService($idUser)
	{

	}

	public function userGrade($name)
	{
		$query = "SELECT gradeName 
		FROM users 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["gradeName"];
	}

	public function getName($name)
	{
		$query = "SELECT fullname 
		FROM users 
		WHERE username = '$name'";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["fullname"];
	}

	public function getOptionForPlayer($username)
	{
		$query = "SELECT * 
		FROM users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE username = '$username'
		ORDER BY isAvailable DESC";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0];
	}

	public function CreateServices($id)
	{
		$today = date("d-m-Y H:i:s");
		$query = "INSERT INTO `service`( `dateEnd`, `isSupervisor`, `isAvailable`, `type`, `id_user`) VALUES ( '2999-09-30 00:00:00',0, 1, 1, " . $id . ")";
		$this->db->query($query);
	}

	public function getCounty($username)
	{
		$query = "SELECT county
		FROM users 
		INNER JOIN service ON users.id = service.id_user
		WHERE username = '$username'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["county"];
	}

	public function setCounty($county, $name)
	{
		$query = "UPDATE users 
		JOIN service ON users.id = service.id_user 
		SET county = '$county' 
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function getPharmacieState($name)
	{
		$query = "SELECT * from users 
		INNER JOIN service ON users.id = service.id_user 
		INNER JOIN grade ON users.grade_name = grade.name 
		WHERE isPharmacieOpen=1 AND username = '$name'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return count($result);
	}

	public function openPharmacie($username)
	{
		$query = "UPDATE users
		JOIN service ON users.id = service.id_user 
		JOIN grade ON users.grade_name = grade.name 
		SET isPharmacieOpen=1
		WHERE username='$username' AND typeGrade=1";
		$queryResult = $this->db->query($query);
	}

	public function closePharmacie($name)
	{
		$query = "UPDATE users
		JOIN service ON users.id = service.id_user  
		SET isPharmacieOpen=0
		WHERE username='$name'";
		$queryResult = $this->db->query($query);
	}

	public function closePharmacieAll()
	{
		$query = "UPDATE service 
		SET isPharmacieOpen=0";
		$queryResult = $this->db->query($query);
	}

	public function getIfPharmacien($username)
	{
		$query = "SELECT typeGrade
		FROM users 
		INNER JOIN service ON users.id = service.id_user
		INNER JOIN grade ON users.grade_name = grade.name
		WHERE username = '$username'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0]["typeGrade"];
	}

	public function getAllGrade()
	{
		$query = "SELECT name FROM grade";
		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result;
	}

	public function addUser($data_fullname, $data_username, $data_grade, $data_mdp, $data_isAdmin, $data_num)
	{
		$query = "INSERT INTO users (`fullname`, `password`, `username`, `grade_name`, `isAdmin`, `num`) 
		VALUES ('$data_fullname', '$data_mdp', '$data_username', '$data_grade', '$data_isAdmin', '$data_num')";
		$queryResult = $this->db->query($query);
	}
	public function addSpe($data_spe)
	{
		$query = "INSERT INTO spe (`name`, `type`) VALUES ('$data_spe', 0)";
		try {
			$queryResult = $this->db->query($query);
			return 1;
		}catch (\Exception $e){
			die($e->getMessage());
			$queryResult = null;
			return 0;
		}
	}

	public function deleteUser($username)
	{
		$selectQuery = "SELECT id FROM users WHERE username='$username'";
		$queryResult = $this->db->query($selectQuery);
		$result = $queryResult->result_array();
		$id = $result[0]["id"];

		$queryDeleteService = "DELETE FROM service WHERE id_user='$id'";
		$queryResultService = $this->db->query($queryDeleteService);

		$queryDeleteUser = "DELETE FROM users WHERE id='$id'";
		$queryResultUser = $this->db->query($queryDeleteUser);
	}

	public function getUserDataInDB($username)
	{
		$query = "SELECT fullname, grade_name, username, num
		FROM users
		WHERE username = '$username'";

		$queryResult = $this->db->query($query);
		$result = $queryResult->result_array();
		return $result[0];
	}

	public function updateUserDataInDB($data_fullname, $data_username, $data_grade, $oldUsername, $data_num)
	{
		$query = "UPDATE users 
		SET fullname='$data_fullname', username='$data_username', grade_name='$data_grade', num='$data_num'
		WHERE username='$oldUsername'";
		$queryResult = $this->db->query($query);
	}
	public function getSpeFromUser($id){
		$result = array();
		$j = 0;
		foreach ( $id  as $i ){
			$query = "SELECT name from have where id=".$i['id_user'];
			$result[$j] = $this->db->query($query)->result_array();
			$j++;
		}
		return $result;
	}
	public function allSpe(){
		$query = " SELECT name from spe";
		$result = $this->db->query($query)->result_array();
		return $result;
	}

	public function allUsername(){
		$query = "SELECT fullname, id  from users";
		$result = $this->db->query($query)->result_array();
		return $result;
	}
	public function addUserSpe($user,$spe){
		$query = 'INSERT INTO have(`id`,`name`) values ( '.$user.' , "'.$spe.'" ) ';
		$this->db->query($query);

	}
	public function deleteSpeDB($spe){
		$query = "DELETE FROM have where name ='$spe'";
		$this->db->query($query);
		$query = "DELETE FROM spe where name = '$spe'";
		$this->db->query($query);
	}
	public function deleteSpeUser($spename, $id){
		$query = "DELETE FROM have where id=$id and name ='$spename'";
		$this->db->query($query);
	}
	public function getSpeFromUserId($id){
		$query = "SELECT name from have where id=$id";
		$result = $this->db->query($query)->result_array();
		return $result;
	}
	public function getUserInfo(){
		$query = "SELECT id, gradeName, fullname 
		FROM users
		INNER JOIN grade ON users.grade_name = grade.name";
		$result = $this->db->query($query)->result_array();
		return $result;
	}
}
