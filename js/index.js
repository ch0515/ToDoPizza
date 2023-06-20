const targetaddbtn = document.getElementById("add_btn");
const dropbtn_icon = document.getElementsByClassName('dropbtn_icon');

targetaddbtn.addEventListener("click", () => {
  const container = document.createElement("div");
  container.id = "container";
  const target2 = document.createElement("div");
  target2.id = "target2";
  target2.className = "target2";

  // 토핑 선택을 위한 prompt 창
  const selectedTopping = prompt("토핑을 선택하세요: \n1. 햄   2. 버섯   3. 올리브   4. 양파   5. 파프리카   6. 피망   7. 토마토");

  // 선택한 토핑 이미지 설정
  const toppingimg = document.createElement('img');
  toppingimg.id = "toppingimg";
  toppingimg.className = "toppingimg";

  switch (selectedTopping) {
    case "1":
      toppingimg.src = '../img/ham.png';
      break;
    case "2":
      toppingimg.src = '../img/mushroom.png';
      break;
    case "3":
      toppingimg.src = '../img/olive.png';
      break;
    case "4":
      toppingimg.src = '../img/onion.png';
      break;
    case "5":
      toppingimg.src = '../img/paprika.png';
      break;
    case "6":
      toppingimg.src = '../img/pimento.png';
      break;
    case "7":
      toppingimg.src = '../img/tomato.png';
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
  target2.appendChild(toppingimg);
  container.appendChild(target2);
  document.body.appendChild(container);
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

  // 목표 삭제하기
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

  const toppingContainer = document.createElement("div");
  toppingContainer.id = "toppingContainer";

  for (let i = 0; i < toppingOptions.length; i++) {
    const toppingOption = document.createElement("div");
    toppingOption.className = "toppingOption";

    const toppingRadio = document.createElement("input");
    toppingRadio.type = "radio";
    toppingRadio.name = "topping";
    toppingRadio.value = toppingOptions[i];

    const toppingLabel = document.createElement("label");
    toppingLabel.innerHTML = toppingOptions[i];

    toppingOption.appendChild(toppingRadio);
    toppingOption.appendChild(toppingLabel);
    toppingContainer.appendChild(toppingOption);
  }

  container.appendChild(toppingContainer);

  list_add_btn.addEventListener("click", function () {
    var labelText = prompt("리스트 텍스트를 입력하세요:");
    if (labelText !== null && labelText !== "") {
      var checkboxContainer = document.createElement("div");
      checkboxContainer.id = "checkboxContainer";
      // 체크박스 요소 생성
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
  
      // 체크박스에 대한 레이블 생성
      var label = document.createElement("label");
      label.appendChild(document.createTextNode(labelText));
  
      // 체크박스와 레이블을 컨테이너에 추가
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
  
      // 컨테이너를 container 아래에 추가
      container.appendChild(checkboxContainer);
    }
  });
  // 리스트 추가하기
  list_add_btn.addEventListener("click", function () {
    var labelText = prompt("리스트 텍스트를 입력하세요:");
    if (labelText !== null && labelText !== "") {
      var checkboxContainer = document.createElement("div");
      checkboxContainer.id = "checkboxContainer";
      // 체크박스 요소 생성
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // 체크박스에 대한 레이블 생성
      var label = document.createElement("label");
      label.appendChild(document.createTextNode(labelText));

      // 체크박스와 레이블을 컨테이너에 추가
      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);

      // 컨테이너를 container 아래에 추가
      container.appendChild(checkboxContainer);
    }
  });
});