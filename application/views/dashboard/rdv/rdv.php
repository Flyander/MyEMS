<link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />

<div class="container">
	<div class="row">
		<br>
	</div>
	<div class="row" id="alerte">

	</div>
	<div class="card">
		<div class="card-body">
	<form action="https://app.99inbound.com/e/123" method="POST" target="_blank">
		<h3 style="text-align: center; padding-bottom: 15px; color: #00a9fd" class="card-title">Prise de rendez-vous &nbsp; </h3>

		<div class="row">
			<br>
		</div>
		<div class="row">
			<div class="col">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text bg-white"><i class="fa fa-user"></i>&nbsp</span>
						</div>
						<input  id="fullname" name="name" type="name" placeholder="Name" class="form-control border-left-0" required>
					</div>
				</div>
			</div>

			<div class="col">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text bg-white"><i class="fa fa-envelope"></i></span>
						</div>
						<input id="mail" name="email" type="email" placeholder="Email" class="form-control border-left-0" required>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text bg-white"><i class="fa fa-phone"></i></span>
						</div>
						<input  id="num" name="phone" type="phone" placeholder="phone" class="form-control border-left-0" required>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label for="dropdown" style="font-size: 100%">Type de rendez-vous ? </label>
			<select id="type" name="heard_about_us_on" class="form-control" id="dropdown" required>
				<option value="administratif">Rendez-vous administratif</option>
				<option value="cs">Consulation spécialiste</option>
				<option value="PPA">PPA</option>
				<option value="VM">Visite médicale </option>
				<option value="Autres"> Autres...</option>
			</select>
		</div>
		<div class="form-group">
			<label for="dropdown" style="font-size: 100%">Attribution  </label>
			<select id="idUser" name="heard_about_us_on" class="form-control" id="dropdown" required>
				<?php foreach ($userInfo as $user){ ?>
					<option value="<?= $user['id']?> " >  <?= $user['grade_name'] ?> - <?= $user['fullname'] ?> </option>
				 <?php } ?>
			</select>
		</div>

		<div class="form-group">
			<textarea class="form-control" id="message" rows="5" placeholder="Informations sur vos disponibilités, la raison .. " required></textarea>
		</div>
		<div class="card-footer" id="footer-btn-rdv">
		<button  id="submit-rdvPanel" type="button" class="btn btn-primary float-right">
			<i class="fa fa-paper-plane"></i>
			Send
		</button>
			<div>
	</form>
	</div>
	</div>
</div>
