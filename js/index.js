const targetaddbtn = document.getElementById("add_btn");
const dropbtn_icon = document.getElementsByClassName('dropbtn_icon');

const toppings = {
  "ham": false,
  "mushroom": false,
  "olive": false,
  "onion": false,
  "paprika": false,
  "pimento": false,
  "tomato": false
}

targetaddbtn.addEventListener("click", () => {
  // let a;
  // a++;
  const container = document.createElement("div");
  container.className = "container todo-container";
  const target2 = document.createElement("div");
  target2.id = "target2";
  target2.className = "target2";

  // 토핑 선택을 위한 prompt 창
  const selectedTopping = prompt("토핑을 선택하세요: \n1. 햄   2. 버섯   3. 올리브   4. 양파   5. 파프리카   6. 피망   7. 토마토");

  // 선택한 토핑 이미지 설정
  const toppingimg = document.createElement('img');
  toppingimg.id = "toppingimg";
  toppingimg.className = "toppingimg";
  let newImgsrc;

  switch (selectedTopping) {
    case "1":
      toppingimg.src = '../img/ham.png';
      newImgsrc = '../img/hamT.png';
      break;
    case "2":
      toppingimg.src = '../img/mushroom.png';
      newImgsrc = '../img/mushroomT.png';
      break;
    case "3":
      toppingimg.src = '../img/olive.png';
      newImgsrc = '../img/oliveT.png';
      break;
    case "4":
      toppingimg.src = '../img/onion.png';
      newImgsrc = '../img/onionT.png';
      break;
    case "5":
      toppingimg.src = '../img/paprika.png';
      newImgsrc = '../img/paprikaT.png';
      break;
    case "6":
      toppingimg.src = '../img/pimento.png';
      newImgsrc = '../img/pimentoT.png';
      break;
    case "7":
      toppingimg.src = '../img/tomato.png';
      newImgsrc = '../img/tomatoT.png';
      break;
    default:
      alert("올바른 토핑 번호를 입력하세요.");
      return;
  }

  const truncatedTextId = "truncatedText";

  const targetText = document.createElement("p");
  targetText.innerHTML = "목표 수정";
  // 목표 글씨 전체 보이게 하기
  targetText.setAttribute("title", targetText.innerHTML);
  targetText.id = "targetText2";
  targetText.className = "targetText2";
  const list_add_btn = document.createElement("input");
  list_add_btn.id = "list_add_btn";
  list_add_btn.className = "list_add_btn";

  // 글자수 제한
  const maxLength = 5;
  const ellipsis = "..";

  function truncateText() {
    const text = targetText.innerHTML;
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength) + ellipsis;
      targetText.innerHTML = truncatedText;
    }
  }

  // 부모 요소에 추가하기
  document.body.appendChild(container);
  container.appendChild(target2);
  target2.appendChild(toppingimg);
  target2.appendChild(targetText);
  target2.appendChild(list_add_btn);


  targetText.addEventListener("click", () => {
    truncateText();
  });

  truncateText();

  // 잘려서 보이는 p 요소에 아이디 설정
  const truncatedTextElement = document.createElement("p");
  truncatedTextElement.id = truncatedTextId;

  // p에 대한 참조 유지
  target2.appendChild(truncatedTextElement);

  // 목표 삭제하기 목표 삭제시 리스트도 삭제됨
  target2.addEventListener("contextmenu", function (event) {
    event.preventDefault();

    function confirmAction() {
      target2.parentNode.removeChild(target2);
      container.parentNode.removeChild(container);
    }

    function cancelAction() {
      // 동작 없음
    }

    const result = confirm("목표를 삭제하시겠습니까?");
    if (result) {
      confirmAction();
    } else {
      cancelAction();
    }
  });

  target2.addEventListener("dblclick", function (event) {
    const newGoal = prompt('새로운 목표를 입력하세요:');
    if (newGoal !== null) {
      function confirmAction() {
        targetText.textContent = newGoal;
      }
      const result = confirm("목표를 수정하시겠습니까?");
      if (result) {
        confirmAction();
      } else {
        cancelAction();
      }
    } else {
      function cancelAction() {
        // 동작 없음
      }
    }
  });

  // 리스트&목표 완료 토핑 올라가는 이벤트
  // 리스트의 개수 추적
  var listCount = 0;

  // 리스트 개수만큼 업데이트
  function updateListCount(change) {
    listCount += change;
    console.log(listCount);
  }

  // 체크박스 상태 변경을 체크함
  function handleCheckboxChange() {
    console.log("handleCheckboxChange");
    const containers = document.querySelectorAll(".todo-container");
    for(const container of containers) {
      const checkboxes = container.querySelectorAll("input[type=checkbox]");
      let checkedCount = 0;
      if(checkboxes.length !== 0) {
        for(const checkbox of checkboxes) {
          if(checkbox.checked) checkedCount++;
        }
        const tmp = container.querySelector(".toppingimg").src.split('/');
        const topping = tmp[tmp.length - 1].split(".")[0];
        if(checkedCount === checkboxes.length) {  
          console.log(topping);
          toppings[topping] = true;
        } else {
          toppings[topping] = false;
        }
        decoratePizza();
      }

    }
    function decoratePizza() {
      const pizzaToppings = document.querySelector(".pizza").querySelectorAll("img.toppings");
      for(const t of pizzaToppings) {
        const tmp =  t.src.split('/');
        let topping = tmp[tmp.length - 1].split(".")[0];
        topping = topping.replace("T", "");
        t.style.visibility = toppings[topping] ? "visible" : "hidden";
      }

    }
    // debugger;
    /*
    var checkboxes = document.querySelectorAll('.checkbox');
    var pizza = document.getElementById('pizza');
    var allChecked = true;

    checkboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        allChecked = false;
      }
    });

    if (allChecked) {
      // 알맞은 toppings visible~! 토핑 나타나게!!
      // 체크박스가 모두 체크되었을 때!

      // .toppings 이미지 요소들을 가져옵니다.
      var toppings = document.querySelectorAll('.toppings');

      // 선택된 토핑 번호에 해당하는 이미지들을 표시하고, 나머지 이미지들은 숨깁니다.
      toppings.forEach(function (topping) {
        var toppingNumber = topping.dataset.toppingNumber;

        if (toppingNumber === selectedTopping) {
          var newImg = document.createElement("img");
          newImg.id = "newImg";
          newImg.className = "newImg";
          newImg.src = newImgsrc;
          newImg.style.visibility = "visible";
          pizza.appendChild(newImg);
        } else {
          var newImg = document.createElement("img");
          newImg.id = "newImg";
          newImg.className = "newImg";
          newImg.src = newImgsrc;
          newImg.style.visibility = "hidden";
          pizza.appendChild(newImg);
        }
      });
      
    } else {
      // 체크박스가 하나라도 체크가 덜 되었을 때!
      var toppings = document.querySelectorAll('.newImg');
      toppings.forEach(function (topping) {
        topping.style.visibility = "hidden";
      });
    }
    */
  }


  // 리스트 추가
  list_add_btn.addEventListener("click", function () {
    var labelText = prompt("리스트 텍스트를 입력하세요:");
    if (labelText !== null && labelText !== "") {
      var checkboxContainer = document.createElement("div");
      checkboxContainer.id = "checkboxContainer";
      // 체크박스 요소 생성
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add('checkbox'); // 클래스 추가

      // 체크박스에 대한 레이블 생성
      var label = document.createElement("label");
      label.appendChild(document.createTextNode(labelText));

      // 체크박스와 레이블을 컨테이너에 추가
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);

      // 컨테이너를 container 아래에 추가
      container.appendChild(checkboxContainer);

      // 리스트 개수 업데이트
      updateListCount(1);

      // 체크박스 상태 변경 처리
      checkbox.addEventListener('change', handleCheckboxChange);

      // 이미지 숨기기
      var topping = document.querySelectorAll('.topping');
      topping.forEach(function (topping) {
        topping.style.visibility = "hidden";
      });

    }


    // 리스트 삭제
    checkboxContainer.addEventListener("contextmenu", function (event) {
      event.preventDefault();

      function confirmAction() {
        checkboxContainer.parentNode.removeChild(checkboxContainer);
      }

      function cancelAction() {
        // 동작 없음
      }

      const result = confirm("리스트를 삭제하시겠습니까?");
      if (result) {
        confirmAction();
      } else {
        cancelAction();
      }
    });

    // 리스트 수정
    checkboxContainer.addEventListener("dblclick", function (event) {
      const newGoal = prompt('새로운 리스트를 입력하세요:');
      if (newGoal !== null) {
        function confirmAction() {
          label.textContent = newGoal;
        }

        const result = confirm("리스트를 수정하시겠습니까?");
        if (result) {
          confirmAction();
        } else {
          cancelAction();
        }
      } else {
        function cancelAction() {
          // 동작 없음
        }
      }
    });
  });
});