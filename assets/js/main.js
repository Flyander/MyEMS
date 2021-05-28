
(function ($) {
	function handlePreloader() {
		if ($('.preloader').length) {
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}

	$(window).on('load', function () {
		handlePreloader();
		if('caches' in window){
			caches.keys().then((names) => {
				names.forEach(async (name) => {
					await caches.delete(name)
				})
			})

		}
	});
})(window.jQuery);



(function ($) {
	function handlePreloader() {
		if ($('.preloaderDark').length) {
			$('body').addClass('page-loaded');
			$('.preloaderDark').delay(1000).fadeOut(300);
		}
	}

	$(window).on('load', function () {
		handlePreloader();
	});
})(window.jQuery);

jQuery(function ($) {
	// Dropdown menu
	$('.sidebar-dropdown > a').click(function () {
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
	$('.toggle-sidebar').click(function () {
		$('.page-wrapper').toggleClass('toggled');
	});

	// bind hover if pinned is initially enabled
	if ($('.page-wrapper').hasClass('pinned')) {
		$('#sidebar').hover(
			function () {
				$('.page-wrapper').addClass('sidebar-hovered');
			},
			function () {
				$('.page-wrapper').removeClass('sidebar-hovered');
			}
		);
	}

	//Pin sidebar
	$('#pin-sidebar').click(function () {
		if ($('.page-wrapper').hasClass('pinned')) {
			// unpin sidebar when hovered
			$('.page-wrapper').removeClass('pinned');
			$('#sidebar').unbind('hover');
		} else {
			$('.page-wrapper').addClass('pinned');
			$('#sidebar').hover(
				function () {
					$('.page-wrapper').addClass('sidebar-hovered');
				},
				function () {
					$('.page-wrapper').removeClass('sidebar-hovered');
				}
			);
		}
	});

	//toggle sidebar overlay
	$('#overlay').click(function () {
		$('.page-wrapper').toggleClass('toggled');
	});

	//switch between themes
	var themes =
		'default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme';
	$('[data-theme]').click(function () {
		$('[data-theme]').removeClass('selected');
		$(this).addClass('selected');
		$('.page-wrapper').removeClass(themes);
		$('.page-wrapper').addClass($(this).attr('data-theme'));
	});

	// toggle border radius
	$('#toggle-border-radius').change(function (e) {
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

	$('.image-link').magnificPopup({type: 'image'});


	$("#submit-user").click(function () {
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

	$("#submit-spe").click(function () {
		var data_spe = $("#newSpe").val();

		addNewSpe(data_spe);
	});
	$("#submit-rdv").click(function () {
	var msg = $("#message").val();
	var mail = $("#mail").val();
	var type = $("#type").val();
	var phone = $("#num").val();
	var fullname = $("#fullname").val();
	if(msg !== "" && mail !== "" && type !=="" &&phone !=="" && fullname!=="")
	sendAppointment(fullname,phone,mail,msg,type);
	else{
		myhtml = '<div  class="col alert alert-danger" role="alert">\n' +
			' Merci de remplir tous les champs \n' +
			'</div>'
		$("#alerte").html(myhtml)
		let y;
		let i =0;
		setTimeout( function () {
			$("#alerte").html("")

		}, 5000 );
	}


	});
	$("#submit-rdvPanel").click(function () {
	var msg = $("#message").val();
	var mail = $("#mail").val();
	var type = $("#type").val();
	var phone = $("#num").val();
	var fullname = $("#fullname").val();
	var user = $("#idUser").val();
	if(msg !== "" && mail !== "" && type !=="" &&phone !=="" && fullname!=="" && user !=="")
	sendAppointmentPanel(fullname,phone,mail,msg,type,user);
	else{
		myhtml = '<div  class="col alert alert-danger" role="alert">\n' +
			' Merci de remplir tous les champs \n' +
			'</div>'
		$("#alerte").html(myhtml)
		let y;
		let i =0;
		setTimeout( function () {
			$("#alerte").html("")

		}, 5000 );
	}


	});
	$("#submit-delSpe").click(function () {
		var data_spe = $("#deleteUser-spe").val();
		var data_user = $("#userSpe").val();

		deleteSpeUser(data_spe,data_user);
	});
	$("#submit-addSpe").click(function () {
		var data_usrspe = $("#userSpe").val();
		var data_spe = $("#newUser-spe").val();
		addNewSpeUser(data_usrspe,data_spe);
	});

	$('#btnAddPicture').click(function () {
		$('#pictureBtn').trigger('click');
	});
	$("#submit-addRapportUser").click(function () {
		var user = $("#idUser").val();
		var date = $("#date_rapport").val();
		var msg = $("#rapportMessage").val();
		console.log(date)
		sendRapportIntern(user,date,msg);
	});
	$('#pictureBtn').change(function () {
		readURL(this);
	});

	$("#type-rdv").change(function() {
		var data_type_rdv = $("#type-rdv").val();
		if (data_type_rdv == 'administratif' || data_type_rdv == 'PPA' || data_type_rdv == 'VM' || data_type_rdv == 'cp' || data_type_rdv == 'cv' || data_type_rdv == 'cc' || data_type_rdv == 'co' || data_type_rdv == 'cch')
		{
			jQuery.ajax({
				url: "getSelectSpe",
				type: "POST",
				data: {type_rdv: data_type_rdv},
				dataType: 'json',
				success: function (data) {
					selectHtml = '';
					selectHtml += '<select id="idUser" name="heard_about_us_on" class="form-control" required>';
					selectHtml += '<option value="0"> Non assigné </option>';

					jQuery.each(data.collUserWithSpe, function (i, item) {
						console.log(item);
						selectHtml += '<option value="'+ item.id +'" >  ['+ item.gradeName +'] '+ item.fullname +' </option>';
					});

					selectHtml += '</select>';
					$('#idUser').html(selectHtml);
				}
			});
		}
		else
		{
			jQuery.ajax({
				url: "getSelectAllUser",
				type: "POST",
				data: {},
				dataType: 'json',
				success: function (data) {
					selectHtml = '';
					selectHtml += '<select id="idUser" name="heard_about_us_on" class="form-control" required>';
					selectHtml += '<option value="0"> Non assigné </option>';

					jQuery.each(data.collUser, function (i, item) {
						console.log(item);
						selectHtml += '<option value="'+ item.id +'" >  ['+ item.gradeName +'] '+ item.fullname +' </option>';
					});

					selectHtml += '</select>';
					$('#idUser').html(selectHtml);
				}
			});
		}
	});
});

function printHourFromWeek(id, dateSemaine, nbSemaine) {
	console.log(new Date(dateSemaine));
	val = new Date(dateSemaine)
	val2 = addDays(val, 6)
	val = val.toDateString()// updateStr(val)
	val2 = val2.toDateString() //updateStr(val2)
	jQuery.ajax({
		url: "printHourW",
		type: "POST",
		data: {id: id, dateStart: val, dateEnd: val2, nbSemaineTemp: nbSemaine},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				$('#tb').html(' ')
				$('#test').text("Total de vos heures : " + data.data.totalHourWeek)
				$('#btn-semaine').text("Semaine n°"+ nbSemaine);
				if (nbSemaine > 0)
					$('#btn-semaine-remove').html('<button id="btn-semaine-remove" type="button" class="btn btn-default" onclick=\'printHourFromWeek('+ id +', "'+ data.data.paramRemove + '", '+ (nbSemaine - 1) +')\'><i class="fas fa-chevron-left"></i></button>');
				if (nbSemaine < 52)
					$('#btn-semaine-add').html('<button id="btn-semaine-remove" type="button" class="btn btn-default" onclick=\'printHourFromWeek('+ id +', "'+ data.data.paramAdd + '", '+ (nbSemaine + 1) +')\'><i class="fas fa-chevron-right"></i></button>');
				console.log(data.data.hourWeek);
				// var link = data.totalHourWeek.text();
				// $("#hourstt").text("ok");
				table = '';
				jQuery.each(data.data.hourWeek, function (i, item) {
					table += '<tr>'
					table += '<td>' + item.dateStart + '</td>';
					table += '<td>' + item.dateEnd + '</td>';
					if (data.data.totalHours[i]['h'] > 9 && data.data.totalHours[i]['i'] > 9) {

						table += '<td>' + data.data.totalHours[i]['h'] + 'h ' + data.data.totalHours[i]['i'] + '</td>';

					}
					if (data.data.totalHours[i]['h'] > 9 && data.data.totalHours[i]['i'] <= 9) {

						table += '<td>' + data.data.totalHours[i]['h'] + ' h ' + '0' + data.data.totalHours[i]['i'] + '</td>';

					}
					if (data.data.totalHours[i]['h'] <= 9 && data.data.totalHours[i]['i'] <= 9) {
						table += '<td>' + '0' + data.data.totalHours[i]['h'] + ' h ' + '0' + data.data.totalHours[i]['i'] + '</td>';

					}
					if (data.data.totalHours[i]['h'] <= 9 && data.data.totalHours[i]['i'] > 9) {
						table += '<td>' + '0' + data.data.totalHours[i]['h'] + ' h ' + data.data.totalHours[i]['i'] + '</td>';

					}
					table += "<td> <a onclick=\"getHour('" + item.id + "')\" onclick=\"getHour('" + item.id + "')\"  class=\"btn btn-sm btn-outline-lightning rounded-0 mr-2\"><i class=\"far fa-edit\"></i></a> <a onclick=\"deleteHoursData('" + item.id + "')\"   class=\"btn btn-sm btn-outline-lightning rounded-0\"><i class=\"far fa-trash-alt\"></i></a> </td>";
					table += '</tr>'
				});
				$('#tb').html(table)
			}

		}
	});

}

function updateStr(val) {
	val = val.toLocaleString()
	val = val.replaceAll(':', '-')
	val = val.replaceAll('à', '')
	return val.split(' ')[0]
}

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}


function getSpeFromUser(id) {

	jQuery.ajax({
		url: "getSpe",
		type: "POST",
		data: {id: id},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				return data.data.spe;
			}
		}
	});
}

function getTableDispatch() {
	$('#tbody_dispatch').html('');
	jQuery.ajax({
		url: "getDispatch",
		type: "POST",
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				$('.icon').css({"display": "block"});
				table = '';
				if (data.data.onServiceName[0] != undefined) spe = data.data.onServiceName[0]['spe']
				jQuery.each(data.data.onServiceName, function (i, item) {
					//console.log(spe[0][1]['name'])
					if (data.data.isAdmin == 1)
						table += '<tr onclick="getOptionDispatch(\'' + item.username + '\', \'' + item.isSupervisor + '\')" id="' + item.username + '"">'; //onclick="getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')"
					else
						table += '<tr id="' + item.username + '"">';

					if (item.isSupervisor > 0){

					if(item.isSupervisor == 1) table += "<td style=\"color: orange; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-crown\"></i></td>";
					else table += "<td style=\"color: darkred; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-phone-alt\"></i></td>";

					}

					else
						table += "<td></td>";
					table += "<td>" + item.fullname + "</td>";
					table += "<td>" + item.gradeName + "</td>";
					table += "<td>" + item.num + "</td>";
					if (spe[0][0] == undefined)
						table += "<td>N/A</td>";
					else {
						let result = "";
						for (j = 0; j < spe[i].length; j++) {
							if (j == 0 && spe[i].length > 1)
								result += spe[i][j]['name'] + " | "
							else {
								if( j!= spe[i].length - 1){
									result += spe[i][j]['name'] + " | "

								}
								else{
									result += spe[i][j]['name']
								}
							}
						}
						if(result == ""){
							result = "N/A";
						}
						table += "<td>" + result + "</td>"

					}

					if (item.isAvailable == 1) {
						if (item.typeGrade == 1 && item.isPharmacieOpen == 1)
							table += "<td style = \"color: green;\"><i class=\"fad fa-pills\"></i> Pharmacie</td>";
						else if (item.typeGrade == 2)
							table += "<td style = \"color: #FF7500;\"><i class=\"fad fa-fire\"></i> Service LSFD</td>";
						else
							table += "<td style = \"color: green;\"><i class=\"fas fa-sync-alt fa-spin\"></i> En service</td>";
					} else if (item.isAvailable == 2)
						table += "<td style = \"color: lightskyblue ;\"><i class=\"fad fa-spinner-third\"></i> Service Spécialité </td>";

					table += '<td style = \"color: #1A9CC7;\">' + item.county + '</td>';

					table += '</tr>';
				});

				$('#tbody_dispatch').html(table);
				$('.icon').css({"display": "none"});
			}
		},
		complete: function () {
			setTimeout(getTableDispatch, 20000); //After completion of request, time to redo it after a second
		}
	});
}

function getOptionDispatch(id, isSupervisor) {
	$('#option_dispatch').html('');
	jQuery.ajax({
		url: "getOptionDispatch",
		type: "POST",
		data: {id: id, isSupervisor: isSupervisor},
		dataType: 'json',
		success: function (data) {
			player = data.data.playerInfo;
			optionHtml = '';
			optionHtml += "<div class=\"card-title mb-1 p-3\"><h5 class=\"titleLabelTheme smooth-background dark-label\">Option dispatch - " + player.fullname + "</h5></div><div class=\"card-body\">"
			optionHtml += "<div class=\"row\">";

			if (player.isAvailable == 0)
				optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-success w-100 rounded-0\" href='pds' onclick='getOptionDispatch(\''+ item.username +'\', \''+ item.isSupervisor +'\')' type=\"button\">Prise de service</a></div>";
			else {
				optionHtml += "<div class=\"col-md-4 mb-2\"><a class=\"btn btn-outline-danger w-100 rounded-0\" href='index' onclick='setService(\"" + id + "\", \"end\")' type=\"button\">Fin de service</a></div>";
			}

			optionHtml += "</div></div>";

			$('#option_dispatch').html(optionHtml);
		}
	});
}

function setService(username, action) {
	if (action = 'end') {
		jQuery.ajax({
			url: "endServiceOptionDispatch",
			type: "POST",
			data: {username: username},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
				}
			}
		});
	}
}
function sendRapportIntern(user, date , msg) {
	if (user && date && msg ) {
		jQuery.ajax({
			url: "addNewRapportIntern",
			type: "POST",
			data: {
				id_user: user,
				dateRapport : date,
				msgRapport : msg
			},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$('#footer-btn-rapportIntern').html('')
					$("#footer-btn-rapportIntern").html('<button type="button" id="submit-addRapportUser" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');

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
			if (data.code == 200) {
				jQuery.each(data.data.dataFusillade, function (i, bed) {
					if (bed.havePatient == 1)
						$("#" + bed.bed).addClass("inprogress");
					else
						$("#" + bed.bed).removeClass("inprogress");

				});

			}
		},
		complete: function () {
			setTimeout(getDataBed, 20000); //After completion of request, time to redo it after a second
		}
	});
}


function showModalWithData(id_bed) {
	jQuery.ajax({
		url: "getDataModalBed",
		type: "POST",
		data: {bed: id_bed},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				bed = data.data.dataBed;

				modalHtml = '';
				modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

				modalHtml += '<div class="modal-header">';
				modalHtml += '<h4 style="color: black;" class="modal-title">' + bed.bedLabel + '</h4>';
				modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
				modalHtml += '</div>';

				modalHtml += '<div class="modal-body">';
				modalHtml += '<div class="row">';
				modalHtml += '<div class="col-md-3">';
				modalHtml += '<div class="modalBed-label">Patient :</div>';
				modalHtml += '</div>';
				modalHtml += '<div class="col-md-9">';
				if (bed.isSupervisor == 1) {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-patient" value="' + bed.patient + '">';
				} else {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-patient" value="' + bed.patient + '" disabled>';
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
				if (bed.isSupervisor == 1) {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-medecin" value="' + bed.medecin + '">';
				} else {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-medecin" value="' + bed.medecin + '" disabled>';
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
				if (bed.isSupervisor == 1) {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-description" value="' + bed.description + '">';
				} else {
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-description" value="' + bed.description + '" disabled>';
				}
				modalHtml += '</div>';
				modalHtml += '</div>';

				modalHtml += '<div style="margin-top: 6%;"></div>';

				modalHtml += '<div class="row">';
				modalHtml += '<div class="col-md-4">';
				modalHtml += '<div class="modalBed-label-state">État du patient :</div>';
				modalHtml += '</div>';
				modalHtml += '<div class="col-md-8">';
				if (bed.isSupervisor == 0) {
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
				} else {
					modalHtml += '<div style="margin-top: 5%;">';
					modalHtml += '<select class="form-control" id="select-etat"><option>État Stable</option><option>État Instable</option><option>État Critique</option></select>'
					modalHtml += '</div>';
				}
				modalHtml += '</div>';
				modalHtml += '</div>';

				modalHtml += '<div style="margin-top: 8%;"></div>';
				modalHtml += '</div>';
				$("#modalFusillade").html(modalHtml);
				if (bed.isSupervisor == 1) {
					modalHtml += '<div class="modal-footer">';
					modalHtml += '<button type="button" id="submit-modal" class="btn btn-primary">Sauvegarder les modifications</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
					modalHtml += '</div>';
				}

				modalHtml += '</div></div>';
				$("#modalFusillade").html(modalHtml);

				$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

				$("#submit-modal").click(function () {
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

function setModalWithData(id_bed, data_patient, data_medecin, data_desc, data_etat) {
	jQuery.ajax({
		url: "setDataModalBed",
		data: {
			id_bed: id_bed,
			data_patient: data_patient,
			data_medecin: data_medecin,
			data_desc: data_desc,
			data_etat: data_etat
		},
		type: "POST",
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				$("#submit-modal").html('');
				$(".modal-footer").html('<button type="button" id="submit-modal" class="btn btn-success"><i class="fas fa-check"></i> Sauvegarde réussie</button>');
			}
		}
	});
}


function addNewUser(data_prenom, data_nom, data_grade, data_mdp, data_isAdmin, data_num) {
	if (data_prenom != '' && data_nom != '' && data_grade != '' && data_mdp != '') {
		jQuery.ajax({
			url: "addNewUserInDB",
			data: {
				data_prenom: data_prenom,
				data_nom: data_nom,
				data_grade: data_grade,
				data_mdp: data_mdp,
				data_isAdmin: data_isAdmin,
				data_num: data_num
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-user").html('');
					$("#footer-btn-user").html('<button type="button" id="submit-user" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
				}
			}
		});
	} else {
		alert('Il manque des informations');
	}
}
function addNewSpe(data_spe) {
	if (data_spe != '' ) {
		jQuery.ajax({
			url: "addNewSpeInDB",
			data: {
				data_spe: data_spe
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-spe").html('');
					$("#footer-btn-spe").html('<button type="button" id="submit-spe" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
				}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
	} else {
		alert('Il manque des informations');
	}
}
function validateAppointment(idRdv, fullname , idUser){
	modalHtml = '';
	modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

	modalHtml += '<div class="modal-header">';
	modalHtml += '<h4 style="color: black;" class="modal-title">Validation  de Rendez-vous </h4>';
	modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
	modalHtml += '</div>';

	modalHtml += '<div class="modal-body">';
	modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir valider le rendez-vous de ' + fullname  + ' ?</div>';
	modalHtml += '<div style="margin-top: 5%;"></div>';
	modalHtml += '</div>';

	$("#modalFusillade").html(modalHtml);
	modalHtml += '<div class="modal-footer">';
	modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
	modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
	modalHtml += '</div>';
	modalHtml += '</div></div>';
	$("#modalFusillade").html(modalHtml);

	$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

	$("#submit-modal-yes").click(function () {
		jQuery.ajax({
			url: "ValidateAppointment",
			data: {
				idRdv : idRdv,
				idUser : idUser,
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$('#modalFusillade').modal('hide');
					location.reload()
				}

			}
		});
	});
	$("#submit-modal-no").click(function () {
		$('#modalFusillade').modal('hide');
	});
}
function leaveAppointment(idRdv, fullname , idUser){
	modalHtml = '';
	modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

	modalHtml += '<div class="modal-header">';
	modalHtml += '<h4 style="color: black;" class="modal-title">Validation  de Rendez-vous </h4>';
	modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
	modalHtml += '</div>';

	modalHtml += '<div class="modal-body">';
	modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir remettre en attente le rendez-vous de ' + fullname  + ' ?</div>';
	modalHtml += '<div style="margin-top: 5%;"></div>';
	modalHtml += '</div>';

	$("#modalFusillade").html(modalHtml);
	modalHtml += '<div class="modal-footer">';
	modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
	modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
	modalHtml += '</div>';
	modalHtml += '</div></div>';
	$("#modalFusillade").html(modalHtml);

	$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

	$("#submit-modal-yes").click(function () {
		jQuery.ajax({
			url: "leaveAppointment",
			data: {
				idRdv : idRdv,
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$('#modalFusillade').modal('hide');
					location.reload()
				}

			}
		});
	});
	$("#submit-modal-no").click(function () {
		$('#modalFusillade').modal('hide');
	});
}
function takeAppointment(idRdv,fullname, idUser){
	modalHtml = '';
	modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

	modalHtml += '<div class="modal-header">';
	modalHtml += '<h4 style="color: black;" class="modal-title">Prise de Rendez-vous </h4>';
	modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
	modalHtml += '</div>';

	modalHtml += '<div class="modal-body">';
	modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir prendre en charge le rendez-vous de ' + fullname  + ' ?</div>';
	modalHtml += '<div style="margin-top: 5%;"></div>';
	modalHtml += '</div>';

	$("#modalFusillade").html(modalHtml);
	modalHtml += '<div class="modal-footer">';
	modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
	modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
	modalHtml += '</div>';
	modalHtml += '</div></div>';
	$("#modalFusillade").html(modalHtml);

	$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

	$("#submit-modal-yes").click(function () {
		jQuery.ajax({
			url: "takeAppointment",
			data: {
				idRdv : idRdv,
				idUser : idUser
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$('#modalFusillade').modal('hide');
					location.reload()
				}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
	});
	$("#submit-modal-no").click(function () {
		$('#modalFusillade').modal('hide');
	});
}
function deleteAppointment(id,fullname){
	modalHtml = '';
	modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

	modalHtml += '<div class="modal-header">';
	modalHtml += '<h4 style="color: black;" class="modal-title">Suppression de Rendez-vous </h4>';
	modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
	modalHtml += '</div>';

	modalHtml += '<div class="modal-body">';
	modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir archiver le rendez-vous de ' + fullname  + ' ?</div>';
	modalHtml += '<div style="margin-top: 5%;"></div>';
	modalHtml += '</div>';

	$("#modalFusillade").html(modalHtml);
	modalHtml += '<div class="modal-footer">';
	modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
	modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
	modalHtml += '</div>';
	modalHtml += '</div></div>';
	$("#modalFusillade").html(modalHtml);

	$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

	$("#submit-modal-yes").click(function () {
		jQuery.ajax({
			url: "delAppointment",
			data: {
				id : id
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$('#modalFusillade').modal('hide');
					location.reload()
					}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
	});
	$("#submit-modal-no").click(function () {
		$('#modalFusillade').modal('hide');
	});
}
function sendAppointment(fullname,num,mail,msg,reason) {

	jQuery.ajax({
			url: "addAppointment",
			data: {
				fullname: fullname,
				phone : num,
				mail : mail,
				msg : msg,
				reason : reason
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-rdv").html('');
					$("#footer-btn-rdv").html('<button type="button" id="submit-rdv" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
				}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
}
function sendAppointmentPanel(fullname,num,mail,msg,reason,user) {

	jQuery.ajax({
			url: "addAppointmentPanel",
			data: {
				fullname: fullname,
				phone : num,
				mail : mail,
				msg : msg,
				reason : reason,
				id:user
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-rdv").html('');
					$("#footer-btn-rdv").html('<button type="button" id="submit-rdv" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
				}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
}
function addNewSpeUser(data_user,data_spe) {
	if (data_spe != '' && data_user != '' ) {
		jQuery.ajax({
			url: "addSpeUser",
			data: {
				data_spe: data_spe,
				data_user: data_user
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-spe").html('');
					$("#footer-btn-addspe").html('<button type="button" id="submit-spe" class="btn btn-success right"><i class="fas fa-check"></i> Ajout réussie</button>');
					location.reload();

				}
				else{
					console.log("test")
					alert("La spécialité existe déjà")
				}
			}
		});
	} else {
		alert('Il manque des informations');
	}
}
function deleteSpeUser(data_user,data_spe) {
	if (data_spe != '' && data_user != '' ) {
		jQuery.ajax({
			url: "deleteSpeFromUser",
			data: {
				spe: data_spe,
				id: data_user
			},
			type: "POST",
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					$("#submit-delSpe").html('');
					$("#footer-btn-delspe").html('<button type="button" id="submit-spe" class="btn btn-success right"><i class="fas fa-check"></i> Suppression réussie</button>');
					location.reload();
				}
				else{
					console.log("test")
				}
			}
		});
	} else {
		alert('Il manque des informations');
	}
}

function deleteUserData(username) {
	if (username != '') {
		modalHtml = '';
		modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 style="color: black;" class="modal-title">Suppression de compte</h4>';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
		modalHtml += '</div>';

		modalHtml += '<div class="modal-body">';
		modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir supprimer le compte de ' + username + ' ?</div>';
		modalHtml += '<div style="margin-top: 5%;"></div>';
		modalHtml += '</div>';

		$("#modalFusillade").html(modalHtml);
		modalHtml += '<div class="modal-footer">';
		modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
		modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
		modalHtml += '</div>';

		modalHtml += '</div></div>';
		$("#modalFusillade").html(modalHtml);

		$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

		$("#submit-modal-yes").click(function () {
			jQuery.ajax({
				url: "deleteUserInDB",
				data: {username: username},
				type: "POST",
				dataType: 'json',
				success: function (data) {
					if (data.code == 200) {
						$('#modalFusillade').modal('hide');
						location.reload();
					}
				}
			});
		});
		$("#submit-modal-no").click(function () {
			$('#modalFusillade').modal('hide');
		});
	}
}
function  deleteSpeData(spename) {
	if (spename != '') {
		modalHtml = '';
		modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 style="color: black;" class="modal-title">Suppression de la spécialité </h4>';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
		modalHtml += '</div>';

		modalHtml += '<div class="modal-body">';
		modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir supprimer la specialité ' + spename + ' ?</div>';
		modalHtml += '<div style="margin-top: 5%;"></div>';
		modalHtml += '</div>';

		$("#modalFusillade").html(modalHtml);
		modalHtml += '<div class="modal-footer">';
		modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
		modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
		modalHtml += '</div>';

		modalHtml += '</div></div>';
		$("#modalFusillade").html(modalHtml);

		$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

		$("#submit-modal-yes").click(function () {
			jQuery.ajax({
				url: "deleteSpeInDB",
				data: {spe: spename},
				type: "POST",
				dataType: 'json',
				success: function (data) {
					if (data.code == 200) {
						$('#modalFusillade').modal('hide');
						location.reload();
					}
				}
			});
		});
		$("#submit-modal-no").click(function () {
			$('#modalFusillade').modal('hide');
		});
	}
}
function loadUserSpe(){
	id = $("#userSpe").val()
	jQuery.ajax({
		url: "getSpeUser",
		data: {id: id},
		type: "POST",
		dataType: 'json',
		success: function (data) {
			console.log(data)
			if (data.code == 200) {
				select =""
				$("#deleteUser-spe").html('');
				jQuery.each(data.data.allSpeUser, function (i, item) {
				select += '<option value="'+item.name+'">'+ item.name + '</option>'

				});
				$("#deleteUser-spe").html(select);
			}
		}
	});
}

function  deleteSpeData(spename) {
	if (spename != '') {
		modalHtml = '';
		modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 style="color: black;" class="modal-title">Suppression de la spécialité </h4>';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
		modalHtml += '</div>';

		modalHtml += '<div class="modal-body">';
		modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir supprimer la specialité ' + spename + ' ?</div>';
		modalHtml += '<div style="margin-top: 5%;"></div>';
		modalHtml += '</div>';

		$("#modalFusillade").html(modalHtml);
		modalHtml += '<div class="modal-footer">';
		modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
		modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
		modalHtml += '</div>';

		modalHtml += '</div></div>';
		$("#modalFusillade").html(modalHtml);

		$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

		$("#submit-modal-yes").click(function () {
			jQuery.ajax({
				url: "deleteSpeInDB",
				data: {spe: spename},
				type: "POST",
				dataType: 'json',
				success: function (data) {
					if (data.code == 200) {
						$('#modalFusillade').modal('hide');
						location.reload();
					}
				}
			});
		});
		$("#submit-modal-no").click(function () {
			$('#modalFusillade').modal('hide');
		});
	}
}

function deleteHoursData(id) {
	if (id != '') {
		modalHtml = '';
		modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

		modalHtml += '<div class="modal-header">';
		modalHtml += '<h4 style="color: black;" class="modal-title">Suppression de compte</h4>';
		modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
		modalHtml += '</div>';

		modalHtml += '<div class="modal-body">';
		modalHtml += '<div class="modalBed-label">Êtes vous sur de vouloir supprimer l\' heure numéro ' + id + ' ?</div>';
		modalHtml += '<div style="margin-top: 5%;"></div>';
		modalHtml += '</div>';

		$("#modalFusillade").html(modalHtml);
		modalHtml += '<div class="modal-footer">';
		modalHtml += '<button type="button" id="submit-modal-yes" class="btn btn-success">Oui</button>';
		modalHtml += '<button type="button" id="submit-modal-no" class="btn btn-danger">Annulé</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
		modalHtml += '</div>';

		modalHtml += '</div></div>';
		$("#modalFusillade").html(modalHtml);

		$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

		$("#submit-modal-yes").click(function () {
			jQuery.ajax({
				url: "deleteHoursInDB",
				data: {id: id},
				type: "POST",
				dataType: 'json',
				success: function (data) {
					if (data.code == 200) {
						$('#modalFusillade').modal('hide');
						location.reload();
					}
				}
			});
		});
		$("#submit-modal-no").click(function () {
			$('#modalFusillade').modal('hide');
		});
	}
}

function updateUserData(username) {
	if (username != '') {
		jQuery.ajax({
			url: "getUserData",
			type: "POST",
			data: {username: username},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					user = data.data.dataAccount;
					allGrade = data.data.collGrade;

					modalHtml = '';
					modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

					modalHtml += '<div class="modal-header">';
					modalHtml += '<h4 style="color: black;" class="modal-title">' + user.fullname + '</h4>';
					modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
					modalHtml += '</div>';

					modalHtml += '<div class="modal-body">';
					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label">Prénom et Nom RP :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<input style="margin-top: 5%;" type="text" class="form-control" id="input-fullname" value="' + user.fullname + '">';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div style="margin-top: 6%;"></div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label">Username :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<input style="margin-top: 2%;" type="text" class="form-control" id="input-username" value="' + user.username + '">';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div style="margin-top: 6%;"></div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label">Numéro de téléphone :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<input style="margin-top: 5%;" type="text" class="form-control" id="input-num" value="' + user.num + '">';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div style="margin-top: 6%;"></div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label">Grade :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<select style="margin-top: 2%;" type="text" class="form-control" id="select-grade" value="' + user.grade_name + '">';
					jQuery.each(allGrade, function (i, item) {
						if (item.name == user.grade_name)
							modalHtml += '<option value="' + item.name + '" selected>' + item.name + '</option>';
						else
							modalHtml += '<option value="' + item.name + '">' + item.name + '</option>';
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

					$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

					$("#submit-modal-admin").click(function () {
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

function getHour(id) {
	if (id != '') {
		jQuery.ajax({
			url: "getHourData",
			type: "POST",
			data: {id: id},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					hour = data.data;
					var date = new Date(hour.dateEnd["dateEnd"])
					var dateEnd = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() + " à " + ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())));
					var dateEndInput = (date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + "T" + ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())));
					var date = new Date(hour.dateStart["dateStart"])
					var dateStart = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() + " à " + ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())));
					var dateStartInput = (date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + "T" + ((date.getHours() > 9) ? date.getHours() : ('0' + date.getHours())) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : ('0' + date.getMinutes())));

					modalHtml = '';
					modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

					modalHtml += '<div class="modal-header">';
					modalHtml += '<h4 style="color: black;" class="modal-title"> Heure du ' + dateStart + ' au ' + dateEnd + '</h4>';
					modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
					modalHtml += '</div>';

					modalHtml += '<div class="modal-body">';

					modalHtml += '<div style="margin-top: 2%;"></div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div style="margin-left: 2%;" class="label-patient">Modification :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-6">';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div style="margin-top: 5%;"></div>';
					modalHtml += '<input type="hidden" id="input_id"  value="' + id + '"> </>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label" style="font-size: 18px;">Prise de service :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<input style="margin-top: 2%;" type="datetime-local" class="form-control" id="input-start" value="' + dateStartInput + '">';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div class="modalBed-label" style="font-size: 18px;margin-top: 18%;"> Fin de service :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-9">';
					modalHtml += '<input style="margin-top: 5%;" type="datetime-local" class="form-control" id="input-end" value="' + dateEndInput + '">';
					modalHtml += '</div>';
					modalHtml += '</div>';


					$("#modalFusillade").html(modalHtml);
					modalHtml += '<div class="modal-footer">';
					modalHtml += '<button type="button" id="submit-modal-hours" class="btn btn-primary">Sauvegarder les modifications</button>'; //onclick="setModalWithData(\''+ bed.bed +'\', \''+  +'\', \''+ $("#input-medecin").val() +'\', \''+ $("#input-description").val() +'\', \''+ $("#select-etat").val() +'\')"
					modalHtml += '</div>';

					modalHtml += '</div></div>';
					$("#modalFusillade").html(modalHtml);

					$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

					$("#submit-modal-hours").click(function () {
						var data_start = $("#input-start").val();
						var data_end = $("#input-end").val();
						var id = $("#input_id").val();

						setModalWithDataHours(id, data_start, data_end);
					});


				}
			}
		});
	}
}

function setModalWithDataHours(id, data_start, data_end) {
	jQuery.ajax({
		url: "setDataModalHours",
		data: {id: id, data_start: data_start, data_end: data_end},
		type: "POST",
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				$("#submit-modal-hours").html('');
				$(".modal-footer").html('<button type="button" id="submit-modal" class="btn btn-success"><i class="fas fa-check"></i> Sauvegarde réussie</button>');
				$('#modalFusillade').modal('hide');
				location.reload();


			}
		}
	});
}

function getUserHour(username) {
	if (username != '') {
		jQuery.ajax({
			url: "getUserHourData",
			type: "POST",
			data: {username: username},
			dataType: 'json',
			success: function (data) {
				if (data.code == 200) {
					hour = data.data;
					modalHtml = '';
					modalHtml += '<div class="modal-dialog modal-lg modal-info"><div class="modal-content">';

					modalHtml += '<div class="modal-header">';
					modalHtml += '<h4 style="color: black;" class="modal-title">Nombre d\'heure de ' + hour.data_fullname + '</h4>';
					modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>';
					modalHtml += '</div>';

					modalHtml += '<div class="modal-body">';

					modalHtml += '<div style="margin-top: 2%;"></div>';

					modalHtml += '<div class="row">';
					modalHtml += '<div class="col-md-3">';
					modalHtml += '<div style="margin-left: 2%;" class="label-patient">Nombre d\'heure :</div>';
					modalHtml += '</div>';
					modalHtml += '<div class="col-md-6">';
					modalHtml += '<div style="margin-top: 1px;" class="data-patient">' + hour.totalHourWeek + '</div>';
					modalHtml += '</div>';
					modalHtml += '</div>';

					modalHtml += '<div style="margin-top: 5%;"></div>';

					modalHtml += '<div class="table-responsive-md">';
					modalHtml += '<table id="myTable" class="table table-hover">';
					modalHtml += '<thead>';
					modalHtml += '<tr style="color: black;">';
					modalHtml += '<th scope="col">Début du service</th>';
					modalHtml += '<th scope="col">Fin de service</th>';
					modalHtml += '<th scope="col">Durée</th>';
					modalHtml += '</tr>';
					modalHtml += '</thead>';

					modalHtml += '<tbody style="color: black;">';
					jQuery.each(hour.hourWeek, function (index, item) {
						if (hour.totalHours[index].h < 10)
							heure = '0' + hour.totalHours[index].h;
						else
							heure = hour.totalHours[index].h;

						if (hour.totalHours[index].i < 10)
							minute = '0' + hour.totalHours[index].i;
						else
							minute = hour.totalHours[index].i;

						modalHtml += '<tr id="' + item.id + '">';
						modalHtml += '<td style="transform: translateY(10%);">' + item.dateStart + '</td>';
						modalHtml += '<td style="transform: translateY(10%);">' + item.dateEnd + '</td>';
						modalHtml += '<td style="transform: translateY(10%);">' + heure + ' h ' + minute + '</td>';
						modalHtml += '<td>  </td> '
						modalHtml += '</tr>';
					});
					modalHtml += '</tbody>';
					modalHtml += '</table>';
					modalHtml += '</div>';
					modalHtml += '</div>';
					$("#modalFusillade").html(modalHtml);
					modalHtml += '</div></div>';
					$("#modalFusillade").html(modalHtml);

					$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

					$("#submit-modal-admin").click(function () {
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


function setModalWithDataAdmin(data_fullname, data_username, data_grade, oldUsername, data_num) {

	jQuery.ajax({
		url: "setDataModalAdmin",
		data: {
			data_fullname: data_fullname,
			data_username: data_username,
			data_grade: data_grade,
			oldUsername: oldUsername,
			data_num: data_num
		},
		type: "POST",
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
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

		reader.onload = function (e) {
			$('#blah').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]); // convert to base64 string
	}
}

var test = false;

function toggleDarkMode(theme) {
	if (theme == 'dark' && test == false) {
		$('.background-theme').addClass('dark-background');
		$('.card').addClass('dark-card');
		$('.titleLabelTheme').addClass('dark-label');
		$('.table').addClass('table-dark');
		$('#myInput').addClass('dark-input')
		test = true
	} else {
		$('.background-theme').removeClass('dark-background');
		$('.card').removeClass('dark-card');
		$('.titleLabelTheme').removeClass('dark-label');
		$('.table').removeClass('table-dark');
		$('#myInput').removeClass('dark-input')
		test = false
	}
}

function changeTheme(theme) {
	jQuery.ajax({
		url: "changeStateTheme",
		type: "POST",
		data: {theme: theme},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				if (data.newTheme == 'dark' && test == false) {
					$('.background-theme').addClass('dark-background');
					$('.card').addClass('dark-card');
					$('.titleLabelTheme').addClass('dark-label');
					$('.table').addClass('table-dark');
					$('#myInput').addClass('dark-input')
					test = true
				} else {
					$('.background-theme').removeClass('dark-background');
					$('.card').removeClass('dark-card');
					$('.titleLabelTheme').removeClass('dark-label');
					$('.table').removeClass('table-dark');
					$('#myInput').removeClass('dark-input')
					test = false
				}
			}
		}
	});
}


function modalDataPatient(theme) {
	jQuery.ajax({
		url: "getAllPatientList",
		type: "POST",
		data: {},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				var allPatient = data.data.collPatient;
				var allPatientName = [];

				jQuery.each(allPatient, function (i, item) {
					allPatientName.push(item.fullname)
				});


				modalHtml = '';
				modalHtml += '<div class="modal-dialog modal-xl"><div class="modal-content">';

				modalHtml += '<div class="modal-body">';
					modalHtml += '<input class="input-modal" id="listOfPatient"/>';
					modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="titleLabelTheme">&times;</span></button>';
				modalHtml += '</div>';


				modalHtml += '</div></div>';
				$("#modalFusillade").html(modalHtml);

				

				$('#modalFusillade').modal({backdrop: 'static', keyboard: true});
				
				

				if (theme == 'light') {
					$('.modal-content').removeClass('dark-card');
					$('.input-modal').removeClass('dark-input')
					$('.titleLabelTheme').removeClass('dark-label');
				}
				else {
					$('.modal-content').addClass('dark-card');
					$('.input-modal').addClass('dark-input')
					$('.titleLabelTheme').addClass('dark-label');
				}

				
				autocomplete(document.getElementById("listOfPatient"), allPatientName);
				

				$("#submit-modal-admin").click(function () {
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

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
