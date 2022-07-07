
const Shortcut = new class Shortcut {

    /**
     * 現在のIDを格納
     * @property {number} id
     * @private
     */
    #id = 1;

    
    /**
     * 押されたかを確認する登録されたショートカット情報一覧
     * @private
     * @property {Object} downKeys
     * @property {Object.<number,object>} downKeys.id id自体はidsプロパティに列挙されている
     * @property {Object.<string, boolean>} downKeys.id.keys setで登録されたキーをプロパティとしたオブジェクト。押されていたらtrueにする
     * @property {function} downKeys.id.callback ショートカットキーが押されたときに実行する関数
     */
    #downKeys = {};



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
        
        
        // 配列なら
        const resultKeyDowns = {};
        if (typeof keys === "object") {

            // 値を全てプロパティとして格納
            keys.forEach((value) => {

                // 文字列以外なら失敗
                if (typeof value !== "string") {
                    return false;
                }
                resultKeyDowns[value] = false;
            });
        }
        // 文字列なら
        else if (typeof keys === "string") {
            resultKeyDowns[keys] = false;
        }
        // それ以外は失敗として、falseを返す。
        else {
            return false;
        }
        

        // 第二引数が関数じゃなければ失敗
        if (typeof callback !== "function") {
            return false;
        }
        

        
        // 問題なければ代入
        this.keyDowns[this.id].keys = resultKeyDowns;
        this.keyDowns[this.id].callback = callback;


        const addEventListenerDown = (event) => {
            
            const key = event.key;
            // 存在したら
            if (typeof this.keyDowns[this.#id].keys[key] !== "undefined") {
                this.keyDowns[this.#id].keys[key] = true;

                // 押されてる関数を実行
                this.#getDownKeyFunction();
            }
        }


        
        // 押されたとき
        document.addEventListener("keydown", addEventListenerDown);

        // 押しているのを外した時
        document.addEventListener("keyup", (event) => {
            const key = event.key;
            // 存在したら
            if (typeof this.keyDowns[key] !== "undefined") {
                this.keyDowns[this.#id].keys[key] = false;
            }
        });

        return this.id;
    }

    b() {
        console.log(this.#id);
        this.#id++;
    }
};
