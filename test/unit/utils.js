import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/state'
import * as sinon from 'sinon'

Vue.use(Vuex)

export function getVM (component, store = {}) {
  return new Vue({
    el: document.createElement('div'),
    store,
    render: h => h(component, {ref: 'component'})
  }).$mount()
}

export function getMockedStore () {
  return new Vuex.Store({
    state: JSON.parse(JSON.stringify(state))
  })
}

export function whenTrigger (event, element, wrapper) {
  const button = wrapper.find(element)[0]
  button.trigger(event)
}

export function aFakePromise (content) {
  return {
    then: function (callback) {
      callback(content)
    }
  }
}

export function givenHttpMethodReturns (method, content) {
  sinon.stub(Vue.http, 'get').returns(aFakePromise({body: 'thisContent'}))
}

export function restoreHttpMethod (method) {
  Vue.http[method].restore()
}
