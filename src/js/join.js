require('../less/join.less');

var common = require('./common.js');
$.getScript('https://www.google.com/recaptcha/api.js');

// 캡차부분.
var vall = false;

window.verifyCallback = function() {
    vall = true;
};

/*window.onloadCallback = function() {
    grecaptcha.render('cock-prevent', {
        'sitekey' : '6Lc5fzIUAAAAAEehrbbislWASM_D5je_Q-LIudbG',
        'theme' : 'light',
        'callback' :verifyCallback
    });
};*/



// 인증 연습
/*$('#cock-join-email-btn').on('click', function () {
    console.log('dsadasd');

    var email = $('#cock-join-email').val().trim();

    $.ajax({
        url:'/api/sendMail/auth',
        method:'POST',
        data: {
            email: email
        },
        success: function (result) {
            console.log(result);
        },
        error: function (jqXHR) {
            console.log('dsadsa');
        }


    });

});*/



$('.cock-join-btn-cancel').on('click', function () {
    location.href = './';
});

$('.cock-join-btn-save').on('click', function () {
    cockJoin();
});

// nick 중복 확인.
$('#cock-join-nickCheck').on('click', function () {
    var nick = $('#cock-join-nick').val().trim();
    var nickRe = /^[ㄱ-ㅎ가-힣a-zA-Z0-9/\/*]{2,6}$/;

    if(!nick){
        alert('별명을 입력하세요.');
        $('#cock-join-nick').focus();
        return;
    }
    else if(!nickRe.test(nick)){
        alert('별명은 한글,영어,숫자 상관없이 2~6자 사이입니다.');
        $('#cock-join-nick').focus();
        return;
    }

    $.ajax({
        url: '/api/member/nickCheck',
        data: {
            nick : nick
        },
        success: function () {
            alert("사용하셔도 좋습니다.");
        },
        error: function (jqXHR) { // Xml Http Request
            alert(jqXHR.responseJSON.message);
        }

    });
});

// 이메일 전송 및 중복확인
$('#cock-join-email-btn').on('click', function () {
    var email = $('#cock-join-email').val().trim();
    var emailRe=/^[a-zA-Z0-9]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    var emailCertification = $('.cock-join-certification').val();

    if(!email) {
        alert('이메일을 입력하세요.');
        $('')
        $('#cock-join-email').focus();
        return;
    }
    else if(!emailRe.test(email)) {
        alert('이메일 형식이 맞지 않습니다.');
        $('#cock-join-email').focus();
        return;
    }

    $.ajax({
        url: 'api/member/emailCheck',
        data:{
            email: email
        },
        success: function () {
            alert('사용하셔도 좋습니다. 인증메일을 전송합니다.');
            $.ajax({
                url: 'api/email',
                data:{
                    email:email,
                    authNum:emailCertification
                },
                success: function (result) {
                    check(result);
                }
            });
        },
        error: function (jqXHR) { // Xml Http Request
            alert(jqXHR.responseJSON.message);
        }
    });
});





function check(authNum) {
    var form = document.authenform;

    if(!form.authnum.value) {
        alert('인증번호를 입력하세요');
        return false;
    }
    if(form.authnum.value!=authNum) {
        alert('틀린 인증번호입니다. 인증번호를 다시 입력해주세요.');
        form.authnum.value="";
        return false;
    }
    if(form.authnum.value==authNum) {
        alert("인증완료");
        /*opener.document.userinput.mailCheck.value="인증완료";*/
        self.close();
    }
}


function cockJoin() {
    // 검증  벨리데이션
    var email = $('#cock-join-email').val().trim();
    var nick = $('#cock-join-nick').val().trim();
    var pw = $('#cock-join-pw').val().trim();
    var pwc = $('#cock-join-pwc').val().trim();
    var agree = $('.cock-join-check-input').prop('checked');
    var emailRe=/^[a-zA-Z0-9]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var nickRe = /^[ㄱ-ㅎ가-힣a-zA-Z0-9/\/*]{2,6}$/;
    var pwRe=/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;





    if(!email) {
        alert('이메일을 입력하세요.');
        $('')
        $('#cock-join-email').focus();
        return;
    }
    else if(!emailRe.test(email)) {
        alert('이메일 형식이 맞지 않습니다.');
        $('#cock-join-email').focus();
        return;
    }
    else if(!nick){
        alert('별명을 입력하세요.');
        $('#cock-join-nick').focus();
        return;
    }
    else if(!nickRe.test(nick)){
        alert('별명은 한글,영어,숫자 상관없이 2~6자 사이입니다.');
        $('#cock-join-nick').focus();
        return;
    }
    else if(!pw){
        alert('비밀번호를 입력하세요.');
        $('#cock-join-pw').focus();
        return;
    }
    else if(!pwc){
        alert('비밀번호 재확인을 입력하세요.');
        $('#cock-join-pwc').focus();
        return;
    }// 비밀번호랑 비밀번호 확인 부분이 다르면?
    else if(pw !== pwc) {
        alert('새 비밀번호 확인이 다릅니다.');
        $('#cock-join-pwc').focus();
        return;
    } // 비밀번호 영문 대소문자 6~20 / 최소 1개의 숫자 혹은 특수 문자 포함.
    else if(!pwRe.test(pwc)) {
        alert('비밀번호는 6~20자 영문 대 소문자, 최소 1개의 숫자,특수문자를 사용하세요.');
        $('#cock-join-pw').focus();
        return;
    }
    else if(vall !== true) {
        alert('자동등록방지를 푸셔야 합니다.');
        $('#cock-prevent').focus();
        return;
    }
    else if(!agree){
        alert('약관의 동의 하셔야 됩니다.');
        return;
    }

    $.ajax({
        url: '/api/member/signup',
        method: 'POST',
        data: {
            email: email,
            password: pw,
            nick : nick
        },
        success: function (result) {
            alert('정상적으로 가입되셨습니다.');
            location.href = './join-food.html';
        },
        error: function (jqXHR) { // Xml Http Request
            alert(jqXHR.responseJSON.message);
        }
    });
}

