/**
 * @class Texture
 */
export default class Texture {
  /**
   * @constructs Texture
   * @param {WebGLRenderingContext} gl
   * @param {uint} type
   * @param {HTMLImageElement} src
   */
  constructor(gl, type, img) {
    this.gl = gl;

    this.type = type;

    this.texture = this.gl.createTexture();

    if(img) {
      this.setData(img);
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
  bind(ch = 0) {
    this.gl.activeTexture(this.gl.TEXTURE0 + ch);
    this.gl.bindTexture(this.type, this.texture);
    return ch; 
  }

  /**
   * @method setImg
   * @public
   * @param {HTMLImageElement} img
   */
   setImg(img) {
     this.img = img;
     this.gl.bindTexture(this.type, this.texture);
     this.gl.texImage2D(this.type, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
   }

  /**
   * @method dispose
   * @public
   */
  dispose() {
    this.gl.deleteTexture(this.texture);
    this.type = null;
    this.img = null;

    this.gl = null;
  }
}

