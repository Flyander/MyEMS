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
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="label-patient">Prénom & Nom :</div>
                                                <div class="data-patient"><?php echo $patient['fullname'] ?></div>

                                                <div style="margin-left: 3%; margin-top: 1px;" class="label-patient">Numéro de téléphone :</div>
                                                <div style="margin-top: 1px;" class="data-patient"><?php echo $patient['numero'] ?></div>


                                                <div class="ml-auto mr-3">
                                                    <img id="blah" class="right-global" src="<?php echo $patient['imagePath'] ?>" alt="" width="281" height="320"/>
                                                </div>
                                            </div>

                                            <div style="margin-top: 3%;"></div> <!-- separator -->

                                            <div class="row">
                                                <div class="label-patient">Date de naissance :</div>
                                                <div class="data-patient"><?php echo $patient['dob'] ?></div>

                                                <div style="margin-left: 5.9%; margin-top: 1px;" class="label-patient">Groupe Sanguin :</div>
                                                <div style="margin-top: 1px;" class="data-patient"><?php echo $patient['gs'] ?></div>
                                            </div>

                                            <div style="margin-top: 3%;"></div> <!-- separator -->

                                            <div class="row">
                                                <div class="label-patient">Taille :</div>
                                                <div class="data-patient"><?php echo $patient['height'][0] ?>m<?php echo substr($patient['height'], 1) ?></div>

                                                <div style="margin-left: 22.3%; margin-top: 1px;" class="label-patient">Poids :</div>
                                                <div style="margin-top: 1px;" class="data-patient"><?php echo $patient['weight'] ?> Kg</div>
                                            </div>

                                            <div style="margin-top: 3%;"></div> <!-- separator -->

                                            <div class="row">
                                                <div class="label-patient">Information d'un proche :</div>
                                                <div class="data-patient"><?php echo $patient['name_proche'] ?> | <?php echo $patient['num_proche'] ?></div>
                                            </div>

                                            <div style="margin-top: 3%;"></div> <!-- separator -->                                       
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




    