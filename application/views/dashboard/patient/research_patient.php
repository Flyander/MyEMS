<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<div class="preloader"></div>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row noselect">
	            <div class="form-group col-md-12">
					<div id="doc-id">
						<h4 class="text-muted mb-4">Rechercher un patient</h4>
                        <div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
                                <div class="card-body">
										<input type="text" id="myInput" onkeyup="getNameInTable()" placeholder="Rechercher un patient..">
	                                    <div class="table-responsive-md">
	                                        <table id="myTable" class="table table-hover">
	                                            <thead>
	                                                <tr">
	                                                    <th style="width: 10px;" scope="col"></th>
	                                                    <th scope="col"></th>
														<th style="text-align: center;" scope="col"></th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<?php foreach ($collPatient as $patient) { ?>
														<tr id="<?php echo $patient['fullname']; ?>">
															<?php echo "<td style=\"color: #40D690; font-size: 22px; padding-top: 14px;\"><i class=\"fad fa-user-injured\"></i></td>";?>
															
															<td style="transform: translateY(10%);"><?php echo $patient['fullname'];?></td>
															<?php 
                                                            echo "<td style='text-align: right; margin-right: 100%;'>
                                                                    <a href=\"dataPatient?id=".$patient['id']."\" class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-eye\"></i></a>
																	<a onclick=\"updatePatientData('". $patient['fullname'] ."')\" class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i></a>
																	<a onclick=\"deletePatientData('". $patient['fullname'] ."')\" class=\"btn btn-sm btn-outline-lightning rounded-0\"><i class=\"far fa-trash-alt\"></i></a>
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




    