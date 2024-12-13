<?php
require_once("bootstrap.php");
$risultato = array();
$risultato["logineseguito"] = false;
if(isset($_POST["username"]) && isset($_POST["password"])){
    $login_result = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if(count($login_result)==0){
        $risultato["errore-login"] = "Errore nel login";
    }
    else{
        registerLoggedUser($login_result[0]);
    }
}

if(isUserLoggedIn()){
    $risultato["logineseguito"] = true;
    $articoliAutore = $dbh->getPostByAuthorId($_SESSION['idautore']);
    for($i=0; $i<count($articoliAutore); $i++){
        $articoliAutore[$i]["imgarticolo"] = UPLOAD_DIR.$articoliAutore[$i]["imgarticolo"];
    }
    $risultato["articoliautore"] = $articoliAutore;
}
header("Content-Type: application/json");
echo json_encode($risultato);
?>