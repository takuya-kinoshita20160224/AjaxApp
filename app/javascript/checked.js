function check() { //関数checkを宣言
  const posts = document.getElementsByClassName("post"); //変数postsにclass名がpostの要素を代入（投稿一つ一つ）
  postsA = Array.from(posts); //postsAに変数postsの値を配列に変換して代入

  postsA.forEach(function (post) { //postAの要素を一つずつpostに代入していく
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => { //post(投稿)がクリックされると起こることを以下に記述

      const postId = post.getAttribute("data-id"); //投稿一つ一つのidをpostIdに代入

      const XHR = new XMLHttpRequest(); //変数XHRを定義これでXMLHttpRequestのメソッドが使用可能

      XHR.open("GET", `/posts/${postId}`, true); //リクエスト指定(HTTPメソッド,パス,非同期通信)

      XHR.responseType = "json"; //レスポンスの形式をjsonに指定

      XHR.send(); //情報を送るわけではないので引数指定はなくて良い。これを記述して初めてリクエスト送信できる

      XHR.onload = () => { //レスポンスが成功した時に以下が呼び出される
        const item = XHR.response.post; //item = Post.find(params[:id])の値を変数itemに代入している
        if (item.checked === true) { //指定したレコードのcheckedカラムの値がtrueだと
          post.setAttribute("data-check", "true"); //data-checkの値をtrueに変更(灰色に変わる)
        } else if (item.checked === false) { //指定したレコードのcheckedカラムの値がfalseだと
          post.removeAttribute("data-check"); //data-check属性を取り除く
        }
        if (XHR.status != 200) { //レスポンスステータスが200以外(エラー)だったら
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //エラー文表示
        } else {
          return null; //レスポンス処理が成功だったら何もない
        }
      }; //ここまでがXHR.onload

      XHR.onerror = () => { //もしリクエストが失敗したら以下を処理する
        alert("Request failed"); //エラー文表示
      };

      e.preventDefault(); //addEventListener("click"をキャンセル

    }); //ここまでがaddEventListener("click",

  }); //ここまでがforEach文
}
setInterval(check, 1000); //1秒ごとに関数checkを実行(関数, 時間(ミリ秒))

window.addEventListener("load", check);

