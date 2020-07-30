function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); //リクエスト指定(HTTPメソッド,パス,非同期通信)
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      const item = XHR.response.post; //メモのレコードデータをitemに代入
      const list = document.getElementById("list"); //idがlistの要素を取得
      const formText = document.getElementById("content"); //idがcontentの要素を取得（入力フォーム）
      //以下はブラウザで表示されるhtml
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML); //list要素の直後に上記のhtmlを挿入

      formText.value = ""; //入力フォームに入力された文字をリセット

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    }; //ここまでがonloadの処理
    XHR.onerror = function () {
      alert("Request failed");
    };
    e.preventDefault();
  }) //ここまでがaddEventListener("click"
}
window.addEventListener("load", memo);