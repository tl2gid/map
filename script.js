window.onload = function(){


var zoomImage = document.getElementById('map');
var zone = document.querySelectorAll('.map-btn');

//.map-btn의 애니메이션 재실행 이벤트
var setAnimation = function() {
  zone.forEach(function(zone) {
    zone.style.animation = 'zone 1.5s infinite';
  });
};

zone.forEach(function(button) {
  button.addEventListener('click', function() {
    var target = button.dataset.target;
    var list = document.getElementById(target);

    // 모든 .list 요소를 검사하여 display 상태 확인
    var lists = document.querySelectorAll('.list');
    var isListDisplayed = Array.from(lists).some(function(list) {
      return getComputedStyle(list).display === 'block';
    });

    // .list가 하나라도 display: block이면 클릭 이벤트 처리
    if (isListDisplayed) {
      resetTransform();
      lists.forEach(function(list) {
        list.style.display = 'none';
        setAnimation();
      });
      return;
    }

    // .list 요소들의 애니메이션 멈추기
    zone.forEach(function(zone) {
      zone.style.animation = 'none';
    });

    if (list) {
      var otherLists = document.querySelectorAll('.list:not(#' + target + ')');
      otherLists.forEach(function(otherList) {
        otherList.style.display = 'none';
      });

      if (list.style.display !== 'block') {
        list.style.display = 'block';
        setTransform(list, button);
      }
    }
  });
});

// .list 부분 클릭시 resetTransfrom() 작동 x
document.querySelectorAll('.list').forEach(function(list) {
  list.addEventListener('click', function(event) {
    event.stopPropagation(); // 이벤트 전파(stopPropagation) 막음
  });
});

//다른곳 클릭시 list resetTransform() 실행
document.addEventListener('click', function(event) {
  var target = event.target;

  // 클릭한 요소가  .map-btn 요소인지 확인
  if (!target.classList.contains('map-btn')) {
    var otherLists = document.querySelectorAll('.list');
    otherLists.forEach(function(otherList) {
      otherList.style.display = 'none';
    });
    setAnimation();
    resetTransform();
  }
});

// .list와 클릭된 버튼에 대해 transform 값을 설정하는 함수
function setTransform(list, button) {
  var rect = button.getBoundingClientRect();
  var offsetX = (rect.left + rect.width / 2 - window.innerWidth / 2) * 1.5;
  var offsetY = rect.top + rect.height / 2 - window.innerHeight / 2;

  zoomImage.style.transform = 'scale(1.5) translate(' + -offsetX + 'px, ' + -offsetY + 'px)';
  zoomImage.style.transition = '0.6s';
 
}

// transform 값을 초기화하는 함수
function resetTransform() {
  zoomImage.style.transform = 'scale(1) translate(0, 0)';
  zoomImage.style.transition = '0.6s';
}

    

}   

