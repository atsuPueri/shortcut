# ショートカットを定義します。

ショートカットを定義する事ができます、Shortcutというオブジェクトを制作しました、このオブジェクトには２種類のメソッドを定義しています。

## メソッド一覧

### add

Shortcut.add(string | string[], function);

このメソッドでショートカットを追加することができます。
返り値として数値を返していますが、これは後ほど記述するremoveメソッドで使用します。

#### 返り値
number id 追加したショートカットを識別するID

### remove

Shortcut.remove(number);

このメソッドで定義されたショートカットを削除する事ができます。
引数の数値はショートカット定義時に返される値を与えます。

#### 返り値
boolean 削除に成功したときにtrue, 失敗時にfalseを返します。


## 例

``` js
// a,s,dの３つのキーが押された時に第二引数の関数が実行されます。
const id1 = Shortcut.add(["a", "s", "d"], ()=>{
    console.log("use shortcut");
});

// 単一の文字列でも定義できますが、ユーザーが誤操作する事もあるので注意しましょう。
const id2 = Shortcut.add("r", ()=>{
    Shortcut.remove(id1);
    Shortcut.remove(id2);
});

```
