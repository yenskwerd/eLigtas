<?php
 if (isset($_SERVER['HTTP_ORIGIN'])) {
    
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){ 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }


  require 'dbconnect.php';

    $data = file_get_contents("php://input");

    if (isset($data)) {
        $request = json_decode($data);
          $username = $request->username;
          $password = $request->password;
        }

      $username= mysqli_real_escape_string($con,$username);
      $password = mysqli_real_escape_string($con,$password);

      $username = stripslashes($username);
      $password = stripslashes($password);

      $sql = "SELECT * FROM user WHERE user_name = '$username' and user_password = '$password' and user_delete = 0";
      $result = mysqli_query($con,$sql);
      $count = mysqli_num_rows($result);

      // If result matched myusername and mypassword, table row must be 1 row                    

      if($count > 0) {
        while ($row = mysqli_fetch_assoc($result))
         {
            $response = $row;
         }
      }else {
        $response= "Your username or password is invalid!";         
      }

 echo json_encode($response);

?>