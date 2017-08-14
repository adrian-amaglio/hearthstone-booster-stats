<?php
	// For mongodb drivers
	require 'vendor/autoload.php';
	$client = new MongoDB\Client("mongodb://localhost:27017");
	$collection = $client->hearthstone->boosters;

	$msg = '';


	if(isset($_GET['boosters']) && isset($_GET['key'])){
		$boosters = json_decode($_GET['boosters'], true);
		$key = htmlspecialchars($_GET['key']);
		if(empty($boosters) || empty($key)){
			echo 'Missing variables';
			exit(0);
		}else{
			$result = $collection->insertOne(['user' => $key, 'booster' => $boosters]);
			if($result->getInsertedId()){
				echo "done";	
			}else{
				var_dump($result);
			}
		}
		exit(0);
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Ouverture de boosters HeartStone</title>
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/vue.js"></script>
	<script type="text/javascript" src="js/app.js"></script>
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/app.css">
</head>
<body class="container">
<div class="background"></div>
	<h1>Ouverture de boosters</h1>
	<div class="row">
		<div class="col-md-4 col-s-0"></div>
		<div class="col-md-6 col-s-12">
			<main id="app">
				<div class="row">
					<p class="alert col-md-12 col-s-12" v-if="message.text.length" v-bind:class="'alert-'+message.type" v-on:click="clearmessage" style="cursor: hand;"> {{ message.text }} </p>
				</div>
				<div class="row">
					<input class="text_input col-md-6 col-s-12" type="text" name="key" v-model="key" />
				</div>
				<p v-for="(c, id) in cards" class="row">
					<button class="btn col-md-2 col-s-2" v-on:click="less(id)">-</button>
					<span class="col-md-2 col-s-2 number" >{{ c }}</span>
					<button class="btn col-md-2 col-s-2" v-on:click="add(id)">+</button>
					<span class="col-md-6 col-s-6" >{{ id }}</span>
				</p>
				<div class="row">
					<span class="col-md-4 col-s-0"></span>
					<button v-on:click="send" class="btn col-md-2 col-s-12">Envoyer</button>
				</div>
			</main>
		</div>
	</div>
</body>
</html>