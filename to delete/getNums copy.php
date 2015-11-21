<?php

$db = mysql_connect("localhost", "fwdbu11233", "meexubon");
if (!db) { 
  die("Couldn't connect to MySQL"); 
} 

mysql_select_db("fwdbd11233",$db) 
  or die("Select Database Error: ".mysql_error()); 
 
$result = mysql_query("SELECT * FROM `NumWalks2` WHERE `Label` > CURDATE() - 7 " ,$db); 
$alldata = array();

while ($row = mysql_fetch_assoc($result)) {
      array_push($alldata,$row);
      echo(json_encode($row)."<br />");
}

// Obtain a list of columns
foreach ($alldata as $key => $row) {
    $num[$key]  = $row['Num'];
    $label[$key] = $row['Label'];
}
// Sort the data with volume descending, edition ascending
// Add $data as the last parameter, to sort by the common key
array_multisort($label, SORT_ASC, $num, SORT_ASC, $alldata);

$todaytext = date("Y-m-d"); 
//echo("todaytext ".$todaytext."<br />");

$todaysec = strtotime($todaytext);
//echo("todaysec ".$todaysec."<br />");

$startsec = $todaysec-604800+86400; //one week earlier 
//echo("start date". $startsec. " and the text version ". date("Y-m-d",$startsec));

for  ($datesec = $startsec ; $datesec  <= $todaysec; $datesec = $datesec + 86400 ) {
    //echo($datesec);
 	$dateintext = date("Y-m-d", $datesec);
  	echo ("<br />" . $dateintext. " ");
 	if (in_array($dateintext, $label)){
  		echo(" has a walk value already entered");
  	}else{
  		//get nodash format date
      $datenodash=date("Ymd",$datesec);//
      //add a 0 walk entry
  		//
  		$pad_zero = mysql_query("INSERT INTO `fwdbd11233`.`NumWalks2` (`Num`, `Label`) VALUES ('0', $datenodash) ON DUPLICATE KEY UPDATE Num=Num" ); 
      echo(" ". $pad_zero);
      $row = array("Num" => "0", "Label" => $dateintext);
      array_push($alldata,$row);
          echo(json_encode($row)."<br />");

  	}
}

// Obtain a list of columns
foreach ($alldata as $key => $row) {
    $num[$key]  = $row['Num'];
    $label[$key] = $row['Label'];

}
// Sort the data with volume descending, edition ascending
// Add $data as the last parameter, to sort by the common key
array_multisort($label, SORT_ASC, $num, SORT_ASC, $alldata);


$data = json_encode($alldata);
echo $data; 

/*
ToDo: convert from mysql to PDO
}*/

?>





