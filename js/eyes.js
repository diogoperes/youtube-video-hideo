const pupils = {};
var x = document.querySelectorAll(".pupil1");
let n_pupils;
let n_eyes;
let eyePositionList = [];
let pupil_size;
let container;
let exterior;
let pupil;
let eye;
let xGap = 300;
let yGap = 200;
let numberOfTriesToRedraw = 5;
let x_areaOfNoDraw = 1.2;
let y_areaOfNoDraw = 1.5;
let containerAreaRect;

window.onload = () => {
  mount();

}

 $(window).on('resize', () => {
   eyePositionList = [];
   $('.eye').remove();
   mount() ;
 });

function mount() {
  //n_pupils = document.getElementsByClassName("pupil1");
  // $('.eye').css({
  //   'width': '90px',
  //   'height': '90px',
  // });
  container = document.getElementById("eyesContainer");
  containerAreaRect = new Rect($('#eyesContainer').offset().left, $('#eyesContainer').offset().top, $('#eyesContainer').width(), $('#eyesContainer').height());

  //console.log(container);

  eye = $('<div />', {
    id: 'eye',
    class: 'eye'
  });
  eye.appendTo(container);

  var exterior = $('<img />', {
    id: 'exterior',
    src: './assets/images/eye.svg',
    alt: 'eye'
  });
  exterior.css({
    'width': container.clientWidth / 10 + 'px',
    'height': container.clientWidth / 10 + 'px'
  });
  exterior.appendTo(eye);

  pupil = $('<img />', {
    id: 'pupil',
    src: './assets/images/pupil.svg',
    class: 'pupil1',
    alt: 'pupil'
  });
  pupil.css({
    'width': $('.eye')[0].clientWidth / 3 + 'px',
    'height': $('.eye')[0].clientWidth / 3 + 'px'
  });
  pupil.appendTo(eye);

  // exterior = $('#exterior').css({
  //   'width': container.clientWidth / 10 + 'px',
  //   'height': container.clientWidth / 10 + 'px'
  // });

  // pupil = $('.pupil1').css({
  //   'width': $('.eye')[0].clientWidth / 3 + 'px',
  //   'height': $('.eye')[0].clientWidth / 3 + 'px'
  // });

  xGap = container.clientWidth / 4;
  yGap = container.clientHeight / 4;

  n_pupils = document.getElementsByClassName("pupil1");
  n_eyes = document.getElementsByClassName("eye");
  pupil_size = n_pupils[0].clientWidth;

  eye = $('#eye');

  //$('#eye').css({'opacity' : 0});
  // addEye(80, 50);
  // addEye(270, 110);
  // addEye(557, 34);
  drawEyes();
  //$('#eye').remove();
}

// function drawEyes(){
//   let n_iterations_x = Math.floor(container.clientWidth / xGap);
//   let n_iterations_y = Math.floor(container.clientHeight / yGap);
//   for(let i = 0; i < n_iterations_x; i++) {
//     for(let j = 0; j < n_iterations_y; j++) {
//       addEye(getRndInteger(xGap*i, xGap*i+xGap-120) , getRndInteger(yGap*j+40, yGap*j+yGap-80));
//     }
//   }
// }

function drawEyes() {

  for (var i = 0; i < numberOfTriesToRedraw; i++) {
    let x = getRndInteger(0, container.clientWidth - eye[0].clientWidth)
    let y = getRndInteger(0, container.clientHeight - eye[0].clientHeight)
    if (canDrawInPosition(x, y)) {
      addEye(x, y);
      eyePositionList.push(new Rect(x, y, eye[0].clientWidth * x_areaOfNoDraw, eye[0].clientHeight * y_areaOfNoDraw));
      i = 0;
    }
  }

}

function canDrawInPosition(x, y) {
  if (eyePositionList.length > 0) {
    for (var i = 0; i < eyePositionList.length; i++) {
      // console.log(eyePositionList[i].intersect(x, y, eye[0].clientWidth*x_areaOfNoDraw, eye[0].clientHeight*y_areaOfNoDraw));
      if (eyePositionList[i].intersect(x, y, eye[0].clientWidth * x_areaOfNoDraw, eye[0].clientHeight * y_areaOfNoDraw)) {
        return false;
      }
    }
  }
  return true;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addEye(x, y) {
  eye.css({
    'top': y + 'px',
    'left': x + 'px'
  });
  eye.clone().appendTo(container);
}

// for (var i = x.length - 1; i >= 0; i--) {
//   var blinkName = "blink" + Math.floor(Math.random() * 9 + 1);
//   x[i].style.animation = blinkName + " 5s infinite";
// }
//
// var x = document.querySelectorAll(".pupil2");
// for (var i = x.length - 1; i >= 0; i--) {
//   var blinkName = "blink" + Math.floor(Math.random() * 9 + 1);
//   x[i].style.animation = blinkName + " 5s infinite";
// }

window.onmousemove = e => {
  // console.log(e.clientX, e.clientY);

  for (var n in n_eyes) {
    if (isInt(n)) {
      const eye = {
        center_x: $(n_eyes[n]).offset().left + n_eyes[n].clientWidth / 2,
        center_y: $(n_eyes[n]).offset().top + n_eyes[n].clientHeight / 2
      };
      const m = {
        x: e.pageX - eye.center_x,
        y: e.pageY - eye.center_y
      }

      let pupil = n_eyes[n].getElementsByClassName("pupil1")[0];
      const distance = Math.min(pupil_size / 3, Math.sqrt(m.x ** 2 + m.y ** 2));
      const angle = Math.atan2(m.y, m.x);
      m.rx = distance * Math.cos(angle);
      m.ry = distance * Math.sin(angle);
      pupil.style.top = m.ry + 3 + n_eyes[n].clientHeight / 2 + 'px';
      pupil.style.left = m.rx + n_eyes[n].clientWidth / 2 + 'px';

      // console.log(Math.sqrt(m.x ** 2 + m.y ** 2));
    }


  }

}

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function Rect(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  // console.log(arguments);

  this.contains = function(x, y) {
    return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
  }

  this.intersect = function(x, y, w, h) {
    return x <= this.x + this.width && this.x <= x + w && y <= this.y + this.height && this.y <= y + h;
  }

}
