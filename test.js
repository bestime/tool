function play(e, t, n, a, o) {
  player.getLimitWhiteList(function () {
    o = o || "",
      this._windowName = n ? "_yplaer" : "_yplaer",
      $(".songlist__item--current").removeClass("songlist__item--current");
    var s = e;
    ("number" == typeof s || "string" == typeof s) && (s = [s]);
    var r = 0
      , l = 0
      , p = []
      , y = []
      , c = []
      , u = 0;
    for (i = 0; i < s.length; i++) {
      var d = s[i];
      p.push(d.songid),
        y.push(d.type);
      var g = !0;
      d && d.action && d.action.play || (r = 1,
        (s.length > 1 || !d.tryPlay) && (g = !1)),
        !window.limitWhite && d && d.pay && (d.pay.pay_down || d.pay.paydownload) && (d.pay.payplay || d.pay.pay_play) && (l = 2 | l,
          d.flagCopyrightPay = 2,
          g = !1),
        window.limitWhite || user.isLogin() || !d || !d.pay || !d.pay.pay_down && !d.pay.paydownload || d.pay.payplay || d.pay.pay_play || (l = 1 | l,
          d.flagCopyrightPay = 1,
          g = !1),
        (0 == d.type && (d.size128 <= 0 || d.interval <= 0) || 0 != d.type && 111 != d.type && 112 != d.type && 113 != d.type && !d.songurl) && (l = 4 | l,
          d.flagCopyrightPay = 4,
          g = !1),
        g && u++ ,
        d.docid = d.docid || "",
        c.push(d)
    }
    if (0 == u)
      return 2 & l ? player.showPayTips(p, y, "您播放的歌曲仅限客户端播放，建议您打开客户端进行播放") : 1 & l ? user.openLogin() : player.showPayTips(null, null, "已过滤付费歌曲，没有可以播放的单曲！使用QQ音乐客户端获得高品质完整体验。"),
        !1;
    if (1 == s.length && !(s[0] && s[0].action && s[0].action.play)) {
      if (user.getUin() < 1e3 && s[0].pay && s[0].pay.payplay)
        return user.openLogin(),
          !1;
      if (require.async("js/common/showMsg.js", function (e) {
        e(s[0])
      }),
        !c.length)
        return !1
    }
    s = a ? c.slice(0, 100) : c,
      t = 1 == t ? 1 : 0,
      player.storage.add(s, 0 == t ? !0 : !1),
      player.storage.get(function () {
        return player.isExists() && -1 == navigator.userAgent.indexOf("WindowsWechat") ? ($.jStorage.set("addplaylist", {
          list: s,
          play: t,
          report: player.getPlaySource(s)
        }),
          $.jStorage.set("addplaylist_new", {
            list: player.getSimpleSonginfo(s),
            play: t,
            report: player.getPlaySource(s)
          }),
          MUSIC.cookie.set("yq_playschange", 1),
          MUSIC.cookie.set("yq_playdata", "s_0_" + t + ("_" + o)),
          cookie.set("player_exist", 0),
          2 & l ? window.limitWhite || player.showPayTips(p, y) : 1 & l ? user.openLogin() : r ? window.limitWhite || player.showPayTips(p, y, "所选部分歌曲仅限客户端播放，若没有QQ音乐客户端请先安装") : window.limitWhite || player.showPayTips(p, y, "所选歌曲已加入播放器，使用QQ音乐客户端获得高品质完整体验。"),
          setTimeout(function () {
            var e = parseInt(cookie.get("player_exist"));
            return e ? void 0 : (player.storage.add(s, 0 == t ? !0 : !1),
              player.openPlayer(s, !1, 0 == t ? !0 : !1))
          }, 2e3),
          void 0) : ($.jStorage.set("addplaylist", {
            list: s,
            play: t,
            report: player.getPlaySource(s)
          }),
            2 & l ? window.limitWhite || $.jStorage.set("showPayTips", !0) : 1 & l ? user.openLogin() : r ? window.limitWhite || player.showPayTips(p, y, "所选部分歌曲仅限客户端播放，若没有QQ音乐客户端请先安装") : window.limitWhite || player.showPayTips(p, y, "所选歌曲已加入播放器，使用QQ音乐客户端获得高品质完整体验。"),
            player.openPlayer(s, !0, 0 == t ? !0 : !1))
      })
  })
}