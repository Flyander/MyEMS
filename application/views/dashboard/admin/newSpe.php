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
											<label class="control-label col-sm-2" for="username">Nom de la spécialité :</label>
											<div class="col-sm-10">
												<input type="username" class="form-control" id="newSpe" placeholder="Spécialité">
											</div>
										</div>
                                        <div id="footer-btn-spe"><button type="button" id="submit-spe" class="btn btn-primary right">Ajouter l'utilisateur</button></div>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                </div>
	        </div>
	    </div>
	</main>
