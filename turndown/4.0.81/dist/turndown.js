var TurndownService = (function () {
  'use strict';

  function $parcel$defineInteropFlag(a) {
    Object.defineProperty(a, '__esModule', {value: true, configurable: true});
  }

  function $parcel$export(e, n, v, s) {
    Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
  }
  var $009ddb00d3ec72b8$exports = {};

  $parcel$defineInteropFlag($009ddb00d3ec72b8$exports);

  $parcel$export($009ddb00d3ec72b8$exports, "default", () => $009ddb00d3ec72b8$export$2e2bcd8739ae039);
  class $009ddb00d3ec72b8$export$2e2bcd8739ae039 extends Error {
      constructor(filename, msg, lineno, column, css){
          super(filename + ':' + lineno + ':' + column + ': ' + msg);
          this.reason = msg;
          this.filename = filename;
          this.line = lineno;
          this.column = column;
          this.source = css;
      }
  }


  var $0865a9fb4cc365fe$exports = {};

  $parcel$defineInteropFlag($0865a9fb4cc365fe$exports);

  $parcel$export($0865a9fb4cc365fe$exports, "default", () => $0865a9fb4cc365fe$export$2e2bcd8739ae039);
  /**
   * Store position information for a node
   */ class $0865a9fb4cc365fe$export$2e2bcd8739ae039 {
      constructor(start, end, source){
          this.start = start;
          this.end = end;
          this.source = source;
      }
  }


  var $b2e137848b48cf4f$exports = {};

  $parcel$export($b2e137848b48cf4f$exports, "CssTypes", () => $b2e137848b48cf4f$export$9be5dd6e61d5d73a);
  var $b2e137848b48cf4f$export$9be5dd6e61d5d73a = /*#__PURE__*/ function(CssTypes) {
      CssTypes["stylesheet"] = "stylesheet";
      CssTypes["rule"] = "rule";
      CssTypes["declaration"] = "declaration";
      CssTypes["comment"] = "comment";
      CssTypes["container"] = "container";
      CssTypes["charset"] = "charset";
      CssTypes["document"] = "document";
      CssTypes["customMedia"] = "custom-media";
      CssTypes["fontFace"] = "font-face";
      CssTypes["host"] = "host";
      CssTypes["import"] = "import";
      CssTypes["keyframes"] = "keyframes";
      CssTypes["keyframe"] = "keyframe";
      CssTypes["layer"] = "layer";
      CssTypes["media"] = "media";
      CssTypes["namespace"] = "namespace";
      CssTypes["page"] = "page";
      CssTypes["startingStyle"] = "starting-style";
      CssTypes["supports"] = "supports";
      return CssTypes;
  }({});


  const $6d129ebf064c486f$export$82eb5486fce3d340 = 10000;
  const $6d129ebf064c486f$export$c8b95ffeec50f24a = (string, search, position)=>{
      let currentPosition = position;
      let maxLoop = $6d129ebf064c486f$export$82eb5486fce3d340;
      do {
          const all = search.map((v)=>string.indexOf(v, currentPosition));
          all.push(string.indexOf('\\', currentPosition));
          const foundAll = all.filter((v)=>v !== -1);
          if (foundAll.length === 0) return -1;
          const found = Math.min(...foundAll);
          if (string[found] === '\\') {
              currentPosition = found + 2;
              maxLoop--;
          } else return found;
      }while (maxLoop > 0);
      throw new Error('Too many escaping');
  };
  const $6d129ebf064c486f$export$b8d42a8583d2e477 = (string, search, position)=>{
      let currentSearchPosition = position;
      let maxLoop = $6d129ebf064c486f$export$82eb5486fce3d340;
      do {
          const all = search.map((v)=>string.indexOf(v, currentSearchPosition));
          all.push(string.indexOf('(', currentSearchPosition));
          all.push(string.indexOf('"', currentSearchPosition));
          all.push(string.indexOf("'", currentSearchPosition));
          all.push(string.indexOf('\\', currentSearchPosition));
          const foundAll = all.filter((v)=>v !== -1);
          if (foundAll.length === 0) return -1;
          const firstMatchPos = Math.min(...foundAll);
          const char = string[firstMatchPos];
          switch(char){
              case '\\':
                  currentSearchPosition = firstMatchPos + 2;
                  break;
              case '(':
                  {
                      const endPosition = $6d129ebf064c486f$export$b8d42a8583d2e477(string, [
                          ')'
                      ], firstMatchPos + 1);
                      if (endPosition === -1) return -1;
                      currentSearchPosition = endPosition + 1;
                  }
                  break;
              case '"':
                  {
                      const endQuotePosition = $6d129ebf064c486f$export$c8b95ffeec50f24a(string, [
                          '"'
                      ], firstMatchPos + 1);
                      if (endQuotePosition === -1) return -1;
                      currentSearchPosition = endQuotePosition + 1;
                  }
                  break;
              case "'":
                  {
                      const endQuotePosition = $6d129ebf064c486f$export$c8b95ffeec50f24a(string, [
                          "'"
                      ], firstMatchPos + 1);
                      if (endQuotePosition === -1) return -1;
                      currentSearchPosition = endQuotePosition + 1;
                  }
                  break;
              default:
                  return firstMatchPos;
          }
          maxLoop--;
      }while (maxLoop > 0);
      throw new Error('Too many escaping');
  };
  const $6d129ebf064c486f$export$801dd37ac183521b = (string, search)=>{
      const result = [];
      let currentPosition = 0;
      while(currentPosition < string.length){
          const index = $6d129ebf064c486f$export$b8d42a8583d2e477(string, search, currentPosition);
          if (index === -1) {
              result.push(string.substring(currentPosition));
              return result;
          }
          result.push(string.substring(currentPosition, index));
          currentPosition = index + 1;
      }
      return result;
  };


  // http://www.w3.org/TR/CSS21/grammar.html
  // https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
  // New rule => https://www.w3.org/TR/CSS22/syndata.html#comments
  // [^] is equivalent to [.\n\r]
  const $d708735ed1303b43$var$commentre = /\/\*[^]*?(?:\*\/|$)/g;
  const $d708735ed1303b43$export$98e6a39c04603d36 = (css, options)=>{
      options = options || {};
      /**
     * Positional.
     */ let lineno = 1;
      let column = 1;
      /**
     * Update lineno and column based on `str`.
     */ function updatePosition(str) {
          const lines = str.match(/\n/g);
          if (lines) lineno += lines.length;
          const i = str.lastIndexOf('\n');
          column = ~i ? str.length - i : column + str.length;
      }
      /**
     * Mark position and patch `node.position`.
     */ function position() {
          const start = {
              line: lineno,
              column: column
          };
          return function(node) {
              node.position = new ($0865a9fb4cc365fe$export$2e2bcd8739ae039)(start, {
                  line: lineno,
                  column: column
              }, options?.source || '');
              whitespace();
              return node;
          };
      }
      /**
     * Error `msg`.
     */ const errorsList = [];
      function error(msg) {
          const err = new ($009ddb00d3ec72b8$export$2e2bcd8739ae039)(options?.source || '', msg, lineno, column, css);
          if (options?.silent) errorsList.push(err);
          else throw err;
      }
      /**
     * Parse stylesheet.
     */ function stylesheet() {
          const rulesList = rules();
          const result = {
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).stylesheet,
              stylesheet: {
                  source: options?.source,
                  rules: rulesList,
                  parsingErrors: errorsList
              }
          };
          return result;
      }
      /**
     * Opening brace.
     */ function open() {
          const openMatch = /^{\s*/.exec(css);
          if (openMatch) {
              processMatch(openMatch);
              return true;
          }
          return false;
      }
      /**
     * Closing brace.
     */ function close() {
          const closeMatch = /^}/.exec(css);
          if (closeMatch) {
              processMatch(closeMatch);
              return true;
          }
          return false;
      }
      /**
     * Parse ruleset.
     */ function rules() {
          let node;
          const rules = [];
          whitespace();
          comments(rules);
          while(css.length && css.charAt(0) !== '}' && (node = atrule() || rule()))if (node) {
              rules.push(node);
              comments(rules);
          }
          return rules;
      }
      /**
     * Update position and css string. Return the matches
     */ function processMatch(m) {
          const str = m[0];
          updatePosition(str);
          css = css.slice(str.length);
          return m;
      }
      /**
     * Parse whitespace.
     */ function whitespace() {
          const m = /^\s*/.exec(css);
          if (m) processMatch(m);
      }
      /**
     * Parse comments;
     */ function comments(rules) {
          let c;
          rules = rules || [];
          while(c = comment())if (c) rules.push(c);
          return rules;
      }
      /**
     * Parse comment.
     */ function comment() {
          const pos = position();
          if ('/' !== css.charAt(0) || '*' !== css.charAt(1)) return;
          const m = /^\/\*[^]*?\*\//.exec(css);
          if (!m) return error('End of comment missing');
          processMatch(m);
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).comment,
              comment: m[0].slice(2, -2)
          });
      }
      /**
     * Parse selector.
     */ function selector() {
          const m = /^([^{]+)/.exec(css);
          if (!m) return;
          processMatch(m);
          // remove comment in selector;
          const res = $d708735ed1303b43$var$trim(m[0]).replace($d708735ed1303b43$var$commentre, '');
          return ($6d129ebf064c486f$export$801dd37ac183521b)(res, [
              ','
          ]).map((v)=>$d708735ed1303b43$var$trim(v));
      }
      /**
     * Parse declaration.
     */ function declaration() {
          const pos = position();
          // prop
          const propMatch = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/.exec(css);
          if (!propMatch) return;
          processMatch(propMatch);
          const propValue = $d708735ed1303b43$var$trim(propMatch[0]);
          // :
          const sepratotorMatch = /^:\s*/.exec(css);
          if (!sepratotorMatch) return error("property missing ':'");
          processMatch(sepratotorMatch);
          // val
          let value = '';
          const endValuePosition = ($6d129ebf064c486f$export$b8d42a8583d2e477)(css, [
              ';',
              '}'
          ]);
          if (endValuePosition !== -1) {
              value = css.substring(0, endValuePosition);
              const fakeMatch = [
                  value
              ];
              processMatch(fakeMatch);
              value = $d708735ed1303b43$var$trim(value).replace($d708735ed1303b43$var$commentre, '');
          }
          const ret = pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).declaration,
              property: propValue.replace($d708735ed1303b43$var$commentre, ''),
              value: value
          });
          // ;
          const endMatch = /^[;\s]*/.exec(css);
          if (endMatch) processMatch(endMatch);
          return ret;
      }
      /**
     * Parse declarations.
     */ function declarations() {
          const decls = [];
          if (!open()) return error("missing '{'");
          comments(decls);
          // declarations
          let decl;
          while(decl = declaration())if (decl) {
              decls.push(decl);
              comments(decls);
          }
          if (!close()) return error("missing '}'");
          return decls;
      }
      /**
     * Parse keyframe.
     */ function keyframe() {
          let m;
          const vals = [];
          const pos = position();
          while(m = /^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/.exec(css)){
              const res = processMatch(m);
              vals.push(res[1]);
              const spacesMatch = /^,\s*/.exec(css);
              if (spacesMatch) processMatch(spacesMatch);
          }
          if (!vals.length) return;
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).keyframe,
              values: vals,
              declarations: declarations() || []
          });
      }
      /**
     * Parse keyframes.
     */ function atkeyframes() {
          const pos = position();
          const m1 = /^@([-\w]+)?keyframes\s*/.exec(css);
          if (!m1) return;
          const vendor = processMatch(m1)[1];
          // identifier
          const m2 = /^([-\w]+)\s*/.exec(css);
          if (!m2) return error('@keyframes missing name');
          const name = processMatch(m2)[1];
          if (!open()) return error("@keyframes missing '{'");
          let frame;
          let frames = comments();
          while(frame = keyframe()){
              frames.push(frame);
              frames = frames.concat(comments());
          }
          if (!close()) return error("@keyframes missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).keyframes,
              name: name,
              vendor: vendor,
              keyframes: frames
          });
      }
      /**
     * Parse supports.
     */ function atsupports() {
          const pos = position();
          const m = /^@supports *([^{]+)/.exec(css);
          if (!m) return;
          const supports = $d708735ed1303b43$var$trim(processMatch(m)[1]);
          if (!open()) return error("@supports missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@supports missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).supports,
              supports: supports,
              rules: style
          });
      }
      /**
     * Parse host.
     */ function athost() {
          const pos = position();
          const m = /^@host\s*/.exec(css);
          if (!m) return;
          processMatch(m);
          if (!open()) return error("@host missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@host missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).host,
              rules: style
          });
      }
      /**
     * Parse container.
     */ function atcontainer() {
          const pos = position();
          const m = /^@container *([^{]+)/.exec(css);
          if (!m) return;
          const container = $d708735ed1303b43$var$trim(processMatch(m)[1]);
          if (!open()) return error("@container missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@container missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).container,
              container: container,
              rules: style
          });
      }
      /**
     * Parse container.
     */ function atlayer() {
          const pos = position();
          const m = /^@layer *([^{;@]+)/.exec(css);
          if (!m) return;
          const layer = $d708735ed1303b43$var$trim(processMatch(m)[1]);
          if (!open()) {
              const m2 = /^[;\s]*/.exec(css);
              if (m2) processMatch(m2);
              return pos({
                  type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).layer,
                  layer: layer
              });
          }
          const style = comments().concat(rules());
          if (!close()) return error("@layer missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).layer,
              layer: layer,
              rules: style
          });
      }
      /**
     * Parse media.
     */ function atmedia() {
          const pos = position();
          const m = /^@media *([^{]+)/.exec(css);
          if (!m) return;
          const media = $d708735ed1303b43$var$trim(processMatch(m)[1]);
          if (!open()) return error("@media missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@media missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).media,
              media: media,
              rules: style
          });
      }
      /**
     * Parse custom-media.
     */ function atcustommedia() {
          const pos = position();
          const m = /^@custom-media\s+(--\S+)\s+([^{;\s][^{;]*);/.exec(css);
          if (!m) return;
          const res = processMatch(m);
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).customMedia,
              name: $d708735ed1303b43$var$trim(res[1]),
              media: $d708735ed1303b43$var$trim(res[2])
          });
      }
      /**
     * Parse paged media.
     */ function atpage() {
          const pos = position();
          const m = /^@page */.exec(css);
          if (!m) return;
          processMatch(m);
          const sel = selector() || [];
          if (!open()) return error("@page missing '{'");
          let decls = comments();
          // declarations
          let decl;
          while(decl = declaration()){
              decls.push(decl);
              decls = decls.concat(comments());
          }
          if (!close()) return error("@page missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).page,
              selectors: sel,
              declarations: decls
          });
      }
      /**
     * Parse document.
     */ function atdocument() {
          const pos = position();
          const m = /^@([-\w]+)?document *([^{]+)/.exec(css);
          if (!m) return;
          const res = processMatch(m);
          const vendor = $d708735ed1303b43$var$trim(res[1]);
          const doc = $d708735ed1303b43$var$trim(res[2]);
          if (!open()) return error("@document missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@document missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).document,
              document: doc,
              vendor: vendor,
              rules: style
          });
      }
      /**
     * Parse font-face.
     */ function atfontface() {
          const pos = position();
          const m = /^@font-face\s*/.exec(css);
          if (!m) return;
          processMatch(m);
          if (!open()) return error("@font-face missing '{'");
          let decls = comments();
          // declarations
          let decl;
          while(decl = declaration()){
              decls.push(decl);
              decls = decls.concat(comments());
          }
          if (!close()) return error("@font-face missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).fontFace,
              declarations: decls
          });
      }
      /**
     * Parse starting style.
     */ function atstartingstyle() {
          const pos = position();
          const m = /^@starting-style\s*/.exec(css);
          if (!m) return;
          processMatch(m);
          if (!open()) return error("@starting-style missing '{'");
          const style = comments().concat(rules());
          if (!close()) return error("@starting-style missing '}'");
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).startingStyle,
              rules: style
          });
      }
      /**
     * Parse import
     */ const atimport = _compileAtrule('import');
      /**
     * Parse charset
     */ const atcharset = _compileAtrule('charset');
      /**
     * Parse namespace
     */ const atnamespace = _compileAtrule('namespace');
      /**
     * Parse non-block at-rules
     */ function _compileAtrule(name) {
          const re = new RegExp('^@' + name + '\\s*((?::?[^;\'"]|"(?:\\\\"|[^"])*?"|\'(?:\\\\\'|[^\'])*?\')+)(?:;|$)');
          // ^@import\s*([^;"']|("|')(?:\\\2|.)*?\2)+(;|$)
          return function() {
              const pos = position();
              const m = re.exec(css);
              if (!m) return;
              const res = processMatch(m);
              const ret = {
                  type: name
              };
              ret[name] = res[1].trim();
              return pos(ret);
          };
      }
      /**
     * Parse at rule.
     */ function atrule() {
          if (css[0] !== '@') return;
          return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface() || atcontainer() || atstartingstyle() || atlayer();
      }
      /**
     * Parse rule.
     */ function rule() {
          const pos = position();
          const sel = selector();
          if (!sel) return error('selector missing');
          comments();
          return pos({
              type: ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).rule,
              selectors: sel,
              declarations: declarations() || []
          });
      }
      return $d708735ed1303b43$var$addParent(stylesheet());
  };
  /**
   * Trim `str`.
   */ function $d708735ed1303b43$var$trim(str) {
      return str ? str.trim() : '';
  }
  /**
   * Adds non-enumerable parent node reference to each node.
   */ function $d708735ed1303b43$var$addParent(obj, parent) {
      const isNode = obj && typeof obj.type === 'string';
      const childParent = isNode ? obj : parent;
      for(const k in obj){
          const value = obj[k];
          if (Array.isArray(value)) value.forEach((v)=>{
              $d708735ed1303b43$var$addParent(v, childParent);
          });
          else if (value && typeof value === 'object') $d708735ed1303b43$var$addParent(value, childParent);
      }
      if (isNode) Object.defineProperty(obj, 'parent', {
          configurable: true,
          writable: true,
          enumerable: false,
          value: parent || null
      });
      return obj;
  }
  var $d708735ed1303b43$export$2e2bcd8739ae039 = $d708735ed1303b43$export$98e6a39c04603d36;



  class $de9540138ed1fd01$var$Compiler {
      constructor(options){
          this.level = 0;
          this.indentation = '  ';
          this.compress = false;
          if (typeof options?.indent === 'string') this.indentation = options?.indent;
          if (options?.compress) this.compress = true;
      }
      // We disable no-unused-vars for _position. We keep position for potential reintroduction of source-map
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      emit(str, _position) {
          return str;
      }
      /**
     * Increase, decrease or return current indentation.
     */ indent(level) {
          this.level = this.level || 1;
          if (level) {
              this.level += level;
              return '';
          }
          return Array(this.level).join(this.indentation);
      }
      visit(node) {
          switch(node.type){
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).stylesheet:
                  return this.stylesheet(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).rule:
                  return this.rule(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).declaration:
                  return this.declaration(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).comment:
                  return this.comment(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).container:
                  return this.container(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).charset:
                  return this.charset(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).document:
                  return this.document(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).customMedia:
                  return this.customMedia(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).fontFace:
                  return this.fontFace(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).host:
                  return this.host(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).import:
                  return this.import(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).keyframes:
                  return this.keyframes(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).keyframe:
                  return this.keyframe(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).layer:
                  return this.layer(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).media:
                  return this.media(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).namespace:
                  return this.namespace(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).page:
                  return this.page(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).startingStyle:
                  return this.startingStyle(node);
              case ($b2e137848b48cf4f$export$9be5dd6e61d5d73a).supports:
                  return this.supports(node);
          }
      }
      mapVisit(nodes, delim) {
          let buf = '';
          delim = delim || '';
          for(let i = 0, length = nodes.length; i < length; i++){
              buf += this.visit(nodes[i]);
              if (delim && i < length - 1) buf += this.emit(delim);
          }
          return buf;
      }
      compile(node) {
          if (this.compress) return node.stylesheet.rules.map(this.visit, this).join('');
          return this.stylesheet(node);
      }
      /**
     * Visit stylesheet node.
     */ stylesheet(node) {
          return this.mapVisit(node.stylesheet.rules, '\n\n');
      }
      /**
     * Visit comment node.
     */ comment(node) {
          if (this.compress) return this.emit('', node.position);
          return this.emit(this.indent() + '/*' + node.comment + '*/', node.position);
      }
      /**
     * Visit container node.
     */ container(node) {
          if (this.compress) return this.emit('@container ' + node.container, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit(this.indent() + '@container ' + node.container, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit('\n' + this.indent(-1) + this.indent() + '}');
      }
      /**
     * Visit container node.
     */ layer(node) {
          if (this.compress) return this.emit('@layer ' + node.layer, node.position) + (node.rules ? this.emit('{') + this.mapVisit(node.rules) + this.emit('}') : ';');
          return this.emit(this.indent() + '@layer ' + node.layer, node.position) + (node.rules ? this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit('\n' + this.indent(-1) + this.indent() + '}') : ';');
      }
      /**
     * Visit import node.
     */ import(node) {
          return this.emit('@import ' + node.import + ';', node.position);
      }
      /**
     * Visit media node.
     */ media(node) {
          if (this.compress) return this.emit('@media ' + node.media, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit(this.indent() + '@media ' + node.media, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit('\n' + this.indent(-1) + this.indent() + '}');
      }
      /**
     * Visit document node.
     */ document(node) {
          const doc = '@' + (node.vendor || '') + 'document ' + node.document;
          if (this.compress) return this.emit(doc, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit(doc, node.position) + this.emit("  {\n" + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
      }
      /**
     * Visit charset node.
     */ charset(node) {
          return this.emit('@charset ' + node.charset + ';', node.position);
      }
      /**
     * Visit namespace node.
     */ namespace(node) {
          return this.emit('@namespace ' + node.namespace + ';', node.position);
      }
      /**
     * Visit container node.
     */ startingStyle(node) {
          if (this.compress) return this.emit('@starting-style', node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit(this.indent() + '@starting-style', node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit('\n' + this.indent(-1) + this.indent() + '}');
      }
      /**
     * Visit supports node.
     */ supports(node) {
          if (this.compress) return this.emit('@supports ' + node.supports, node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit(this.indent() + '@supports ' + node.supports, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit('\n' + this.indent(-1) + this.indent() + '}');
      }
      /**
     * Visit keyframes node.
     */ keyframes(node) {
          if (this.compress) return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position) + this.emit('{') + this.mapVisit(node.keyframes) + this.emit('}');
          return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.keyframes, '\n') + this.emit(this.indent(-1) + '}');
      }
      /**
     * Visit keyframe node.
     */ keyframe(node) {
          const decls = node.declarations;
          if (this.compress) return this.emit(node.values.join(','), node.position) + this.emit('{') + this.mapVisit(decls) + this.emit('}');
          return this.emit(this.indent()) + this.emit(node.values.join(', '), node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(decls, '\n') + this.emit(this.indent(-1) + '\n' + this.indent() + '}\n');
      }
      /**
     * Visit page node.
     */ page(node) {
          if (this.compress) {
              const sel = node.selectors.length ? node.selectors.join(', ') : '';
              return this.emit('@page ' + sel, node.position) + this.emit('{') + this.mapVisit(node.declarations) + this.emit('}');
          }
          const sel = node.selectors.length ? node.selectors.join(', ') + ' ' : '';
          return this.emit('@page ' + sel, node.position) + this.emit('{\n') + this.emit(this.indent(1)) + this.mapVisit(node.declarations, '\n') + this.emit(this.indent(-1)) + this.emit('\n}');
      }
      /**
     * Visit font-face node.
     */ fontFace(node) {
          if (this.compress) return this.emit('@font-face', node.position) + this.emit('{') + this.mapVisit(node.declarations) + this.emit('}');
          return this.emit('@font-face ', node.position) + this.emit('{\n') + this.emit(this.indent(1)) + this.mapVisit(node.declarations, '\n') + this.emit(this.indent(-1)) + this.emit('\n}');
      }
      /**
     * Visit host node.
     */ host(node) {
          if (this.compress) return this.emit('@host', node.position) + this.emit('{') + this.mapVisit(node.rules) + this.emit('}');
          return this.emit('@host', node.position) + this.emit(' {\n' + this.indent(1)) + this.mapVisit(node.rules, '\n\n') + this.emit(this.indent(-1) + '\n}');
      }
      /**
     * Visit custom-media node.
     */ customMedia(node) {
          return this.emit('@custom-media ' + node.name + ' ' + node.media + ';', node.position);
      }
      /**
     * Visit rule node.
     */ rule(node) {
          const decls = node.declarations;
          if (!decls.length) return '';
          if (this.compress) return this.emit(node.selectors.join(','), node.position) + this.emit('{') + this.mapVisit(decls) + this.emit('}');
          const indent = this.indent();
          return this.emit(node.selectors.map((s)=>{
              return indent + s;
          }).join(',\n'), node.position) + this.emit(' {\n') + this.emit(this.indent(1)) + this.mapVisit(decls, '\n') + this.emit(this.indent(-1)) + this.emit('\n' + this.indent() + '}');
      }
      /**
     * Visit declaration node.
     */ declaration(node) {
          if (this.compress) return this.emit(node.property + ':' + node.value, node.position) + this.emit(';');
          if (node.property === 'grid-template-areas') return this.emit(this.indent()) + this.emit(node.property + ': ' + node.value.split('\n').join('\n'.padEnd(22) + this.indent()), node.position) + this.emit(';');
          return this.emit(this.indent()) + this.emit(node.property + ': ' + node.value, node.position) + this.emit(';');
      }
  }
  var $de9540138ed1fd01$export$2e2bcd8739ae039 = $de9540138ed1fd01$var$Compiler;


  var $fdf773ab87e20450$export$2e2bcd8739ae039 = (node, options)=>{
      const compiler = new ($de9540138ed1fd01$export$2e2bcd8739ae039)(options || {});
      return compiler.compile(node);
  };





  const $149c1bd638913645$export$98e6a39c04603d36 = ($d708735ed1303b43$export$2e2bcd8739ae039);
  const $149c1bd638913645$export$fac44ee5b035f737 = ($fdf773ab87e20450$export$2e2bcd8739ae039);
  var $149c1bd638913645$export$2e2bcd8739ae039 = {
      parse: $149c1bd638913645$export$98e6a39c04603d36,
      stringify: $149c1bd638913645$export$fac44ee5b035f737
  };

  function extend (destination) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) destination[key] = source[key];
      }
    }
    return destination
  }

  function repeat (character, count) {
    return Array(count + 1).join(character)
  }

  function trimLeadingNewlines (string) {
    return string.replace(/^\n*/, '')
  }

  function trimTrailingNewlines (string) {
    // avoid match-at-end regexp bottleneck, see #370
    var indexEnd = string.length;
    while (indexEnd > 0 && string[indexEnd - 1] === '\n') indexEnd--;
    return string.substring(0, indexEnd)
  }

  var blockElements = [
    'ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'BODY', 'CANVAS',
    'CENTER', 'DD', 'DIR', 'DIV', 'DL', 'DT', 'FIELDSET', 'FIGCAPTION', 'FIGURE',
    'FOOTER', 'FORM', 'FRAMESET', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER',
    'HGROUP', 'HR', 'HTML', 'ISINDEX', 'LI', 'MAIN', 'MENU', 'NAV', 'NOFRAMES',
    'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 'TABLE', 'TBODY', 'TD',
    'TFOOT', 'TH', 'THEAD', 'TR', 'UL'
  ];

  function isBlock (node) {
    return is(node, blockElements)
  }

  var voidElements = [
    'AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT',
    'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR'
  ];

  function isVoid (node) {
    return is(node, voidElements)
  }

  function hasVoid (node) {
    return has(node, voidElements)
  }

  var meaningfulWhenBlankElements = [
    'A', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TH', 'TD', 'IFRAME', 'SCRIPT',
    'AUDIO', 'VIDEO', 'P'
  ];

  function isMeaningfulWhenBlank (node) {
    return is(node, meaningfulWhenBlankElements)
  }

  function hasMeaningfulWhenBlank (node) {
    return has(node, meaningfulWhenBlankElements)
  }

  function is (node, tagNames) {
    return tagNames.indexOf(node.nodeName) >= 0
  }

  function has (node, tagNames) {
    return (
      node.getElementsByTagName &&
      tagNames.some(function (tagName) {
        return node.getElementsByTagName(tagName).length
      })
    )
  }

  // To handle code that is presented as below (see https://github.com/laurent22/joplin/issues/573)
  //
  // <td class="code">
  //   <pre class="python">
  //     <span style="color: #ff7700;font-weight:bold;">def</span> ma_fonction
  //   </pre>
  // </td>
  function isCodeBlockSpecialCase1(node) {
    const parent = node.parentNode;
    if (!parent) return false;
    return parent.classList && parent.classList.contains('code') && parent.nodeName === 'TD' && node.nodeName === 'PRE'
  }

  // To handle PRE tags that have a monospace font family. In that case
  // we assume it is a code block.
  function isCodeBlockSpecialCase2(node) {
    if (node.nodeName !== 'PRE') return false;

    const style = node.getAttribute('style');
    if (!style) return false;
    const o = $149c1bd638913645$export$2e2bcd8739ae039.parse('pre {' + style + '}');
    if (!o.stylesheet.rules.length) return;
    const fontFamily = o.stylesheet.rules[0].declarations.find(d => d.property.toLowerCase() === 'font-family');
    if (!fontFamily || !fontFamily.value) return false;
    const isMonospace = fontFamily.value.split(',').map(e => e.trim().toLowerCase()).indexOf('monospace') >= 0;
    return isMonospace;
  }

  function isCodeBlock(node) {
    if (isCodeBlockSpecialCase1(node) || isCodeBlockSpecialCase2(node)) return true

    return (
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  }

  function getStyleProp(node, name) {
    const style = node.getAttribute('style');
    if (!style) return null;

    name = name.toLowerCase();
    if (!style.toLowerCase().includes(name)) return null;

    const o = $149c1bd638913645$export$2e2bcd8739ae039.parse('div {' + style + '}');
    if (!o.stylesheet.rules.length) return null;
    const prop = o.stylesheet.rules[0].declarations.find(d => {
      return d.type === 'declaration' && d.property.toLowerCase() === name;
    });
    return prop ? prop.value : null;
  }

  var lib = {};

  var xmlEntities = {};

  var surrogatePairs = {};

  var hasRequiredSurrogatePairs;

  function requireSurrogatePairs () {
  	if (hasRequiredSurrogatePairs) return surrogatePairs;
  	hasRequiredSurrogatePairs = 1;
  	Object.defineProperty(surrogatePairs, "__esModule", { value: true });
  	surrogatePairs.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
  	    return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800, (astralCodePoint - 0x10000) % 0x400 + 0xDC00);
  	};
  	surrogatePairs.getCodePoint = String.prototype.codePointAt ?
  	    function (input, position) {
  	        return input.codePointAt(position);
  	    } :
  	    function (input, position) {
  	        return (input.charCodeAt(position) - 0xD800) * 0x400
  	            + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
  	    };
  	surrogatePairs.highSurrogateFrom = 0xD800;
  	surrogatePairs.highSurrogateTo = 0xDBFF;
  	return surrogatePairs;
  }

  var hasRequiredXmlEntities;

  function requireXmlEntities () {
  	if (hasRequiredXmlEntities) return xmlEntities;
  	hasRequiredXmlEntities = 1;
  	Object.defineProperty(xmlEntities, "__esModule", { value: true });
  	var surrogate_pairs_1 = requireSurrogatePairs();
  	var ALPHA_INDEX = {
  	    '&lt': '<',
  	    '&gt': '>',
  	    '&quot': '"',
  	    '&apos': '\'',
  	    '&amp': '&',
  	    '&lt;': '<',
  	    '&gt;': '>',
  	    '&quot;': '"',
  	    '&apos;': '\'',
  	    '&amp;': '&'
  	};
  	var CHAR_INDEX = {
  	    60: 'lt',
  	    62: 'gt',
  	    34: 'quot',
  	    39: 'apos',
  	    38: 'amp'
  	};
  	var CHAR_S_INDEX = {
  	    '<': '&lt;',
  	    '>': '&gt;',
  	    '"': '&quot;',
  	    '\'': '&apos;',
  	    '&': '&amp;'
  	};
  	var XmlEntities = /** @class */ (function () {
  	    function XmlEntities() {
  	    }
  	    XmlEntities.prototype.encode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        return str.replace(/[<>"'&]/g, function (s) {
  	            return CHAR_S_INDEX[s];
  	        });
  	    };
  	    XmlEntities.encode = function (str) {
  	        return new XmlEntities().encode(str);
  	    };
  	    XmlEntities.prototype.decode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
  	            if (s.charAt(1) === '#') {
  	                var code = s.charAt(2).toLowerCase() === 'x' ?
  	                    parseInt(s.substr(3), 16) :
  	                    parseInt(s.substr(2));
  	                if (!isNaN(code) || code >= -32768) {
  	                    if (code <= 65535) {
  	                        return String.fromCharCode(code);
  	                    }
  	                    else {
  	                        return surrogate_pairs_1.fromCodePoint(code);
  	                    }
  	                }
  	                return '';
  	            }
  	            return ALPHA_INDEX[s] || s;
  	        });
  	    };
  	    XmlEntities.decode = function (str) {
  	        return new XmlEntities().decode(str);
  	    };
  	    XmlEntities.prototype.encodeNonUTF = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var c = str.charCodeAt(i);
  	            var alpha = CHAR_INDEX[c];
  	            if (alpha) {
  	                result += "&" + alpha + ";";
  	                i++;
  	                continue;
  	            }
  	            if (c < 32 || c > 126) {
  	                if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
  	                    result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                    i++;
  	                }
  	                else {
  	                    result += '&#' + c + ';';
  	                }
  	            }
  	            else {
  	                result += str.charAt(i);
  	            }
  	            i++;
  	        }
  	        return result;
  	    };
  	    XmlEntities.encodeNonUTF = function (str) {
  	        return new XmlEntities().encodeNonUTF(str);
  	    };
  	    XmlEntities.prototype.encodeNonASCII = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var c = str.charCodeAt(i);
  	            if (c <= 255) {
  	                result += str[i++];
  	                continue;
  	            }
  	            if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
  	                result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                i++;
  	            }
  	            else {
  	                result += '&#' + c + ';';
  	            }
  	            i++;
  	        }
  	        return result;
  	    };
  	    XmlEntities.encodeNonASCII = function (str) {
  	        return new XmlEntities().encodeNonASCII(str);
  	    };
  	    return XmlEntities;
  	}());
  	xmlEntities.XmlEntities = XmlEntities;
  	return xmlEntities;
  }

  var html4Entities = {};

  var hasRequiredHtml4Entities;

  function requireHtml4Entities () {
  	if (hasRequiredHtml4Entities) return html4Entities;
  	hasRequiredHtml4Entities = 1;
  	Object.defineProperty(html4Entities, "__esModule", { value: true });
  	var surrogate_pairs_1 = requireSurrogatePairs();
  	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
  	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
  	var alphaIndex = {};
  	var numIndex = {};
  	(function () {
  	    var i = 0;
  	    var length = HTML_ALPHA.length;
  	    while (i < length) {
  	        var a = HTML_ALPHA[i];
  	        var c = HTML_CODES[i];
  	        alphaIndex[a] = String.fromCharCode(c);
  	        numIndex[c] = a;
  	        i++;
  	    }
  	})();
  	var Html4Entities = /** @class */ (function () {
  	    function Html4Entities() {
  	    }
  	    Html4Entities.prototype.decode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
  	            var chr;
  	            if (entity.charAt(0) === "#") {
  	                var code = entity.charAt(1).toLowerCase() === 'x' ?
  	                    parseInt(entity.substr(2), 16) :
  	                    parseInt(entity.substr(1));
  	                if (!isNaN(code) || code >= -32768) {
  	                    if (code <= 65535) {
  	                        chr = String.fromCharCode(code);
  	                    }
  	                    else {
  	                        chr = surrogate_pairs_1.fromCodePoint(code);
  	                    }
  	                }
  	            }
  	            else {
  	                chr = alphaIndex[entity];
  	            }
  	            return chr || s;
  	        });
  	    };
  	    Html4Entities.decode = function (str) {
  	        return new Html4Entities().decode(str);
  	    };
  	    Html4Entities.prototype.encode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var alpha = numIndex[str.charCodeAt(i)];
  	            result += alpha ? "&" + alpha + ";" : str.charAt(i);
  	            i++;
  	        }
  	        return result;
  	    };
  	    Html4Entities.encode = function (str) {
  	        return new Html4Entities().encode(str);
  	    };
  	    Html4Entities.prototype.encodeNonUTF = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var cc = str.charCodeAt(i);
  	            var alpha = numIndex[cc];
  	            if (alpha) {
  	                result += "&" + alpha + ";";
  	            }
  	            else if (cc < 32 || cc > 126) {
  	                if (cc >= surrogate_pairs_1.highSurrogateFrom && cc <= surrogate_pairs_1.highSurrogateTo) {
  	                    result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                    i++;
  	                }
  	                else {
  	                    result += '&#' + cc + ';';
  	                }
  	            }
  	            else {
  	                result += str.charAt(i);
  	            }
  	            i++;
  	        }
  	        return result;
  	    };
  	    Html4Entities.encodeNonUTF = function (str) {
  	        return new Html4Entities().encodeNonUTF(str);
  	    };
  	    Html4Entities.prototype.encodeNonASCII = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var c = str.charCodeAt(i);
  	            if (c <= 255) {
  	                result += str[i++];
  	                continue;
  	            }
  	            if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
  	                result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                i++;
  	            }
  	            else {
  	                result += '&#' + c + ';';
  	            }
  	            i++;
  	        }
  	        return result;
  	    };
  	    Html4Entities.encodeNonASCII = function (str) {
  	        return new Html4Entities().encodeNonASCII(str);
  	    };
  	    return Html4Entities;
  	}());
  	html4Entities.Html4Entities = Html4Entities;
  	return html4Entities;
  }

  var html5Entities = {};

  var hasRequiredHtml5Entities;

  function requireHtml5Entities () {
  	if (hasRequiredHtml5Entities) return html5Entities;
  	hasRequiredHtml5Entities = 1;
  	Object.defineProperty(html5Entities, "__esModule", { value: true });
  	var surrogate_pairs_1 = requireSurrogatePairs();
  	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
  	var DECODE_ONLY_ENTITIES = [['NewLine', [10]]];
  	var alphaIndex = {};
  	var charIndex = {};
  	createIndexes(alphaIndex, charIndex);
  	var Html5Entities = /** @class */ (function () {
  	    function Html5Entities() {
  	    }
  	    Html5Entities.prototype.decode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
  	            var chr;
  	            if (entity.charAt(0) === "#") {
  	                var code = entity.charAt(1) === 'x' ?
  	                    parseInt(entity.substr(2).toLowerCase(), 16) :
  	                    parseInt(entity.substr(1));
  	                if (!isNaN(code) || code >= -32768) {
  	                    if (code <= 65535) {
  	                        chr = String.fromCharCode(code);
  	                    }
  	                    else {
  	                        chr = surrogate_pairs_1.fromCodePoint(code);
  	                    }
  	                }
  	            }
  	            else {
  	                chr = alphaIndex[entity];
  	            }
  	            return chr || s;
  	        });
  	    };
  	    Html5Entities.decode = function (str) {
  	        return new Html5Entities().decode(str);
  	    };
  	    Html5Entities.prototype.encode = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var charInfo = charIndex[str.charCodeAt(i)];
  	            if (charInfo) {
  	                var alpha = charInfo[str.charCodeAt(i + 1)];
  	                if (alpha) {
  	                    i++;
  	                }
  	                else {
  	                    alpha = charInfo[''];
  	                }
  	                if (alpha) {
  	                    result += "&" + alpha + ";";
  	                    i++;
  	                    continue;
  	                }
  	            }
  	            result += str.charAt(i);
  	            i++;
  	        }
  	        return result;
  	    };
  	    Html5Entities.encode = function (str) {
  	        return new Html5Entities().encode(str);
  	    };
  	    Html5Entities.prototype.encodeNonUTF = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var c = str.charCodeAt(i);
  	            var charInfo = charIndex[c];
  	            if (charInfo) {
  	                var alpha = charInfo[str.charCodeAt(i + 1)];
  	                if (alpha) {
  	                    i++;
  	                }
  	                else {
  	                    alpha = charInfo[''];
  	                }
  	                if (alpha) {
  	                    result += "&" + alpha + ";";
  	                    i++;
  	                    continue;
  	                }
  	            }
  	            if (c < 32 || c > 126) {
  	                if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
  	                    result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                    i++;
  	                }
  	                else {
  	                    result += '&#' + c + ';';
  	                }
  	            }
  	            else {
  	                result += str.charAt(i);
  	            }
  	            i++;
  	        }
  	        return result;
  	    };
  	    Html5Entities.encodeNonUTF = function (str) {
  	        return new Html5Entities().encodeNonUTF(str);
  	    };
  	    Html5Entities.prototype.encodeNonASCII = function (str) {
  	        if (!str || !str.length) {
  	            return '';
  	        }
  	        var strLength = str.length;
  	        var result = '';
  	        var i = 0;
  	        while (i < strLength) {
  	            var c = str.charCodeAt(i);
  	            if (c <= 255) {
  	                result += str[i++];
  	                continue;
  	            }
  	            if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
  	                result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
  	                i += 2;
  	            }
  	            else {
  	                result += '&#' + c + ';';
  	                i++;
  	            }
  	        }
  	        return result;
  	    };
  	    Html5Entities.encodeNonASCII = function (str) {
  	        return new Html5Entities().encodeNonASCII(str);
  	    };
  	    return Html5Entities;
  	}());
  	html5Entities.Html5Entities = Html5Entities;
  	function createIndexes(alphaIndex, charIndex) {
  	    var i = ENTITIES.length;
  	    while (i--) {
  	        var _a = ENTITIES[i], alpha = _a[0], _b = _a[1], chr = _b[0], chr2 = _b[1];
  	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
  	        var charInfo = void 0;
  	        if (addChar) {
  	            charInfo = charIndex[chr] = charIndex[chr] || {};
  	        }
  	        if (chr2) {
  	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
  	            addChar && (charInfo[chr2] = alpha);
  	        }
  	        else {
  	            alphaIndex[alpha] = String.fromCharCode(chr);
  	            addChar && (charInfo[''] = alpha);
  	        }
  	    }
  	    i = DECODE_ONLY_ENTITIES.length;
  	    while (i--) {
  	        var _c = DECODE_ONLY_ENTITIES[i], alpha = _c[0], _d = _c[1], chr = _d[0], chr2 = _d[1];
  	        alphaIndex[alpha] = String.fromCharCode(chr) + (chr2 ? String.fromCharCode(chr2) : '');
  	    }
  	}
  	return html5Entities;
  }

  var hasRequiredLib;

  function requireLib () {
  	if (hasRequiredLib) return lib;
  	hasRequiredLib = 1;
  	Object.defineProperty(lib, "__esModule", { value: true });
  	var xml_entities_1 = requireXmlEntities();
  	lib.XmlEntities = xml_entities_1.XmlEntities;
  	var html4_entities_1 = requireHtml4Entities();
  	lib.Html4Entities = html4_entities_1.Html4Entities;
  	var html5_entities_1 = requireHtml5Entities();
  	lib.Html5Entities = html5_entities_1.Html5Entities;
  	lib.AllHtmlEntities = html5_entities_1.Html5Entities;
  	return lib;
  }

  var libExports = requireLib();

  const Entities = libExports.AllHtmlEntities;
  const htmlentities = (new Entities()).encode;

  function attributesHtml(attributes, options = null) {
    if (!attributes) return '';

    options = Object.assign({}, {
      skipEmptyClass: false,
    }, options);

    const output = [];

    for (let attr of attributes) {
      if (attr.name === 'class' && !attr.value && options.skipEmptyClass) continue;
      output.push(`${attr.name}="${htmlentities(attr.value)}"`);
    }

    return output.join(' ');
  }

  var rules = {};

  rules.paragraph = {
    filter: 'p',

    replacement: function (content) {
      // If the line starts with a nonbreaking space, replace it. By default, the
      // markdown renderer removes leading non-HTML-escaped nonbreaking spaces. However,
      // because the space is nonbreaking, we want to keep it.
      // \u00A0 is a nonbreaking space.
      const leadingNonbreakingSpace = /^\u{00A0}/ug;
      content = content.replace(leadingNonbreakingSpace, '&nbsp;');

      // Paragraphs that are truly empty (not even containing nonbreaking spaces)
      // take up by default no space. Output nothing.
      if (content === '') {
        return '';
      }

      return '\n\n' + content + '\n\n'
    }
  };

  rules.lineBreak = {
    filter: 'br',

    replacement: function (_content, node, options, previousNode) {
      let brReplacement = options.br + '\n';

      // Code blocks may include <br/>s -- replacing them should not be necessary
      // in code blocks.
      if (node.isCode) {
        brReplacement = '\n';
      } else if (previousNode && previousNode.nodeName === 'BR') {
        brReplacement = '<br/>';
      }

      return brReplacement;
    }
  };

  rules.heading = {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    replacement: function (content, node, options) {
      var hLevel = Number(node.nodeName.charAt(1));

      if (options.headingStyle === 'setext' && hLevel < 3) {
        var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
        return (
          '\n\n' + content + '\n' + underline + '\n\n'
        )
      } else {
        return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
      }
    }
  };

  // ==============================
  // Joplin format support
  // ==============================

  rules.highlight = {
    filter: 'mark',

    replacement: function (content, node, options) {
      return '==' + content + '=='
    }
  };

  // Unlike strikethrough and mark formatting, insert, sup and sub aren't
  // widespread enough to automatically convert them to Markdown, but keep them as
  // HTML anyway. Another issue is that we use "~" for subscript but that's
  // actually the syntax for strikethrough on GitHub, so it's best to keep it as
  // HTML to avoid any ambiguity.

  rules.insert = {
    filter: function (node, options) {
      // TinyMCE represents this either with an <INS> tag (when pressing the
      // toolbar button) or using style "text-decoration" (when using shortcut
      // Cmd+U)
      //
      // https://github.com/laurent22/joplin/issues/5480
      if (node.nodeName === 'INS') return true;
      return getStyleProp(node, 'text-decoration') === 'underline';
    },

    replacement: function (content, node, options) {
      return '<ins>' + content + '</ins>'
    }
  };

  rules.superscript = {
    filter: 'sup',

    replacement: function (content, node, options) {
      return '<sup>' + content + '</sup>'
    }
  };

  rules.subscript = {
    filter: 'sub',

    replacement: function (content, node, options) {
      return '<sub>' + content + '</sub>'
    }
  };

  // Handles foreground color changes as created by the rich text editor.
  // We intentionally don't handle the general style="color: colorhere" case as
  // this may leave unwanted formatting when saving websites as markdown.
  rules.foregroundColor = {
    filter: function (node, options) {
      return options.preserveColorStyles && node.nodeName === 'SPAN' && getStyleProp(node, 'color');
    },

    replacement: function (content, node, options) {
      return `<span style="color: ${htmlentities(getStyleProp(node, 'color'))};">${content}</span>`;
    },
  };

  // Converts placeholders for not-loaded resources.
  rules.resourcePlaceholder = {
    filter: function (node, options) {
      if (!options.allowResourcePlaceholders) return false;
      if (!node.classList || !node.classList.contains('not-loaded-resource')) return false;
      const isImage = node.classList.contains('not-loaded-image-resource');
      if (!isImage) return false;

      const resourceId = node.getAttribute('data-resource-id');
      return resourceId && resourceId.match(/^[a-z0-9]{32}$/);
    },

    replacement: function (_content, node) {
      const htmlBefore = node.getAttribute('data-original-before') || '';
      const htmlAfter = node.getAttribute('data-original-after') || '';
      const isHtml = htmlBefore || htmlAfter;
      const resourceId = node.getAttribute('data-resource-id');
      if (isHtml) {
        const attrs = [
          htmlBefore.trim(),
          `src=":/${resourceId}"`,
          htmlAfter.trim(),
        ].filter(a => !!a);

        return `<img ${attrs.join(' ')}>`;
      } else {
        const originalAltText = node.getAttribute('data-original-alt') || '';
        const title = node.getAttribute('data-original-title');
        return imageMarkdownFromAttributes({
          alt: originalAltText,
          title,
          src: `:/${resourceId}`,
        });
      }
    }
  };

  // ==============================
  // END Joplin format support
  // ==============================

  rules.blockquote = {
    filter: 'blockquote',

    replacement: function (content) {
      content = content.replace(/^\n+|\n+$/g, '');
      content = content.replace(/^/gm, '> ');
      return '\n\n' + content + '\n\n'
    }
  };

  rules.list = {
    filter: ['ul', 'ol'],

    replacement: function (content, node) {
      var parent = node.parentNode;
      if (parent && isCodeBlock(parent) && node.classList && node.classList.contains('pre-numbering')){
        // Ignore code-block children of type ul with class pre-numbering.
        // See https://github.com/laurent22/joplin/pull/10126#discussion_r1532204251 .
        // test case: packages/app-cli/tests/html_to_md/code_multiline_2.html
        return '';
      } else if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
        return '\n' + content
      } else {
        return '\n\n' + content + '\n\n'
      }
    }
  };

  // OL elements are ordered lists, but other elements with a "list-style-type: decimal" style
  // should also be considered ordered lists, at least that's how they are rendered
  // in browsers.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
  function isOrderedList(e) {
    if (e.nodeName === 'OL') return true;
    return e.style && e.style.listStyleType === 'decimal';
  }

  // `content` should be the part of the item after the list marker (e.g. "[ ] test" in "- [ ] test").
  const removeListItemLeadingNewlines = (content) => {
    const itemStartRegex = /(^\[[Xx ]\]|^)([ \n]+)/;
    const startingSpaceMatch = content.match(itemStartRegex);
    if (!startingSpaceMatch) return content;

    const checkbox = startingSpaceMatch[1];
    const space = startingSpaceMatch[2];
    if (space.includes('\n')) {
      content = content.replace(itemStartRegex, `${checkbox} `);
    }

    return content;
  };

  const isEmptyTaskListItem = (content) => {
    return content.match(/^\[[xX \][ \n\t]*$/);
  };

  rules.listItem = {
    filter: 'li',

    replacement: function (content, node, options) {
      content = content
          .replace(/^\n+/, '') // remove leading newlines
          .replace(/\n+$/, '\n'); // replace trailing newlines with just a single one

      var prefix = options.bulletListMarker + ' ';
      if (node.isCode === false) {
        content = content.replace(/\n/gm, '\n    '); // indent
      }
      

      const joplinCheckbox = joplinCheckboxInfo(node);
      if (joplinCheckbox) {
        prefix = '- [' + (joplinCheckbox.checked ? 'x' : ' ') + '] ';
      } else {
        var parent = node.parentNode;
        if (isOrderedList(parent)) {
          if (node.isCode) {
            // Ordered lists in code blocks are often for line numbers. Remove them. 
            // See https://github.com/laurent22/joplin/pull/10126
            // test case: packages/app-cli/tests/html_to_md/code_multiline_4.html
            prefix = '';
          } else {
            var start = parent.getAttribute('start');
            var index = Array.prototype.indexOf.call(parent.children, node);
            var indexStr = (start ? Number(start) + index : index + 1) + '';
            // The content of the line that contains the bullet must align wih the following lines.
            //
            // i.e it should be:
            //
            // 9.  my content
            //     second line
            // 10. next one
            //     second line
            //
            // But not:
            //
            // 9.  my content
            //     second line
            // 10.  next one
            //     second line
            //
            prefix = indexStr + '.' + ' '.repeat(3 - indexStr.length);
          }
        }
      }

      // Prevent the item from starting with a blank line (which breaks rendering)
      content = removeListItemLeadingNewlines(content);

      // Prevent the item from being empty (which also prevents the item from rendering as a list
      // item).
      if (isEmptyTaskListItem(content)) {
        content += '&nbsp;';
      }

      return (
        prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
      )
    }
  };

  rules.indentedCodeBlock = {
    filter: function (node, options) {
      if (options.codeBlockStyle !== 'indented') return false
      return isCodeBlock(node);
    },

    replacement: function (content, node, options) {
      const handledNode = isCodeBlockSpecialCase1(node) ? node : node.firstChild;

      return (
        '\n\n    ' +
        handledNode.textContent.replace(/\n/g, '\n    ') +
        '\n\n'
      )
    }
  };

  rules.fencedCodeBlock = {
    filter: function (node, options) {
      if (options.codeBlockStyle !== 'fenced') return false;
      return isCodeBlock(node);
    },

    replacement: function (content, node, options) {
      let handledNode = node.firstChild;
      if (isCodeBlockSpecialCase1(node) || isCodeBlockSpecialCase2(node)) handledNode = node;

      var className = handledNode.className || '';
      var language = (className.match(/language-(\S+)/) || [null, ''])[1];
      var code = content;

      var fenceChar = options.fence.charAt(0);
      var fenceSize = 3;
      var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm');

      var match;
      while ((match = fenceInCodeRegex.exec(code))) {
        if (match[0].length >= fenceSize) {
          fenceSize = match[0].length + 1;
        }
      }

      var fence = repeat(fenceChar, fenceSize);

      // remove code block leading and trailing empty lines
      code = code.replace(/^([ \t]*\n)+/, '').trimEnd();

      return (
        '\n\n' + fence + language + '\n' +
        code.replace(/\n$/, '') +
        '\n' + fence + '\n\n'
      )
    }
  };

  rules.horizontalRule = {
    filter: 'hr',

    replacement: function (content, node, options) {
      return '\n\n' + options.hr + '\n\n'
    }
  };

  function filterLinkContent (content) {
    return content.trim().replace(/[\n\r]+/g, '<br>')
  }

  function filterLinkHref (href) {
    if (!href) return ''
    href = href.trim();
    if (href.toLowerCase().indexOf('javascript:') === 0) return '' // We don't want to keep js code in the markdown
    // Replace the spaces with %20 because otherwise they can cause problems for some
    // renderer and space is not a valid URL character anyway.
    href = href.replace(/ /g, '%20');
    // Newlines and tabs also break renderers
    href = href.replace(/\n/g, '%0A');
    href = href.replace(/\t/g, '%09');
    // Brackets also should be escaped
    href = href.replace(/\(/g, '%28');
    href = href.replace(/\)/g, '%29');
    return href
  }

  function filterImageTitle(title) {
    if (!title) return ''
    title = title.trim();
    title = title.replace(/\"/g, '&quot;');
    title = title.replace(/\(/g, '&#40;');
    title = title.replace(/\)/g, '&#41;');
    return title
  }

  function getNamedAnchorFromLink(node, options) {
    var id = node.getAttribute('id');
    if (!id) id = node.getAttribute('name');
    if (id) id = id.trim();

    if (id && options.anchorNames.indexOf(id.toLowerCase()) >= 0) {
      return '<a id="' + htmlentities(id) + '"></a>';
    } else {
      return '';
    }
  }

  function isLinkifiedUrl(url) {
    return url.indexOf('http://') === 0 || url.indexOf('https://') === 0 || url.indexOf('file://') === 0;
  }

  rules.inlineLink = {
    filter: function (node, options) {
      return (
        options.linkStyle === 'inlined' &&
        node.nodeName === 'A' &&
        (node.getAttribute('href') || node.getAttribute('name') || node.getAttribute('id'))
      )
    },

    escapeContent: function (node, _options) {
      // Disable escaping content (including '_'s) when the link has the same URL and href.
      // This prevents links from being broken by added escapes.
      return node.getAttribute('href') !== node.textContent;
    },

    replacement: function (content, node, options) {
      var href = filterLinkHref(node.getAttribute('href'));

      if (!href) {
        return getNamedAnchorFromLink(node, options) + filterLinkContent(content)
      } else {
        var title = node.title && node.title !== href ? ' "' + node.title + '"' : '';
        if (!href) title = '';
        let output = getNamedAnchorFromLink(node, options) + '[' + filterLinkContent(content) + '](' + href + title + ')';

        // If the URL is automatically linkified by Joplin, and the title is
        // the same as the URL, there is no need to make it a link here. That
        // will prevent URsL from the rich text editor to be needlessly
        // converted from this:
        //
        // <a href="https://example.com">https://example.com</a>
        //
        // to this:
        //
        // [https://example.com](https://example.com)
        //
        // It means cleaner Markdown will also be generated by the web
        // clipper.
        if (isLinkifiedUrl(href)) {
          if (output === '[' + href + '](' + href + ')') return href;
        }

        return output;
      }
    }
  };

  // Normally a named anchor would be <a name="something"></a> but
  // you can also find <span id="something">Something</span> so the
  // rule below handle this.
  // Fixes https://github.com/laurent22/joplin/issues/1876
  rules.otherNamedAnchors = {
    filter: function (node, options) {
      return !!getNamedAnchorFromLink(node, options);
    },

    replacement: function (content, node, options) {
      return getNamedAnchorFromLink(node, options) + content;
    }
  };

  rules.referenceLink = {
    filter: function (node, options) {
      return (
        options.linkStyle === 'referenced' &&
        node.nodeName === 'A' &&
        node.getAttribute('href')
      )
    },

    replacement: function (content, node, options) {
      var href = filterLinkHref(node.getAttribute('href'));
      var title = node.title ? ' "' + node.title + '"' : '';
      if (!href) title = '';
      var replacement;
      var reference;

      content = filterLinkContent(content);

      switch (options.linkReferenceStyle) {
        case 'collapsed':
          replacement = '[' + content + '][]';
          reference = '[' + content + ']: ' + href + title;
          break
        case 'shortcut':
          replacement = '[' + content + ']';
          reference = '[' + content + ']: ' + href + title;
          break
        default:
          var id = this.references.length + 1;
          replacement = '[' + content + '][' + id + ']';
          reference = '[' + id + ']: ' + href + title;
      }

      this.references.push(reference);
      return replacement
    },

    references: [],

    append: function (options) {
      var references = '';
      if (this.references.length) {
        references = '\n\n' + this.references.join('\n') + '\n\n';
        this.references = []; // Reset references
      }
      return references
    }
  };

  rules.emphasis = {
    filter: ['em', 'i'],

    replacement: function (content, node, options) {
      if (!content.trim()) return ''
      if (node.isCode) return content;
      return options.emDelimiter + content + options.emDelimiter
    }
  };

  rules.strong = {
    filter: ['strong', 'b'],

    replacement: function (content, node, options) {
      if (!content.trim()) return ''
      if (node.isCode) return content;
      return options.strongDelimiter + content + options.strongDelimiter
    }
  };

  rules.code = {
    filter: function (node) {
      var hasSiblings = node.previousSibling || node.nextSibling;
      var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

      return node.nodeName === 'CODE' && !isCodeBlock
    },

    replacement: function (content, node, options) {
      if (!content) {
        return ''
      }

      content = content.replace(/\r?\n|\r/g, '\n');
      // If code is multiline and in codeBlock, just return it, codeBlock will add fence(default is ```).
      //
      // This handles the case where a <code> element is nested directly within a <pre> and
      // should not be turned into an inline code region.
      //
      // See https://github.com/laurent22/joplin/pull/10126 .
      if (content.indexOf('\n') !== -1 && node.parentNode && isCodeBlock(node.parentNode)){
        return content
      }

      content = content.replace(/\r?\n|\r/g, '');

      var extraSpace = /^`|^ .*?[^ ].* $|`$/.test(content) ? ' ' : '';
      var delimiter = '`';
      var matches = content.match(/`+/gm) || [];
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';

      return delimiter + extraSpace + content + extraSpace + delimiter
    }
  };

  function imageMarkdownFromAttributes(attributes) {
    var alt = attributes.alt || '';
    var src = filterLinkHref(attributes.src || '');
    var title = attributes.title || '';
    var titlePart = title ? ' "' + filterImageTitle(title) + '"' : '';
    return src ? '![' + alt.replace(/([[\]])/g, '\\$1') + ']' + '(' + src + titlePart + ')' : ''
  }

  function imageMarkdownFromNode(node, options = null) {
    options = Object.assign({}, {
      preserveImageTagsWithSize: false,
    }, options);

    if (options.preserveImageTagsWithSize && (node.getAttribute('width') || node.getAttribute('height'))) {
      let html = node.outerHTML;

      // To prevent markup immediately after the image from being interpreted as HTML, a closing tag
      // is sometimes necessary.
      const needsClosingTag = () => {
        const parent = node.parentElement;
        if (!parent || parent.nodeName !== 'LI') return false;
        const hasClosingTag = html.match(/<\/[a-z]+\/>$/ig);
        if (hasClosingTag) {
          return false;
        }

        const allChildren = [...parent.childNodes];
        const nonEmptyChildren = allChildren.filter(item => {
          // Even if surrounded by #text nodes that only contain whitespace, Markdown after
          // an <img> can still be incorrectly interpreted as HTML. Only non-empty #texts seem
          // to prevent this.
          return item.nodeName !== '#text' || item.textContent.trim() !== '';
        });

        const imageIndex = nonEmptyChildren.indexOf(node);
        const hasNextSibling = imageIndex + 1 < nonEmptyChildren.length;
        const nextSiblingName = hasNextSibling ? (
          nonEmptyChildren[imageIndex + 1].nodeName
        ) : null;

        const nextSiblingIsNewLine = nextSiblingName === 'UL' || nextSiblingName === 'OL' || nextSiblingName === 'BR';
        return imageIndex === 0 && nextSiblingIsNewLine;
      };

      if (needsClosingTag()) {
        html = html.replace(/[/]?>$/, `></${node.nodeName.toLowerCase()}>`);
      }
      return html;
    }

    return imageMarkdownFromAttributes({
      alt: node.alt,
      src: node.getAttribute('src') || node.getAttribute('data-src'),
      title: node.title,
    });
  }

  function imageUrlFromSource(node) {
    // Format of srcset can be:
    // srcset="kitten.png"
    // or:
    // srcset="kitten.png, kitten@2X.png 2x"

    let src = node.getAttribute('srcset');
    if (!src) src = node.getAttribute('data-srcset');
    if (!src) return '';

    const s = src.split(',');
    if (!s.length) return '';
    src = s[0];

    src = src.split(' ');
    return src[0];
  }

  rules.image = {
    filter: 'img',

    replacement: function (content, node, options) {
      return imageMarkdownFromNode(node, options);
    }
  };

  rules.picture = {
    filter: 'picture',

    replacement: function (content, node, options) {
      if (!node.childNodes) return '';

      let firstSource = null;
      let firstImg = null;

      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];

        if (child.nodeName === 'SOURCE' && !firstSource) firstSource = child;
        if (child.nodeName === 'IMG') firstImg = child;
      }

      if (firstImg && firstImg.getAttribute('src')) {
        return imageMarkdownFromNode(firstImg, options);
      } else if (firstSource) {
        // A <picture> tag can have multiple <source> tag and the browser should decide which one to download
        // but for now let's pick the first one.
        const src = imageUrlFromSource(firstSource);
        return src ? '![](' + src + ')' : '';
      }

      return '';
    }
  };

  function findFirstDescendant(node, byType, name) {
    for (const childNode of node.childNodes) {
      if (byType === 'class' && childNode.classList.contains(name)) return childNode;
      if (byType === 'nodeName' && childNode.nodeName === name) return childNode;

      const sub = findFirstDescendant(childNode, byType, name);
      if (sub) return sub;
    }
    return null;
  }

  function findParent(node, byType, name) {
    while (true) {
      const p = node.parentNode;
      if (!p) return null;
      if (byType === 'class' && p.classList && p.classList.contains(name)) return p;
      if (byType === 'nodeName' && p.nodeName === name) return p;
      node = p;
    }
  }

  // ===============================================================================
  // MATHJAX support
  //
  // When encountering Mathjax elements there's first the rendered Mathjax,
  // which we want to skip because it cannot be converted reliably to Markdown.
  // This tag is followed by the actual MathJax script in a <script> tag, which
  // is what we want to export. By wrapping this text in "$" or "$$" it will
  // be displayed correctly by Katex in Joplin.
  //
  // See mathjax_inline and mathjax_block test cases.
  // ===============================================================================

  function majaxScriptBlockType(node) {
    if (node.nodeName !== 'SCRIPT') return null;

    const a = node.getAttribute('type');
    if (!a || a.indexOf('math/tex') < 0) return null;

    return a.indexOf('display') >= 0 ? 'block' : 'inline';
  }

  rules.mathjaxRendered = {
    filter: function (node) {
      return node.nodeName === 'SPAN' && node.getAttribute('class') === 'MathJax';
    },

    replacement: function (content, node, options) {
      return '';
    }
  };

  rules.mathjaxScriptInline = {
    filter: function (node) {
      return majaxScriptBlockType(node) === 'inline';
    },

    escapeContent: function() {
      // We want the raw unescaped content since this is what Katex will need to render
      // If we escape, it will double the \\ in particular.
      return false;
    },

    replacement: function (content, node, options) {
      return '$' + content + '$';
    }
  };

  rules.mathjaxScriptBlock = {
    filter: function (node) {
      return majaxScriptBlockType(node) === 'block';
    },

    escapeContent: function() {
      return false;
    },

    replacement: function (content, node, options) {
      return '$$\n' + content + '\n$$';
    }
  };

  // ===============================================================================
  // End of MATHJAX support
  // ===============================================================================

  // ===============================================================================
  // Joplin "noMdConv" support
  // 
  // Tags that have the class "jop-noMdConv" are not converted to Markdown
  // but left as HTML. This is useful when converting from MD to HTML, then
  // back to MD again. In that case, we'd want to preserve the code that
  // was in HTML originally.
  // ===============================================================================

  rules.joplinHtmlInMarkdown = {
    filter: function (node) {
      // Tables are special because they may be entirely kept as HTML depending on
      // the logic in table.js, for example if they contain code.
      return node && node.classList && node.classList.contains('jop-noMdConv') && node.nodeName !== 'TABLE';
    },

    replacement: function (content, node) {
      node.classList.remove('jop-noMdConv');
      const nodeName = node.nodeName.toLowerCase();
      let attrString = attributesHtml(node.attributes, { skipEmptyClass: true });
      if (attrString) attrString = ' ' + attrString;
      return '<' + nodeName + attrString + '>' + content + '</' + nodeName + '>';
    }
  };

  // ===============================================================================
  // Joplin Source block support
  // 
  // This is specific to Joplin: a plugin may convert some Markdown to HTML
  // but keep the original source in a hidden <PRE class="joplin-source"> block.
  // In that case, when we convert back again from HTML to MD, we use that
  // block for lossless conversion.
  // ===============================================================================

  function joplinEditableBlockInfo(node) {
    if (!node.classList.contains('joplin-editable')) return null;

    let sourceNode = null;
    let isInline = false;
    for (const childNode of node.childNodes) {
      if (childNode.classList.contains('joplin-source')) {
        sourceNode = childNode;
        break;
      }
    }

    if (!sourceNode) return null;
    if (!node.isBlock) isInline = true;

    return {
      openCharacters: sourceNode.getAttribute('data-joplin-source-open'),
      closeCharacters: sourceNode.getAttribute('data-joplin-source-close'),
      content: sourceNode.textContent,
      isInline
    };
  }

  rules.joplinSourceBlock = {
    filter: function (node) {
      return !!joplinEditableBlockInfo(node);
    },

    escapeContent: function() {
      return false;
    },

    replacement: function (content, node, options) {
      const info = joplinEditableBlockInfo(node);
      if (!info) return;

      const surroundingCharacter = info.isInline? '' : '\n\n';
      return surroundingCharacter + info.openCharacters + info.content + info.closeCharacters + surroundingCharacter;
    }
  };


  // ===============================================================================
  // Checkboxes
  // ===============================================================================

  function joplinCheckboxInfo(liNode) {
    if (liNode.classList.contains('joplin-checkbox')) {
      // Handling of this rendering is buggy as it adds extra new lines between each
      // list item. However, supporting this rendering is normally no longer needed.
      const input = findFirstDescendant(liNode, 'nodeName', 'INPUT');
      return {
        checked: input && input.getAttribute ? !!input.getAttribute('checked') : false,
        renderingType: 1,
      };
    }

    const parentChecklist = findParent(liNode, 'class', 'joplin-checklist');
    if (parentChecklist) {
      return {
        checked: !!liNode.classList && liNode.classList.contains('checked'),
        renderingType: 2,
      };
    }

    return null;
  }

  /**
   * Manages a collection of rules used to convert HTML to Markdown
   */

  function Rules (options) {
    this.options = options;
    this._keep = [];
    this._remove = [];

    this.blankRule = {
      replacement: options.blankReplacement
    };

    this.keepReplacement = options.keepReplacement;

    this.defaultRule = {
      replacement: options.defaultReplacement
    };

    this.array = [];
    for (var key in options.rules) this.array.push(options.rules[key]);
  }

  Rules.prototype = {
    add: function (key, rule) {
      this.array.unshift(rule);
    },

    keep: function (filter) {
      this._keep.unshift({
        filter: filter,
        replacement: this.keepReplacement
      });
    },

    remove: function (filter) {
      this._remove.unshift({
        filter: filter,
        replacement: function () {
          return ''
        }
      });
    },

    forNode: function (node) {
      // code block keep blank lines
      // See https://github.com/laurent22/joplin/pull/10126 .
      // test case: packages/app-cli/tests/html_to_md/code_multiline_4.html
      if (node.isCode === false && node.isBlank) return this.blankRule
      var rule;

      if ((rule = findRule(this.array, node, this.options))) return rule
      if ((rule = findRule(this._keep, node, this.options))) return rule
      if ((rule = findRule(this._remove, node, this.options))) return rule

      return this.defaultRule
    },

    forEach: function (fn) {
      for (var i = 0; i < this.array.length; i++) fn(this.array[i], i);
    }
  };

  function findRule (rules, node, options) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      if (filterValue(rule, node, options)) return rule
    }
    return void 0
  }

  function filterValue (rule, node, options) {
    var filter = rule.filter;
    if (typeof filter === 'string') {
      if (filter === node.nodeName.toLowerCase()) return true
    } else if (Array.isArray(filter)) {
      if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true
    } else if (typeof filter === 'function') {
      if (filter.call(rule, node, options)) return true
    } else {
      throw new TypeError('`filter` needs to be a string, array, or function')
    }
  }

  /**
   * The collapseWhitespace function is adapted from collapse-whitespace
   * by Luc Thevenard.
   *
   * The MIT License (MIT)
   *
   * Copyright (c) 2014 Luc Thevenard <lucthevenard@gmail.com>
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  function containsOnlySpaces(text) {
    if (!text) return false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') return false;
    }
    return true;
  }

  /**
   * collapseWhitespace(options) removes extraneous whitespace from an the given element.
   *
   * @param {Object} options
   */
  function collapseWhitespace (options) {
    var element = options.element;
    var isBlock = options.isBlock;
    var isVoid = options.isVoid;
    var isPre = options.isPre || function (node) {
      return node.nodeName === 'PRE'
    };

    if (!element.firstChild || isPre(element)) return

    var prevText = null;
    var keepLeadingWs = false;

    var prev = null;
    var node = next(prev, element, isPre);

    // We keep track of whether the previous was only spaces or not. This prevent the case where multiple empty blocks are
    // added, which results in multiple spaces. This spaces are then incorrectly interpreted as a code block by renderers.
    // So by keeping track of this, we make sure that only one space at most is added.
    var prevTextIsOnlySpaces = false;
    while (node !== element) {
      if (node.nodeType === 3 || node.nodeType === 4) { // Node.TEXT_NODE or Node.CDATA_SECTION_NODE
        var text = node.data.replace(/[ \r\n\t]+/g, ' ');

        if ((!prevText || / $/.test(prevText.data)) &&
            !keepLeadingWs && text[0] === ' ') {
          text = text.substr(1);
        }

        var textIsOnlySpaces = containsOnlySpaces(text);

        // `text` might be empty at this point.
        if (!text || (textIsOnlySpaces && prevTextIsOnlySpaces)) {
          node = remove(node);
          continue
        }

        prevTextIsOnlySpaces = textIsOnlySpaces;
        node.data = text;

        prevText = node;
      } else if (node.nodeType === 1) { // Node.ELEMENT_NODE
        if (isBlock(node) || node.nodeName === 'BR') {
          if (prevText) {
            prevText.data = prevText.data.replace(/ $/, '');
          }

          prevText = null;
          keepLeadingWs = false;
        } else if (isVoid(node) || isPre(node)) {
          // Avoid trimming space around non-block, non-BR void elements and inline PRE.
          prevText = null;
          keepLeadingWs = true;
        } else if (prevText) {
          // Drop protection if set previously.
          keepLeadingWs = false;
        }
      } else {
        node = remove(node);
        continue
      }

      var nextNode = next(prev, node, isPre);
      prev = node;
      node = nextNode;
    }

    if (prevText) {
      prevText.data = prevText.data.replace(/ $/, '');
      if (!prevText.data) {
        remove(prevText);
      }
    }
  }

  /**
   * remove(node) removes the given node from the DOM and returns the
   * next node in the sequence.
   *
   * @param {Node} node
   * @return {Node} node
   */
  function remove (node) {
    var next = node.nextSibling || node.parentNode;

    node.parentNode.removeChild(node);

    return next
  }

  /**
   * next(prev, current, isPre) returns the next node in the sequence, given the
   * current and previous nodes.
   *
   * @param {Node} prev
   * @param {Node} current
   * @param {Function} isPre
   * @return {Node}
   */
  function next (prev, current, isPre) {
    if ((prev && prev.parentNode === current) || isPre(current)) {
      return current.nextSibling || current.parentNode
    }

    return current.firstChild || current.nextSibling || current.parentNode
  }

  /*
   * Set up window for Node.js
   */

  var root = (typeof window !== 'undefined' ? window : {});

  /*
   * Parsing HTML strings
   */

  function canParseHTMLNatively () {
    var Parser = root.DOMParser;
    var canParse = false;

    // Adapted from https://gist.github.com/1129031
    // Firefox/Opera/IE throw errors on unsupported types
    try {
      // WebKit returns null on unsupported types
      if (new Parser().parseFromString('', 'text/html')) {
        canParse = true;
      }
    } catch (e) {}

    return canParse
  }

  function createHTMLParser () {
    var Parser = function () {};

    {
      if (shouldUseActiveX()) {
        Parser.prototype.parseFromString = function (string) {
          var doc = new window.ActiveXObject('htmlfile');
          doc.designMode = 'on'; // disable on-page scripts
          doc.open();
          doc.write(string);
          doc.close();
          return doc
        };
      } else {
        Parser.prototype.parseFromString = function (string) {
          var doc = document.implementation.createHTMLDocument('');
          doc.open();
          doc.write(string);
          doc.close();
          return doc
        };
      }
    }
    return Parser
  }

  function shouldUseActiveX () {
    var useActiveX = false;
    try {
      document.implementation.createHTMLDocument('').open();
    } catch (e) {
      if (window.ActiveXObject) useActiveX = true;
    }
    return useActiveX
  }

  var HTMLParser = canParseHTMLNatively() ? root.DOMParser : createHTMLParser();

  function RootNode (input, options) {
    var root;
    if (typeof input === 'string') {
      var doc = htmlParser().parseFromString(
        // DOM parsers arrange elements in the <head> and <body>.
        // Wrapping in a custom element ensures elements are reliably arranged in
        // a single element.
        '<x-turndown id="turndown-root">' + input + '</x-turndown>',
        'text/html'
      );
      root = doc.getElementById('turndown-root');
    } else {
      root = input.cloneNode(true);
    }
    collapseWhitespace({
      element: root,
      isBlock: isBlock,
      isVoid: isVoid,
      isPre: options.preformattedCode ? isPreOrCode : null
    });

    return root
  }

  var _htmlParser;
  function htmlParser () {
    _htmlParser = _htmlParser || new HTMLParser();
    return _htmlParser
  }

  function isPreOrCode (node) {
    return node.nodeName === 'PRE' || node.nodeName === 'CODE'
  }

  function Node (node, options) {
    node.isBlock = isBlock(node);
    node.isCode = node.nodeName === 'CODE' || node.parentNode.isCode || isCodeBlock(node);
    node.isBlank = isBlank(node);
    node.flankingWhitespace = flankingWhitespace(node, options);
    return node
  }

  function isBlank (node) {
    return (
      !isVoid(node) &&
      !isMeaningfulWhenBlank(node) &&
      /^\s*$/i.test(node.textContent) &&
      !hasVoid(node) &&
      !hasMeaningfulWhenBlank(node)
    )
  }

  function flankingWhitespace (node, options) {
    if (node.isBlock || (options.preformattedCode && node.isCode)) {
      return { leading: '', trailing: '' }
    }

    var edges = edgeWhitespace(node.textContent);

    // abandon leading ASCII WS if left-flanked by ASCII WS
    if (edges.leadingAscii && isFlankedByWhitespace('left', node, options)) {
      edges.leading = edges.leadingNonAscii;
    }

    // abandon trailing ASCII WS if right-flanked by ASCII WS
    if (edges.trailingAscii && isFlankedByWhitespace('right', node, options)) {
      edges.trailing = edges.trailingNonAscii;
    }

    return { leading: edges.leading, trailing: edges.trailing }
  }

  function edgeWhitespace (string) {
    var m = string.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
    return {
      leading: m[1], // whole string for whitespace-only strings
      leadingAscii: m[2],
      leadingNonAscii: m[3],
      trailing: m[4], // empty for whitespace-only strings
      trailingNonAscii: m[5],
      trailingAscii: m[6]
    }
  }

  function isFlankedByWhitespace (side, node, options) {
    var sibling;
    var regExp;
    var isFlanked;

    if (side === 'left') {
      sibling = node.previousSibling;
      regExp = / $/;
    } else {
      sibling = node.nextSibling;
      regExp = /^ /;
    }

    if (sibling) {
      if (sibling.nodeType === 3) {
        isFlanked = regExp.test(sibling.nodeValue);
      } else if (options.preformattedCode && sibling.nodeName === 'CODE') {
        isFlanked = false;
      } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
        isFlanked = regExp.test(sibling.textContent);
      }
    }
    return isFlanked
  }

  // Allows falling back to a more-compatible [fallbackRegex] on platforms that fail to compile
  // the primary [regexString].
  const regexWithFallback = (regexString, regexFlags, fallbackRegex) => {
    try {
      return new RegExp(regexString, regexFlags);
    } catch (error) {
      console.error('Failed to compile regular expression. Falling back to a compatibility regex. Error: ', error);
      return fallbackRegex;
    }
  };
  var escapes = [
    [/\\/g, '\\\\'],
    [/\*/g, '\\*'],
    [/^-/g, '\\-'],
    [/^\+ /g, '\\+ '],
    [/^(=+)/g, '\\$1'],
    [/^(#{1,6}) /g, '\\$1 '],
    [/`/g, '\\`'],
    [/^~~~/g, '\\~~~'],
    [/\[/g, '\\['],
    [/\]/g, '\\]'],
    [/^>/g, '\\>'],
    // A list of valid \p values can be found here: https://unicode.org/reports/tr44/#GC_Values_Table
    [regexWithFallback('(^|\\p{Punctuation}|\\p{Separator}|\\p{Symbol})_(\\P{Separator})', 'ug', /(^|\s)_(\S)/), '$1\\_$2'],
    [/^(\d+)\. /g, '$1\\. '],
    [/\$/g, '\\$$'], // Math
  ];

  function TurndownService (options) {
    if (!(this instanceof TurndownService)) return new TurndownService(options)

    var defaults = {
      rules: rules,
      headingStyle: 'setext',
      hr: '* * *',
      bulletListMarker: '*',
      codeBlockStyle: 'indented',
      fence: '```',
      emDelimiter: '_',
      strongDelimiter: '**',
      linkStyle: 'inlined',
      linkReferenceStyle: 'full',
      anchorNames: [],
      br: '  ',
      disableEscapeContent: false,
      preformattedCode: false,
      preserveNestedTables: false,
      preserveColorStyles: false,
      blankReplacement: function (content, node) {
        return node.isBlock ? '\n\n' : ''
      },
      keepReplacement: function (content, node) {
        // In markdown, multiple blank lines end an HTML block. We thus
        // include an HTML comment to make otherwise blank lines not blank.
        const mutliBlankLineRegex = /\n([ \t\r]*)\n/g;

        // We run the replacement multiple times to handle multiple blank
        // lines in a row.
        //
        // For example, "Foo\n\n\nBar" becomes "Foo\n<!-- -->\n\nBar" after the
        // first replacement.
        let html = node.outerHTML;
        while (html.match(mutliBlankLineRegex)) {
          html = html.replace(mutliBlankLineRegex, '\n<!-- -->$1\n');
        }

        return node.isBlock ? '\n\n' + html + '\n\n' : html
      },
      defaultReplacement: function (content, node) {
        return node.isBlock ? '\n\n' + content + '\n\n' : content
      }
    };
    this.options = extend({}, defaults, options);
    this.rules = new Rules(this.options);
  }

  TurndownService.prototype = {
    /**
     * The entry point for converting a string or DOM node to Markdown
     * @public
     * @param {String|HTMLElement} input The string or DOM node to convert
     * @returns A Markdown representation of the input
     * @type String
     */

    turndown: function (input) {
      if (!canConvert(input)) {
        throw new TypeError(
          input + ' is not a string, or an element/document/fragment node.'
        )
      }

      if (input === '') return ''

      var output = process.call(this, new RootNode(input, this.options));
      return postProcess.call(this, output)
    },

    /**
     * Add one or more plugins
     * @public
     * @param {Function|Array} plugin The plugin or array of plugins to add
     * @returns The Turndown instance for chaining
     * @type Object
     */

    use: function (plugin) {
      if (Array.isArray(plugin)) {
        for (var i = 0; i < plugin.length; i++) this.use(plugin[i]);
      } else if (typeof plugin === 'function') {
        plugin(this);
      } else {
        throw new TypeError('plugin must be a Function or an Array of Functions')
      }
      return this
    },

    /**
     * Adds a rule
     * @public
     * @param {String} key The unique key of the rule
     * @param {Object} rule The rule
     * @returns The Turndown instance for chaining
     * @type Object
     */

    addRule: function (key, rule) {
      this.rules.add(key, rule);
      return this
    },

    /**
     * Keep a node (as HTML) that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */

    keep: function (filter) {
      this.rules.keep(filter);
      return this
    },

    /**
     * Remove a node that matches the filter
     * @public
     * @param {String|Array|Function} filter The unique key of the rule
     * @returns The Turndown instance for chaining
     * @type Object
     */

    remove: function (filter) {
      this.rules.remove(filter);
      return this
    },

    /**
     * Escapes Markdown syntax
     * @public
     * @param {String} string The string to escape
     * @returns A string with Markdown syntax escaped
     * @type String
     */

    escape: function (string) {
      return escapes.reduce(function (accumulator, escape) {
        return accumulator.replace(escape[0], escape[1])
      }, string)
    },

    isCodeBlock: function(node) {
      return isCodeBlock(node);
    },

  };

  /**
   * Reduces a DOM node down to its Markdown string equivalent
   * @private
   * @param {HTMLElement} parentNode The node to convert
   * @returns A Markdown representation of the node
   * @type String
   */

  function process (parentNode, escapeContent = 'auto') {
    if (this.options.disableEscapeContent) escapeContent = false;

    let output = '';
    let previousNode = null;

    for (let node of parentNode.childNodes) {
      node = new Node(node, this.options);

      var replacement = '';
      if (node.nodeType === 3) {
        if (node.isCode || escapeContent === false) {
          replacement = node.nodeValue;
        } else {
          replacement = this.escape(node.nodeValue);

          // Escape < and > so that, for example, this kind of HTML text: "This is a tag: &lt;p&gt;" is still rendered as "This is a tag: &lt;p&gt;"
          // and not "This is a tag: <p>". If the latter, it means the HTML will be rendered if the viewer supports HTML (which, in Joplin, it does).
          replacement = replacement.replace(/<(.+?)>/g, '&lt;$1&gt;');
        }
      } else if (node.nodeType === 1) {
        replacement = replacementForNode.call(this, node, previousNode);
      }

      output = join(output, replacement, parentNode.isCode);
      previousNode = node;
    }

    return output;
  }

  /**
   * Appends strings as each rule requires and trims the output
   * @private
   * @param {String} output The conversion output
   * @returns A trimmed version of the ouput
   * @type String
   */

  function postProcess (output) {
    var self = this;
    this.rules.forEach(function (rule) {
      if (typeof rule.append === 'function') {
        output = join(output, rule.append(self.options), false);
      }
    });

    return output.replace(/^[\t\r\n]+/, '').replace(/[\t\r\n\s]+$/, '')
  }

  /**
   * Converts an element node to its Markdown equivalent
   * @private
   * @param {HTMLElement} node The node to convert
   * @param {HTMLElement|null} previousNode The node immediately before this node.
   * @returns A Markdown representation of the node
   * @type String
   */

  function replacementForNode (node, previousNode) {
    var rule = this.rules.forNode(node);
    var content = process.call(this, node, rule.escapeContent ? rule.escapeContent(node) : 'auto');
    var whitespace = node.flankingWhitespace;
    if (whitespace.leading || whitespace.trailing){
      if (node.isCode) {
        // Fix: Web clipper has trouble with code blocks on Joplin's website.
        // See https://github.com/laurent22/joplin/pull/10126#issuecomment-2016523281 .
        // if isCode, keep line breaks
        //test case: packages/app-cli/tests/html_to_md/code_multiline_1.html
        //test case: packages/app-cli/tests/html_to_md/code_multiline_3.html

        //If the leading blank of current node or leading blank of current node including line breaks, and the leading blank of current node is equal to the leading blank of it's first child node, and the trailing blank of the current node is equal to the leading blank of it's last child node, it indicates that the leading blank and leading blank of current node is from it's child nodes, so should not be added repeatedly, this remove multiple line breaks.
        //test case: packages/app-cli/tests/html_to_md/code_multiline_5.html
        if ( (whitespace.leading.indexOf('\n') !== -1 || whitespace.trailing.indexOf('\n') !== -1) && 
          node.childNodes && node.childNodes.length > 0) {

          var firstChildWhitespace = node.childNodes[0].flankingWhitespace;
          var lastChildWhitespace = node.childNodes[node.childNodes.length-1].flankingWhitespace;

          if (whitespace.leading === firstChildWhitespace.leading && 
            whitespace.trailing === lastChildWhitespace.trailing) {
              content = content.trim();
          }
        } else {
          // keep line breaks
          content = content.replace(/^[ \t]+|[ \t]+$/g, '');
        }
      } else {
        content = content.trim();
      }
    }
    
    return (
      whitespace.leading +
      rule.replacement(content, node, this.options, previousNode) +
      whitespace.trailing
    )
  }

  /**
   * Joins replacement to the current output with appropriate number of new lines
   * @private
   * @param {String} output The current conversion output
   * @param {String} replacement The string to append to the output
   * @returns Joined output
   * @type String
   */

  function join (output, replacement, isCode) {
    if (isCode === true) {
      // Fix: Web clipper has trouble with code blocks on Joplin's website.
      // See https://github.com/laurent22/joplin/pull/10126#issuecomment-2016523281 .
      // If isCode, keep line breaks
      return output + replacement
    } else {
      var s1 = trimTrailingNewlines(output);
      var s2 = trimLeadingNewlines(replacement);
      var nls = Math.max(output.length - s1.length, replacement.length - s2.length);
      var separator = '\n\n'.substring(0, nls);

      return s1 + separator + s2
    }  
  }

  /**
   * Determines whether an input can be converted
   * @private
   * @param {String|HTMLElement} input Describe this parameter
   * @returns Describe what it returns
   * @type String|Object|Array|Boolean|Number
   */

  function canConvert (input) {
    return (
      input != null && (
        typeof input === 'string' ||
        (input.nodeType && (
          input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11
        ))
      )
    )
  }

  return TurndownService;

})();
