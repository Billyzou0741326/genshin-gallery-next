import React from 'react'
import { mount } from '@cypress/react'
import CopyTextToClipboard from '../clipboard/CopyTextToClipboard'

it('copies text to clipboard', () => {
  const textToCopy = '123'
  mount(<CopyTextToClipboard text={textToCopy} />)
  cy.get('button').click()
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      assert.equal(text, textToCopy)
    })
  })
})
