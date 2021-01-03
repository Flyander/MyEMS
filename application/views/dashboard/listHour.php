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
									<h5 class="titleLabelTheme"> Semaine à afficher : <select id="weekselect"
																							  class="form-control form-control-sm col-3"
																							  onchange="printHourFromWeek(<?php echo $id; ?>)">             <?php
											for ($i = 0; $i < 54; $i++) {
												$d = new DateTime(date("Y-m-d", strtotime("28/12/2019  + $i week")));
												$t = new DateTime(date("Y-m-d", strtotime("today")));
												if ($d->format("W") != $t->format("W") - 1)
													echo '<option  value="' . date("Y-m-d", strtotime("14 Nov 2020 + $i week")) . '">' . date("j M Y ", strtotime("14 Nov 2020 + $i week")) . " - " . date("j M Y ", strtotime("20 Nov 2020 + $i week")) . '</option>';
												else
													echo '<option   selected="selected" value="' . date("Y-m-d", strtotime("14 Nov 2020 + $i week")) . '">' . date("j M y ", strtotime("14 Nov 2020 + $i week")) . " - " . date("j M  Y", strtotime("20 Nov 2020 + $i week")) . '</option>';

											}
											?> </select></h5>
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
