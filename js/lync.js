String.prototype.format = function () {
	var content = this;
	for (var i = 0; i < arguments.length; i++) {
		var replacement = '{' + i + '}';
		content = content.replace(replacement, arguments[i]);
	}
	return content;
};
lync = {
	bindPresence: function () {
		if (window.ActiveXObject) {
			lync.control = new ActiveXObject("Name.NameCtrl.1");
		} else {
			try {
				lync.control = new ActiveXObject("Name.NameCtrl.1");
			} catch (e) {
				lync.control = (function (b) {
					var c = null;
					try {
						c = document.getElementById(b);
						if (!Boolean(c) && (Boolean(navigator.mimeTypes) && navigator.mimeTypes[b] && navigator.mimeTypes[b].enabledPlugin)) {
							var a = document.createElement("object");
							a.id = b;
							a.type = b;
							a.width = "0";
							a.height = "0";
							a.style.setProperty("visibility", "hidden", "");
							document.body.appendChild(a);
							c = document.getElementById(b);
						}
					} catch (d) {
						c = null;
					}
					return c;
				})("application/x-sharepoint-uc");
			}
		}
		if (lync.control !== null) {
			lync.control.OnStatusChange = function (userName, status, selector) {
				switch (status) {
					case 0:
						$("#" + selector).removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--busy").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--available");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Available");
						break;
					case 1:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--away").removeClass("ms-Persona--busy").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--offline");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Offline");
						break;
					case 2:
					case 16:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--busy").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--away");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Away");
						break;
					case 3:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--busy");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Busy");
						break;
					case 4:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--busy").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--away");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Be right back");
						break;
					case 5:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--busy");
						$("#" + selector + " .ms-Persona-tertiaryText").text("In a call");
						break;
					case 6:
					case 7:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--busy");
						$("#" + selector + " .ms-Persona-tertiaryText").text("In a meeting");
						break;
					case 8:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--busy").removeClass("ms-Persona--away").removeClass("ms-Persona--dnd").addClass("ms-Persona--ooo");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Out of Office");
						break;
					case 9:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--busy").removeClass("ms-Persona--ooo").addClass("ms-Persona--dnd");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Do not disturb");
						break;
					case 10:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--dnd").removeClass("ms-Persona--ooo").addClass("ms-Persona--busy");
						$("#" + selector + " .ms-Persona-tertiaryText").text("In a conference call");
						break;
					case 15:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--busy").removeClass("ms-Persona--ooo").addClass("ms-Persona--dnd");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Do Not Disturb");
						break;
					case 18:
						$("#" + selector).removeClass("ms-Persona--available").removeClass("ms-Persona--offline").removeClass("ms-Persona--away").removeClass("ms-Persona--busy").removeClass("ms-Persona--ooo").addClass("ms-Persona--dnd");
						$("#" + selector + " .ms-Persona-tertiaryText").text("Presenting");
						break;
				}

			}
		}
	},
	cards: [],
	faces: [],
	visibleFaces: 0,
	card: '<div class="ms-Persona ms-Persona--offline ms-Persona--lg" id="{0}" data-sip="{1}">' +
		'<div class="ms-Persona-imageArea"><div class="ms-Persona-initials ms-Persona-initials--blue">{2}</div>' +
		'<img class="ms-Persona-image large-img" onerror="lyncImageAlt(this)" src="{3}" alt="" />' +
		'</div><div class="ms-Persona-presence"></div>' +
		'<div class="ms-Persona-details">' +
		'<a href="{6}" target="{7}"><span class="ms-Persona-primaryText">{4}</span></a><br/>' +
		'<span class="ms-Persona-secondaryText">{5}</span><br/>' +
		'<span class="ms-Persona-tertiaryText">Presence Unknown</span></div></div>',
	facepile: '<div class="ms-Persona ms-Persona--offline" id="{0}" data-sip="{1}">' +
		'<div class="ms-Persona-imageArea"><div class="ms-Persona-initials ms-Persona-initials--blue">{2}</div>' +
		'<img class="ms-Persona-image large-img" onerror="lyncImageAlt(this)" src="{3}" alt="" />' +
		'</div><div class="ms-Persona-presence"></div>',
	mouseover: function () {
		try {
			lync.control.ShowOOUI($(this).data("sip"), 0, 10, 10);
		} catch (ex) {}
	},
	mouseout: function () {
		try {
			lync.control.HideOOUI();
		} catch (ex) {}
	},
	dblclick: function () {
		try {
			lync.control.DoAccelerator();
		} catch (ex) {

		}
	},
	init: function (obj) {

		if ($(".lync-status").length > 0) {
			$(".lync-status").each(function () {
				var _this = $(this);
				var properties = {
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					name: _this.data("name"),
					sip: _this.data("sip"),
					title: _this.data("title"),
					image: _this.data("image"),
					url: _this.data("url") || "#",
					target: _this.data("target") || "_self",
					initials: _this.data("name").split(" ")[0].substring(0, 1) + _this.data("name").split(" ")[_this.data("name").split(" ").length - 1].substring(0, 1)
				};
				lync.cards.push(properties);
				var html = lync.card.format(properties.id, properties.sip, properties.initials, properties.image, properties.name, properties.title, properties.url, properties.target);
				var ele = document.createElement("div");
				$(ele).addClass("lync-persona");
				$(ele).html(html);
				$(ele).insertAfter(_this);
				_this.remove();
			});
		}
		if ($(".facepile").length > 0) {
			$(".facepile").each(function () {
				var _this = $(this);
				var properties = {
					id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
					name: _this.data("name"),
					sip: _this.data("sip"),
					image: _this.data("image"),
					url: _this.data("url") || "#",
					target: _this.data("target") || "_self",
					initials: _this.data("name").split(" ")[0].substring(0, 1) + _this.data("name").split(" ")[_this.data("name").split(" ").length - 1].substring(0, 1)
				};
				lync.faces.push(properties);
				var html = lync.facepile.format(properties.id, properties.sip, properties.initials, properties.image, properties.name, properties.title, properties.url, properties.target);
				var face = document.createElement("div");
				$(face).addClass("face-pile");
				$(face).html(html);
				$(face).insertAfter(_this);
				_this.remove();
			});
			this.visibleFaces = obj.visible || $(".face-pile").length;
			if ($(".face-pile").length > this.visibleFaces) {
				var more = document.createElement("div");
				var extra = $(".face-pile").length - obj.visible;
				$(more).addClass("more-face").addClass("round").html("<div>+" + extra + "</div>");
				var less = document.createElement("div");
				$(less).html('<i class="ms-Icon ms-Icon--ChevronLeft" aria-hidden="true"></i>').addClass("round").addClass("less-face")
				var lastface = $($(".face-pile")[this.faces.length - 1]);
				$(more).click(function () {
					if (typeof (obj.moreFace) == "function") {
						obj.moreFace(this.faces);
					} else {
						lync.moreFace();
					}
				}).insertAfter(lastface);
				$(less).click(lync.lessFace).insertAfter(more).hide();
				$(".face-pile").slice(this.visibleFaces).hide();


			}
		} else {
			console.log("No person details");
		}
		this.bindPresence();
		$(".ms-Persona").each(function () {
			if (lync.control) {
				if (lync.control.PresenceEnabled) {
					var d = lync.control.GetStatus($(this).data("sip"), $(this).attr("id"));
					$(this).mouseover(lync.mouseover).mouseout(lync.mouseout).dblclick(lync.dblclick);
				}
			}
			else{
				console.log("Lync control is not available in this browser");
			}
		});
	},
	moreFace: function () {
		$(".face-pile").show();
		$(".more-face").hide();
		$(".less-face").show();
	},
	lessFace: function () {
		$(".face-pile").slice(lync.visibleFaces).hide();
		$(".more-face").show();
		$(".less-face").hide();

	}
};

$("body").on("dblclick", ".ms-Persona", function () {

});

function lyncImageAlt(obj) {
	$(obj).hide();
}
