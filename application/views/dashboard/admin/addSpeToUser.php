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
	                    <h4 class="text-muted mb-4">Gestion des Spes</h4>
	                    <div class="row mb-4">
	                        <div class="col-md-12">
	                            <div class="card border-0 rounded-0">
	                                <div class="card-title mb-1 p-3">
	                                    <h5 class="titleLabelTheme">Ajouter une nouvelle spécialité</h5>
	                                </div>
	                                <div class="card-body">
										<div class="form-group">
											<div class="card border-0 rounded-0">
												<div class="card-title mb-1 p-3">
													<h5 class="titleLabelTheme">Ajouter une nouvelle spécialité à un utilisateurs</h5>
												</div>
												<div class="card-body">
													<div class="form-group">
														<label class="control-label col-sm-2" for="username">Nom de l'utilisateur :</label>
														<div class="col-sm-10">
															<select type="username" class="form-control" id="userSpe" placeholder="Grade">
																<?php foreach ($userName as $name) { ?>
																	<option value="<?php echo $name['id']; ?>"> <?php echo $name['fullname']; ?> </option>

																<?php } ?>
															</select>
														</div>
														<br>
														<label class="control-label col-sm-2" for="username">Nom de la spécialité :</label>

														<div class="col-sm-10">
															<select type="username" class="form-control" id="newUser-spe" placeholder="Grade">
																<?php foreach ($allSpe as $spe) { ?>
																	<option value="<?php echo $spe['name']; ?>"><?php echo $spe['name']; ?></option>

																<?php } ?>
															</select>
														</div>
													</div>
													<div id="footer-btn-addspe"><button type="button" id="submit-addSpe" class="btn btn-primary right">Ajouter l'utilisateur</button></div>
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
