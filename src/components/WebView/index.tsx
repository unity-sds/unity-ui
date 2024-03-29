import "./index.css"

type WebViewProps = {
   url:string
}

export default function WebView(props:WebViewProps) {

   const url = props.url;

   return (
      <>
         <iframe title="Dockstore" src={url} className='unity-webview' />
      </>
   )
}