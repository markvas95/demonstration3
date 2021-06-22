$(document).ready(function(){
    const redirectUrl = "https://vashkaweb.ru/work/capitals/thanks.html";

  // Заменяю img с путём к svg, на тот же svg
  $('img.svg').each(function(){
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);

    }, 'xml');

  });
  
  
  // Появление меню
  $('.menuBtn').click(function () { 
    $('.header__absMenu').addClass('active');
  });
  // Закрытие меню
  $('.header__absClosebtn').click(function () { 
    $('.header__absMenu').removeClass('active');
  });



  // Смена табов
  $('.ourContributions__tab').click(function (e) { 
    $('.ourContributions__tab').removeClass('active')
    $(this).addClass('active')

    let index = $(this).index()

    $('.ourContributions__tabContent').removeClass('active')
    $('.ourContributions__tabContent').eq(index).addClass('active')
  });

  // слайдеры и Roadmap
  $('.roadmap__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    focusOnSelect: true,
  });

  $('.ourTeams__slider').slick({
    dots: true,
    prevArrow: '.ourTeams__arrow_prev',
    nextArrow: '.ourTeams__arrow_next',
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
          infinite: false,
        }
      },
    ]
  });


  // прокрутка табов 
  function tabs(){
    let containerOuterWidth = $('.ourContributions__tabsBl').outerWidth(); // узнаем ширину контейнера (width + padding)
    let containerInnerWidth = $('.ourContributions__tabs').outerWidth(); // узнаем ширину прокручиваемого контента (width + padding)
  
  
    $('.ourContributions__tabsBl').animate({
      scrollLeft: containerInnerWidth/2 - containerOuterWidth/2
    });
    // обработчик клика по элементу
    $(".ourContributions__tab").click(function() {
      let itemOuterWidth = $(this).outerWidth(); // узнаем ширину текущего элемента (width + padding)
      let itemOffsetLeft = $(this).offset().left; // узнаем значение отступа слева в контейнере у текущего элемента
      let containerScrollLeft = $(".ourContributions__tabsBl").scrollLeft(); // узнаем текущее значение скролла
  
      let positionCetner = (containerOuterWidth / 2 - itemOuterWidth / 2); // рассчитываем позицию центра
  
      let scrollLeftUpd = containerScrollLeft + itemOffsetLeft - positionCetner; // рассчитываем положение скролла относительно разницы отступа элемента и центра контейнера
      // размещаем по цетру
  
  
      // анимируем
      $('.ourContributions__tabsBl').animate({
        scrollLeft: scrollLeftUpd
      }, 400);
    });
  }

  tabs()

  // Настройка якоря 
  $('a.anchor').on('click', function(e){
    e.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });

   // аккордеон у блока faq

   let arr = $('.faq__item');

   $.each(arr,function(index){
     let item = $('.faq__item').eq(index);
     let question = item.find('.faq__question');
     let height = question.innerHeight();
     let answer = item.find('.faq__answer');
     var heightOpen = question.innerHeight() + answer.innerHeight() + 4;
     
     $('.faq__item').eq(index).css('max-height', height);
     
     $('.faq__item').eq(index).attr( 'data-height', height )
     $('.faq__item').eq(index).attr( 'data-height-open', heightOpen )
     $('.faq__item').eq(index).attr( 'data-open', 0 )
   });
 
   $('.faq__item').click(function (e) { 
     $(this).toggleClass('active');
 
     let height =  $(this).attr('data-height');
     let heightOpen =  $(this).attr('data-height-open');
 
     let open = $(this).attr('data-open');
 
     if(+open === 1){
       $(this).css( 'max-height' , +height);
       $(this).attr('data-open', 0 )
     } else {
       $(this).css('max-height', +heightOpen);
       $(this).attr('data-open', 1 )
     }
   });

  //  Ползунок в линии
  function range(){
    let slider = document.getElementById("myRange");
    let output = document.getElementById("calcPopup__value");
    output.innerHTML = slider.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
      output.innerHTML = this.value;
    }  


    let slider2 = document.getElementById("myRange2");
    let output2 = document.getElementById("calcPopup__value2");
    output2.innerHTML = slider2.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    slider2.oninput = function() {
      output2.innerHTML = this.value;
    }  
  }
  range();


  $('.calcPopup__lineRange_first').on("input", function(){
    var val = $(this).val()/5;
    $(this).css({'background':'-webkit-linear-gradient(left ,#4385C8 0%,#4385C8 '+val+'%,#cad0d6 '+val+'%, #cad0d6 100%)'});
  });

  $('.calcPopup__lineRange_second').on("input", function(){
    var val = $(this).val()*20;
    $(this).css({'background':'-webkit-linear-gradient(left ,#4385C8 0%,#4385C8 '+val+'%,#cad0d6 '+val+'%, #cad0d6 100%)'});
  });

  // переключение слайдов в popup
  $('.calcPopup__btn_next').click(function (e) { 
    e.preventDefault();
    $('.calcPopup__lines').removeClass('show');

    $('.calcPopup__forms').addClass('show');

    $('.calcPopup__btn_mob').addClass('show');
  });

  $('.calcPopup__btn_prev').click(function (e) { 
    e.preventDefault();
    $('.calcPopup__forms').removeClass('show');
    $('.calcPopup__btn_mob').removeClass('show');


    $('.calcPopup__lines').addClass('show');
  });

  // Активация fancybox
  $('.fancybox').fancybox();




    // Маска на номер телефона
    $('input[name="phone"]').mask('+7 (999) 999-99-99');

    // Forms

    function checkName(name) {
        let nameReg = /\d/;
        if ((name.length == 0) || (nameReg.test(name))) {
            return false;
        } else {
            return true;
        }
    }

    function checkPhone(phone) {
        if (phone == '') {
            return false;
        } else {
            return true;
        }
    }
    
    function checkEmail(email) {
        let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if ((email.length == 0) || (!emailReg.test(email))) {
            return false;
        } else {
            return true;
        }
    }

    function checkMsg(msg) {
        if (msg.length == 0) {
            return false;
        } else {
            return true;
        }
    }

    $('.form-message').submit(function(e) {
        e.preventDefault();
        // Проверка на верно введенное имя (проверка на пустоту и на наличие цифр)
        let name = $(this).find('input[name="name"]').val();
        if (checkName(name)) {
            $(this).find('input[name="name"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="name"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный номер телефона (проверка на пустоту)
        let phone = $(this).find('input[name="phone"]').val();
        if (checkPhone(phone)) {
            $(this).find('input[name="phone"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="phone"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный адрес электронной почты (наличие "@" и ".")
        let email = $(this).find('input[name="email"]').val();
        if (checkEmail(email)) {
            $(this).find('input[name="email"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="email"]').parent().addClass('inputBlock_error');
        }
        // Чекбокс
        let checkbox = $(this).find('input[name="checkbox"]').prop('checked');
        // -----
        if (checkName(name) && checkPhone(phone) && checkEmail(email) && checkbox) {
            $.ajax({
                url: "sendMessage.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email
                },
                success: function(){
                    $(location).attr('href',redirectUrl);
                }
            });
        } else {
            console.log('Ошибка');
        }
    });

    $('.form-message-detail').submit(function(e) {
        e.preventDefault();
        // Проверка на верно введенное имя (проверка на пустоту и на наличие цифр)
        let name = $(this).find('input[name="name"]').val();
        if (checkName(name)) {
            $(this).find('input[name="name"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="name"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный номер телефона (проверка на пустоту)
        let phone = $(this).find('input[name="phone"]').val();
        if (checkPhone(phone)) {
            $(this).find('input[name="phone"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="phone"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный адрес электронной почты (наличие "@" и ".")
        let email = $(this).find('input[name="email"]').val();
        if (checkEmail(email)) {
            $(this).find('input[name="email"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="email"]').parent().addClass('inputBlock_error');
        }
        // Проверка сообщение на пустоту
        let msg = $(this).find('textarea[name="msg"]').val();
        if (checkMsg(msg)) {
            $(this).find('textarea[name="msg"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('textarea[name="msg"]').parent().addClass('inputBlock_error');
        }
        // Чекбокс
        let checkbox = $(this).find('input[name="checkbox"]').prop('checked');
        // -----
        if (checkName(name) && checkPhone(phone) && checkEmail(email) && checkMsg(msg) && checkbox) {
            $.ajax({
                url: "sendMessageDetail.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    msg: msg
                },
                success: function(){
                    $(location).attr('href',redirectUrl);
                }
            });
        } else {
            console.log('Ошибка');
        }
    });

    $('.form-payment').submit(function(e) {
        e.preventDefault();
        let sum = $('#calcPopup__value').text() + '.000 Руб.';
        let term = $('#calcPopup__value2').text() + ' года';
        // Проверка на верно введенное имя (проверка на пустоту и на наличие цифр)
        let name = $(this).find('input[name="name"]').val();
        if (checkName(name)) {
            $(this).find('input[name="name"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="name"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный номер телефона (проверка на пустоту)
        let phone = $(this).find('input[name="phone"]').val();
        if (checkPhone(phone)) {
            $(this).find('input[name="phone"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="phone"]').parent().addClass('inputBlock_error');
        }
        // Проверка на верно введенный адрес электронной почты (наличие "@" и ".")
        let email = $(this).find('input[name="email"]').val();
        if (checkEmail(email)) {
            $(this).find('input[name="email"]').parent().removeClass('inputBlock_error');
        } else {
            $(this).find('input[name="email"]').parent().addClass('inputBlock_error');
        }
        // Чекбокс
        let checkbox = $(this).find('input[name="checkboxPopup"]').prop('checked');
        if (checkName(name) && checkPhone(phone) && checkEmail(email) && checkbox) {
            $.ajax({
                url: "sendPayment.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    sum: sum,
                    term: term
                },
                success: function(){
                    $(location).attr('href',redirectUrl);
                }
            });
        } else {
            console.log('Ошибка');
        }
    });


    $('.form-payment2').submit(function(e) {
      e.preventDefault();
      let sum = $('#calcPopup__value').text() + '.000 Руб.';
      let term = $('#calcPopup__value2').text() + ' года';
      // Проверка на верно введенное имя (проверка на пустоту и на наличие цифр)
      let name = $(this).find('input[name="name"]').val();
      if (checkName(name)) {
          $(this).find('input[name="name"]').parent().removeClass('inputBlock_error');
      } else {
          $(this).find('input[name="name"]').parent().addClass('inputBlock_error');
      }
      // Проверка на верно введенный номер телефона (проверка на пустоту)
      let phone = $(this).find('input[name="phone"]').val();
      if (checkPhone(phone)) {
          $(this).find('input[name="phone"]').parent().removeClass('inputBlock_error');
      } else {
          $(this).find('input[name="phone"]').parent().addClass('inputBlock_error');
      }
      // Проверка на верно введенный адрес электронной почты (наличие "@" и ".")
      let email = $(this).find('input[name="email"]').val();
      if (checkEmail(email)) {
          $(this).find('input[name="email"]').parent().removeClass('inputBlock_error');
      } else {
          $(this).find('input[name="email"]').parent().addClass('inputBlock_error');
      }
      // Чекбокс
      let checkbox = $(this).find('input[name="checkboxPopup2"]').prop('checked');
      if (checkName(name) && checkPhone(phone) && checkEmail(email) && checkbox) {
          $.ajax({
              url: "sendPayment.php",
              type: "POST",
              data: {
                  name: name,
                  phone: phone,
                  email: email,
                  sum: sum,
                  term: term
              },
              success: function(){
                  $(location).attr('href',redirectUrl);
              }
          });
      } else {
          console.log('Ошибка');
      }
  });
});