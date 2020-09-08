	<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<div class="preloader"></div>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row">
	            <div class="form-group col-md-12">
	                <div>

	                    <h4 class="text-muted mb-4">Tables </h4>

	                    <div class="row mb-4">
	                        <div class="col-md-12">
	                            <div class="card border-0 rounded-0">
	                                <div class="card-title mb-1 p-3">
										<h5>Basic table</h5>
										<?php if($onService == 0)  { ?> <b id="pds"> <a href="pds"> Prise de service</a> </b>
										<?php }else{ ?>
										<b id="fds"> <a href="fds">Fin de service</a> </b>
										<?php } ?>
	                                </div>
	                                <div class="card-body">
	                                    <div class="table-responsive-md">
	                                        <table class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th scope="col">Prénom & Nom</th>
	                                                    <th scope="col">Grade</th>
	                                                    <th scope="col">Spécialisation</th>
	                                                    <th scope="col">Status</th>
	                                                    <th scope="col">Actions</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<?php
														foreach ($onServiceName as $key){
															echo '<tr>';
															echo "<td>".$key['fullname']."</td>";
															echo "<td>".$key['grade']."</td>";
															echo "<td>".$key['spe']."</td>";
															echo "<td>En service</td>";
															echo "<td><a class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i>
																</a>
																<a class=\"btn btn-sm btn-outline-lightning rounded-0\">
																<i class=\"far fa-trash-alt\"></i>
																</a>
																</td>";
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
	                </body>
	            </div>
			</div>
		</div>
	</main>
</div>