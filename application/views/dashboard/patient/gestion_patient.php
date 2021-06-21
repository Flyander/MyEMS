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
                    <h4 class="text-muted mb-4">Gestion patient</h4>
                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div class="card border-0 rounded-0">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6 mb-4">

                                            <div class="card gradient-card">
                                                <div class="card-image"
                                                    style="background-image: url(https://www.conseil-national.medecin.fr/sites/default/files/styles/fw_td_1_1/public/styles/ratio-30/public/images/adobestock_82745345_3.jpeg?itok=59qpcxzl);">
                                                    <a style="text-decoration: none;" href="encoderPatient">
                                                        <div class="text-white d-flex h-100 mask blue-gradient-rgba">
                                                            <div class="first-content align-self-center p-3">
                                                                <h3 class="test-title">Encoder patient</h3>
                                                                <p class="lead mb-0">Création d'un nouveau patient</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-6 mb-4">

                                            <div class="card gradient-card">
                                                <div class="card-image usepointer"
                                                    style="background-image: url(https://resource.logitech.com/w_1206,c_limit,q_auto,f_auto,dpr_1.0/content/dam/logitech/en/healthcare/hc-partner-resource-microsoft.jpg?v=1);">
                                                    <a style="text-decoration: none;" href="researchPatient">
                                                        <!-- WIP onClick="modalDataPatient('<?php //echo $stateTheme ?>')" -->
                                                        <div class="text-white d-flex h-100 mask aqua-gradient-rgba">
                                                            <div class="first-content align-self-center p-3">
                                                                <h3 class="test-title">Trouver un patient</h3>
                                                                <p class="lead mb-0">Rechercher un patient dans tout les
                                                                    dossiers médicaux</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-6 mb-4">

                                            <div class="card gradient-card">
                                                <div class="card-image"
                                                    style="background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo3dkGXkGaRtX5eVyedNs2xtJt_Vq1BIjzoA&usqp=CAU);">
                                                    <a style="text-decoration: none;" href="#!">
                                                        <div class="text-white d-flex h-100 mask peach-gradient-rgba">
                                                            <div class="first-content align-self-center p-3">
                                                                <h3 class="test-title">Rapport d'intervention</h3>
                                                                <p class="lead mb-0">Fiche bilan suite à une
                                                                    intervention du LSFD</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
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