
<div class="container">
	<div class="row">
		<?php $i=0;?>
	<?php foreach ($actualRdv as $rdv ){ ?>

	<div class="card" style="width: 22rem; margin-left: 10px; margin-bottom: 10px ">
		<div class="card-body">
			<?php $d  = new DateTime($rdv['arrived']) ?>
			<?php $e  = new DateTime($rdv['make']) ?>

			<h5 class="card-title"> Demande de : <?= $rdv['applicant'] ?> </h5>
			<h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px; font-size: 11px "> Arrivé le : <?= $d->format("d-m-y à H:i") ?>  , Type de rendez-vous : <?= $rdv['subject']; ?></h6>
			<p class="card-text"> <?= $rdv['description'] ?> </p>
		<div class="card-footer text-center">
			<p class="card-text" style="font-size: 13px"  >  validée par <?=  $usernameRdv[$i];  $i += 1; ?> le <?= $e->format("d-m-y à H:i") ?>
			</p>
		</div>
		</div>
	</div>

	<?php } ?>
		</div>
</div>
