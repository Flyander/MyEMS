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
	                                    <h5>Liste des utilisateurs</h5>
	                                </div>
	                                <div class="card-body">
										<input type="text" id="myInput" onkeyup="getNameInTable()" placeholder="Rechercher un utilisateur..">
	                                    <div class="table-responsive-md">
	                                        <table id="myTable" class="table table-hover">
	                                            <thead>
	                                                <tr>
	                                                    <th style="width: 10px;" scope="col"></th>
	                                                    <th scope="col">Prénom & Nom</th>
	                                                    <th scope="col">Grade</th>
	                                                    <th scope="col">Spécialisation</th>
														<th scope="col">Actions</th>
	                                                </tr>
	                                            </thead>
	                                            <tbody>
													<?php foreach ($collAccount as $user) { ?>
														<tr id="<?php echo $user['username']; ?>">
															<?php if ($user['isAdmin'] == 1) {
																	echo "<td style=\"color: darkorange; font-size: 22px; padding-top: 14px;\"><i class=\"fas fa-user-shield\"></i></td>";
																} else {
																	if ($user['typeGrade'] == 1) 
																	{
																		echo "<td style=\"color: green; font-size: 22px; padding-top: 14px;\"><i class=\"fas fa-hand-holding-medical\"></i></td>";
																	}
																	elseif ($user['typeGrade'] == 2) 
																	{
																		echo "<td style=\"color: red; font-size: 22px; padding-top: 14px;\"><i class=\"fad fa-user-nurse\"></i></td>";
																	}
																	else
																	{
																		echo "<td style=\"color: #17a2b8; font-size: 22px; padding-top: 14px;\"><i class=\"fad fa-user-md\"></i></td>";
																	}
																} 
															?>
															
															<td style="transform: translateY(10%);"><?php echo $user['fullname'];?></td>
															<td style="transform: translateY(10%);"><?php echo $user['gradeName'];?></td>
															<?php echo "<td style=\"transform: translateY(10%);\">N/A</td>"; ?>
															<?php 
															echo "<td><a class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i></a>
																	<a class=\"btn btn-sm btn-outline-lightning rounded-0\"><i class=\"far fa-trash-alt\"></i></a>
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
