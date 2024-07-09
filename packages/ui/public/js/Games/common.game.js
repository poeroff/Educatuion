var $gameWrp = $('.game-wrp'),
  $gameBody = $('.game-body'),
  $stage = $('.game-stage'),
  $controler = $('#controler'),
  maxStep = 3,
  step = 1,
  round = 1,
  nowStage = null,
  $life = null,
  controlerText = '',
  $q = null,
  $qArr = [],
  $game = null,
  $gameNum = null,
  $page = null,
  $eArr = [],
  isStep = false,
  social = false,
  isCorrect = false,
  isPlay = false,
  isEnd = false,
  overlayShow = false,
  overlayAutoAni = null;

var stageInit = {
  basicFn: function () {
    // 전체적으로 공통
    round = 1;
    $gameWrp
      .addClass('intro')
      .removeClass('start end guide-open finish')
      .find('.active, .on, .answered, .overlay-open, .disabled')
      .removeClass('active on answered overlay-open disabled');
    $('.step-index li:first-child, .step-bx h3:first-child').addClass('active').siblings().removeClass('active');
    $controler.find('input').prop('checked', false);
    if (isStep) {
      $('.overlay').removeClass('retry').find('.wrong').children('p').html('다시 생각해 <br>보세요.');
      $life.children('i').removeClass('off');
      if (!social) {
        $controler.data('chance', 2);
      }
      $('.current-step').each(function () {
        $(this).text(step);
      });
      $('.correct img').attr('src', '../../../src/assets/Games/Common/img/ai0' + step + '-correct.png');
      $('.wrong img').attr('src', '../../../src/assets/Games/Common/img/ai0' + step + '-wrong.png');
      $('.pages')
        .find('.page0' + step)
        .css('opacity', '1')
        .siblings()
        .css('opacity', '0');
      $('.step-index li')
        .eq(step - 1)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $('.step-bx h3')
        .eq(step - 1)
        .addClass('active')
        .siblings()
        .removeClass('active');
      isEnd = false;
      $controler.removeAttr('data-chance');
    }
    if (isPlay) {
      $stage
        .filter(function () {
          return $(this).attr('id') !== 'home';
        })
        .eq(0)
        .addClass('show')
        .siblings()
        .removeClass('show');
    } else {
      $stage.eq(0).addClass('show').siblings().removeClass('show');
    }
  },
  themeFn: function () {}, // 각페이지별
  run: function () {
    this.basicFn();
    this.themeFn();
  },
};

var makeQuiz = {
  basicFn: function () {
    // 전체적으로 공통
    isStep ? ($q = $qArr[step]) : ($q = $qArr);
    isCorrect = false;
    $('.result-ai').css('opacity', '0');
    $('.answered').removeClass('answered');
    if (round > Object.keys($q).length) {
      nextStage();
    } else {
      $('#round').attr('data-q', round);
      if (isStep && social) {
        $('.overlay').removeClass('retry').find('.wrong').children('p').html('다시 생각해 <br>보세요.');
        $controler.data('chance', 1);
        $life.children('i').removeClass('off');
      }
      $qType = $q[round].type;
      $qAnswer = $q[round].answer;
      $('.round-title').html($q[round].title);
      $('.result-desc>div').html($q[round].desc);
      controlerText = '';

      $flex = $q[round].flexDirect;
      // 문제 선택지 좌측에 표시하는 경우 추가 (2023.11.2)
      if ($q[round].title2) {
        $controler.addClass('title2-add');
        /* #controler 문항 flex-direction 추가 (2023.11.14)*/
        $controler.addClass($flex);
        controlerText += `<div class="title2-box ${$q[round].title2bg}">${$q[round].title2}</div>`;
      } else {
        $controler.removeClass('title2-add');
      }

      var $dir = '';
      if ($q[round].direction) {
        $dir = 'flex-row';
      }

      var addType = '';
      if ($q[round].class) {
        addType = $q[round].class;
      }

      if ($qType == 'text') {
        $qAnswer = $qAnswer.replace(/\s|/gi, '');
        controlerText += `<div class="answer-type-${$qType} ${$dir} ${addType}">
            <input type="text" value="" placeholder="정답을 써 보세요." data-answer="${$qAnswer}">
            <button type="button" class="wbtn">확인</button>
          </div>`;
      } else {
        controlerText += `<ul class="answer-type-${$qType} answer-type-choice ${$dir} ${addType}">`;
        if ($qType == 'ox') {
          $eArr = ['o', 'x'];
        } else if ($qType == 'select') {
          if ($q[round].ex == undefined || !$q[round].ex) {
            return false;
          }
          $eArr = $q[round].ex.split(',');
        }
        var a;
        for (i = 0; i < $eArr.length; i++) {
          a = '';
          if (i == $q[round].answer) {
            a = 'data-answer';
          }
          controlerText += `<li>
              <label>
                <input type="radio" value="${$eArr[i]}" class="sr-only" ${a} />
                <b>${i + 1}</b><div>${$eArr[i]}</div>
              </label>
            </li>
            `;
        }
        controlerText += `</ul>`;
      }
      $controler.html(controlerText);

      return true;
    }
  },
  themeFn: function () {}, // 각페이지별
  run: function () {
    if (this.basicFn()) {
      this.themeFn();
    }
  },
};

var gameReset = {
  basicFn: function () {
    // 전체적으로 공통
    step = 1;
    round = 1;
    $gameBody.attr('data-page', step);
    audioStop();
    stageInit.run();
    $('.icon-home').css({ opacity: '0', visibility: 'hidden' });
    if (isPlay) {
      $stage
        .filter(function () {
          return $(this).attr('id') !== 'home';
        })
        .eq(0)
        .addClass('show')
        .siblings()
        .removeClass('show');
    } else {
      $stage.eq(0).addClass('show').siblings().removeClass('show');
    }
    isPlay = false;
  },
  themeFn: function () {}, // 각페이지별
  run: function () {
    this.basicFn();
    this.themeFn();
  },
};

function gameInit(type, game, page) {
  $gameNum = type;
  $game = eval(game);
  $page = page;
  if ($page == undefined || $page === false) {
    $qArr = $game;
    isStep = true;
  } else {
    $qArr = $game[$page];
  }
  if ($page != undefined && $page === false) {
    social = true;
  }
  $('#wrap').after(
    '<audio id="effect" controls data-dtext_index="dtext_cls_audio" class="position-absolute d-none"><source src="" type="audio/mpeg"></audio><audio id="bgm" controls loop data-dtext_index="dtext_cls_audio" class="position-absolute d-none"><source src="../../../src/assets/Games/T' +
      $gameNum +
      '/media/bgm.mp3" type="audio/mpeg"></audio>',
  );
}

function playAudio(media, page) {
  var src = '';
  if (page != undefined) {
    src = '../../../src/assets/Games/T' + $gameNum + '/media/effect/' + media + '.mp3';
  } else {
    src = '../../../src/assets/Games/Common/media/effect/' + media + '.mp3';
  }
  $('#effect')[0].pause();
  $('#effect').find('source').attr('src', src);
  $('#effect')[0].load();
  $('#effect')[0].oncanplaythrough = $('#effect')[0].play;
}

function audioStop() {
  $('audio').each(function () {
    $(this)[0].pause();
    $(this).find('source').removeAttr('src');
    if (!isNaN($(this)[0].duration)) {
      $(this)[0].currentTime = 0;
    }
  });
}

function nextStage() {
  nowStage = $stage.filter('.show');
  if (nowStage.next().attr('id') == 'ending') {
    roundClear();
  } else {
    nowStage.removeClass('show').next().addClass('show');
  }
}

function nextStep() {
  step++;
  round = 1;
  $gameBody.attr('data-page', step);
  gameReset.themeFn();
  stageInit.run();
}

function gameFinish() {
  playAudio('ending');
  $gameWrp.removeClass('start').addClass('end');
  $('#ending').addClass('show').siblings().removeClass('show');
}

function roundClear() {
  gameFinish();
  setTimeout(function () {
    if (isStep) {
      if (step < maxStep) {
        if (social) {
          setTimeout(() => {
            nextStep();
          }, 1000);
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

function answerChk(target) {
  // 정답 판별
  if (target) {
    let answer = target.attr('data-answer'),
      qtype = $qType;

    if (answer && answer.indexOf(',')) {
      qtype = 'array';
    }

    switch (qtype) {
      case 'text':
        isCorrect = target.val().replace(/\s|/gi, '') == answer;
        break;
      case 'array':
        isCorrect = answer.split(',').indexOf(target.val().replace(/\s|/gi, '')) !== -1;
        break;
      default:
        isCorrect = answer != undefined;
    }
  }
  $('#round').addClass('answered');
  if (isCorrect) {
    $('.result-ai').filter('.correct').css('opacity', 1).siblings('.result-ai').css('opacity', 0);
    playAudio('correct');
  } else {
    if (isStep) {
      if (social) {
        $life.children('i').addClass('off');
      } else {
        $life.children('i').eq($controler.data('chance')).addClass('off');
      }
      if ($controler.data('chance') > 0) {
        $controler.data('chance', $controler.data('chance') - 1);
      } else {
        isEnd = true;
        $('.overlay').addClass('retry').find('.wrong').children('p').html('아쉬워요.');
      }
    }
    $('.result-ai').filter('.wrong').css('opacity', 1).siblings('.result-ai').css('opacity', 0);
    playAudio('wrong');
  }
  overlayShow = true;
  $('#round').addClass('overlay-open');
  $('.overlay').addClass('disabled');
  setTimeout(function () {
    $('.overlay').removeClass('disabled');
  }, 1000);

  if ($('.overlay .result-desc').children('div:empty').length) {
    overlayAutoAni = setTimeout(function () {
      if (overlayShow) {
        $('#round').removeClass('overlay-open');
        overlayClose();
      } else {
        return false;
      }
    }, 2000);
  }
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
            if (step < maxStep) {
              nextStep();
            } else {
              $('#modal-fail').modal({ backdrop: 'static' });
            }
          } else {
            $('#modal-fail').modal({ backdrop: 'static' });
          }
        }
      }
    }, 500);
  }, 1000);
}

$(function () {
  'use strict';

  if (isStep) {
    var lifeLength = 3,
      lifeHtml = '';

    if (social) {
      lifeLength = 1;
    }
    lifeHtml += "<div id='life'>";
    for (var i = 0; i < lifeLength; i++) {
      lifeHtml += `<i></i>`;
    }
    lifeHtml += '</div>';
    $('#round').find('.bx').append(lifeHtml);
  }
  $life = $('#life');

  if (isStep && !social) {
    $('#home').addClass('show');
  }
  stageInit.run();

  $(document).ready(function () {
    audioStop();
    //$('#bgm')[0].play();
  });

  $(document).on('click', '[data-role=init]', function () {
    isPlay = true;
    // audioStop();
    $('#bgm')[0].play();
    $('.icon-home').css({ opacity: '1', visibility: 'visible' });
    nextStage();
  });

  $(document).on('click', '[data-role=start]', function () {
    playAudio('click');
    !$('[data-role=init]').length && $('#bgm')[0].play();
    $gameWrp.removeClass('intro');
    if (!isPlay) {
      isPlay = true;
      $('.icon-home').css({ opacity: '1', visibility: 'visible' });
    }
    nextStage();
  });

  $(document).on('click', '[data-role=next]', function () {
    nextStep();
  });

  $(document).on('click', '[data-role=finish]', function () {
    window.close();
  });

  $(document).on('click', '[data-role=reset]', function () {
    location.reload();
  });

  $(document).on('click', '[data-role=replay]', function () {
    gameReset.themeFn();
    stageInit.run();
  });

  $(document).on('click', '.answer-type-choice input:not([type=text])', function () {
    answerChk($(this));
  });

  $(document).on('click', '[data-role=guide]', function () {
    playAudio('click');
    setTimeout(function () {
      $('#modal-guide').modal();
    }, 700);
  });

  $(document).on('click', '.guide', function () {
    $gameWrp.removeClass('guide-open').addClass('start');
  });

  $(document).on('click', '.overlay', function () {
    $('#round').removeClass('overlay-open');
    clearTimeout(overlayAutoAni);
    overlayClose();
  });

  $(document).on('click', '#controler .wbtn', function (e) {
    var $input = $(this).prev(),
      $val = $input.val().replace(/\s|/gi, '');

    e.preventDefault();
    answerChk($(this).parent('.answer-type-text').children('input'));
  });
});
