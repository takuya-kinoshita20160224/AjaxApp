class PostsController < ApplicationController

  def index #アクション定義
    @posts = Post.all.order(id: "DESC")#インスタンス変数=モデル.メソッド
  end

  def create #アクション定義
    Post.create(content: params[:content])#モデル.メソッド（カラム名：送信データ）
    redirect_to action: :index  #indexアクションにリダイレクト
  end
  
  def checked
    post = Post.find(params[:id]) #指定のレコード一つをpostに代入
    if post.checked then #レコードのcheckedカラムの値がtrue(既読)だと
      post.update(checked: false) #checkedカラムの値をfalseにして保存
    else #レコードのcheckedカラムの値がfalse(未読)だと
      post.update(checked: true)  #checkedカラムの値をtrueにして保存
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
