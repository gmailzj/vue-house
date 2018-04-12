function publicfn(e, n) {
  function t() {
    for (let e = o("newnav20141104nr"), n = e.length, t = 0;n > t;t++) {
      let s = e[t],
        r = s.getAttribute("track-id");r && (s.onmouseover = a(m.length, !0), s.onmouseout = a(m.length, !1), d.push(r), v.push(s), m.push(s.className))
    }y = d.length
  } function s(e) { for (let n = 0;y > n;n++) if (d[n] == e) { g = n, m[n] = m[n] + " bj2014", v[n].className = m[n];break } } function a(e, n) { return n ? function() { this.className = g === e ? m[e].replace("bj2014", "on2014") : m[e] + " on2014" } : function() { this.className = m[e] } } function o(e) {
    let t,
      s,
      a,
      o,
      c = r(e, n, "div", !0)[0];if (c) for (t = c.children || c.childNodes, s = 0, a = t.length, o = [];a > s;s++)t[s].nodeType == 1 && o.push(t[s]);return o
  } function r(e, t, s, a) {
    if (n.getElementsByClassName) return n.getElementsByClassName(e);let o = [],
      r = t.getElementsByTagName(s),
      c = 0,
      i = r.length;e = e.replace(/\-/g, "\\-");for (let u = new RegExp("(^|\\s)" + e + "(\\s|$)");i > c && (!u.test(r[c].className) || (o.push(r[c]), !a));)c++;return o
  } function c() { if (f = o("city20141104hd")) { l = f.length;for (let e = 0;l > e;e++) { let t = f[e];t.onmouseover = i(e), t.onmouseout = i(e) }h = r("city20141104nr", n, "div") } } function i(e) { return function() { u(e) } } function u(e) { for (let n = 0;l > n;n++)h[n].style.display = "none", f[n].className = p;h[e].style.display = "block", f[e].className = N } var l,
    f,
    h,
    m = [],
    v = [],
    g = -1,
    d = [],
    y = 0,
    N = "city1",
    p = "city2";t(), c(), e.PublicNav = {select:s, changeTab:u}
}
export {
  publicfn
}
// (window,document)