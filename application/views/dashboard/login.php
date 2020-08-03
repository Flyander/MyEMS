<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$fullname = ($this->session->userdata['logged_in']['fullname']);
?><!DOCTYPE html>
	<body>

		<div id="container">
			<h1>MyEMS</h1>
			<?php echo "Bonjour $fullname"  ?>
		</div>
		<b id="logout"><a href="logout">Logout</a></b>

	</body>
</html>
