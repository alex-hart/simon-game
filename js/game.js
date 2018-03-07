$(function() {

  var series = [];
  var userInput = [];
  var activateTimer;
  var deactivateTimer;
  var allowClick = 0;
  var i = 0;
  var j = 0;
  var score = 0;
  var allowClick = 1;
  var mode = "normal";
  var delay = 1000;

  var $score = $('#score');
  var $redBtn = $('#red-btn');
  var $blueBtn = $('#blue-btn');
  var $greenBtn = $('#green-btn');
  var $yellowBtn = $('#yellow-btn');
  var $sound1 = $('#sound1')[0];
  var $sound2 = $('#sound2')[0];
  var $sound3 = $('#sound3')[0];
  var $sound4 = $('#sound4')[0];
  var $reset = $('#reset');
  var $hard = $('#hard');
  var $normal = $('#normal');
  var $start = $('#start');

  $reset.hide();
  $redBtn.on('click', function(e) {
    e.preventDefault();
    $sound1.play();
    userInput.push(0);
    if (allowClick === 1) {
      setTimeout(check, delay);
    }
  });
  $blueBtn.on('click', function(e) {
    e.preventDefault();
    $sound2.play();
    userInput.push(1);
    if (allowClick === 1) {
      setTimeout(check, delay);
    }
  });
  $yellowBtn.on('click', function(e) {
    e.preventDefault();
    $sound3.play();
    userInput.push(2);
    if (allowClick === 1) {
      setTimeout(check, delay);
    }
  });
  $greenBtn.on('click', function(e) {
    e.preventDefault();
    $sound4.play();
    userInput.push(3);
    if (allowClick === 1) {
      setTimeout(check, delay);
    }
  });

  function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function newStep() {
    i = 0;
    series.push(getRandom(0, 3));
    playSeries();
  }

  function deactivateBtn() {
    if (series[i - 1] == 0) {
      $redBtn.css('background', 'red');
    } else if (series[i - 1] == 1) {
      $blueBtn.css('background', 'blue');
    } else if (series[i - 1] == 2) {
      $yellowBtn.css('background', 'yellow');
    } else {
      $greenBtn.css('background', 'green');
    }
  }

  function activateBtn() {
    if (i === series.length) {
      clearInterval(activateTimer);
    } else {
      if (series[i] === 0) {
        $redBtn.css('background', '#ff5656');
        $sound1.play();
      } else if (series[i] === 1) {
        $blueBtn.css('background', '#8a7fff');
        $sound2.play();
      } else if (series[i] === 2) {
        $yellowBtn.css('background', '#edfcab');
        $sound3.play();
      } else {
        $greenBtn.css('background', '#8cff89');
        $sound4.play();
      }
      deactivateTimer = setTimeout(deactivateBtn, delay);
      i += 1;
    }
  }

  function playSeries() {
    i = 0;
    activateTimer = setInterval(activateBtn, delay * 2);
  }

  function check() {
    if (score > 4) {
      delay = 800;
    } else if (score > 9) {
      delay = 600;
    } else if (score > 14) {
      delay = 400;
    }
    if (j == series.length - 1) {
      if (userInput[j] === series[j]) {
        score += 1;
        if (score === 20) {
          $score.text('You win!');
          allowClick = 0;
        } else {
          $score.text('Score: ' + score);
          userInput = [];
          j = 0;
          newStep();
        }
      } else {
        if (mode === "normal") {
          $score.text('!!');
          $score.css('color', 'red');
          setTimeout(function() {
            $score.text('Score: ' + score);
            $score.css('color', 'black');
          }, 1000);
          userInput = [];
          j = 0;
          playSeries();
        } else {
          $score.text('!!');
          $score.css('color', 'red');
          setTimeout(reset, 1000);
        }
      }
    } else {
      if (userInput[j] === series[j]) {
        j += 1;
      } else {
        if (mode === "normal") {
         $score.text('!!');
          $score.css('color', 'red');
          setTimeout(function() {
            $score.text('Score: ' + score);
            $score.css('color', 'black');
          }, 1000);
          userInput = [];
          j = 0;
          playSeries();
        } else {
          $score.text('!!');
          $score.css('color', 'red');
          setTimeout(reset, delay);
        }
      }
    }
  }

  function reset() {
    delay = 1000;
    allowClick = 1;
    userInput = [];
    series = [];
    j = 0;
    score = 0;
    $score.css('color', 'black');
    $score.text('Score: ' + score);
    clearTimeout(deactivateTimer);
    clearInterval(activateTimer);
    newStep();
  }

  $reset.on('click', function(e) {
    e.preventDefault();
    reset();
  })

  $normal.on('click', function(e) {
    e.preventDefault();
    mode = "normal";
    $hard.removeClass('current');
    $(this).addClass('current');
  });

  $hard.on('click', function(e) {
    e.preventDefault();
    mode = "hard";
    $normal.removeClass('current');
    $(this).addClass('current');
  });

  //Manual CSS rules to avoid colour bug
  $redBtn.on('mousedown', function(e) {
    e.preventDefault();
    $(this).css('background', '#ff5656');
  });
  $redBtn.on('mouseup', function(e) {
    e.preventDefault();
    $(this).css('background', 'red');
  });
  $blueBtn.on('mousedown', function(e) {
    e.preventDefault();
    $(this).css('background', '#8a7fff');
  });
  $blueBtn.on('mouseup', function(e) {
    e.preventDefault();
    $(this).css('background', 'blue');
  });
  $yellowBtn.on('mousedown', function(e) {
    e.preventDefault();
    $(this).css('background', '#edfcab');
  });
  $yellowBtn.on('mouseup', function(e) {
    e.preventDefault();
    $(this).css('background', 'yellow');
  });
  $greenBtn.on('mousedown', function(e) {
    e.preventDefault();
    $(this).css('background', '#8cff89');
  });
  $greenBtn.on('mouseup', function(e) {
    e.preventDefault();
    $(this).css('background', 'green');
  });

  $start.on('click', function(e) {
    e.preventDefault();
    newStep();
    $start.hide();
    $reset.show();
  });
});
