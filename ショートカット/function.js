const Shortcut = {

    /**
     * 現在のIDを格納
     * @property {number} id
     * @private
     */
    id = 1,

    /**
     * 押されたかを確認する登録されたショートカット情報一覧
     * @private
     * @property {Object} keyDowns
     * @property {Object.<number,object>} keyDowns.id id自体はidsプロパティに列挙されている
     * @property {Object.<string, boolean>} keyDowns.id.keys setで登録されたキーをプロパティとしたオブジェクト。押されていたらtrueにする
     * @property {function} keyDowns.id.callback ショートカットキーが押されたときに実行する関数
     */
    // keyDowns = {
    //     0: {
    //         keys: {
    //             ctrl: false,
    //             a: false,
    //             f: false
    //         },
    //         callback: () => {alert("use shortcut");}
    //     }
    // };
    keyDowns = {},

    /**
     * 全てのキーが押されているかどうか
     * @private
     * @returns {function[]} 押されていたら実行する関数を配列で返す
     */
    KeyDownFunctions() {

        const functionArray = [];
        Object.keys(this.keyDowns).forEach((id) => {
            
            let result = true;
            Object.keys(this.keyDowns[id].keys).forEach((index) => {
                // 値が一つでもfalseなら
                if (this.keyDowns[index] === false) {
                    result = false;
                }
            })
            
            // 押されていたら関数を追加する
            if (result === true) {
                functionArray.push(this.keyDowns[id].callback);
            }
        });
        return functionArray;
    },

    /**
     * ショートカットキーを定義する。
     * 
     * @param {string|string[]} keys - このショートカットが押されたときに実行する。
     * また、定義はすべてKeyboardEvent.keyで表示されるものとする。
     * 
     * @param {function} callback - ショートカットをが押されたときに実行する関数
     * 
     * @example shortcut.add(["Shift", "A"], ()=>{alert("Use shortcut");})
     * @returns {boolean|false} ショートカット定義に成功したらショートカットID, 失敗したらfalse
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
        
        console.log(Shortcut.prototype);

        
        // 問題なければ代入
        this.keyDowns[this.id].keys = resultKeyDowns;
        this.keyDowns[this.id].callback = callback;



        
        // 押されたとき
        document.addEventListener("keydown", (event) => {
            
            const key = event.key;
            // 存在したら
            if (typeof this.keyDowns[key] !== "undefined") {
                this.keyDowns[this.id].keys[key] = true;

                // 押されてる関数を実行
                this.#KeyDownFunctions.forEach((func) => {
                    func();
                })
            }
        });

        // 押しているのを外した時
        document.addEventListener("keyup", (event) => {
            const key = event.key;
            // 存在したら
            if (typeof this.keyDowns[key] !== "undefined") {
                this.keyDowns[key] = false;
            }
        });

        return this.id;
    }
}

console.log("shortcutクラスだよ");