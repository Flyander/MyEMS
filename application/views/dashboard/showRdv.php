
<div class="container">
	<div class="row">
	<?php foreach ($actualRdv as $rdv ){ ?>

	<div class="card" style="width: 22rem; margin-left: 10px; margin-bottom: 10px ">
		<div class="card-body">
			<?php $d  = new DateTime($rdv['arrived']) ?>

			<h5 class="card-title"> Demande de : <?= $rdv['applicant'] ?> </h5>
			<h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px; font-size: 11px "> Arrivé le : <?= $d->format("d-m-y à H:i") ?>  , Type de rendez-vous : <?= $rdv['subject']; ?></h6>
			<p class="card-text"> <?= $rdv['description'] ?> </p>
		<div class="card-footer text-center">
			<button class="btn btn-primary btn-sm float-left" onclick="validateAppointment( <?= $rdv['id']?> , '<?= $rdv['applicant']?>' , <?= $id ?> ) "> Valider </button>
			<button  class="btn btn-danger btn-sm float-right" onclick="deleteAppointment(<?= $rdv['id']?>,'<?= $rdv['applicant']?>')">Supprimer </button>
		</div>
		</div>
	</div>

	<?php } ?>
		</div>
</div>
