import React from 'react'
import { Box } from '@material-ui/core'
import OriginalDocxView from './OriginalDocxView'
import BlocksView from './BlocksView'
import DraftView from './DraftView'
import CodeView from './CodeView'

// The <Editor /> component is wrapper class that meshes together a DraftJS
// editor plus several visualizers. Most of its methods are an abstraction
// of the editor's functions, but there are bonuses like mode switching.
// It should be able to be dropped into any application to get a clean draft
// editor with some nicer features. In our case, the <Editor /> component is
// instantiated and a reference is made by DocumentEditor, our shim for the
// editor inside Toolbox. Once a reference is made, you can call all the vanilla
// methods inside this class, set its initial state, and give it a function to
// save with, etc. This class and its children may always function in isolation.

class EditorView extends React.Component {

    draftRef = React.createRef()

    state = {
        mode: 'draft',
        code: null,
    }

    set mode(mode) {
        this.setState({ mode })
    }

    get mode() {
        return this.state.mode
    }

    set editorState(editorState) {
        this.draftRef.current.editorState = editorState
    }

    get editorState() {
        return this.draftRef.current.editorState
    }

    set code(code) {
        this.setState({ code })
    }

    get code() {
        return this.state.code
    }

    set original(original) {
        this.setState({ original })
    }

    get original() {
        return this.state.original
    }

    set stylesheet(stylesheet) {
        this.draftRef.current.stylesheet = stylesheet
    }

    get stylesheet() {
        return this.draftRef.current.stylesheet
    }

    get blocks() {
        return !!this.draftRef.current ? this.draftRef.current.blocks : ''
    }

    render() {
        const { mode, code, draftRef, original, blocks } = this
        const { saveFn, children } = this.props
        console.log('savefn?', saveFn)
        return (
            <Box display="flex" flexGrow={1} height="100%" flexDirection="column" alignItems="center" flexWrap="nowrap" bgcolor="background.paper" style={{ boxSizing: 'border-box', overflowY: 'hidden' }} >
                <Box display={mode === 'draft' ? 'flex' : 'block'} width="100%" justifyContent="center" style={{ overflowX: 'hidden', overflowY: mode !== 'draft' ? 'scroll' : 'hidden' }}>
                    <OriginalDocxView state={original} hidden={mode !== 'original'} />
                    <DraftView ref={draftRef} hidden={mode !== 'draft'} saveFn={saveFn} />
                    <CodeView state={code} hidden={mode !== 'code'} />
                    <BlocksView state={blocks} hidden={mode !== 'blocks'} />
                </Box>
                <Box display="flex" justifyContent="center" width="100%" style={{ boxSizing: 'border-box' }} p={1} boxShadow={3} borderColor="grey">
                    {children}
                </Box>
            </Box>
        )
    }
}

export default EditorView
