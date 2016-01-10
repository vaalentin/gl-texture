"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Texture
 */

var Texture = function () {
  /**
   * @constructs Texture
   * @param {WebGLRenderingContext} gl
   * @param {uint} type
   * @param {HTMLImageElement} src
   */

  function Texture(gl, type, img) {
    _classCallCheck(this, Texture);

    this.gl = gl;

    this.type = type;

    this.texture = this.gl.createTexture();

    if (img) {
      this.setImg(img);
    }

    this.gl.bindTexture(this.type, this.texture);
    this.gl.texParameteri(this.type, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.type, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
    this.gl.generateMipmap(this.type);
    this.gl.bindTexture(this.type, null);
  }

  /**
   * @method bind
   * @public
   * @param {uint} ch
   * @returns {uint}
   */

  _createClass(Texture, [{
    key: "bind",
    value: function bind() {
      var ch = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      this.gl.activeTexture(this.gl.TEXTURE0 + ch);
      this.gl.bindTexture(this.type, this.texture);
      return ch;
    }

    /**
     * @method setImg
     * @public
     * @param {HTMLImageElement} img
     */

  }, {
    key: "setImg",
    value: function setImg(img) {
      this.img = img;
      this.gl.bindTexture(this.type, this.texture);
      this.gl.texImage2D(this.type, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    }

    /**
     * @method dispose
     * @public
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this.gl.deleteTexture(this.texture);
      this.type = null;
      this.img = null;

      this.gl = null;
    }
  }]);

  return Texture;
}();

exports.default = Texture;
