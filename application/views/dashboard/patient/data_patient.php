<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<div class="preloader"></div>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row noselect">
	            <div class="form-group col-md-12">
					<div id="doc-id">
						<h4 class="text-muted mb-4">Dossier médical de <?php echo $patient['fullname'] ?></h4>
                        <div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
                                    <div class="card-body">
                                        <div class="col-sm-10">
                                            <div class="picture-display"><img id="blah" src="<?php echo $patient['imagePath'] ?>" alt="" width="280" height="320"/></div>
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




    