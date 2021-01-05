
<div class="container">
	<div class="row">
		<?php $i=0;?>
	<?php foreach ($actualRdv as $rdv ){ ?>

	<div class="card" style="width: 22rem; margin-left: 10px; margin-bottom: 10px ">
		<div class="card-body">
			<?php $d  = new DateTime($rdv['arrived']) ?>
			<?php $e  = new DateTime($rdv['make']) ?>

			<h5 class="card-title"> Demande de : <?= $rdv['applicant'] ?> </h5>
			<h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px; font-size: 12px"> Tel  : <span style="color: #721c24"><?= $rdv['phone'] ?> </span>     </h6>
			<h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px; font-size: 12px"> Mail : <?= $rdv['mail'] ?>  </h6>
			<h6 class="card-subtitle mb-2 text-muted" style="margin-bottom: 5px; font-size: 11px "> Arrivé le : <?= $d->format("d-m-y à H:i") ?>  , Type de rendez-vous : <?= $rdv['subject']; ?></h6>
			<p class="card-text"> <?= $rdv['description'] ?> </p>
		<div class="card-footer text-center">
			<p class="card-text" style="font-size: 13px"  >  Prise en charge  par <?=  $usernameRdv[$i];  $i += 1; ?> le <?= $e->format("d-m-y à H:i") ?></p>
			<?php if($id == $rdv['id_user'] OR $isAdmin == 1 ){ ?>
			<button class="btn btn-primary btn-sm float-left" onclick="validateAppointment( <?= $rdv['id']?> , '<?= $rdv['applicant']?>' , <?= $id ?> ) "> <i class="far fa-check-circle">  </i> </button>
			<button class="btn btn-warning btn-sm " onclick="leaveAppointment( <?= $rdv['id']?> , '<?= $rdv['applicant']?>' , <?= $id ?> ) "> <i class="fas fa-spinner fa-pulse"></i></button>
			<button  class="btn btn-danger btn-sm float-right" onclick="deleteAppointment(<?= $rdv['id']?>,'<?= $rdv['applicant']?>')"><i class="far fa-times-circle"></i> </button>
			<?php } ?>
		</div>
		</div>
	</div>

	<?php } ?>
		</div>
</div>
