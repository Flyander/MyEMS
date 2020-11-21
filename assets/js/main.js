(function($) {
    function handlePreloader() {
        if ($('.preloader').length) {
            $('body').addClass('page-loaded');
            $('.preloader').delay(1000).fadeOut(300);
        }
    }
    $(window).on('load', function() {
        handlePreloader();
    });
})(window.jQuery);

jQuery(function($) {
    // Dropdown menu
    $('.sidebar-dropdown > a').click(function() {
        $('.sidebar-submenu').slideUp(200);
        if ($(this).parent().hasClass('active')) {
            $('.sidebar-dropdown').removeClass('active');
            $(this).parent().removeClass('active');
        } else {
            $('.sidebar-dropdown').removeClass('active');
            $(this).next('.sidebar-submenu').slideDown(200);
            $(this).parent().addClass('active');
        }
    });

    //toggle sidebar
    $('.toggle-sidebar').click(function() {
        $('.page-wrapper').toggleClass('toggled');
    });

    // bind hover if pinned is initially enabled
    if ($('.page-wrapper').hasClass('pinned')) {
        $('#sidebar').hover(
            function() {
                $('.page-wrapper').addClass('sidebar-hovered');
            },
            function() {
                $('.page-wrapper').removeClass('sidebar-hovered');
            }
        );
    }

    //Pin sidebar
    $('#pin-sidebar').click(function() {
        if ($('.page-wrapper').hasClass('pinned')) {
            // unpin sidebar when hovered
            $('.page-wrapper').removeClass('pinned');
            $('#sidebar').unbind('hover');
        } else {
            $('.page-wrapper').addClass('pinned');
            $('#sidebar').hover(
                function() {
                    $('.page-wrapper').addClass('sidebar-hovered');
                },
                function() {
                    $('.page-wrapper').removeClass('sidebar-hovered');
                }
            );
        }
    });

    //toggle sidebar overlay
    $('#overlay').click(function() {
        $('.page-wrapper').toggleClass('toggled');
    });

    //switch between themes
    var themes =
        'default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme';
    $('[data-theme]').click(function() {
        $('[data-theme]').removeClass('selected');
        $(this).addClass('selected');
        $('.page-wrapper').removeClass(themes);
        $('.page-wrapper').addClass($(this).attr('data-theme'));
    });

    // toggle border radius
    $('#toggle-border-radius').change(function(e) {
        e.preventDefault();
        $('.page-wrapper').toggleClass('boder-radius-on');
    });

    //custom scroll bar is only used on desktop
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )) {
        $('.sidebar-content').mCustomScrollbar({
            axis: 'y',
            autoHideScrollbar: true,
            scrollInertia: 300,
        });
        $('.sidebar-content').addClass('desktop');
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.page-wrapper').toggleClass('toggled');
    }

    $('.image-link').magnificPopup({type:'image'});

    
    $("#submit-user").click(function(){
        var data_prenom = $("#newUser-prenom").val();
        var data_nom = $("#newUser-nom").val();
        var data_grade = $("#newUser-grade").val();
        var data_mdp = $("#newUser-mdp").val();
        var data_num = $("#newUser-num").val();
        var chxbox_isAdmin = $("#newUser-isAdmin").is(":checked");
        if (chxbox_isAdmin == true)
            data_isAdmin = 1
        else
            data_isAdmin = 0
        addNewUser(data_prenom, data_nom, data_grade, data_mdp, data_isAdmin, data_num);
    });

    $('#btnAddPicture').click(function(){
        $('#pictureBtn').trigger('click'); 
    });

    $('#pictureBtn').change(function(){
        readURL(this);
    });    
});



function getTableDispatch()
{
    $('#tbody_dispatch').html('');
    jQuery.ajax({
        url: "getDispatch",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                $('.icon').css({ "display": "block" });
                table = '';
                jQuery.each(data.data.onServiceName, function (i, item)
                {
                    if (data.data.isAdmin == 1)
                        table += '<tr onclick="getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')" id="'+ item.username +'"">'; //onclick="getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')"
                    else
                        table += '<tr id="'+ item.username +'"">';

                    if (item.isSupervisor == 1)
                        table += "<td style=\"color: orange; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-crown\"></i></td>";
                    else
                        table += "<td></td>";

                    table += "<td>"+ item.fullname +"</td>";
                    table += "<td>"+ item.gradeName +"</td>";
                    table += "<td>" + item.num + "</td>";
                    if (item.spe == null)
                        table += "<td>N/A</td>";
                    else
                        table += "<td>"+ item.spe +"</td>";

                    if (item.isAvailable == 1)
                    {
                        if (item.typeGrade == 1 && item.isPharmacieOpen == 1)
                            table += "<td style = \"color: green;\"><i class=\"fad fa-pills\"></i> Pharmacie</td>";
                        else if (item.typeGrade == 2)
                            table += "<td style = \"color: #FF7500;\"><i class=\"fad fa-fire\"></i> Service LSFD</td>";
                        else
                            table += "<td style = \"color: green;\"><i class=\"fas fa-sync-alt fa-spin\"></i> En service</td>";
                    }
                    else if (item.isAvailable == 2)
                        table += "<td style = \"color: orange;\"><i class=\"fas fa-spinner fa-pulse\"></i> En pause</td>";

                    table += '<td style = \"color: #1A9CC7;\">'+ item.county +'</td>';

                    table += '</tr>';
                });

                $('#tbody_dispatch').html(table);
                $('.icon').css({ "display": "none" });
            }
        },
        complete: function() {
            setTimeout(getTableDispatch, 20000); //After completion of request, time to redo it after a second
        }
    });
}

function getOptionDispatch(id, isSupervisor) 
{
    $('#option_dispatch').html('');
    jQuery.ajax({
        url: "getOptionDispatch",
        type: "POST",
        data: { id: id, isSupervisor: isSupervisor },
        dataType: 'json',
        success: function (data) {
            player = data.data.playerInfo;
            optionHtml = '';
            optionHtml += "<div class=\"card-title mb-1 p-3\"><h5>Option dispatch - "+ player.fullname +"</h5></div><div class=\"card-body\">"
            optionHtml += "<div class=\"row\">";

            if (player.isAvailable == 0)
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-success w-100 rounded-0\" href='pds' onclick='getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')' type=\"button\">Prise de service</a></div>";
            else
            {
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-danger w-100 rounded-0\" href='index' onclick='setService(\""+ id +"\", \"end\")' type=\"button\">Fin de service</a></div>";
            }

            optionHtml += "</div></div>";            
            
            $('#option_dispatch').html(optionHtml);
        }
    });
}

function setService(username, action)
{
    if (action = 'end')
    {
        jQuery.ajax({
            url: "endServiceOptionDispatch",
            type: "POST",
            data: { username: username },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)
                {
                }
            }
        });
    }
}

function getDataBed() {

    jQuery.ajax({
        url: "getDataFusillade",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                jQuery.each(data.data.dataFusillade, function (i, bed)
                {
                    if (bed.havePatient == 1)
                        $("#"+bed.bed).addClass("inprogress");
                    else
                        $("#"+bed.bed).removeClass("inprogress");

                });
                
            }
        },
        complete: function() {
            setTimeout(getDataBed, 20000); //After completion of request, time to redo it after a second
        }
    });
}


function showModalWithData(id_bed)
{
    jQuery.ajax({
        url: "getDataModalBed",
        type: "POST",
        data: { bed: id_bed},
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                bed = data.data.dataBed;

                modalHtml = '';
                modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';                

                modalHtml += '<div class="modal-header">';
                    modalHtml += '<h4 class="modal-title">'+ bed.bedLabel +'</h4>';
                    modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
                modalHtml += '</div>';

                modalHtml += '<div class="modal-body">';
                    modalHtml += '<div class="row">';
                        modalHtml += '<div class="col-md-3">';
                            modalHtml += '<div class="modalBed-label">Patient :</div>';
                        modalHtml += '</div>';
                        modalHtml += '<div class="col-md-9">';
                        if (bed.isSupervisor == 1)
                        {
                            modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-patient" value="'+ bed.patient +'">';
                        }
                        else
                        {
                            modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-patient" value="'+ bed.patient +'" disabled>';
                            //modalHtml += '<div class="modalBed-data">'+ bed.patient +'</div>'; //deactivated-elem
                        }
                        modalHtml += '</div>';
                    modalHtml += '</div>';

                    modalHtml += '<div style="margin-top: 6%;"></div>';

                    modalHtml += '<div class="row">';
                        modalHtml += '<div class="col-md-3">';
                            modalHtml += '<div class="modalBed-label">Médecin :</div>';
                        modalHtml += '</div>';
                        modalHtml += '<div class="col-md-9">';
                            if (bed.isSupervisor == 1)
                            {
                                modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-medecin" value="'+ bed.medecin +'">';
                            }
                            else
                            {
                                modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-medecin" value="'+ bed.medecin +'" disabled>';
                               // modalHtml += '<div class="modalBed-data">'+ bed.medecin +'</div>'; //deactivated-elem
                            }
                        modalHtml += '</div>';
                    modalHtml += '</div>';
                    
                    modalHtml += '<div style="margin-top: 6%;"></div>';

                    modalHtml += '<div class="row">';
                        modalHtml += '<div class="col-md-3">';
                            modalHtml += '<div class="modalBed-label">Description :</div>';
                        modalHtml += '</div>';
                        modalHtml += '<div class="col-md-9">';
                            if (bed.isSupervisor == 1)
                            {
                                modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-description" value="'+ bed.description +'">';
                            }
                            else
                            {
                                modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-description" value="'+ bed.description +'" disabled>';
                            }
                        modalHtml += '</div>';
                    modalHtml += '</div>';

                    modalHtml += '<div style="margin-top: 6%;"></div>';

                    modalHtml += '<div class="row">';
                        modalHtml += '<div class="col-md-4">';
                            modalHtml += '<div class="modalBed-label-state">État du patient :</div>';
                        modalHtml += '</div>';
                        modalHtml += '<div class="col-md-8">';
                            if (bed.isSupervisor == 0)
                            {
                                modalHtml += '<div class="heart-rate">';
                                if (bed.etatPatient == 1)
                                    modalHtml += '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="176px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve"><polyline fill="none" stroke="green" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/></svg>';
                                if (bed.etatPatient == 2)
                                    modalHtml += '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="176px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve"><polyline fill="none" stroke="orange" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/></svg>';
                                if (bed.etatPatient == 3)
                                    modalHtml += '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="176px" viewBox="0 0 150 73" enable-background="new 0 0 150 73" xml:space="preserve"><polyline fill="none" stroke="red" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/></svg>';
                                
                                modalHtml += '<div class="fade-in"></div>';
                                modalHtml += '<div class="fade-out"></div>';
                                modalHtml += '</div>';
                            }
                            else
                            {
                                modalHtml += '<div style="margin-top: 5%;">';
                                    modalHtml += '<select class="form-control" id="select-etat"><option>État Stable</option><option>État Instable</option><option>État Critique</option></select>'
                                modalHtml += '</div>';
                            }
                        modalHtml += '</div>';
                    modalHtml += '</div>';

                    modalHtml += '<div style="margin-top: 8%;"></div>';
                modalHtml += '</div>';
                $("#modalFusillade").html(modalHtml);
                if (bed.isSupervisor == 1)
                {
                    modalHtml += '<div class="modal-footer">';
                        modalHtml += '<button type="button" id="submit-modal" class="btn btn-primary">Sauvegarder les modifications</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
                    modalHtml += '</div>';
                }

                modalHtml += '</div></div>';
                $("#modalFusillade").html(modalHtml);

                $('#modalFusillade').modal({backdrop: 'static', keyboard: false});
                
                $("#submit-modal").click(function(){
                    var data_patient = $("#input-patient").val();
                    var data_medecin = $("#input-medecin").val();
                    var data_desc = $("#input-description").val();
                    var data_etat = $("#select-etat").val();
                    setModalWithData(id_bed, data_patient, data_medecin, data_desc, data_etat);
                });
            }
        }
    });
}

function setModalWithData(id_bed, data_patient, data_medecin, data_desc, data_etat)
{
    jQuery.ajax({
        url: "setDataModalBed",
        data: {id_bed: id_bed, data_patient: data_patient, data_medecin: data_medecin, data_desc: data_desc, data_etat: data_etat},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                $("#submit-modal").html('');
                $(".modal-footer").html('<button type="button" id="submit-modal" class="btn btn-success"><i class="fas fa-check"></i> Sauvegarde réussie</button>');
            }
        }
    });
}

function addNewUser(data_prenom, data_nom, data_grade, data_mdp, data_isAdmin, data_num)
{
    if (data_prenom != '' && data_nom != '' && data_grade != '' && data_mdp != '')
    {
        jQuery.ajax({
            url: "addNewUserInDB",
            data: {data_prenom: data_prenom, data_nom: data_nom, data_grade: data_grade, data_mdp: data_mdp, data_isAdmin: data_isAdmin, data_num: data_num},
            type: "POST",
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)
                {
                    $("#submit-user").html('');
                    $("#footer-btn-user").html('<button type="button" id="submit-user" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
                }
            }
        });
    }
    else
    {
        alert('Il manque des informations');
    }
}

function deleteUserData(username)
{
    if (username != '')
    {
        modalHtml = '';
        modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

        modalHtml += '<div class="modal-header">';
        modalHtml += '<h4 class="modal-title">Suppression de compte</h4>';
            modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
        modalHtml += '</div>';

        modalHtml += '<div class="modal-body">';
            modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir supprimer le compte de '+ username +' ?</div>';
            modalHtml += '<div style="margin-top: 5%;"></div>';
        modalHtml += '</div>';

        $("#modalFusillade").html(modalHtml);
        modalHtml += '<div class="modal-footer">';
            modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';    
            modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
        modalHtml += '</div>';

        modalHtml += '</div></div>';
        $("#modalFusillade").html(modalHtml);   

        $('#modalFusillade').modal({backdrop: 'static', keyboard: false});

        $("#submit-modal-yes").click(function(){
            jQuery.ajax({
            url: "deleteUserInDB",
            data: {username: username},
            type: "POST",
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)
                {
                    $('#modalFusillade').modal('hide');
                    location.reload();
                }
            }
            });
        });        
        $("#submit-modal-no").click(function(){
            $('#modalFusillade').modal('hide');
        });
    }
}

function updateUserData(username)
{
    if (username != '')
    {
        jQuery.ajax({
            url: "getUserData",
            type: "POST",
            data: { username: username},
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)
                {
                    user = data.data.dataAccount;
                    allGrade = data.data.collGrade;
    
                    modalHtml = '';
                    modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';                
    
                    modalHtml += '<div class="modal-header">';
                    modalHtml += '<h4 class="modal-title">'+ user.fullname +'</h4>';
                        modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
                    modalHtml += '</div>';
    
                    modalHtml += '<div class="modal-body">';
                        modalHtml += '<div class="row">';
                            modalHtml += '<div class="col-md-3">';
                                modalHtml += '<div class="modalBed-label">Prénom et Nom RP :</div>';
                            modalHtml += '</div>';
                            modalHtml += '<div class="col-md-9">';
                                modalHtml += '<input style="margin-top: 5%;" type="text" class="form-control" id="input-fullname" value="'+ user.fullname +'">';
                            modalHtml += '</div>';
                        modalHtml += '</div>';
    
                        modalHtml += '<div style="margin-top: 6%;"></div>';

                        modalHtml += '<div class="row">';
                            modalHtml += '<div class="col-md-3">';
                                modalHtml += '<div class="modalBed-label">Username :</div>';
                            modalHtml += '</div>';
                            modalHtml += '<div class="col-md-9">';
                                modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-username" value="'+ user.username +'">';
                            modalHtml += '</div>';
                        modalHtml += '</div>';
    
                        modalHtml += '<div style="margin-top: 6%;"></div>';

                        modalHtml += '<div class="row">';
                            modalHtml += '<div class="col-md-3">';
                                modalHtml += '<div class="modalBed-label">Numéro de téléphone :</div>';
                            modalHtml += '</div>';
                            modalHtml += '<div class="col-md-9">';
                                modalHtml += '<input style="margin-top: 5%;" type="text" class="form-control" id="input-num" value="'+ user.num +'">';
                            modalHtml += '</div>';
                        modalHtml += '</div>';
    
                        modalHtml += '<div style="margin-top: 6%;"></div>';
    
                        modalHtml += '<div class="row">';
                            modalHtml += '<div class="col-md-3">';
                                modalHtml += '<div class="modalBed-label">Grade :</div>';
                            modalHtml += '</div>';
                            modalHtml += '<div class="col-md-9">';
                                modalHtml += '<select style="margin-top: 2%;" type="text" class="form-control" id="select-grade" value="'+ user.grade_name +'">';
                                jQuery.each(allGrade, function (i, item)
                                {
                                    if (item.name == user.grade_name)
                                        modalHtml += '<option value="'+ item.name +'" selected>'+ item.name +'</option>';
                                    else
                                        modalHtml += '<option value="'+ item.name +'">'+ item.name +'</option>';
                                });
                                modalHtml += '</select>';
                            modalHtml += '</div>';
                        modalHtml += '</div>';
    
                        modalHtml += '<div style="margin-top: 8%;"></div>';
                    modalHtml += '</div>';
                    $("#modalFusillade").html(modalHtml);
                        modalHtml += '<div class="modal-footer">';
                            modalHtml += '<button type="button" id="submit-modal-admin" class="btn btn-primary">Sauvegarder les modifications</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
                        modalHtml += '</div>';
    
                    modalHtml += '</div></div>';
                    $("#modalFusillade").html(modalHtml);
    
                    $('#modalFusillade').modal({backdrop: 'static', keyboard: false});
                    
                    $("#submit-modal-admin").click(function(){
                        var data_fullname = $("#input-fullname").val();
                        var data_username = $("#input-username").val();
                        var data_grade = $("#select-grade").val();
                        var data_num = $("#input-num").val();
                        setModalWithDataAdmin(data_fullname, data_username, data_grade, username, data_num);
                    });
                }
            }
        });
    }
}

function getUserHour(username)
{
    if (username != '')
    {
        jQuery.ajax({
            url: "getUserHourData",
            type: "POST",
            data: { username: username},
            dataType: 'json',
            success: function (data) {
                if (data.code == 200)
                {
                    hour = data.data;

                    console.log(hour.totalHours[0].h);
                    
                    modalHtml = '';
                    modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';                
    
                    modalHtml += '<div class="modal-header">';
                    modalHtml += '<h4 class="modal-title">Nombre d\'heure de '+ username +'</h4>';
                        modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
                    modalHtml += '</div>';
    
                    modalHtml += '<div class="modal-body">';

                        modalHtml += '<div style="margin-top: 2%;"></div>';

                        modalHtml += '<div class="row">';
                            modalHtml += '<div class="col-md-3">';
                                modalHtml += '<div style="margin-left: 2%;" class="label-patient">Nombre d\'heure :</div>';
                            modalHtml += '</div>';
                            modalHtml += '<div class="col-md-6">';
                                modalHtml += '<div style="margin-top: 1px;" class="data-patient">'+ hour.totalHourWeek +'</div>';
                            modalHtml += '</div>';
                        modalHtml += '</div>';

                        modalHtml += '<div style="margin-top: 5%;"></div>';

                        modalHtml += '<div class="table-responsive-md">';
                            modalHtml += '<table id="myTable" class="table table-hover">';
                                modalHtml += '<thead>';
                                    modalHtml += '<tr>';
                                        modalHtml += '<th scope="col">Début du service</th>';
                                        modalHtml += '<th scope="col">Fin de service</th>';
                                        modalHtml += '<th scope="col">Durée</th>';
                                    modalHtml += '</tr>';
                                modalHtml += '</thead>';

                                modalHtml += '<tbody>';
                                    jQuery.each(hour.hourWeek, function (index, hour)
                                    {                                        
                                        modalHtml += '<tr id="'+ hour.id +'">';
                                            modalHtml += '<td style="transform: translateY(10%);">'+ hour.dateStart +'</td>';
                                            modalHtml += '<td style="transform: translateY(10%);">'+ hour.dateEnd +'</td>';
                                            modalHtml += '<td style="transform: translateY(10%);">'+ hour.totalHours[index].h; +'h'+ hour.totalHours[index].i; +'</td>';
                                        modalHtml += '</tr>';
                                    });
                                modalHtml += '</tbody>';
                            modalHtml += '</table>';
                        modalHtml += '</div>';
                    modalHtml += '</div>';
                    $("#modalFusillade").html(modalHtml);
    
                    modalHtml += '</div></div>';
                    $("#modalFusillade").html(modalHtml);
    
                    $('#modalFusillade').modal({backdrop: 'static', keyboard: false});
                    
                    $("#submit-modal-admin").click(function(){
                        var data_fullname = $("#input-fullname").val();
                        var data_username = $("#input-username").val();
                        var data_grade = $("#select-grade").val();
                        var data_num = $("#input-num").val();
                        setModalWithDataAdmin(data_fullname, data_username, data_grade, username, data_num);
                    });
                }
            }
        });
    }
}


function setModalWithDataAdmin(data_fullname, data_username, data_grade, oldUsername, data_num)
{

    jQuery.ajax({
        url: "setDataModalAdmin",
        data: {data_fullname: data_fullname, data_username: data_username, data_grade: data_grade, oldUsername: oldUsername, data_num: data_num},
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                $("#submit-modal-admin").html('');
                $(".modal-footer").html('<button type="button" id="submit-modal" class="btn btn-success"><i class="fas fa-check"></i> Sauvegarde réussie</button>');
            }
        }
    });
}


function getNameInTable() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#blah').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}
