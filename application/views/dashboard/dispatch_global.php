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
	        <div class="row">
	            <div class="form-group col-md-12">
	                <div>
						<select>
							<?php
							echo "<option >". date("j,d-M-Y", strotime())."</option>"
 							?>
						</select>
	                    <h4 class="text-muted mb-4 smooth-background titleLabelTheme">Gestion du dispatch</h4>
	                    <div class="row mb-4">
	                        <div class="col-md-12">
	                            <div class="card border-0 rounded-0 smooth-background">
	                                <div class="card-title mb-1 p-3">
	                                    <h5 class="titleLabelTheme smooth-background">Dispatch actuel</h5>
	                                </div>
	                                <div class="card-body">
	                                    <div class="table-responsive-md">
	                                        <table class="table table-hover smooth-background">
	                                            <thead>
	                                                <tr>
	                                                    <th style="width: 10px;" scope="col"></th>
	                                                    <th scope="col">Prénom & Nom</th>
	                                                    <th scope="col">Grade</th>
														<th scope="col">Numéro de téléphone</th>
														<th scope="col">Spécialisation</th>
	                                                    <th scope="col">Status</th>
														<th scope="col">Dispatch</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody id='tbody_dispatch'></tbody>
	                                        </table>
											<div class="preloader-icon">
												<div class="icon"><svg width="64px" height="64px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
														preserveAspectRatio="xMidYMid" class="lds-infinity" style="background: none;">
														<path fill="none" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-width="{{config.width}}"
															ng-attr-stroke-dasharray="{{config.dasharray}}"
															d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
															stroke="#33A4F2" stroke-width="4" stroke-dasharray="215.53469970703125 41.054228515625">
															<animate attributeName="stroke-dashoffset" calcMode="linear" values="0;256.58892822265625"
																keyTimes="0;1" dur="1.5" begin="0s" repeatCount="indefinite"></animate>
														</path>
													</svg>
												</div>
											</div>
	                                    </div>

	                                </div>
	                            </div>

	                        </div>
	                    </div>
	                </div>
					<div class="row mb-4">
	                    <div class="col-md-12">
	                        <div class="card border-0 rounded-0 smooth-background">
								<div id='option_dispatch'>
									<div class="card-title mb-1 p-3">
										<h5 class="titleLabelTheme smooth-background">Option dispatch</h5>
									</div>
									<div class="card-body">
										<div class="row">
											<?php if($onService == 0)  { ?> 
												<div class="col-md-4 mb-2">
													<a class="btn btn-outline-success w-100 rounded-0" href='pds' type="button">Prise de service</a>
												</div>
											<?php }else{ ?>
											<?php if ($onService == 1) {?>
												<!--<div class="col-md-4 mb-2">
													<a class="btn btn-outline-warning w-100 rounded-0" href='pauseService' type="button">Faire une pause</a>
												</div>-->
											<?php }else{ ?>
												<!--<div class="col-md-4 mb-2">
													<a class="btn btn-outline-success w-100 rounded-0" href='finPauseService' type="button">Reprendre le service</a>
												</div>-->
											<?php } ?>
												<div class="col-md-4 mb-2">
													<a class="btn btn-outline-danger w-100 rounded-0" href='fds' type="button">Fin de service</a>
												</div>
											<?php } ?>

											<?php if($onService != 0) { ?>
												<?php if($nbSupervisor == 0){ ?>
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-info w-100 rounded-0" href='supervisor' type="button">Devenir régulateur</a>
													</div>
												<?php } ?>
												<?php if($nbSupervisor >= 1){ ?> 
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-info w-100 rounded-0" href='endSupervisor' type="button">Stop régulateur</a>
													</div>
												<?php } ?>
 
												<?php if($county == 'LS'){ ?>
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-purple w-100 rounded-0" href='setCounty' type="button">Prendre son service sur Blaine County</a>
													</div>
												<?php } ?>

												<?php if($county == 'BC'){ ?>
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-purple w-100 rounded-0" href='setCounty' type="button">Prendre son service sur Los Santos</a>
													</div>
												<?php } ?>

												<?php if($isPharmacieOpen == 0 && $isPharmacien == 1){ ?>
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-brown w-100 rounded-0" href='ouvrirPharmacie' type="button">Ouvrir la pharmacie</a>
													</div>
												<?php } ?>
												<?php if($isPharmacieOpen >= 1){ ?> 
													<div class="col-md-4 mb-2">
														<a class="btn btn-outline-brown w-100 rounded-0" href='fermerPharmacie' type="button">Fermer la pharmacie</a>
													</div>
												<?php } ?>

											<?php } ?>
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
	</div>

	<script>$(function () { getTableDispatch(); });</script>
