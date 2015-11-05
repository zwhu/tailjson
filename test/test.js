/**
 * Created by zwhu on 15/11/5.
 */


import assert from 'assert'

import {tail2SinLayer, tail2MulLayer} from '../src'

describe('tail', function () {
  describe('2SingleLayer', function () {
    it('should return single layer json object', function () {
      let raw = {
          a: 1,
          b: '2',
          c: {
            d: 3,
            f: {
              e: 4
            }
          }
        },
        translated = {
          a: 1,
          b: '2',
          'c#d': 3,
          'c#f#e': 4
        }

      assert.equal(JSON.stringify(translated), JSON.stringify(tail2SinLayer(raw, '#')))
    })

    it('tail array to #0', function () {
      let raw = {
          a: 1,
          b: '2',
          c: {
            d: 3,
            f: {
              e: [4, 5, 6]
            }
          }
        },
        translated = {
          a: 1,
          b: '2',
          'c#d': 3,
          'c#f#e#0': 4,
          'c#f#e#1': 5,
          'c#f#e#2': 6
        }
      assert.equal(JSON.stringify(translated), JSON.stringify(tail2SinLayer(raw, '#')))

    })
  })

  describe('2MultipleLayer', function () {
    it('should return multiple layer json object', function () {
      let raw = {
          a: 1,
          b: '2',
          'c#d': 3,
          'c#f#e': 4
        },
        translated = {
          a: 1,
          b: '2',
          c: {
            d: 3,
            f: {
              e: 4
            }
          }
        }

      assert.equal(JSON.stringify(translated), JSON.stringify(tail2MulLayer(raw, '#')))
    })

    it('tail #0 to multiple json', function () {
      let raw = {
          a: 1,
          b: '2',
          'c#d': 3,
          'c#f#e#0': 4,
          'c#f#e#1': 5,
          'c#f#e#2': 6
        },
        translated = {
          a: 1,
          b: '2',
          c: {
            d: 3,
            f: {
              e: [4, 5, 6]
            }
          }
        }

      assert.equal(JSON.stringify(translated), JSON.stringify(tail2MulLayer(raw, '#')))

      let raw2 = {
        a: 1,
        b: '2',
        'c#d': 3,
        'c#f#e#0#g': 'js',
        'c#f#e#1': 5,
        'c#f#e#2': 6
      }
    })
  })
})