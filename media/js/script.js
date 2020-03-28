function CreateElementForExecCommand(textToClipboard) {
    var forExecElement = document.createElement("div");
    forExecElement.style.position = "absolute";
    forExecElement.style.left = "-10000px";
    forExecElement.style.top = "-10000px";
    forExecElement.textContent = textToClipboard;
    document.body.appendChild(forExecElement);
    forExecElement.contentEditable = true;
    return forExecElement;
}

function SelectContent(element) {
    var rangeToSelect = document.createRange();
    rangeToSelect.selectNodeContents(element);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(rangeToSelect);
}

function createMessage(message, time = 1000) { //消息推送
    if ($(".message").length > 0) {
        $(".message").remove();
    }
    $("body").append('<div class="message"><p class="message-info">' + message + '</p></div>');
    setTimeout("$('.message').remove()", time);
}
var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');      
App = {
    mouseEvent: function() {
        $('body').on('click', function() {
            $('#personal-menu').fadeOut(250);
        });
        $(document).on('click', '#menu-bar.Card-menu', function() {
            $('#menu-bar').animate({ left: -42 }, 200, function() {
                $(this).removeClass('Card-menu').addClass('Card-close');
                $(this).animate({ left: 0 }, 200);
            });
            $('#mobile-menu').fadeIn(200).css('top', 0);
        });
        $(document).on('click', '#menu-bar.Card-close', function() {
            $('#menu-bar').animate({ left: -42 }, 200, function() {
                $(this).removeClass('Card-close').addClass('Card-menu');
                $(this).animate({ left: 0 }, 200);
            });
            $('#mobile-menu').fadeOut(200).css('top', -400);
        });
    },
    outputlog: function() {
        var newDate = new Date();
        var timestamp = document.getElementById('UpdateTime').innerHTML;
        newDate.setTime(timestamp);
        console.clear();
        console.log(" Blog Update Time: " + newDate.toLocaleDateString());
        console.log("\n %c \u26a1Theme:Card Author's Blog:https://blog.itjoker.cn  Write By ITJoker  \n\n", "color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;border-radius:5px;");
    },
    hitokoto: function() { //一言
        function getHitokoto() {
            var xhr = new XMLHttpRequest();
            xhr.open('get', 'https://v1.hitokoto.cn');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var typed = new Typed("#hitokoto", {
                        strings: [JSON.parse(xhr.responseText).hitokoto],
                        startDelay: 100,
                        typeSpeed: 200,
                        loop: true,
                        backSpeed: 100,
                        showCursor: true
                    });
                }
            }
            xhr.send();
        }
        getHitokoto();
    }
}
App.mouseEvent();