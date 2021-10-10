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
                    <h4 class="text-muted mb-4">Encoder un patient</h4>
                    <div class="row mb-4">
                        <div class="col-md-12">
                            <div class="card border-0 rounded-0">
                                <div class="card-body">
                                    <?php echo form_open_multipart('Dashboard/addPatient');?>
                                    <label class="control-label col-sm-2" for="username">Prénom RP :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-prenom"
                                            placeholder="Prénom">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-2" for="username">Nom RP :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-nom"
                                            placeholder="Nom">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-2" for="username">Numéro de téléphone :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-num"
                                            placeholder="Numéro">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Prénom et Nom d'un proche (ou
                                        surnom) :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme"
                                            name="newPatient-procheNom" placeholder="Prénom et Nom">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Numéro de téléphone du proche
                                        :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme"
                                            name="newPatient-procheNum" placeholder="Numéro">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Groupe sanguin :</label>
                                    <div class="col-sm-10">
                                        <select type="username" class="form-control input-theme" name="newPatient-gs"
                                            placeholder="Groupe sanguin">
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Poids du patient (pas
                                        obligatoire) :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-poids"
                                            placeholder="Poids">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Taille du patient (pas
                                        obligatoire) :</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-taille"
                                            placeholder="Taille">
                                    </div>

                                    <div style="margin-top: 1%;"></div> <!-- separator -->

                                    <label class="control-label col-sm-3" for="username">Date de naissance (Sous le format xx/xx/xxxx):</label>
                                    <div class="col-sm-10">
                                        <input type="username" class="form-control input-theme" name="newPatient-dob"
                                            placeholder="Date de naissance">
                                    </div>


                                    <div style="margin-top: 2%;"></div> <!-- separator -->

                                    <div class="col-sm-10">
                                        <img id="blah" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                                            alt="" width="280" height="320" />
                                    </div>

                                    <div style="margin-top: 2%;"></div> <!-- separator -->

                                    <div class="col-sm-10">
                                        <input type='file' id="pictureBtn" title="" name='profile_pic' size='20' />
                                        <span class='btn btn-info' id="btnAddPicture">Ajouter une photo</span>
                                    </div>

                                    <div style="margin-top: 2%;"></div> <!-- separator -->


                                    <?php echo "<input class='btn btn-primary right' type='submit' name='submit' value='Ajouter le patient' /> ";?>
                                    <?php echo "</form>"?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>