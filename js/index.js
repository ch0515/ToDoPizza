const targetaddbtn = document.getElementById("add_btn");

targetaddbtn.addEventListener("click", () => {
  const container = document.createElement("div"); // container 요소 추가
  container.id = "container"; // container 요소의 아이디 설정
  const target2 = document.createElement("div");
  target2.id = "target2";
  target2.className = "target2";
  
  const truncatedTextId = "truncatedText"; // 잘려서 보이는 p 요소에 지정할 아이디
  
  const targetText = document.createElement("p");
  targetText.innerHTML = "목표 수정";
  // 목표 글씨 전체 보이게 하기
  targetText.setAttribute("title", targetText.innerHTML);
  targetText.id = "targetText2";
  targetText.className = "targetText2";
  const list_add_btn = document.createElement("input");
  list_add_btn.id = "list_add_btn";
  list_add_btn.className = "list_add_btn";

  // 글자 잘라내기
  const maxLength = 5; // 표시할 최대 글자 수
  const ellipsis = ".."; // 생략 부호

  // targetText 요소의 내용을 가져와서 maxLength를 초과하는 경우 잘라내는 함수
  function truncateText() {
    const text = targetText.innerHTML;
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength) + ellipsis;
      targetText.innerHTML = truncatedText;
    }
  }

  // 부모 요소에 추가하기
  container.appendChild(target2); // target2를 container에 추가
  document.body.appendChild(container); // container를 body에 추가
  target2.appendChild(targetText);
  target2.appendChild(list_add_btn);

  targetText.addEventListener("click", () => {
    truncateText();
  });

  // 초기에도 문자열 길이 확인 및 자르기 수행
  truncateText();

  // 잘려서 보이는 p 요소에 아이디 설정
  const truncatedTextElement = document.createElement("p");
  truncatedTextElement.id = truncatedTextId;

  // 추가한 p 요소에 대한 참조 유지
  target2.appendChild(truncatedTextElement);


  // 목표 삭제하기 + 후에 리스트 삭제하기
  target2.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // 기본 우클릭 메뉴 표시 방지
  
    // 확인 버튼을 눌렀을 때의 동작 정의
    function confirmAction() {
      // target2 요소 삭제
      target2.parentNode.removeChild(target2);
    }
  
    // 아니요 버튼을 눌렀을 때의 동작 정의
    function cancelAction() {
      // 아무 동작 없음
    }
  
    // 경고창 표시
    const result = confirm("목표를 삭제하시겠습니까?");
    if (result) {
      confirmAction();
    } else {
      cancelAction();
    }
  });
  
  // 목표 수정하기
  target2.addEventListener("dblclick", function(event) {
    const newGoal = prompt('새로운 목표를 입력하세요:');
    if (newGoal !== null) {
      // 확인 버튼을 눌렀을 때의 동작 정의
      function confirmAction() {
        targetText.textContent = newGoal;
      }
      // 경고창 표시
      const result = confirm("목표를 수정하시겠습니까?");
      if (result) {
        confirmAction();
      } else {
        cancelAction();
      }
    } else {
      // 아니요 버튼을 눌렀을 때의 동작 정의
      function cancelAction() {
        // 아무 동작 없음
      }
    }
  });
  
  // 리스트 추가하기
  list_add_btn.addEventListener("click", function () {
    var checkboxContainer = document.createElement("div");
    checkboxContainer.id = "checkboxContainer";
    // 체크박스 요소 생성
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // 체크박스에 대한 레이블 생성
    var label = document.createElement("label");
    var labelText = prompt("리스트 텍스트를 입력하세요:");
    label.appendChild(document.createTextNode(labelText));

    // 체크박스와 레이블을 컨테이너에 추가
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // 컨테이너를 container 아래에 추가
    container.appendChild(checkboxContainer);
  });
});
