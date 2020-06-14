import { Provider as MobxProvider } from 'mobx-react'
import App from 'next/app'
import React from 'react'
import { withAuthorization } from '../services/firebase'
import { fetchInitialStoreState,  store } from '../stores/Root.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { DialogProvider } from 'muibox'
import DialogProvider from '../hoc/DialogProvider'

class MobxApp extends App {
  state = { store };

  componentDidMount = () => console.count('_App init()')

  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    const initialStoreState = await fetchInitialStoreState()
    console.log('initialStoreState', initialStoreState)
    return {
      ...appProps,
      initialStoreState,
    }
  }

  // Hydrate serialized state to store
  // static getDerivedStateFromProps(props, state) {
  //   state.store.hydrate(props.initialStoreState)
  //   return state
  // }

  render() {
    let { Component, pageProps } = this.props
    let AuthorizedApp = withAuthorization(Component)
    return (
        <DialogProvider>
          <AuthorizedApp {...pageProps} />
          <ToastContainer newestOnTop />
        </DialogProvider>
    )
  }
}
export default MobxApp
