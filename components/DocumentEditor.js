import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withForm } from './DocumentForm'
import EditorView from './Editor/experimental/EditorView'
import { convertFromRaw, EditorState } from 'draft-js'
import { toJS } from 'mobx'
import { Button, ButtonGroup } from '@material-ui/core'
import CircularProgress from "@material-ui/core/CircularProgress";
import { RichEditor } from './RichEditor'
import { NullReferenceError } from './Errors'

// Document editor is a shim that connects our feature-rich DraftJS editor to
// Toolbox. When the shim mounts a reference is made to our <Editor /> child.
// The Editor is designed in a way to be drag and drop and application independent.
// This shim allows us to connect our application and state and call methods off
// the standalone editor, such as mode switching, saving, initial state, etc. It
// also allows us to ask the standalone editor for his data so we can publish it.

class DocumentEditor extends Component {

  // Make a ref to the standalone editor to access its built-in functions and state
  editor = React.createRef()

  componentDidMount() {
    // Initialize the Draft editor with the document's data
    this.init(this.props)
    // Set a Auto-Save Timer for the Editor's content (1 mins)
    this.timer = setInterval(() =>

      this.props.store.save(this.props.id), 600000)

    console.log('editor state: ', this.editor.editorState, 'current:', this.editor.current)
  }

  componentWillUnmount() {
    clearInterval(this.timer) // Very important to clear! :D
  }

  // the init() function fills in data for Draft editor - including an initial, immutable DraftState :)
  init({ document }) {

    console.log('init  (DocumentEditor)')

    if (!document) {
      return // Ditch if there is no document, will render a a <CircularProgress /> instead.
    }

    let editorRef = this.editor.current
    if (!editorRef) {
      return // If there is no editor.current it is because this.props.document is null and we are rendering a <CircularProgress />      
    }

    let { draft, code, original, stylesheet } = toJS(document.data)

    // console.log('parts: ', draft, code, original, stylesheet)
    code = JSON.parse(code)
    original = JSON.parse(original)
    stylesheet = JSON.parse(stylesheet)

    if (!!draft) {
      draft = JSON.parse(draft)
      const contentState = convertFromRaw(draft)
      editorRef.editorState = EditorState.createWithContent(contentState)
      console.log('draft set!')
    }

    editor.stylesheet = stylesheet || {}
    editor.original = original || ''
    editor.code = code || '<p/>'

    console.log('editor state: ', this.editor.editorState, 'current:', this.editor.current)
  }

  // the setMode() function switches between 'Original', 'Draft' and 'Code' modes in the <Editor />
  setMode(name) {
    this.editor.current.mode = name
  }

  render() {
    const { document, store, id } = this.props
    const mode = this.editor.current ? this.editor.current.mode : 'draft'
    const noData = document.isLoading || !store || !document
    const state = this.editor.editorState;

    console.log(
      'isLoading', !!document.isLoading
      , 'document', !!document//, document
    )
    console.log('RENDER called (DocumentEditor)')

    //// These are undefined by this point, both passes:
    console.log('editor state: ', state, 'editor ref:', this.editor.current)
    return (
      <>
        {noData
          ? <CircularProgress />
          : (
            <>
              {/* You can replace what is below here with another draft editor intead of <Editor /> if you wanted to */}

              {/* <RichEditor editorRef={this.editorRef} editorState={this.editorRef.editorState} /> */}

              {/* <EditorView draftRef={this.editor} saveFn={() => store.save(id)} >
                <ButtonGroup variant="outlined">
                  <Button color={ mode === 'original' ? 'secondary' : 'primary' } onClick={() => this.setMode('original')}>Original</Button>
                  <Button color={ mode === 'draft' ? 'secondary' : 'primary' } onClick={() => this.setMode('draft')}>Draft</Button>
                  <Button color={ mode === 'code' ? 'secondary' : 'primary' } onClick={() => this.setMode('code')}>Code</Button>
                  <Button color={ mode === 'blocks' ? 'secondary' : 'primary' } onClick={() => this.setMode('blocks')}>Blocks</Button>
                </ButtonGroup>
              </EditorView>       */}

              <RichEditor
                document={document}
                //TODO: @BP, The following props must be defined before I can use them like in EditorView
                editorRef={this.editor}
                draftState={state}
              > </RichEditor>
            </>
          )
        }
      </>
    )
  }
}

export default withForm(inject('store')(observer(DocumentEditor)));