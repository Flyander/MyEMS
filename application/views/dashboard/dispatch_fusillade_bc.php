<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<div class="preloader"></div>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row noselect">
	            <div class="form-group col-md-12">
					<div>
						<h4 class="text-muted mb-4">Gestion de fusillade Blaine County</h4>
						<div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
									<div class="card-title mb-1 p-3">
										<h5>Salle de repos Sandy Shores</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-7">
											<i class="fad fa-procedures bed-icon usepointer left invisible"></i>
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
                                            <i id="repos_ss_1" class="fad fa-procedures bed-icon usepointer left" onclick="showModalWithData('repos_ss_1')"></i>
										</div>
										<div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="repos_ss_2" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_ss_2')"></i>
										</div>
										<div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="repos_ss_3" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_ss_3')"></i>
										</div>
										<div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="repos_ss_4" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_ss_4')"></i>
										</div>
                                        <div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="repos_ss_5" class="fad fa-procedures bed-icon usepointer right" onclick="showModalWithData('repos_ss_5')"></i>
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
										<h5>Bloc opératoire Sandy Shores</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
											<i id="bloc_ss_1" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_ss_1')"></i>
                                            <i id="bloc_ss_2" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_ss_2')"></i>
											<i id="bloc_ss_3" class="fad fa-stretcher bed-icon usepointer right" onclick="showModalWithData('bloc_ss_3')"></i>
										</div>
										<div class="form-group col-md-12">
											<i id="bloc_ss_4" class="fad fa-stretcher bed-icon usepointer left" onclick="showModalWithData('bloc_ss_4')"></i>
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
										<h5>Bloc opératoire Paleto Bay</h5>
									</div>
									<div class="card-body">
										<div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="bloc_pb_1" class="fad fa-stretcher bed-icon usepointer right" onclick="showModalWithData('bloc_pb_1')"></i>
										</div>
										<div class="form-group col-md-12">
                                            <i class="fad fa-procedures bed-icon usepointer left invisible"></i>
											<i id="bloc_pb_2" class="fad fa-stretcher bed-icon usepointer right" onclick="showModalWithData('bloc_pb_2')"></i>
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
