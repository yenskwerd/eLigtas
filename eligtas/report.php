<?php

   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
   $db      = 'eligtas';
   $cs      = 'utf8';


   // Set up the PDO parameters
   $dsn  = "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt  = array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo  = new PDO($dsn, $un, $pwd, $opt);
   $data = array();
   $data2 = file_get_contents("php://input");
   if(isset($data2)){
      $request = json_decode($data2);
      $event = $request->event;
      $request_type_id = $request->request_type_id;
      $person_to_check = $request->person_to_check;
      $persons_injured = $request->persons_injured;
      $persons_trapped = $request->persons_trapped;
      $other_info = $request->other_info;
      $special_needs = $request->special_needs;
      $request_lat = $request->request_lat;
      $request_long = $request->request_long;
   }
   

      
   // Attempt to query database table and retrieve data
   try {
      $stmt= $pdo->query('INSERT INTO request (request_type_id, person_to_check, event, persons_injured, persons_trapped, other_info, special_needs, request_lat, request_long) VALUES("'.$request_type_id.'","'.$person_to_check.'","'.$event.'","'.$persons_injured.'","'.$persons_trapped.'","'.$other_info.'","'.$special_needs.'","'.$request_lat.'","'.$request_long.'")');

      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }

      // Return data as JSON
      echo json_encode("test");
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>