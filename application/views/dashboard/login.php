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
	<?php if($onService == 0)  { ?> <b id="pds"> <a href="pds"> Prise de service</a> </b>
		<?php }else{ ?>
		<b id="fds"> <a href="fds"> Fin de service</a> </b>

	<?php	} ?>
		<br>
		<b id="logout"><a href="logout">Logout</a></b>
    </body>
<div>
	<h1>Personne en service </h1>
	<table class="responstable">
		<tr>
		<th> Nom & Prénom </th>
		<th> Grade </th>
		</tr>
		<tr>
		<?php
		foreach ($onServiceName as $key){
			echo '<tr>';
		echo "<td> ".$key['Fullname']."</td>";
		echo "<td>".$key['grade']."</td>";
			echo '</tr>';
		}
		?>
		</tr>
	</table>

</div>
</html>
