stageInit.themeFn = function () {
  if (isStep) {
    $('.correct img').attr('src', '../../../../src/assets/Games/T01/img/common/ai0' + step + '-correct.png');
    $('.wrong img').attr('src', '../../../../src/assets/Games/T01/img/common/ai0' + step + '-wrong.png');
  }
  $('#ending').removeClass('fail');
  $('.char').removeClass('change');
  $('#effect')[0].pause();
  //$('#bgm')[0].play();
};

$(function ($) {
  'use strict';
  $(document).on('click', '[data-role=start]', function () {
    makeQuiz.run();
  });
});

function nextStage() {
  nowStage = $stage.filter('.show');
  if (nowStage.next().attr('id') == 'ending') {
    ///////////////////// 성공했을때 /////////////////////
    if (round > Object.keys($q).length) {
      $('#ending').addClass('success');
      var $tg = $('#ending .char');
      $('#ending .btn-reset').hide();
      if (social) {
        setTimeout(function () {
          $tg.addClass('moving');
          if (step == 1) {
            playAudio('success01', 'game05');
          } else if (step == 2) {
            playAudio('success02', 'game05');
          } else if (step == 3) {
            playAudio('success03', 'game05');
          }
        }, 4000);
      } else {
        setTimeout(function () {
          $tg.addClass('moving');
          if ($gameWrp.hasClass('page01') == true) {
            playAudio('success01', 'game05');
          } else if ($gameWrp.hasClass('page02') == true) {
            playAudio('success02', 'game05');
          } else if ($gameWrp.hasClass('page03') == true) {
            playAudio('success03', 'game05');
          }
        }, 4000);
      }
      setTimeout(function () {
        $tg.removeClass('moving');
        $tg.addClass('change');
      }, 5500);
      setTimeout(function () {
        $tg.addClass('finish');
        setTimeout(function () {
          $tg.addClass('motion-success');
          playAudio('ending', 'game05');
          $('#bgm')[0].pause();
        }, 1000);
        setTimeout(function () {
          $('#ending .btn-reset').show();
        }, 3000);
      }, 9000);
    }
    roundClear();
  } else {
    nowStage.removeClass('show').next().addClass('show');
  }
}

function roundClear() {
  gameFinish();
  setTimeout(function () {
    if (isStep) {
      if (step < maxStep) {
        if (social) {
          ///////////////////// 성공시 다음 라운드까지 딜레이 /////////////////////
          setTimeout(() => {
            nextStep();
            $('#ending').removeClass('success');
            $('#ending .char').removeClass('finish motion-success');
          }, 9100);
        } else {
          setTimeout(function () {
            $('#modal-success').modal({ backdrop: 'static' });
          }, 1000);
          return false;
        }
      } else {
        $gameWrp.addClass('finish');
        audioStop();
      }
    } else {
      /* 231130 수정 */
      const fadeOutVolume = () => {
        let intervalTimer, volumeTimer;
        let maxVolume = 10;
        const volumeDecreaseInterval = 100;
        const afterFadeoutTime = 1700;
        const bgmAudio = document.querySelector('#bgm');

        clearInterval(intervalTimer);
        clearTimeout(volumeTimer);

        intervalTimer = setInterval(() => {
          maxVolume--;
          if (maxVolume >= 0) $('#bgm')[0].volume = maxVolume * 0.1;
        }, volumeDecreaseInterval);

        bgmAudio.addEventListener('volumechange', event => {
          if (event.target.volume == 0) {
            clearInterval(intervalTimer);

            volumeTimer = setTimeout(() => {
              $gameWrp.addClass('finish');

              //이미 재생되어버린 오디오가 멈추지 않게 #bgm 만 중지시킴
              event.target.pause();
              event.target.currentTime = 0;
              event.target.volume = 1;
            }, afterFadeoutTime);
          }
        });
      };

      fadeOutVolume();
      /* 231130 수정 */
    }
  }, 9000);
}

function overlayClose() {
  overlayShow = false;
  setTimeout(function () {
    $('.answered').find('input').filter(':checked').prop('checked', false);
    setTimeout(function () {
      if (isCorrect) {
        round++;
        makeQuiz.run();
      } else {
        $('.answered').removeClass('answered');
        if (isEnd) {
          if (social) {
            ///////////////////// 실패했을때 /////////////////////
            $gameWrp.removeClass('start').addClass('end');
            $('#ending').addClass('show fail').siblings().removeClass('show');
            var $tg = $('#ending .char');

            setTimeout(function () {
              $tg.addClass('motion-fail');
              if (step === 1) {
                playAudio('fail01', 'game05');
              } else if (step === 2) {
                playAudio('fail02', 'game05');
              } else if (step === 3) {
                playAudio('fail03', 'game05');
              }
            }, 4000);

            if (step < maxStep) {
              setTimeout(() => {
                nextStep();
                $tg.removeClass('motion-fail');
              }, 6500);
            } else {
              setTimeout(() => {
                $('#modal-fail').modal({ backdrop: 'static' });
              }, 6500);
            }
          } else {
            $('#modal-fail').modal({ backdrop: 'static' });
          }
        }
      }
    }, 500);
  }, 1000);
}
