<?php

?>
<link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"/>

<div class="container">
	<div class="row">
		<br>
	</div>
	<div class="row" id="alerte">

	</div>
	<div class="card">
		<div class="card-body">
			<form >
				<h3 style="text-align: center; padding-bottom: 15px; color: #00a9fd" class="card-title"> Rapport SAMS (
					Intern, Resident, ...) &nbsp; </h3>

				<div class="row">
					<br>
				</div>
				<div class="form-group">

					<label for="dropdown" style="font-size: 100%"> <span> <i class="fa fa-user-circle">&nbsp </i> </span> Personne concernée : </label>
					<select id="idUser" name="heard_about_us_on" class="form-control" required>
						<?php foreach ($userInfo as $user) { ?>

							<?php if ($user['fullname'] != "root") { ?>
								<option value="<?= $user['id'] ?> ">
									[<?= $user['gradeName'] ?>] <?= $user['fullname'] ?>
								</option>
							<?php } ?>
						<?php } ?>
					</select>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-group">
							<label for="date" style="font-size: 100%" > <span> <i class="fa fa-calendar">&nbsp </i> </span> Date  : </label>

							<div class="input-group">

								<input id="date_rapport" name="date_rapport" type="datetime-local" placeholder="Date" class="form-control"
									   required>
							</div>
						</div>
					</div>
				</div>

				<label for="date" style="font-size: 100%" > <span> <i class="fa fa-book">&nbsp </i> </span>  Votre rapport  : </label>

				<div class="form-group">
					<textarea class="form-control" id="rapportMessage" rows="5" placeholder="Description.. "
							  required></textarea>
				</div>
				<div class="card-footer" id="footer-btn-rapportIntern">
					<button id="submit-addRapportUser" type="button" class="btn btn-primary float-right">
						<i class="fa fa-paper-plane"></i>
						Send
					</button>
					<div>
			</form>
		</div>
	</div>
</div>

