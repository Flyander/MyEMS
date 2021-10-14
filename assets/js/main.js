
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

	var currentMousePos = { x: -1, y: -1 };
	$(window).mousemove(function(e) {
		currentMousePos.x = e.pageX / 2;
		currentMousePos.y = e.pageY;
		$('#tipanatomy').css({left:currentMousePos.x, top:currentMousePos.y})
	})

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
				if (data.code === 200) {
					console.log("ici")

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

darkMode = false;
bigTheme = 'light';

function toggleDarkMode(theme) {
	if (theme == 'dark' && darkMode == false) {
		$('.background-theme').addClass('dark-background');
		$('.card').addClass('dark-card');
		$('.titleLabelTheme').addClass('dark-label');
		$('.table').addClass('table-dark');
		$('#myInput').addClass('dark-input');
		$('.input-theme').addClass('dark-input');
		$('.modal-content').addClass('dark-card');
		$('.input-modal').addClass('dark-input');

		$('.titleLabelTheme').addClass('dark-label');
		bigTheme = 'light';
		darkMode = true
	} else {
		$('.background-theme').removeClass('dark-background');
		$('.card').removeClass('dark-card');
		$('.titleLabelTheme').removeClass('dark-label');
		$('.table').removeClass('table-dark');
		$('#myInput').removeClass('dark-input')
		$('.modal-content').removeClass('dark-card');
		$('.input-modal').removeClass('dark-input');
		$('.input-theme').removeClass('dark-input');
		$('.titleLabelTheme').removeClass('dark-label');
		bigTheme = 'dark';
		darkMode = false
	}

	sideBarHtml = '';
	sideBarHtml += '<div>';
		sideBarHtml += '<a onclick="changeTheme(\''+ theme +'\')">';
			if (theme == 'light') 
				sideBarHtml += '<i class="far fa-moon"></i>';
			else
				sideBarHtml += '<i class="fal fa-sun"></i>'
		sideBarHtml +='</a>'
	sideBarHtml += '</div>';
	$('.sidebar-footer').html(sideBarHtml);
}

function changeTheme(theme) {
	jQuery.ajax({
		url: "changeStateTheme",
		type: "POST",
		data: {theme: theme},
		dataType: 'json',
		success: function (data) {
			if (data.code == 200) {
				if (data.newTheme == 'dark' && darkMode == false) {
					$('.background-theme').addClass('dark-background');
					$('.card').addClass('dark-card');
					$('.titleLabelTheme').addClass('dark-label');
					$('.table').addClass('table-dark');
					$('#myInput').addClass('dark-input')
					$('.input-theme').addClass('dark-input');
					$('.modal-content').addClass('dark-card');
					$('.input-modal').addClass('dark-input');
					$('.titleLabelTheme').addClass('dark-label');
					darkMode = true
				} else {
					$('.background-theme').removeClass('dark-background');
					$('.card').removeClass('dark-card');
					$('.titleLabelTheme').removeClass('dark-label');
					$('.table').removeClass('table-dark');
					$('#myInput').removeClass('dark-input');
					$('.input-theme').removeClass('dark-input');
					$('.modal-content').removeClass('dark-card');
					$('.input-modal').removeClass('dark-input');
					$('.titleLabelTheme').removeClass('dark-label');
					darkMode = false
				}
				sideBarHtml = '';
				sideBarHtml += '<div>';
					sideBarHtml += '<a onclick="changeTheme(\''+ data.newTheme +'\')">';
						if (data.newTheme == 'light') 
							sideBarHtml += '<i class="far fa-moon"></i>';
						else
							sideBarHtml += '<i class="fal fa-sun"></i>'
					sideBarHtml +='</a>'
				sideBarHtml += '</div>';


				$('.sidebar-footer').html(sideBarHtml);
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
				modalBodyHtml = '';
				modalHtml += '<div class="modal-dialog modal-xl"><div class="modal-content">';


				modalHtml += '<div class="modal-body" id="modalBody">';
					modalHtml += '<div class="autocomplete"><input class="input-modal" id="listOfPatient"/></div>';
					modalHtml += '<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="titleLabelTheme">&times;</span></button>';
				modalHtml += '</div>';


				modalHtml += '</div></div>';
				$("#modalFusillade").html(modalHtml);

				

				$('#modalFusillade').modal({backdrop: 'static', keyboard: true});


				modalBodyHtml += '<div class="autocomplete"><input class="input-modal" id="listOfPatient"/></div>';
				modalBodyHtml += '<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="titleLabelTheme">&times;</span></button>';
					
				

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

				
				autocomplete(document.getElementById("listOfPatient"), allPatientName, theme);
			}
		}
	});
}

function autocomplete(inp, arr, theme) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
	  nbElemDisplay = 0;
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
			if (arr[i].toUpperCase().indexOf(val.toUpperCase()) > -1 && nbElemDisplay < 4) {
				/*create a DIV element for each matching element:*/
				nbElemDisplay++;
				b = document.createElement("DIV");
				/*make the matching letters bold:*/
				check = false
				for (j = 0; j < arr[i].length; j++) {
					for (idx = 0; idx < val.length; idx++)
					{
						if (arr[i][j].toUpperCase() == val[idx].toUpperCase())
						{
							b.innerHTML += "<strong>" + arr[i][j] + "</strong>";
							check = true
							break;
						}
					}
					if (check == false) 
						b.innerHTML += arr[i][j];
					else
						check = false;
					
				}
				//b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				//b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
					b.addEventListener("click", function(e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName("input")[0].value;
					/*close the list of autocompleted values,
					(or any other open lists of autocompleted values:*/
					onInputChangePatient(inp.value, arr, theme)
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

function onInputChangePatient(patient, allPatientName, theme)
{
	jQuery.ajax({
		url: "getDataPatient",
		type: "POST",
		async: false,
		data: {patient: patient},
		dataType: 'json',
		beforeSend: function (data) {
			var shimmerHtml = modalBodyHtml
			shimmerHtml += createSkeleton()

			$("#modalBody").html(shimmerHtml);
		},
		success: function (data) {
			if (data.code == 200) {
				dataPatient = data.data.patient;
				var dobSplit = dataPatient.dob.split("/");
				var dateDob = new Date(dobSplit[2], dobSplit[1], dobSplit[0]);
				
				var diff = Date.now() - dateDob.getTime();
				var age = new Date(diff)
				age = Math.abs(age.getUTCFullYear() - 1970);

				newModalBodyHtml = modalBodyHtml
				newModalBodyHtml = researchPatientHtml(dataPatient, newModalBodyHtml, age)

				
				setTimeout(function(){
					$("#start-skeleton").addClass('fade-out-effect')
				}, 1000);

				$("#modalBody").html(newModalBodyHtml);
				$('#listOfPatient').val(patient);

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

				autocomplete(document.getElementById("listOfPatient"), allPatientName, theme);
			}
		}
	});
}

function newRapportPatientModal(theme, baseUrl)
{
	
	var newBodyHumanHtml = ''
	modalHtml = '';
	modalBodyHtml = '';
	modalHtml += '<div class="modal-dialog modal-xl"><div class="modal-content">';


	modalHtml += '<div class="modal-body" id="modalBody">';
		modalHtml += createModalBodyHTML(baseUrl)
		modalHtml += '<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="titleLabelTheme">&times;</span></button>';
	modalHtml += '</div>';


	modalHtml += '</div></div>';
	$("#modalFusillade").html(modalHtml);

	$('#modalFusillade').modal({backdrop: 'static', keyboard: true});

	addEventSVGAnatomy()

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
}


function createSkeleton(){
	var skeletonHTML = ''
	skeletonHTML += '<div class="patient-card ph-item" id="start-skeleton">'
		skeletonHTML += '<div class="patient-item">';
			skeletonHTML += '<div class="ph-avatar ph-border-rect"></div>';
			
			skeletonHTML += '<div class="ph-row ph-gap">';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
			skeletonHTML += '</div>';
		skeletonHTML += '</div>';

		skeletonHTML += '<div class="patient-item">'
			skeletonHTML += '<div class="ph-row">';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
			skeletonHTML += '</div>';
		skeletonHTML += '</div>';

		skeletonHTML += '<div class="patient-item">'
			skeletonHTML += '<div class="ph-row">';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
				skeletonHTML += '<div class="ph-col-12 big"></div>';
			skeletonHTML += '</div>';
		skeletonHTML += '</div>';
	skeletonHTML += '</div>';
	
	return skeletonHTML;
}


function researchPatientHtml(dataPatient, strHTML, age)
{
	strHTML += '<div class="patient-card fade-in-effect">'
		strHTML += '<div class="patient-item">'
			strHTML += '<img id="blah" class="img-patient noselect" src="'+ dataPatient.imagePath +'" alt="" width="140" height="160"/>';
			strHTML += '<h4 class="patient-fullname">'+ dataPatient.fullname +'</h4>'
			strHTML += '<p class="patient-number">'+ dataPatient.numero +'</p>'
		strHTML += '</div>'
		
		strHTML += '<div class="patient-item patient-item-center patient-item-bigger">'
			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Taille :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.height +' cm</h1>'
			strHTML += '</div>'

			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Groupe Sanguin :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.gs +'</h1>'
			strHTML += '</div>'

			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Date de naissance :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.dob +' ('+ age +' ans)</h1>'
				strHTML += '</div>'
		strHTML += '</div>'

		strHTML += '<div class="patient-item patient-item-center patient-item-bigger">'
			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Poids :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.weight +' kg</h1>'
			strHTML += '</div>'

			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Nom d\'un proche :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.name_proche +'</h1>'
			strHTML += '</div>'

			strHTML += '<div class="patient-align-container">'
				strHTML += '<h1 class="patient-label">Numéro du proche :</h1>'
				strHTML += '<h1 class="patient-value">'+ dataPatient.num_proche +'</h1>'
			strHTML += '</div>'
		strHTML += '</div>'
	strHTML += '</div>'

	return strHTML;
}


function createModalBodyHTML(url)
{
	var bodyHumanHtml = '';
	bodyHumanHtml += '<div class="patient-card fade-in-effect">'
		bodyHumanHtml += '<div class="patient-rapport-item">'
			bodyHumanHtml += '<div id="anatomywrapper">'
				bodyHumanHtml += '<div id="anatomybase">'
					bodyHumanHtml += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1350" xml:space="preserve">'
						bodyHumanHtml += '<image overflow="visible" width="800" height="1350" xlink:href="'+ url +'assets/img/model.png" ></image>'
						bodyHumanHtml += '<g>'
							bodyHumanHtml += '<path id="anatomy_0" label="Tête/Visage" class="head" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M346,106.833c2.04,7.695,6.667,23,6.667,33c-3.333,6.5-7.167,2.833-8.5,1.667S338,129.334,337,125.667S333.833,109,337.833,105S345,105,346,106.833z M450.625,140.375c3.75,6.375,8.875,3.25,10-1.75s7.625-7.875,6.75-23.625s-8.041-11.667-11.041-7.333C455.333,112.333,449.917,135.25,450.625,140.375z M456.334,69C454.668,37,420,18,401,18c-30.833,0-50.167,31.5-53.167,44.5c-1.915,8.295-2.833,23.5-2.5,28.167s1,12.333,0.667,16.167c2.04,7.695,6.667,23,6.667,33c0.667,5.167,1.167,12.5,3.333,18.833c3,4,22.5,23.333,44.167,23.333s36.5-8.667,45.708-23c2.625-5.625,5-15.25,4.75-18.625c-0.708-5.125,4.708-28.042,5.709-32.708C457.001,100.334,458,101,456.334,69z"/>'
							bodyHumanHtml += '<path id="anatomy_1" label="Cou" class="neck" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M345.667,243.167c15.667-0.833,41.167-2.166,45.333,3.667s15.834,6,19.667,0s38.028-6.245,50.833-4.333c4.95,0.739,9.833,0.81,14.438,0.363c10.976-1.066,20.373-5.078,25.342-10.017c-8.889,0.081-18.524-5.195-31.03-10.721C454.125,215,445.625,206.25,445,203.5s0.125-34.5,0.875-44.5c-9.208,14.333-24.041,23-45.708,23S359,162.667,356,158.667c2.167,6.333,1.5,29.833,0.75,45.333c-8.5,15.25-40,24-48,27.5c2.042,1.655,10.695,6.598,20.857,9.508C334.793,242.493,340.373,243.448,345.667,243.167z"/>'
							bodyHumanHtml += '<path id="anatomy_2" label="Poitrine" class="chest" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M524.5,294c-2.018-20.749-37.75-48.25-48.562-51.137c-4.605,0.447-9.488,0.376-14.438-0.363c-12.805-1.911-47-1.667-50.833,4.333s-15.5,5.833-19.667,0s-29.667-4.5-45.333-3.667c-5.294,0.281-10.873-0.674-16.059-2.159c-8.004,3.48-46.033,26.426-52.127,58.308c-0.459,2.402-0.744,4.852-0.814,7.351c-1,35.667,0.003,72.11-0.165,85.722c0.383-0.096,9.666,25.111,12.166,30.778S293.75,441,297.25,447.75C305.5,455.5,344,473,370.5,466s36.5-6.244,65,0.128s52.668-2.794,73.084-27.211c1.25-3.25,4.75-11.75,5.333-15s2.667-6.999,4.084-9.749s7.455-21.675,8.005-21.176C526.678,379.65,525.667,306.001,524.5,294z"/>'
							bodyHumanHtml += '<path id="anatomy_3" label="Abdomen" class="abdomen" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M435.5,466.128C407,459.756,397,459,370.5,466s-65-10.5-73.25-18.25c3.5,6.75,2,12,3.75,17.75s5,21.334,0.5,41.501s-1.667,35.666-0.5,40.166c0.785,3.029,2.326,5.001,1.419,8.813C314,567.5,332.834,590.5,402.917,590.5s86.417-20.498,98.75-33.499c-1.666-4.5-0.501-12,2.499-21.167s-3.499-44.667-3.833-52.833s2.501-21.5,2.751-27.584s4.25-13.25,5.5-16.5C488.168,463.334,464,472.5,435.5,466.128z"/>'
							bodyHumanHtml += '<path id="anatomy_4" label="Bassin" class="pelvis" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M402.917,590.5c-70.083,0-88.917-23-100.498-34.52c-0.44,1.852-1.458,4.137-3.419,7.188c-2.708,4.214-5.009,15.491-6.673,27.332c10.34,9.027,56.21,47.939,84.084,82.636c8.255-3.802,35.957-5.104,49.606-0.453c28.214-33.03,74.964-71.046,85.649-79.515c-1-13.666-8.334-31.667-10-36.167C489.334,570.002,473,590.5,402.917,590.5z"/>'
							bodyHumanHtml += '<path id="anatomy_5" label="Pubis" class="pubis" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M376.412,673.136c7.636,9.505,13.921,18.693,17.755,26.864c1-2.167,2.75-2.833,6.833-3.167s5.75,0.834,6.917,1.584c3.8-7.69,10.229-16.519,18.101-25.734C412.368,668.031,384.667,669.334,376.412,673.136z"/>'
							bodyHumanHtml += '<path id="anatomy_6" label="Épaule Droite" class="shoulder-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M277.48,299.316c6.094-31.882,44.123-54.828,52.127-58.308c-10.162-2.91-18.816-7.853-20.857-9.508c-8,3.5-15.5,2-26.75,4.25S240.5,249,228.5,273.5s-9.5,57-9.25,65.75c0.034,1.202,0.012,2.258-0.058,3.222C232.058,327.083,262.9,323.345,277.48,299.316z"/>'
							bodyHumanHtml += '<path id="anatomy_7" label="Épaule Gauche" class="shoulder-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M524.5,294c13.5,30.001,46.022,30.211,58.595,48.439c-0.768-3.438-1.004-7.947-0.345-14.439c1.931-19.007-4.875-52.125-17.875-68.5s-53.125-26.75-63.595-26.654c-4.969,4.939-14.366,8.951-25.342,10.017C486.75,245.75,522.482,273.251,524.5,294z"/>'
							bodyHumanHtml += '<path id="anatomy_8" label="Bras Droit" class="arm-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M276.667,306.667c0.07-2.499,0.354-4.949,0.814-7.351c-14.58,24.029-45.423,27.768-58.288,43.156c-0.437,6.049-2.914,8.093-7.442,14.778C206.5,365,196.5,396.5,193,408.5c-0.507,1.738-0.896,3.229-1.221,4.551c-1.413,17.735,10.718,25.876,24.421,31.618c11.394,4.774,24.501,8.306,33.45,1.543c0.711-1.544,1.634-3.368,2.85-5.712c3.5-6.75,23.363-47.953,24.001-48.111C276.669,378.777,275.667,342.334,276.667,306.667z"/>'
							bodyHumanHtml += '<path id="anatomy_9" label="Bras Gauche" class="arm-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M587.573,444.669c14.284-5.985,25.869-14.57,23.177-33.919c-1.625-11.25-17.875-51.25-22-57.25c-2.265-3.294-4.53-6.027-5.655-11.061C570.522,324.211,538,324.001,524.5,294c1.167,12.001,2.178,85.65,1.506,98.992c0.108,0.098,20.827,42.675,23.494,48.175C558.012,454.281,574.009,450.353,587.573,444.669z"/>'
							bodyHumanHtml += '<path id="anatomy_10" label="Coude Droite" class="elbow-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M216.2,444.669c-13.704-5.742-25.834-13.883-24.421-31.618c-1.917,7.803-1.51,9.506-8.779,18.699c-5.907,7.47-15.794,29.063-22.538,48.927c15.882-28.244,68.495,4.695,75.547,19.871c6.154-16.332,11.13-43.69,11.49-47.172c0.245-2.366,0.814-4.26,2.15-7.163C240.702,452.975,227.594,449.443,216.2,444.669z"/>'
							bodyHumanHtml += '<path id="anatomy_11" label="Coude Gauche" class="elbow-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M644,484.25c-2.028-7.858-4.954-16.438-9.03-24.074c-4.97-9.31-16.414-30.066-17.72-32.176c-3.25-5.25-5.336-9.194-6.5-17.25c2.692,19.349-8.893,27.934-23.177,33.919c-13.564,5.684-29.562,9.612-38.073-3.502c2.667,5.5,7,11.333,7,17.333c0,1.363,1.692,13.781,4.385,25.354c2.187,9.396,5.372,18.235,6.115,20.146C565.5,491,629.5,447,644,484.25z"/>'
							bodyHumanHtml += '<path id="anatomy_12" label="Avant-bras Droit" class="forearm-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M160.462,480.677c-2.96,8.722-5.318,17.111-6.462,23.823c-2.028,11.896-8.779,39.212-16.707,62.487c-1.735,5.094-3.563,9.992-5.337,14.495c1.722,9.015,32.508,23.476,42.632,18.606c1.457-2.714,2.764-5.01,3.745-6.587c4.667-7.5,11.917-19.251,24.917-35.251s25.5-39.75,32-55.75c0.255-0.629,0.508-1.285,0.76-1.953C228.958,485.372,176.345,452.433,160.462,480.677z"/>'
							bodyHumanHtml += '<path id="anatomy_13" label="Avant-bras Gauche" class="forearm-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M670.833,580.061c-2.89-7.644-5.897-16.096-8.083-21.561c-4-10-12.75-51-18.75-74.25C629.5,447,565.5,491,567,504c7,18,35.75,60.25,40.375,65.875s16.49,23.007,19.5,28.25C633.414,608.279,672.667,589.667,670.833,580.061z"/>'
							bodyHumanHtml += '<path id="anatomy_14" label="Poignet Droit" class="wrist-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M131.956,581.482c-5.112,12.975-9.774,22.651-10.456,24.143c-0.886,1.939-1.456,3.337-2.977,4.62c9.057,0.416,28.988,8.686,43.015,19.44c2.127-7.809,8.37-20.88,13.05-29.598C164.464,604.958,133.678,590.497,131.956,581.482z"/>'
							bodyHumanHtml += '<path id="anatomy_15" label="Poignet Gauche" class="wrist-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M686.75,610.25c-8.5-4-5.75-8.25-9.5-15c-1.7-3.061-4.019-8.847-6.417-15.189c1.834,9.606-37.419,28.219-43.958,18.064c1.544,2.689,5.188,10.48,8.506,17.668c3.15,6.824,6.007,13.104,6.494,13.957C656.75,617.834,678.333,609.666,686.75,610.25z"/>'
							bodyHumanHtml += '<path id="anatomy_16" label="Main Droite" class="hand-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M160.833,633.167c0.096-0.975,0.344-2.156,0.705-3.481c-14.027-10.755-33.958-19.024-43.015-19.44c-1.911,1.612-5.326,3.042-12.773,5.13c-1.854,0.52-3.833,1.291-5.874,2.231c-12.688,5.84-27.892,18.435-31.876,21.019c-4.625,3-7.75,8.375-11.875,10.5s-4.125,8.625,0,10.5s9.625,0.125,13-1.5s9.042-8.457,15.5-10.5c3.788-1.198,7.625-1.5,7.625,0.125s-8.5,22.375-9.125,25.5s-3.875,13.875-5.875,21.125s-5.5,21.25-6.75,29.25s0.875,11.75,5.125,12.625s7.875-7.625,8.646-10.625s2.854-12.75,3.979-15.5s6.625-18.75,8-22s2.375-8.625,4.375-7.75s-0.375,5.875-1.75,9.75S91.75,714.875,91,718.75s-5,19.75-5.25,22.5s-1.875,8.75,2.75,10.5s7.75-1.875,9.5-5.625s5.375-17.625,7.375-26.125s5.75-19.5,7.125-24s2.125-8,3.875-7.875s1.5,2.5,0.75,4.75S111,713.5,110,718.5s-4.25,16.125-5.375,20.375s-1.75,9.25,2.5,10.75s6.875-1.5,8.75-4.75s7.875-21.5,9.369-27.125s4.756-18.5,6.131-22.375s2.5-5.625,3.625-5.5s0.25,2.625-1.125,7s-5.375,18.5-7.125,25s-2.25,9.625,0,12s7.083-0.541,8.25-2.541s3-11,5.667-16.333c1.676-3.352,3.669-11.246,6.53-19.381c1.691-4.808,4.336-9.699,5.636-13.786c0.352-1.105,0.67-2.172,0.973-3.219c2.707-9.367,3.628-16.586,6.027-25.281C162.5,643.667,160,641.667,160.833,633.167z"/>'
							bodyHumanHtml += '<path id="anatomy_17" label="Main Gauche" class="hand-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M740.25,640.25c-2.75-3.75-17.5-11.5-21.75-14.5c-2.125-1.5-7.938-4.375-14.281-7.375S691,612.25,686.75,610.25c-8.417-0.584-30,7.584-44.875,19.5c1,1.75-0.875,7.125,0.125,16.25s4.125,23.25,6.375,32.125s7,18.375,8.5,22.875s9.403,29.364,12.625,32c2.75,2.25,7.5,0.75,8.25-2.75s-1.625-10.875-2.5-14.125s-5.625-19.25-6.5-21.75s-2-5.125-0.25-5.125s2.125,2.75,3.25,5.625s5.875,19.5,6.875,24.125s4.5,17,6.25,21.75s5,10,9,9.75s4.875-4.75,5.125-8.375s-5.875-23.5-6.375-27.625s-5.375-19.25-6.125-21.25s-1.375-5,0.625-5.125s2.875,5.625,3.75,8.625s9.75,31.875,10.25,35.5s2.625,14.5,6,17.75c2.744,2.643,5.625,3.875,8.625,0.875s2.25-10,0.875-15.25s-4.625-21.125-5.5-25s-6.375-20.875-7.25-24s-2.125-5.375-1.125-5.75s2.25,1.125,3.5,5.25s6.625,20.5,8.375,25.5s1.5,11.625,4.125,17.375s7,7.625,10.625,7.125s4.277-7.391,4.375-10.125s-4.75-20.5-6.25-27.375s-5.25-16.625-6.5-23s-7.375-23.375-8.625-26s-0.625-4.75,2.5-3.875s9.25,2.625,13,7.625s10.875,6.75,13.375,7s8.5,0.375,9.25-6.375S743,644,740.25,640.25z"/>'
							bodyHumanHtml += '<path id="anatomy_18" label="Cuisse Droite" class="thigh-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M292.327,590.5c-2.021,14.389-3.102,29.611-2.827,34c0.5,8-6.5,46-11.5,70c-3.981,19.107-12.131,56.915-14.375,92.478c-0.575,9.105,0.172,18.063,0.375,26.522c0.845,35.062,9.541,55.489,16.139,69.427c35.654,13.2,53.799,56.767,88.484,34.358c2.478-11.204,8.03-39.965,9.627-52.285c1.75-13.5,10.083-66.333,11.815-88.167s1.269-38.833,0.435-43.166s-0.167-12.667-0.417-21.334s3.083-10.166,4.083-12.333c-3.834-8.171-10.12-17.359-17.755-26.864C348.538,638.439,302.667,599.527,292.327,590.5z"/>'
							bodyHumanHtml += '<path id="anatomy_19" label="Cuisse Gauche" class="thigh-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M426.018,672.683c-7.872,9.216-14.301,18.044-18.101,25.734c1.167,0.75,3.083,5.083,4.333,8.083s1,20.75-0.25,31.5s1.5,59.75,3.75,71s8.417,55.334,10.084,67.001s5.166,31.5,7.166,39.833c36.334,25.833,52.479-20.023,89.334-33.168c5.667-10,13.999-27.333,15.999-52.333c0.874-10.926,1.603-27.168,0.824-43.078c-1.002-20.493-3.844-40.436-5.157-47.754c-2.333-13-14.834-82.834-17-92.667s-4.333-40-5.333-53.666C500.981,601.637,454.231,639.652,426.018,672.683z"/>'
							bodyHumanHtml += '<path id="anatomy_20" label="Genou Droit" class="knee-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M280.139,882.927c1.212,2.56,2.353,4.901,3.361,7.073c6.5,14,6,37.5,6.5,61c0.078,3.657,0.262,7.679,0.348,11.921c10.591,44.449,51.024,21.223,68.904,3.938c0.325-1.35,0.929-2.658,1.373-3.483c0.875-1.625,2.125-10.625,3.375-16.625s2-18.5,4-26.75c0.175-0.721,0.386-1.643,0.623-2.715C333.938,939.693,315.793,896.127,280.139,882.927z"/>'
							bodyHumanHtml += '<path id="anatomy_21" label="Genou Gauche" class="knee-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M433,915.834c2,8.333,4.333,14.167,4.333,24s4,22.167,5.167,25c17.417,18.167,61,46.833,69.25-8.834c0-11.5,3.25-39.334,3.584-50.334s1.333-13,7-23C485.479,895.811,469.334,941.667,433,915.834z"/>'
							bodyHumanHtml += '<path id="anatomy_22" label="Jambe Droite" class="leg-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M290.348,962.921c0.085,4.202,0.072,8.622-0.239,13.122c-1.393,20.15-4.799,41.913-4.109,52.957c1,16,4.5,62,7.5,83s6.875,83,7.125,87.5c0.06,1.082,0.008,2.26-0.107,3.478c6.992-11.484,36.463-9.869,44.754-6.101c-1.079-3.858-2.297-10.522-2.438-15.043c-0.167-5.333,7.5-47.167,8.333-58.333s3.667-29.5,4.333-33.333s5.75-17.168,9.5-25.918s3.5-20,2.5-27.25s-3.75-45.75-4.5-51.375s-2.25-13.125-3.5-15.125c-0.615-0.984-0.563-2.333-0.248-3.642C341.372,984.144,300.939,1007.37,290.348,962.921z"/>'
							bodyHumanHtml += '<path id="anatomy_23" label="Jambe Gauche" class="leg-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M442.5,964.834c1.167,2.833-1.25,16.416-4.25,33.916s-4.083,48.751-3.083,56.751s9.667,28.833,11.833,35s0.667,8.833,2,20.833s7.167,47.334,9,59s1.5,21-0.667,27.167C464,1193,500,1190.5,503.5,1206c-0.75-4.25-1.75-10-1-22.25s5-60.25,8.25-87.75s6.75-82,4.5-96.5s-3.5-32-3.5-43.5C503.5,1011.667,459.917,983.001,442.5,964.834z"/>'
							bodyHumanHtml += '<path id="anatomy_24" label="Cheville Droite" class="ankle-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M300.518,1202.978c-0.363,3.847-1.388,8.108-1.768,11.147c-0.5,4,2.125,8.625,1.375,15.875c-0.034,0.332-0.091,0.67-0.146,1.008c12.665-4.423,40.242,8.668,48.998,21.075c1.177-7.814,1.063-15.23-0.478-19.082c-1.667-4.166-2.167-7.167-0.833-12.5s-0.667-18.667-1.833-21.834c-0.178-0.482-0.368-1.097-0.562-1.79C336.981,1193.108,307.51,1191.493,300.518,1202.978z"/>'
							bodyHumanHtml += '<path id="anatomy_25" label="Cheville Gauche" class="ankle-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M457.333,1197.501c-2.167,6.167-3.166,21-2.666,22.667s0.833,9.333-1,13.499s-1.667,13.334-0.667,21.5c6-13.583,37-29.917,50-23.667c-2-5.5-2.25-5.75-1-9.25s2.25-12,1.5-16.25C500,1190.5,464,1193,457.333,1197.501z"/>'
							bodyHumanHtml += '<path id="anatomy_26" label="Pied Droite" class="foot-rt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M299.979,1231.008c-1.15,7.047-6.68,15.393-10.854,23.742c-4.375,8.75-13,19.375-21,28.25c-2.286,2.536-4.111,5.777-5.548,9.185c-3.593,8.519-4.755,18.083-4.577,20.315c0.25,3.125,3.125,5.875,6.125,5.5c0,1.125,1,2.875,4.25,2.5c0.25,2,0,6.25,8.25,5c4,4.875,7.875,4.625,10.75,1.75c5.292,6.314,10.383,6.492,15.75,5.809c4.375-0.558,11.125-7.809,12.25-10.559s2.25-3.875,5.875-6.75c1.972-1.563,3.795-4.086,5.156-8.824c0.683-2.376,1.247-5.519,1.657-8.232c0.275-1.824,0.481-3.456,0.604-4.525c0.667-5.833,0.667-10.834,4.5-21.334c8.667-3.667,14-10.333,15.5-18.833c0.113-0.642,0.215-1.28,0.311-1.918C340.221,1239.676,312.645,1226.585,299.979,1231.008z"/>'
							bodyHumanHtml += '<path id="anatomy_27" label="Pied Gauche" class="foot-lt" fill="rgba(235, 236, 237, 0.3)" stroke="rgba(255, 128, 128, 0.7)" vector-effect="non-scaling-stroke" d="M541.166,1292.167c-1.167-4.167-9.666-14.833-16.333-21.833s-7.833-11.333-12.5-18.667S505,1237,503,1231.5c-13-6.25-44,10.084-50,23.667c1,8.166,12,15,15,16.5s3,4.167,3.833,7s2.834,10.667,3.834,21s6.25,15.749,8.666,17.666s2.834,3,3.667,4.667s3.417,6.083,11.167,9.75s14.999-1.167,16.749-4.75c4.5,4.5,11.084,0.416,12.25-2.084c4.916,1.416,7.834-3.25,7.917-5.166c1.583,0.334,3.584-1.082,4.25-2.582c0.833,0.334,2.5,0.666,5-3.334S542.333,1296.334,541.166,1292.167z"/>'
						bodyHumanHtml += '</g>'
					bodyHumanHtml += '</svg>'
				bodyHumanHtml += '</div>'
			bodyHumanHtml += '</div>'
		bodyHumanHtml += '</div>'
		bodyHumanHtml += '<span id="tipanatomy"></span>'
	bodyHumanHtml += '</div>'

	return bodyHumanHtml;
}

var partSelected = []

function addEventSVGAnatomy()
{
	jQuery("path[id^=\"anatomy_\"]").each(function (i, e) {
		$('#anatomy_'+ i).on('click',function(){
			if (partSelected.includes($('#anatomy_'+ i).attr('class'))) {
				$('#anatomy_'+ i).css({'fill':'rgba(235, 236, 237, 0.3)'});
				partSelected = partSelected.filter(e => e !== $('#anatomy_'+ i).attr('class'));
			}
			else {
				$('#anatomy_'+ i).css({'fill':'rgba(255, 128, 128, 0.5)'});
				partSelected.push($('#anatomy_'+ i).attr('class'));
			}
		});

		$('#anatomy_'+ i).hover(function(){
			jQuery('#tipanatomy').show().html('<p>'+ $('#anatomy_'+ i).attr('label') + '</p>');
		}, function() {
			jQuery('#tipanatomy').hide();
		});
	});
}
