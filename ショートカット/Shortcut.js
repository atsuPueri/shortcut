
const Shortcut = new class Shortcut {

    /**
     * 現在のIDを格納
     * @private
     * @property {number} id
     */
    #id = 1;

    
    /**
     * 押されたかを確認する登録されたショートカット情報一覧
     * @private
     * @property {Object} downKeys
     * @property {Object.<number,object>} downKeys.#id id自体はidsプロパティに列挙されている
     * @property {Object.<string, boolean>} downKeys.#id.keys setで登録されたキーをプロパティとしたオブジェクト。押されていたらtrueにする
     * @property {function} downKeys.#id.callback ショートカットキーが押されたときに実行する関数
     */
    #downKeys = {};

    /*
    　例：
     {
        0: {
            keys: {
                Ctrl: false,
                t: false
            },
            listener: {
                keyup: キーが上がった時のリスナー
                keydown: キーが下がった時のリスナー
            }
        }
     }
     */



    /**
     * 指定のIDのショートカットキーが押されているか
     * @private
     * @param {number} id
     * @returns {boolean} 押されていたらtrue
     */
    #isDownKey(id) {
            
        // 実行時に押されているかを確認
        let result = true;
        Object.keys(this.#downKeys[id].keys).forEach((index) => {
            // 値が一つでもfalseなら
            if (this.#downKeys[index].keys[index] === false) {
                result = false;
            }
        })

        return result;
    }
    


    /**
     * ショートカットキーを定義する。
     * 
     * @param {string|string[]} keys - このショートカットが押されたときに実行する。
     * また、定義はすべてKeyboardEvent.keyで表示されるものとする。
     * 
     * @param {function} callback - ショートカットをが押されたときに実行する関数
     * 
     * @example Shortcut.add(["Shift", "A"], ()=>{alert("Use shortcut");})
     * @returns {number|false} ショートカット定義に成功したらショートカットID, 失敗したらfalse
     */
     add(keys, callback) {
        
        const id = this.#id;

        /** @var {object} id毎に格納されるオブジェクト */
        const resultDownKeys = {};

        /** @var {object} key一覧を格納 */
        const resultKeys = {};
        // 配列なら
        if (typeof keys === "object") {

            // 値を全てプロパティとして格納
            keys.forEach((value) => {

                // 文字列以外なら失敗
                if (typeof value !== "string") {
                    return false;
                }
                resultKeys[value] = false;
            });
        }
        // 文字列なら
        else if (typeof keys === "string") {
            resultKeys[keys] = false;
        }
        // それ以外は失敗として、falseを返す。
        else {
            return false;
        }
        

        // 第二引数が関数じゃなければ失敗
        if (typeof callback !== "function") {
            return false;
        }
        

        // キーを格納
        resultDownKeys.keys = resultKeys;////////////////////////////////////////
        
        // 問題なければ代入
        this.#downKeys[id].keys = resultKeyDowns;


        this.#downKeys[id].listener.keydown = (event) => {
            
            const key = event.key;
            // 存在したら
            if (typeof this.#downKeys[id].keys[key] !== "undefined") {
                this.#downKeys[id].keys[key] = true;

                // 押されてる関数を実行
                if (this.#isDownKey(id)) {
                    callback();
                }
            }
        }
        this.#downKeys[id].listener.keyup = (event) => {
            const key = event.key;
            // 存在したら
            if (typeof this.#downKeys[key] !== "undefined") {
                this.#downKeys[id].keys[key] = false;
            }
        }


        
        // 押されたとき
        document.addEventListener("keydown", this.#downKeys[id].listener.keyup);

        // 押しているのを外した時
        document.addEventListener("keyup", this.#downKeys[id].listener.keydown);

        // 次のIDへ進める
        this.#id++;
        return id;
    }


    /**
     * セットしたショートカットを削除する
     * @param {number} id 
     * @returns {boolean} 削除に成功したらtrue 失敗したらfalse
     */
    remove(id) {

        // number以外なら
        if (typeof id !== "number") {
            return false;
        }

        // イベントを削除
        document.removeEventListener("keydown", this.#downKeys[id].listener.keydown);
        document.removeEventListener("keyup", this.#downKeys[id].listener.keyup);

        delete this.#downKeys[id];

        if (typeof this.#downKeys[id] !== "undefined") {
            return false;
        }

        return true;
    }

};
