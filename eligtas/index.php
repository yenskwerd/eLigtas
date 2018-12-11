<?php
$host_name = 'db764539865.hosting-data.io';
$database = 'db764539865';
$user_name = 'dbo764539865';
$password = 'USC@eligtas2018';

$connect = mysql_connect($host_name, $user_name, $password, $database);
if(mysql_errno()){
	die('<p>Failed to connect to MySQL:'.mysql_error().'</p>');
}else{
	echo '<p>Connection to MySQL server successfully established.</p>';
}
?>