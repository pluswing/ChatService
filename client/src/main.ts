const connection = new WebSocket('ws://localhost:3000');
connection.onopen = function () {
    // メッセージの送信
    connection.send('こんにちは世界');
};

// エラーが出た場合
connection.onerror = function (error) {
    console.error(error);
};

// メッセージを受け取った場合
connection.onmessage = function (e) {
    console.log(e);
};
