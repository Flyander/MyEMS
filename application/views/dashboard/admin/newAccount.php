<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	if ($isAdmin != 1) {
		redirect('/Dashboard/index');
	}
	?>

	<div class="preloader"></div>
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
	                                    <h5>Ajouter un nouvel utilisateur</h5>
	                                </div>
	                                <div class="card-body">
										<div class="form-group">
											<label class="control-label col-sm-2" for="username">Prénom RP :</label>
											<div class="col-sm-10">
												<input type="username" class="form-control" id="newUser-prenom" placeholder="Prénom">
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="username">Nom RP :</label>
											<div class="col-sm-10">
												<input type="username" class="form-control" id="newUser-nom" placeholder="Nom">
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="username">Grade :</label>
											<div class="col-sm-10">          
												<select type="username" class="form-control" id="newUser-grade" placeholder="Grade">
													<?php foreach ($collGrade as $grade) { ?>
														<option value="<?php echo $grade['name']; ?>"><?php echo $grade['name']; ?></option>
													<?php } ?>
												</select>
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="username">Numéro de téléphone :</label>
											<div class="col-sm-10">
												<input type="username" class="form-control" id="newUser-num" placeholder="Numéro">
											</div>
										</div>

										<div class="form-group">
											<label class="control-label col-sm-2" for="pwd">Mot de passe :</label>
											<div class="col-sm-10">          
												<input type="password" class="form-control" id="newUser-mdp" placeholder="Mot de passe">
											</div>
										</div>

										

										<div class="form-group">
											<label class="control-label col-sm-2">Admin :</label>        
											<div class="col-sm-12">
												<div class="checkbox">
													<label class="checkbox path">
														<input type="checkbox" id="newUser-isAdmin">
														<svg viewBox="0 0 21 21">
															<path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
														</svg>
													</label>
												</div>
											</div>
										</div>

                                        <div id="footer-btn-user"><button type="button" id="submit-user" class="btn btn-primary right">Ajouter l'utilisateur</button></div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                </div>
	        </div>
	    </div>
	</main>
