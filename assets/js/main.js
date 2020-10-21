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
                    if (item.isAdmin == 1)
                        table += '<tr onclick="getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')" id="'+ item.username +'"">'; //onclick="getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')"
                    else
                        table += '<tr id="'+ item.username +'"">';

                    if (item.isSupervisor == 1)
                        table += "<td style=\"color: orange; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-crown\"></i></td>";
                    else
                        table += "<td></td>";

                    table += "<td>"+ item.fullname +"</td>";
                    table += "<td>"+ item.gradeName +"</td>";
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

            console.log(data);

            if (player.isAvailable == 0)
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-success w-100 rounded-0\" href='pds' onclick='getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')' type=\"button\">Prise de service</a></div>";
            else
            {
                /*if (player.isAvailable == 1)
                    //optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-warning w-100 rounded-0\" href='pauseService' type=\"button\">Faire une pause</a></div>";
                else
                    optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-success w-100 rounded-0\" href='finPauseService' type=\"button\">Reprendre le service</a></div>";
                */
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-danger w-100 rounded-0\" href='index' onclick='setService(\""+ id +"\", \"end\")' type=\"button\">Fin de service</a></div>";
            }

           /* if (player.isAvailable != 0 && data.data.isYourself == 1) {
                if (player.isSupervisor == 0)
                {
                    optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-info w-100 rounded-0\" href='supervisor' type=\"button\">Devenir superviseur</a></div>";
                }
                
                if (player.isSupervisor == 1)
                {
                    optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-info w-100 rounded-0\" href='endSupervisor' type=\"button\">Stop superviseur</a></div>";
                }
            }

            if (player.county == 'BC')
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-purple w-100 rounded-0\" href='setCounty' type=\"button\">Prendre son service sur Los Santos</a></div>";
            else if (player.county == 'LS')
                optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-purple w-100 rounded-0\" href='setCounty' type=\"button\">Prendre son service sur Blaine County</a></div>";
            */
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