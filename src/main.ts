let windowObjectReference: null | Window = null;
let previousUrl: null | string = null;

const receiveMessage = (event: MessageEvent) => {
  console.log('event :>> ', event);
}

const openSignInWindow = (url: string, name: string) => {
  window.removeEventListener("message", receiveMessage);
  const strWindowFeatures = "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

  if ( windowObjectReference === null || windowObjectReference.closed) {
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference?.focus();
  } else {
    windowObjectReference.focus();
  }

  window.addEventListener("message", event => receiveMessage(event), false);
  previousUrl = url;
}

const redirectUri = "http://localhost:3000/auth/";
const responseType = "code";
const scope = "https://www.googleapis.com/auth/userinfo.profile";
const { VITE_clientId: clientId, VITE_clientSecret: clientSecret } = import.meta.env
if( !clientId || !clientSecret) throw new Error("ない")

const openGoogleSignInWindow = () => {
  console.log("fefwefw")
  openSignInWindow(`https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`, "google")
}

const button = document.getElementById("button")!;
button.addEventListener("click", () => openGoogleSignInWindow())