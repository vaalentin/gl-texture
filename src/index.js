import { isPOT } from 'math-utils';

export default class Texture {
  constructor(gl, type, ...args) {
    this.gl = gl;
    this.type = type;

    this.texture = this.gl.createTexture();

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.type, this.texture);

    if(!args.length) {
      this.setEmptyData(1, 1);
    } else if(args.length === 1 && this.checkData(args[0])) {
      this.setData(args[0]);
    } else if(args.length === 2 && Number.isInteger(args[0]) && Number.isInteger(args[1])) {
      this.setEmptyData(args[0], args[1]);
    }

    this.gl.bindTexture(this.type, null);
  }

  checkData(data) {
    return data instanceof HTMLImageElement
      || data instanceof HTMLVideoElement
      || data instanceof HTMLCanvasElement;
  }

  setEmptyData(width, height) {
    this.width = width;
    this.height = height;
    this.data = null;

    this.gl.texImage2D(this.type, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texParameteri(this.type, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.type, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
  }

  setData(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;

    this.gl.texImage2D(this.type, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);

    if(isPOT(this.width) && isPOT(this.height)) {
      this.gl.texParameteri(this.type, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.type, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
      this.gl.generateMipmap(this.type);
    } else {
      this.gl.texParameteri(this.type, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.type, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.type, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.type, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }
  }

  bind(unit) {
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.type, this.texture);
    return unit;
  }
}

