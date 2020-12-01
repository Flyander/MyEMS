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
					<div>
						<h4 class="text-muted mb-4">Gestion de fusillade</h4>
						<div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
									<div class="card-title mb-1 p-3">
										<h5 class="titleLabelTheme">Salle de repos</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
											<i id="repos_1" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_1')"></i>
											<i id="repos_2" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_2')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="repos_3" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_3')"></i>
											<i id="repos_4" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_4')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="repos_5" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_5')"></i>
											<i id="repos_6" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_6')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="repos_7" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_7')"></i>
											<i id="repos_8" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_8')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="repos_9" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_9')"></i>
										</div>
									</div>
								</div>
							</div>
						</div>


						<div style="margin-top: 6%;"></div> <!-- separator -->


						<div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
									<div class="card-title mb-1 p-3">
										<h5 class="titleLabelTheme">Salle de réveil</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
											<i id="reveil_1" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('reveil_1')"></i>
											<i id="reveil_2" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('reveil_2')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="reveil_3" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('reveil_3')"></i>
											<i id="reveil_4" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('reveil_4')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="reveil_5" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('reveil_5')"></i>
											<i id="reveil_6" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('reveil_6')"></i>
										</div>
									</div>
								</div>
							</div>
						</div>


						<div style="margin-top: 6%;"></div> <!-- separator -->


						<div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
									<div class="card-title mb-1 p-3">
										<h5 class="titleLabelTheme">Bloc opératoire</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
											<i id="bloc_1" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_1')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="bloc_2" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_2')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="bloc_3" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_3')"></i>
											<i id="bloc_4" class="fad fa-stretcher bed-icon usepointer right" onclick="showModalWithData('bloc_4')"></i>
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
	<script>$(function () { getDataBed(); });</script>
