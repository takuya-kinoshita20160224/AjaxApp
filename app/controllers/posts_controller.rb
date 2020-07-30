class PostsController < ApplicationController

  def index #アクション定義
    @posts = Post.all.order(id: "DESC")#インスタンス変数=モデル.メソッド
  end

  def create #アクション定義
    Post.create(content: params[:content])#モデル.メソッド（カラム名：送信データ）
    redirect_to action: index  #indexアクションにリダイレクト
  end
  
  def checked
    post = Post.find(params[:id])
    if post.checked then
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    
    item = Post.find(params[:id])
    render json: { post: item }
  end
end
