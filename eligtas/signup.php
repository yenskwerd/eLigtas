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
      $user = json_decode($data2);
      $user_name = $user->user_name;
      $user_email = $user->user_email;
      $user_password = $user->user_password;
      $regUser_id = $user->regUser_id;
      $specUser_id = $user->specUser_id;
   }
   

      
   // Attempt to query database table and retrieve data
   try {
      $stmt= $pdo->query('INSERT INTO user (user_email, user_name, user_password, regUser_id, specUser_id) VALUES("'.$user_email.'","'.$user_name.'","'.$user_password.'","'.$regUser_id.'","'.$specUser_id.'")');
      // $stmt= $pdo->query('INSERT INTO user (user_email, user_name, user_password, regUser_id, specUser_id) VALUES("'.$user_email.'","'.$user_name.'","'.$user_password.'","1","1")');
      
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