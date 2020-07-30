class PostsController < ApplicationController

  def index #アクション定義
    @posts = Post.all#インスタンス変数=モデル.メソッド
  end

  def new #アクション定義
  end

  def create #アクション定義
    Post.create(content: params[:content])#モデル.メソッド（カラム名：送信データ）
  end

end
