<?php
class Person {
	private $name;
	private $gender;
	private $age;
	
	public function __construct() {
				
	}
	
	/**
	 * get a person from database via their unique ID
	 * @param int $id
	 */
	public function getPerson($id) {
		/*
		 * ID not user entered, thus no need for validation
		 */
		
		/*
		 * return will return any errors, which can be displayed as required
		 */
		if (!$res = $this->_query("SELECT id, name, gender, age FROM persons WHERE id = $id")) {
			return array("error" => "person not found");			
		}
		
		return mysqli_fetch_assoc($res);
		
	}
	
	public function getAllPersons() {
		$personsArr = array();
		
		if (!$res = $this->_query("SELECT * FROM persons")) {
			return array("error" => "no persons found"); 
		}
		
		while($row = $res->fetch_assoc()) {
			array_push($personsArr, $row);
		}
		
		return $personsArr;
	}
	
	/**
	 * modify an existing person in the database, 
	 * selecting them first via unique ID
	 * @param int $id
	 * @param string $name
	 * @param int $gender
	 * @param int $age
	 */
	public function setPerson($id, $name, $gender, $age) {
		
	}
	
	/**
	 * remove person from database via ID
	 * @param int $id
	 */
	public function removePerson($id) {
		if(!$status = $this->_query("DELETE FROM persons WHERE id = $id")) {
			return array("error" => "could not remove person from DB");
		}
		
		return $status;
	}

	/**
	 * insert a person to the database
	 * input data is implicity escaped via the class constructor
	 */
	public function makePerson($name, $gender, $age) {
		//return !$name;
		/*
		 * validate inputs and set class vars 
		 * 
		 * error codes:
		 *  200: no name entered
		 *  300: no gender entered
		 *  400: no age entered
		 */
		if(!$name || empty($name)) {
			return 200;
		} elseif (!$gender || empty($gender)) {
			return 300;
		} elseif (!$age || empty($age)) {
			return 400;
		}
		
		$this->name = mysql_real_escape_string($name);
		$this->gender = mysql_real_escape_string($gender);
		$this->age = mysql_real_escape_string($age);
		
		
		/*
		 * insert person into DB
		 */
		if(!$status = $this->_query("INSERT INTO persons(id, name, gender, age) VALUES (NULL, \"$this->name\", $this->gender, $this->age)")) {
			return array("error" => "person could not be inserted into DB");			
		}

		return true;
	}
	
	private function _query($sql) {
		$db = new mysqli('localhost', 'test', '', 'nordtest', 8889);
		
		
		if ($db->connect_errno) {
			//echo "failed to connect " . $db->connect_error;
			return false;//array("error" => $db->connect_error);
		}
		
		if (!$res = $db->query($sql)) {
			return array("error" => $db->error);
		}
		
		return $res;
		
	}
}