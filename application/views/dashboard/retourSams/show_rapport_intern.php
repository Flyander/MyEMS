<?php
?>

<style>
	.dropdown-menu {
		width: 1000px !important;

	}

</style>
<main class="page-content pt-2">
	<div class="container-fluid p-5">
		<div class="row">
			<div class="form-group col-md-12">
				<div>
					<h4 class="text-muted mb-4"> Affichages des rapport</h4>
					<div class="row mb-4">
						<div class="col-md-12">
							<div class="card border-0 rounded-0">


								<div class="card-body">
									<div class="table-responsive-md">

										<table class="table table-striped" id="listRapport">
											<thead>
											<tr>

												<th scope="col">#</th>
												<th scope="col">Date</th>
												<th scope="col"> Personne concerné </th>
												<th scope="col"> Plus d'information </th>

											</tr>
											</thead>

											<tbody id="myBodyRapport">
											<?php foreach ($returnedRapport as $rapport ){
												$date = new DateTime($rapport['date'])

												?>
											<tr>
												<th scope="row"><?= $rapport['id']?></th>
												<td> <?= $date->format('d-m-Y à H:i')?> </td>
												<td><?= $rapport['fullname']?> </td>
												<td>
													<div class="btn-group">
														<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														</button>
														<div class="dropdown-menu" >
															<p class="dropdown-item-text" >
																<?= $rapport['description'] ?>
															</p>
														</div>
													</div>
												</td>
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

</main>
