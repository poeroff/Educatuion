var ending0 = undefined,
  ending1 = undefined,
  ending2 = undefined;

stageInit.themeFn = function () {
  if (isStep) {
    $('.correct img').attr('src', '../../../../src/assets/Games/T04/img/common/ai0' + step + '-correct.png');
    $('.wrong img').attr('src', '../../../../src/assets/Games/T04/img/common/ai0' + step + '-wrong.png');
  }
};

gameReset.themeFn = function () {
  clearTimeout(ending0);
  clearTimeout(ending1);
  clearTimeout(ending2);
};

function gameFinish() {
  $gameWrp.removeClass('start').addClass('end');
  $('#ending').addClass('show').siblings().removeClass('show');
  $('#ending .btn-reset').hide();
  var $tg = $('#ending');
  if (social) {
    $('#ending .pages')
      .find('.page0' + step)
      .show()
      .siblings()
      .hide();
    $tg = $('#ending .pages>div').filter(':visible');
  }
  $tg.find('.ending-1').addClass('active');
  ending0 = setTimeout(function () {
    $tg.find('.ending-1').find('.end-ai').addClass('on');
    playAudio('sound', 'game08');
  }, 3000);
  ending1 = setTimeout(function () {
    $tg.find('.ending-1').removeClass('active');
    $tg.find('.ending-2').addClass('active');
    // playAudio('ending');
    playAudio('rod', 'game08');
  }, 3700);
  ending2 = setTimeout(function () {
    $tg.find('.ending-2').removeClass('active');
    $tg.find('.ending-3').addClass('active');
    setTimeout(function () {
      $('#ending .btn-reset').show();
    }, 3000);
  }, 7700);
}

function roundClear() {
  gameFinish();
  finishAni = setTimeout(function () {
    if (isStep) {
      if (step < maxStep) {
        if (social) {
          setTimeout(() => {
            nextStep();
          }, 8700);
        } else {
          setTimeout(function () {
            $('#modal-success').modal({ backdrop: 'static' });
          }, 1000);
          return false;
        }
      } else {
        $gameWrp.addClass('finish');
      }
    } else {
      $gameWrp.addClass('finish');
    }
  }, 3000);
}

$(function ($) {
  'use strict';

  $(document).on('click', '[data-role=start]', function () {
    makeQuiz.run();
  });

  setInterval(function () {
    $('.ending-2.active .fish').toggleClass('on');
  }, 800);
  setInterval(function () {
    $('.ending-3.active .char').toggleClass('on');
  }, 600);
});
