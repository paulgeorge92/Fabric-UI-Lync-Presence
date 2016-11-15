String.prototype.format = function() {
    var content = this;
    for (var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};
lync = {
    control: null,
    html: '<div class="ms-Persona ms-Persona--offline ms-Persona--lg" id="{0}" data-sip="{1}">' +
        '<div class="ms-Persona-imageArea"><div class="ms-Persona-initials ms-Persona-initials--blue">{2}</div>' +
        '<img class="ms-Persona-image large-img" onerror="lyncImageAlt(this)" src="{3}" alt="" />' +
        '</div><div class="ms-Persona-presence"><i class="ms-Icon ms-Icon--checkboxCheck"></i>' +
        '<i class="ms-Icon ms-Icon--clock"></i>&#160;</div><div class="ms-Persona-details">' +
        '<a href="{6}" target="_blank"><span class="ms-Persona-primaryText">{4}</span></a><br/>' +
        '<span class="ms-Persona-secondaryText">{5}</span><br/>' +
        '<span class="ms-Persona-tertiaryText">Presence Unknown</span></div></div>',
    init: function() {
        if ($(".lync-status").length > 0) {
            $(".lync-status").each(function() {
                var _this = $(this);
                var properties = {
                    name: _this.data("name"),
                    sip: _this.data("sip"),
                    title: _this.data("title"),
                    image: _this.data("image"),
                };
                properties.id = properties.name.replace(/ /g, "_");
                properties.initials = properties.name.split(" ")[0].substring(0, 1) + properties.name.split(" ")[properties.name.split(" ").length - 1].substring(0, 1);
                var html = lync.html.format(properties.id, properties.sip, properties.initials, properties.image, properties.name, properties.title);
                var ele = document.createElement("div");
                $(ele).addClass("persona");
                $(ele).html(html);
                $(ele).insertAfter(_this);
                _this.hide();
            });
            $(".ms-Persona").each(function() {
                lync.control.GetStatus($(this).data("sip"), $(this).attr("id"));
            });
        } else {
            console.log("No person details");
        }
    }
};
if (window.ActiveXObject) {
    lync.control = new ActiveXObject("Name.NameCtrl");
} else {
    try {
        lync.control = new ActiveXObject("Name.NameCtrl");
    } catch (e) {
        lync.control = (function(b) {
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
                    c = document.getElementById(b)
                }
            } catch (d) {
                c = null;
            }
            return c;
        })("application/x-sharepoint-uc");
    }
}
lync.control.OnStatusChange = function(userName, status, selector) {
    console.log(status);
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
};
$("body").on("mouseover", ".ms-Persona", function() {
    lync.control.ShowOOUI($(this).data("sip"), 0, 10, 10);
});
$("body").on("mouseout", ".ms-Persona", function() {
    lync.control.HideOOUI();
});

function lyncImageAlt(obj) {
    $(obj).hide();
}