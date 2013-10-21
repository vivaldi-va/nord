<?php
require('person.php');

$person = new Person();


//exit(file_get_contents('php://input'));
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/*
 * select person(s)
 */
if(isset($_GET['select'])) {
	if (isset($_GET['id']))
		exit (json_encode($person->getPerson($_GET['id'])));
	else 
		exit (json_encode($person->getAllPersons()));
	
} 
/*
 * remove person
 */
elseif (isset($_GET['remove'])) {
	
	$status = $person->removePerson($_GET['id']);
	if(isset($status['error']))
		exit(json_encode($status));
	/*
	 * if the person has been removed, 
	 * return the updated list of persons
	 * to avoid having to use another ajax call
	 */
	exit(json_encode($person->getAllPersons()));
	
} 
/*
 * if the post data exists, assume posting new person
 */
elseif ($personData = json_decode(file_get_contents('php://input'), true)) {
	
	//exit(json_encode($personData['name']));
	$return = $person->makePerson($personData['name'], $personData['gender'], $personData['age']);
	
	if($return === 200)
		$return = array("error" => "no name received");
	elseif($return === 300)
		$return = array("error" => "no gender received");
	elseif($return === 400) 
		$return = array("error" => "no age received");

	
	exit(json_encode($return));
	
}
else {
	exit(json_encode(array("error" => "nothing to do")));
}



