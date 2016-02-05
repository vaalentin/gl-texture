import test from 'tape';
import getGl from '@vaalentin/gl-context';
import Texture from '../src';

const imageUrl = 'http://www.uvmapper.com/help/checker_large.gif';
const canvas = document.createElement('canvas');
const gl = getGl(canvas);

test('should be instanciable', t => {
  t.plan(1);

  const texture = new Texture(gl, gl.TEXTURE_2D);

  t.ok(texture instanceof Texture, 'instance of Texture');
});

test('should accept no size and no data', t => {
  t.plan(3);

  const texture = new Texture(gl, gl.TEXTURE_2D);

  t.equal(texture.width, 1, 'width is 1');
  t.equal(texture.height, 1, 'height is 1');
  t.equal(texture.data, null, 'data is null');
});

test('should accept size and no data', t => {
  t.plan(3);

  const texture = new Texture(gl, gl.TEXTURE_2D, 1024, 512);

  t.equal(texture.width, 1024, 'width is 1024');
  t.equal(texture.height, 512, 'height is 512');
  t.equal(texture.data, null, 'data is null');
});

test('should accept data', t => {
  t.plan(3);
  t.timeoutAfter(5000);

  const data = document.createElement('img');

  data.onload = () => {
    const texture = new Texture(gl, gl.TEXTURE_2D, data);

    t.equal(texture.width, data.width, `width is ${data.width}`);
    t.equal(texture.height, data.height, `height is ${data.height}`);
    t.equal(texture.data, data, 'data ok');
  }

  data.src = imageUrl;
});

test('should expose the WebGLTexture object', t => {
  t.plan(1);

  const texture = new Texture(gl, gl.TEXTURE_2D);

  t.ok(texture.texture instanceof WebGLTexture, 'instance of WebGLTexture');
});

test('bind should bind the texture to the unit provided', t => {
  t.plan(4);

  const textureA = new Texture(gl, gl.TEXTURE_2D);
  const textureB = new Texture(gl, gl.TEXTURE_2D);

  textureA.bind(0);
  t.equal(gl.getParameter(gl.ACTIVE_TEXTURE), 0);
  t.equal(gl.getParameter(gl.TEXTURE_BINDING_2D), textureA);
  
  textureB.bind(2);
  t.equal(gl.getParameter(gl.ACTIVE_TEXTURE), 2);
  t.equal(gl.getParameter(gl.TEXTURE_BINDING_2D), textureB);
});

