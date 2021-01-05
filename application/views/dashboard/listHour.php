<?php if ($stateTheme == 'light') { ?>
        <div class="preloader"></div>
    <?php } else { ?>
        <div class="preloaderDark"></div>
    <?php } ?>

<main class="page-content pt-2">
	<div class="container-fluid p-5">

		<div class="row">
			<div class="form-group col-md-12">
				<div>
					<h4 class="text-muted mb-4">Affichage des heures de la semaine  </h4>
					<div class="row mb-4">
						<div class="col-md-12">
							<div class="card border-0 rounded-0">

								<div class="card-title mb-1 p-3">
									<h5 class="titleLabelTheme" id="test">Total de vos heures : <?= $totalHourWeek ?> </h5>
								</div>
								<div class="card-title mb-1 p-3">
<<<<<<< HEAD
									<div class="btn-group" role="group" aria-label="Basic example">
										<div id="btn-semaine-remove">
											<button type="button" class="btn btn-default" onclick='printHourFromWeek(<?php echo $id; ?>, "<?php $temp = $nbSemaine - 1; echo date("Y-m-d", strtotime("first saturday of january + $temp week")); ?>", <?php echo $temp; ?>)'><i class="fas fa-chevron-left"></i></button>
										</div>
=======
>>>>>>> 25de1856bfd87e2acaedd4305c9d31fd68ddc13a

										<button id="btn-semaine" type="button" class="btn btn-default">Semaine n°<?php echo $nbSemaine ?></button>
										
										<div id="btn-semaine-add">
											<button type="button" class="btn btn-default" onclick='printHourFromWeek(<?php echo $id; ?>, "<?php $temp = $nbSemaine + 1; echo date("Y-m-d", strtotime("first saturday of january + $temp week")); ?>", <?php echo $temp; ?>)'><i class="fas fa-chevron-right"></i></button>
										</div>
									</div>
								</div>
								<div class="card-body">
									<div class="table-responsive-md">
										<table id="myTable" class="table table-hover">
											<thead>
											<tr>
												<th scope="col">Début du service</th>
												<th scope="col">Fin de service</th>
												<th scope="col">Durée</th>
												<th scope="col">Actions</th>
											</tr>
											</thead>
											<tbody id="tb">

											<?php
											$i = 0;
											foreach ($hourWeek as $hour) {
												$dateStart = date("d/m/Y H:i", strtotime($hour['dateStart']));
												$dateEnd = date("d/m/Y H:i", strtotime($hour['dateEnd']));

												?>
												<tr id="<?php echo $hour['id']; ?>">
													<?php if ($totalHours[$i]->format("%i") != 0 or $totalHours[$i]->format("%h") != 0) { ?>


														<td style="transform: translateY(10%);"><?php echo $dateStart; ?></td>
														<td style="transform: translateY(10%);"><?php echo $dateEnd; ?></td>
														<td style="transform: translateY(10%);"><?php echo $totalHours[$i]->format("%h h %I"); ?></td>
														<?php
														echo "<td>

																	<a onclick=\"getHour('". $hour['id'] ."')\" onclick=\"getHour('". $hour['id'] ."')\"  class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i></a>
																	<a onclick=\"deleteHoursData('". $hour['id'] ."')\"   class=\"btn btn-sm btn-outline-lightning rounded-0\"><i class=\"far fa-trash-alt\"></i></a>
																  </td>";
														?>
													<?php }
													$i++; ?>

												</tr>
											<?php } ?>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
