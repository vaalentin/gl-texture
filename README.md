# @vaalenin/gl-texture

WebGL texture wrapper.

## Installation

```
$ npm install --save @vaalentin/gl-texture
```

## Usage

```js
const texture = new Texture(gl, gl.TEXTURE_2D, img);

program.bind();
program.setUniform('uTex', texture.bind(0));
```

## API

#### `texture = new Texture(gl, type, img)`

- `gl` is the [WebGL context](https://github.com/vaalentin/gl-context).
- `type` is the texture type. Default is `gl.TEXTURE_2D`.
- `img` is the image that will be used for the texture. This can be set later with `texture.setImg(img)`.

#### `texture.setImg(img)`

Set the texture image.

#### `texture.bind(ch)`

Bind the texture to the given channel, and returns it. Default is `0`.
This allows to set a [program](https://github.com/vaalentin/gl-program) uniform at the same time.

```js
program.setUniform('uTexA', texture.bind(0));
program.setUniform('uTexB', texture.bind(1));
```

#### `texture.dispose()`

Delete instance. Calls `gl.deleteTexture()`.

## License

MIT, see [LICENSE.md](https://github.com/vaalentin/gl-texture/blob/master/LICENSE.md) for more details.

## Credits

Thanks to the amazing [stackgl](http://stack.gl/) for the inspiration.
