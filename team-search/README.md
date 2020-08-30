困ったときに、公式日本語ドキュメントvueがあるのは、助かる。

https://router.vuejs.org/ja/guide/essentials/

イベント登録のタイミングどうしよう。タイミングによっては、イベント発火が届かない。

初期表示時点で、商品検索した結果をSSRとして返したい。
→　現状の構成では、厳しいように感じる。

web componentsでは、
<team-search-box>
  <team-decide-item></team-decide-item>
</team-search-box>

で対応できる？