$(document).ready(function() {
  $('.drawer').drawer();

  $('.results-item-list').slick({
    // slidesToShow: 3,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // dots :true,

    dots: true,
    // dotsClass: 'slide-dots',
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    // centerMode: true,
    variableWidth: true
   });
        
});
$(function(){
  // #から始まるURLがクリックされた時
  $('a[href^="#"]').click(function() {
   // .headerクラスがついた要素の高さを取得
   let header = $(".header").innerHeight(); 
   // 移動速度を指定（ミリ秒）
   let speed = 400;
   let speedBottom = 300;
   // hrefで指定されたidを取得
   let id = $(this).attr("href");
   // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
   let target = $("#" == id ? "html" : id);
   // ページのトップを基準にターゲットの位置を取得///
   // let position = $(target).offset().top;
 
     // トップからの距離からヘッダー分の高さを引く
     let position = $(target).offset().top - header - 20;
     
     // let positionBottom = $(target).offset().top - header ; //普通のver
     let positionBottom = $(target).offset().top - header + 100; //若干下に落とすver
 
   // ターゲットの位置までspeedの速度で移動
   $("html, body").animate(//100px下に落として
     {
       scrollTop: positionBottom
     },
     speedBottom
   );
 
   $("html, body").animate(//上にあげる
     {
       scrollTop: position
     },
     speed
   );
   return false;
 });
})

$(function(){
  $('.question-item').click(function(){
    $('.question-item-hide').slideUp();
    $(this).find('.question-item-hide').slideToggle();
  })
})

//フォーム必須項目
$(function(){
  //formの入力確認
  let $submit = $("#contact-btn");//送信ボタンに指定されたIDを定義
  $("#is-form input, #is-form textarea, #is-form select").on("change",function(){//value値が変更されたら、その時点で発動
    if(
    $("#is-form input[name='entry.346804360']").val() !== "" &&//空白でない
    $("#is-form input[name='entry.336971331']").val() !== "" &&//空白でない
    $("#is-form select[name='entry.870243888']").val() !== null &&//nullでない
    $("#is-form input[name='entry.418352255']").prop( 'checked' ) ? true : false 
    ){//全てOKな場合
      // $submit.addClass("-active")//submitに-activeクラス追加
      $submit.prop("disabled",false)//disabledを消す
    }else {
      //されていないとき
      // $submit.removeClass("-active")//submitに-activeクラス消去
      $submit.prop("disabled",true)//disabledを付与
    }
    
  })
});

//送信後画面
$(function(){
  let $form = $('#is-form');
  $form.submit(function (e) { 
    $.ajax({ 
      url: $form.attr('action'), 
      data: $form.serialize(), 
      type: "POST", 
      dataType: "xml", 
      statusCode: { 
        0: function () { 
        //送信に成功したときの処理 
        $('.contact-body').slideUp();
        $('#is-success').css('display','block');
        $('.contact-header-text').css('display','none');
        }, 
      200: function () { 
        //送信に失敗したときの処理 
        $('.contact-body').slideUp()
        $('#is-error').css('display','block');
        $('.contact-header-text').css('display','none');
      } 
      } 
    }); 
    return false; 
  })
})