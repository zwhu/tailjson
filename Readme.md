# tail-json

1. 将多层 json 对象平铺成单层 json 对象
2. 将单层 json 对象拆分成多层 json 对象


## API

### tail2SinLayer(json, separate)
 1. json 初始json对象
 2. separate 分隔符,用法如下 example


### tail2MulLayer(json, separate)
 1. json 初始json对象
 2. separate 分隔符,用法如下 example

## Example

#### 多层对象转成单层对象

```js
import {tail2SinLayer, tail2MulLayer} from 'tailjson'

let raw = {
    a: 1,
    b: '2',
    c: {
      d: 3,
      f: {
        e: 4
      }
    }
  }

  tail2SinLayer(raw, '#') =>

  {
    a: 1,
    b: '2',
    'c#d': 3,
    'c#f#e': 4
  }

```

#### 多层对象转成单层对象, value是数组的

```js
import {tail2SinLayer, tail2MulLayer} from 'tailjson'

let raw = {
    a: 1,
    b: '2',
    c: {
      d: 3,
      f: {
        e: [4, 5, 6]
      }
    }
  }

tail2SinLayer(raw, '#') =>

{
  a: 1,
  b: '2',
  'c#d': 3,
  'c#f#e#0': 4,
  'c#f#e#1': 5,
  'c#f#e#2': 6
}

```

#### 单层对象转成多层对象
  

```js
import {tail2SinLayer, tail2MulLayer} from 'tailjson'

let raw = {
    a: 1,
    b: '2',
    'c#d': 3,
    'c#f#e': 4
  }

tail2MulLayer(raw, '#') =>

{
  a: 1,
  b: '2',
  c: {
    d: 3,
    f: {
      e: 4
    }
  }
}

```

#### 单层对象转成多层对象, 将key的结尾是数字的转成数组

```js
import {tail2SinLayer, tail2MulLayer} from 'tailjson'

let raw = {
    a: 1,
    b: '2',
    'c#d': 3,
    'c#f#e#0': 4,
    'c#f#e#1': 5,
    'c#f#e#2': 6
  }

tail2MulLayer(raw, '#') =>

{
  a: 1,
  b: '2',
  c: {
    d: 3,
    f: {
      e: [4, 5, 6]
    }
  }
}

```