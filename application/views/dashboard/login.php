	<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<div class="preloader"></div>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row">
	            <div class="form-group col-md-12">
	                <div>

	                    <h4 class="text-muted mb-4">Dispatch</h4>
	                    <div class="row mb-4">
	                        <div class="col-md-12">
	                            <div class="card border-0 rounded-0">
	                                <div class="card-title mb-1 p-3">
	                                    <h5>Dispatch actuelle</h5>
	                                </div>
	                                <div class="card-body">
	                                    <div class="table-responsive-md">
	                                        <table class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th style="width: 10px;" scope="col"></th>
	                                                    <th scope="col">Prénom & Nom</th>
	                                                    <th scope="col">Grade</th>
	                                                    <th scope="col">Spécialisation</th>
	                                                    <th scope="col">Status</th>
	                                                    <!--<th scope="col">Actions</th>-->
	                                                </tr>
	                                            </thead>
	                                            <tbody>
	                                                <?php
														foreach ($onServiceName as $key){
															echo '<tr>';
															if ($key['supervisor'] == 1)
																echo "<td style=\"color: orange; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-crown\"></i></td>";
															else
																echo "<td></td>";
															echo "<td>".$key['fullname']."</td>";
															echo "<td>".$key['grade']."</td>";
															echo "<td>".$key['spe']."</td>";
															if ($key['isAvailable'] == 1)
																echo "<td style = \"color: green;\"><i class=\"fas fa-sync-alt fa-spin\"></i> En service</td>";
															else if ($key['isAvailable'] == 2)
																echo "<td style = \"color: orange;\"><i class=\"fas fa-spinner fa-pulse\"></i> En pause</td>";

															/*echo "<td>";
																if($key['id'] == $id && $nbSupervisor == 0){
															echo "<a href='supervisor' id='supervisor' class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i>
																</a>";
																}
																if($key['id'] == $id && $key['supervisor'] == 1){
																echo "<a id='endSupervisor' href='endSupervisor' class=\"btn btn-sm btn-outline-lightning rounded-0\">
																<i class=\"far fa-trash-alt\"></i>
																</a>";

																}
																
																echo "</td>";*/
															echo '</tr>';
														}
													?>
	                                            </tbody>
	                                        </table>

	                                    </div>

	                                </div>
	                            </div>

	                        </div>
	                    </div>
	                </div>
	                <div>
					<div class="row mb-4">
	                    <div class="col-md-12">
	                        <div class="card border-0 rounded-0">
	                            <div class="card-title mb-1 p-3">
	                                <h5>Option dispatch</h5>
	                            </div>
	                            <div class="card-body">
									<div class="row">
										<?php if($onService == 0)  { ?> 
											<div class="col-md-4 mb-2">
												<a class="btn btn-outline-success w-100 rounded-0" href='pds' type="button">Prise de service</a>
											</div>
	                                    <?php }else{ ?>
	                                    <?php if ($onService == 1) {?>
	                                    	<div class="col-md-4 mb-2">
												<a class="btn btn-outline-warning w-100 rounded-0" href='pauseService' type="button">Faire une pause</a>
											</div>
	                                    <?php }else{ ?>
											<div class="col-md-4 mb-2">
												<a class="btn btn-outline-success w-100 rounded-0" href='finPauseService' type="button">Reprendre le service</a>
											</div>
	                                    <?php } ?>
	                                    	<div class="col-md-4 mb-2">
												<a class="btn btn-outline-danger w-100 rounded-0" href='fds' type="button">Fin de service</a>
											</div>
										<?php } ?>

										<?php if($onService != 0) { ?>
											<?php if($nbSupervisor == 0){ ?>
												<div class="col-md-4 mb-2">
													<a class="btn btn-outline-info w-100 rounded-0" href='supervisor' type="button">Devenir superviseur</a>
												</div>
											<?php } ?>
											<?php if($nbSupervisor == 1){ ?>
												<div class="col-md-4 mb-2">
													<a class="btn btn-outline-info w-100 rounded-0" href='endSupervisor' type="button">Stop superviseur</a>
												</div>
											<?php } ?>
										<?php } ?>
									</div>
								</div>
							</div>
						</div>
	                </div>
	                </body>
	            </div>
	        </div>
	    </div>
	</main>
	</div>