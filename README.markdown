# 出退勤表示板HTML

会社で使われている行動予定表の出退勤表示マグネットの位置を、
出勤時と退勤時に手で操作するのが面倒なのと、たまに操作するのを忘れるので、
REST APIで操作可能なものを作りました。

![出退勤表示写真](../img/syuttaikinBoard.jpg)

LyncプレゼンスがOfflineかどうかを取得して、
出退勤表示板のdevice shadowのREST APIをたたく形で使っています。

部内全員分の表示・操作も想定して、
ユーザが直接手で操作することもできるようにするため、
HTML+JavaScriptで作成して、
余っている古いAndroidスマホ/タブレットで動かしています。

## 構成

Androidスマホ/タブレットで表示する、
syuttaikinBoard.htmlをデータのマスタとして扱う構成にしています。
(ネットワーク切断中でも出退勤表示板として使えるように)

```
LyncServer  java-lync-client  lyncpresence.py  thing shadow相当サーバ  syuttaikinBoard.html@Androidスマホ
               (Servlet)         (cron実行)          (node.js)
      <---------      <------------       ---------->
                                          desired更新
                                                            <-------------定期的にreporetedアップロード。
                                                                          ユーザが操作した時には即時にdesiredとreportedアップロード
```

* syuttaikinBoard.html: 本体HTML
* swagger.yaml: thing shadow相当のREST API定義。今回必要な部分のみ定義。
* nodejs-server-server/: swagger codegenで生成したサーバにAPI実装を追加したもの。
* lyncpresence.py: [Lyncプレゼンスを返すServlet](https://github.com/deton/java-lync-client)を使ってLyncプレゼンスを取得し、Offlineかどうかに応じて、thing shadowのREST APIに反映するスクリプト。cronで定期的に実行。

## 拡張案
* 行先等を手書き入力
* Exchangeサーバから予定取得・表示

## 関連
* [LEDを使った出退勤表示](https://github.com/deton/presenceled)
* [サーボモータを使った出退勤表示](https://github.com/deton/syuttaikin)

## 参考
* [Device Shadow RESTful API - AWS IoT](http://docs.aws.amazon.com/iot/latest/developerguide/thing-shadow-rest-api.html)
