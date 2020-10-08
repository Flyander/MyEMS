<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<body>
    <div class="page-wrapper legacy-theme sidebar-bg toggled">
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="">MyEMS</a>
                    <div>
                        <a class="sidebar-right" href="logout"><i class="fas fa-power-off"></i></a>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="<?php echo base_url()?>assets/img/user.jpg" alt="User picture">
                    </div>
                    <div class="user-info">
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
                                <span class="badge badge-pill badge-primary">Beta</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="index">Dispatch global
                                            <!--<span class="badge badge-pill badge-success">Feat</span>-->
                                        </a>
                                    </li>
                                    <li>
                                        <a href="dispatchFusillade">Dispatch fusillade <!--<span class="badge badge-pill badge-warning">WIP</span>--></a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar-dropdown">
                            <a>
                                <i class="fas fa-user-edit"></i>
                                <span class="menu-text">Rechercher un patient</span>
                                <span class="badge badge-pill badge-warning">Soon</span>
                                <!--<span class="badge badge-pill badge-danger">3</span>-->
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <!--<li class="sidebar-dropdown">
                            <a>
                                <i class="far fa-gem"></i>
                                <span class="menu-text">In progress</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar-dropdown">
                            <a>
                                <i class="fa fa-chart-line"></i>
                                <span class="menu-text">In progress</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="sidebar-dropdown">
                            <a>
                                <i class="fa fa-globe"></i>
                                <span class="menu-text">In progress</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                    <li>
                                        <a>Examples</a>
                                    </li>
                                </ul>
                            </div>
                        </li>-->
                        <li class="header-menu">
                            <span>Extra</span>
                        </li>
                        <li>
                            <a>
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Documentation</span>
                                <!--<span class="badge badge-pill badge-primary">Beta</span>-->
                            </a>
                        </li>
                        <li>
                            <a>
                                <i class="fa fa-calendar"></i>
                                <span class="menu-text">Tarification</span>
                            </a>
                        </li>
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
        </nav>
    
    <!-- page-wrapper -->

    <!-- using online scripts -->
    <!-- using local scripts -->
    <!-- <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <script src="../node_modules/popper.js/dist/umd/popper.min.js"></script>
    <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script> -->
