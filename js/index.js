const targetaddbtn = document.getElementById("add_btn");

targetaddbtn.addEventListener("click", () => {
  /* 
        <div class="target" id="target">
          <p class="targetText">학교</p>
          <input type="button" class="list_add_btn" id="list_add_btn">
        </div> */
  const target2 = document.createElement("div");
  target2.id = "target2";
  target2.className = "target2";
  const targetText = document.createElement("p");
  targetText.id = "targetText2";
  targetText.className = "targetText2";
  const list_add_btn = document.createElement("input");
  list_add_btn.id = "list_add_btn";
  list_add_btn.className = "list_add_btn";

  //부모요소에 추가하기
  document.body.appendChild(target);
  document.body.appendChild(targetText);
  document.body.appendChild(list_add_btn);
  target2.appendChild(targetText);
  target2.appendChild(list_add_btn);
});

