// Side navigation
// Used to toggle the menu on small screens when clicking on the menu button
function navShowHide() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Language
function setLanguage(lang) {
    setCookie("Scalorie.Language", lang, 365);
    loadLangage();
}
function getLanguage() {
    let lang = getCookie("Scalorie.Language");
    if (lang == "") {
        lang = "tc";
        setCookie("Scalorie.Language", lang, 365);
    }
    return lang;
}

function loadLangage() {
    var translate = new Translate();
    var currentLng = getLanguage();
    var attributeName = 'data-tag';
    translate.init(attributeName, currentLng);
    translate.process();
}

function Translate() {
    // https://www.codeproject.com/Tips/1165561/How-to-Create-a-Multilingual-Application-using-Jav
    //initialization
    this.init = function (attribute, lng) {
        this.attribute = attribute;
        this.lng = lng;
    }
    //translate 
    this.process = function () {
        _self = this;
        var xrhFile = new XMLHttpRequest();
        //load content data 
        xrhFile.open("GET", "./Data/lang_" + this.lng + ".json", false);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    var LngObject = JSON.parse(xrhFile.responseText);
                    var allDom = document.getElementsByTagName("*");
                    for (var i = 0; i < allDom.length; i++) {
                        var elem = allDom[i];
                        var key = elem.getAttribute(_self.attribute);

                        if (key != null) {
                            //console.log(key);
                            elem.innerHTML = LngObject[key];
                        }
                    }

                }
            }
        }
        xrhFile.send();
    }
}
