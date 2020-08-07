<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
	<body>
		<div class="preloader"></div>
		<div id="container">
			<h1>MyEMS</h1>
			<?php echo "Bonjour $fullname"?>
		</div>
		<b id="pds"><a href="pds"> Prise de service</a> </b>
		<br>
		<b id="logout"><a href="logout">Logout</a></b>
    </body>
<?php
foreach ($onServiceName as $key){
echo $key['grade'];
echo " ". $key['Fullname'];
echo  '<br>';
}
?>

</html>
