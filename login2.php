<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Blog TW - Login";
$templateParams["categorie"] = $dbh->getCategories();
$templateParams["articolicasuali"] = $dbh->getRandomPosts(2);

$templateParams["js"] = array("js/login.js");

require 'template/base.php';
?>