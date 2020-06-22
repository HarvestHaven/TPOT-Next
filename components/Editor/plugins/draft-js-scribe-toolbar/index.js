import React from 'react'
import createStore from './functions/createStore'
import createStyles from 'draft-js-custom-styles'
import { Toolbar } from '@components'

export const ActiveStylesContext = React.createContext(null)

export const ActiveStylesProvider = ActiveStylesContext.Provider

export const withActiveStyles = Component => props => (
  <ActiveStylesContext.Consumer>
    {activeStyles => <Component {...props} activeStyles={activeStyles} />}
  </ActiveStylesContext.Consumer>
)

export default (config = {}) => {
  const store = createStore({})

  const ScribeToolbar = props => (
    <Toolbar {...props} store={store} />
  )

  return {
    initialize: pluginFunctions => {
      const PREFIX = 'CUSTOM_'
      const { styles } = createStyles(['font-size', 'color', 'background'], PREFIX)
      store.updateItem('getPlugins', pluginFunctions.getPlugins)
      store.updateItem('getProps', pluginFunctions.getProps)
      store.updateItem('setEditorState', pluginFunctions.setEditorState)
      store.updateItem('getEditorState', pluginFunctions.getEditorState)
      store.updateItem('customStyleFunctions', styles)
      store.updateItem('customStylePrefix', PREFIX)
    },

    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      store.updateItem('selection', editorState.getSelection())
      return editorState
    },

    ScribeToolbar: ScribeToolbar,
  }
}