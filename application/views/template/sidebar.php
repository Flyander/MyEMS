<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>

<body class="background-theme">
    <div class="page-wrapper legacy-theme sidebar-bg toggled smooth-background background-theme">
        <div style="margin-top: 1%;" class="form-group col-md-12 absolute titleLabelTheme"><i
                class="fas fa-bars fa-lg usepointer toggle-sidebar"></i>
            <div>
                <nav id="sidebar" class="sidebar-wrapper">
                    <div class="sidebar-content">
                        <!-- sidebar-brand  -->
                        <div class="sidebar-item sidebar-brand">
                            <a class="toggle-sidebar usepointer"><i class="fas fa-arrow-left"></i></a>
                            <a class="noselect" href="">MyEMS</a>
                            <div>
                                <a class="sidebar-right" href="logout"><i class="fas fa-power-off"></i></a>
                            </div>
                        </div>
                        <!-- sidebar-header  -->
                        <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                            <div class="user-pic noselect">
                                <?php if ($imagePath != '') { ?>
                                <img class="img-responsive img-rounded" src="<?php echo $imagePath?>"
                                    alt="User picture">
                                <?php } else { ?>
                                <img class="img-responsive img-rounded" src="<?php echo base_url()?>assets/img/user.jpg"
                                    alt="User picture">
                                <?php } ?>
                            </div>
                            <div class="user-info noselect">
                                <span class="user-name"><?php echo "$name"?>
                                </span>
                                <span class="user-role"><?php echo "$userGrade"?></span>
                                <span class="user-status">
                                    <i class="fa fa-circle"></i>
                                    <span>En ligne</span>
                                </span>
                            </div>
                        </div>
                        <!-- sidebar-menu  -->
                        <div class="sidebar-item sidebar-menu noselect usepointer">
                            <ul>
                                <li class="header-menu">
                                    <span>General</span>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a>
                                        <i class="fa fa-tachometer-alt"></i>
                                        <span class="menu-text">Gestion de service</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="index">Dispatch global
                                                    <!--<span class="badge badge-pill badge-success">Feat</span>-->
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dispatchFusillade">Dispatch fusillade
                                                    <!--<span class="badge badge-pill badge-warning">WIP</span>-->
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="gestionPatient">
                                        <i class="fas fa-user-edit"></i>
                                        <span class="menu-text">Gestion patient</span>
                                        <span class="badge badge-pill badge-warning">WIP</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="myhours">
                                        <i class="fas fa-hourglass-half"></i>
                                        <span class="menu-text">Mes heures</span>
                                        <!-- <span class="badge badge-pill badge-primary">Beta</span> -->
                                    </a>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a>
                                        <i class="fa fa-calendar"></i>
                                        <span class="menu-text">Gestion des Rendez-vous </span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="createAppointment"> Créer un rendez-vous
                                                    <!--<span class="badge badge-pill badge-warning">WIP</span>-->
                                                </a>

                                            </li>
                                            <li>
                                                <a href="showRdv"> Demande non assigné
                                                    <!--<span class="badge badge-pill badge-success">Feat</span>-->
                                                </a>
                                            </li>
                                            <li>
                                                <a href="showRdvTaken">Demande prise en charge
                                                    <!--<span class="badge badge-pill badge-warning">WIP</span>-->
                                                </a>

                                            </li>

                                            <li>
                                                <a href="showRdvEnd">Demande finalisé
                                                    <!--<span class="badge badge-pill badge-warning">WIP</span>-->
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li class="header-menu">
                                    <span>Extra</span>
                                </li>
                                <li>
                                    <a href="documentation">
                                        <i class="fa fa-book"></i>
                                        <span class="menu-text">Documentation</span>
                                        <!--<span class="badge badge-pill badge-primary">Beta</span>-->
                                    </a>
                                </li>
                                <li>
                                    <a href="procedure">
                                        <i class="fa fa-book"></i>
                                        <span class="menu-text">Procédure</span>
                                        <!--<span class="badge badge-pill badge-primary">Beta</span>-->
                                    </a>
                                </li>
                                <li>
                                    <a href="tarification">
                                        <i class="fa fa-calendar"></i>
                                        <span class="menu-text">Tarification</span>
                                    </a>
                                </li>

                                <?php 	if($isAdmin == 1 or $checkReturnRapport) { ?>

                                <li>
                                    <a href="returnRapport">
                                        <i class="fa fa-pencil"></i>
                                        <span class="menu-text">Retour SAMS - ( Rapport) </span>
                                    </a>
                                </li>
                                <?php 	}  ?>

                                <?php if ($isAdmin == 1) { ?>

                                <li class="header-menu">
                                    <span>Admin</span>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a>
                                        <i class="fas fa-users"></i>
                                        <span class="menu-text">Gestion des utilisateurs</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="listAccount">Liste des utilisateurs</a>
                                            </li>
                                            <li>
                                                <a href="newAccount">Ajouter un utilisateur</a>
                                            </li>
                                            <li>
                                                <a href="newSpe">Ajouter une spécialité</a>
                                            </li>
                                            <li>
                                                <a href="newAddSpe">Ajouter une spécialité à un utilisateur</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="sidebar-dropdown">
                                    <a>
                                        <i class="fas fa-users"></i>
                                        <span class="menu-text">Gestion des spécialités</span>
                                    </a>
                                    <div class="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <a href="listSpe">Liste des spécialités </a>
                                            </li>
                                            <li>
                                                <a href="newSpe">Ajouter une spécialité</a>
                                            </li>
                                            <li>
                                                <a href="newAddSpe">Ajouter une spécialité à un utilisateur</a>
                                            </li>
                                            <li>
                                                <a href="newDeleteSpe">Supprimer la spé d'un utilisateur</a>
                                            </li>

                                        </ul>
                                    </div>
                                <li>
                                    <a href="showReturnedRapport">
                                        <i class="fa fa-pencil"></i>
                                        <span class="menu-text">Voir les retours SAMS </span>
                                    </a>
                                </li>
                                </li>
                                <?php } ?>

                                <!--<li>
                            <a>
                                <i class="fa fa-folder"></i>
                                <span class="menu-text">Examples</span>
                            </a>
                        </li>-->
                            </ul>
                        </div>
                        <!-- sidebar-menu  -->
                    </div>
                    <div class="sidebar-footer">
                        <div>
                            <a onclick="changeTheme('<?php echo $stateTheme ?>')">
                                <?php if ($stateTheme == 'light') { ?>
                                <i class="far fa-moon"></i>
                                <?php } else { ?>
                                <i class="fal fa-sun"></i>
                                <?php } ?>
                            </a>
                        </div>
                    </div>
                </nav>