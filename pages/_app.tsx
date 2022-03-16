import '../styles/globals.css'

export function reportWebVitals(metric) {
  // console.log(metric)
}

function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if provided
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
