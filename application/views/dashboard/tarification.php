<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<?php if ($stateTheme == 'light') { ?>
        <div class="preloader"></div>
    <?php } else { ?>
        <div class="preloaderDark"></div>
    <?php } ?>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row noselect">
	            <div class="form-group col-md-12">
					<div id="doc-id">
						<h4 class="text-muted mb-4">Tarifications</h4>

						<div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
									<div class="card-title mb-1 p-3">
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
                                            <div class="doc-title">Liste des tarifs  :</div>

                                            <div class="form-group col-md-12 doc-content">
												<table id="myTable" class="table table-hover ">
													<thead>
													<tr>
														<th></th>
														<th scope="col">Type </th>
														<th scope="col"> Prix</th>
														<th scope="col">Descriptif </th>
													</tr>
													</thead>
													<tbody >
														<tr>
															<td> 1</td>
															<td> Prise en charge classique</td>
															<td>100$ <span style="color: red"> +100$ </span></td>
															<td> Prise en charge de base / Médecin de garde</td>
														</tr>
														<tr>
															<td> 2</td>
															<td>
																Prise en charge avancée
															</td>
															<td>150$   <span style="color: red"> +100$ </span> </td>
															<td> Prise en charge nécessitant des examens complémentaires / du matériel spécifique </td>
														</tr>
														<tr>
															<td> 3 </td>
															<td>
																Prise en charge avec acte chirurgical
															</td>
															<td>250$ <span style="color: red"> +100$ </span> </td>
															<td> Prise en charge nécessitant une chirurgie </td>
														</tr>
														<tr>
															<td> 4 </td>
															<td>

																Prise en charge traumatisme balistique

															</td>
															<td>550$ </td>
															<td> Prise en charge d’un traumatisme balistique / Médecin de garde </td>
														</tr>
														<tr>
															<td> 5 </td>
															<td>
																Visite médicale / PPA
															</td>
															<td>200$ </td>
															<td>																Gratuit pour les candidatures services publics. <span STYLE="color:red;"> Sur Rendez-vous </span>
															</td>
														</tr>
														<tr>
															<td> 6 </td>
															<td>
																Consultation avec un spécialiste
															</td>
															<td>150$ </td>
															<td>
																Psychologie / Cardiologie / Otologie / Rééducation / Dentaire. <span STYLE="color:red;"> Sur Rendez-vous </span>
															</td>
														</tr>
														<tr>
															<td> 7</td>
															<td> Trousse de soin </td>
															<td>200$ </td>
															<td>
																Maximum 3 par semaine et par personne. Sur présentation d’une pièce d’identité.
															</td>
														</tr>
														<tr>
															<td> 8</td>
															<td> Médicament </td>
															<td> 50$ </td>
															<td>
																Maximum 10 par semaine et par personne. Sur présentation d’une pièce d’identité.
															</td>
														</tr>
														<tr>
															<td> 9</td>
															<td> Chaise roulante </td>
															<td> 2000$ </td>
															<td>Caution à rendre lorsque le patient rapporte la chaise roulante </td>
														</tr>

													</tbody>
												</table>
												<br>
												<p> <span STYLE="color:red;"> +100$ </span>  Si prise en charge à l'extérieur de l'hôpital/ rapatriement du patient à l'hôpital  </p>
												<p> <span STYLE="color:forestgreen;"> +50$ </span>  Si SPAM du 912  </p>




                                            </div>
                                        </div>

					</div>
                </div>
	        </div>
	    </div>
	</main>
