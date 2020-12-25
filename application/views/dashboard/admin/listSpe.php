<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	if ($isAdmin != 1) {
		redirect('/Dashboard/index');
	}
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
	                    <h4 class="text-muted mb-4">Gestion des utilisateurs</h4>
	                    <div class="row mb-4">
	                        <div class="col-md-12">
	                            <div class="card border-0 rounded-0">
	                                <div class="card-title mb-1 p-3">
	                                    <h5 class="titleLabelTheme">Liste des utilisateurs</h5>
	                                </div>
	                                <div class="card-body">
										<input type="text" id="myInput" onkeyup="getNameInTable()" placeholder="Rechercher un utilisateur..">
	                                    <div class="table-responsive-md">
	                                        <table id="myTable" class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th scope="col">Nom de la spécialité</th>
														<th scope="col">Actions</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<?php foreach ($allSpe as $spe) { ?>
														<tr id="<?php echo $spe['name']; ?>">
															<?php echo "<td style=\"transform: translateY(10%);\"> ".$spe['name']. "</td>"; ?>
															<?php 
															echo "<td>
																	<a onclick=\"updateSpeData('". $spe['name'] ."')\" class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i></a>
																	<a onclick=\"deleteSpeData('". $spe['name'] ."')\" class=\"btn btn-sm btn-outline-lightning rounded-0\"><i class=\"far fa-trash-alt\"></i></a>
																  </td>";
															?>
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
