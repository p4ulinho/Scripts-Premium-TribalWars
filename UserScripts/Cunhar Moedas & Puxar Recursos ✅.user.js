// ==UserScript==
// @name           Cunhar Moedas & Puxar Recursos ✅
// @author         PaulinhoTutoriais
// @include        **snob*
// @include        **market&mode=call*
// @icon           https://www.dl.dropboxusercontent.com/scl/fi/93px3rbj21zx3863m0g40/letter-p.png?rlkey=yyoejfwogbl9rdw0p2fmft8lr&dl=0
// ==/UserScript==

Connection = null

let jaNotificado = false;

$.ajax({
    url: "https://api-users.herokuapp.com/api/user/auth/coinMass",
    type: "POST",
    contentType: "application/json",
    cache: true,
    data: JSON.stringify({ game_data: game_data })
}).done(data => {
    if (data === "Sem permissão") {
        notifyPermission();
    } else {
        if (data.expireInTwoDays) {
            UI.Notification.show(
                'https://static.vecteezy.com/system/resources/previews/022/278/187/non_2x/expired-time-warning-3d-render-icon-illustration-with-transparent-background-empty-state-png.png',
                `Sua licença do Cunhar Moedas & Puxar Recursos está expirando em: ${data.remainingTime.days} dias, ${data.remainingTime.hours} horas, e ${data.remainingTime.minutes} minutos`,
                'Renove e evite pausas desnecessárias!',
                () => window.open('https://wa.me/5575991790412', '_blank')
            );
        }
        loadScript(data.script);
    }
}).fail((xhr, textStatus, errorThrown) => {
    if (xhr.status === 403) {
        notifyPermission();
    } else {
        console.error(errorThrown);
        setTimeout(() => location.reload(), 5000);
    }
});

function notifyPermission() {
    if (!jaNotificado) {
        UI.Notification.show(
            'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f97a.png',
            'Poxa, você está tentando utilizar uma ferramenta sem permissão!',
            'Adquira agora mesmo clicando aqui.',
            () => window.open('https://wa.me/5575991790412', '_blank')
        );
        jaNotificado = true;
    }
}

function loadScript(scriptUrl) {
    $.ajax({
        url: scriptUrl,
        dataType: "script",
        cache: true
    }).fail(error => {
        console.error(error);
        setTimeout(() => location.reload(), 5000);
    });
}