import * as msal from 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.23.0/+esm';

let bt = document.getElementById("bt");

const config = {
    auth: {
        clientId: "58cae846-cb25-41bf-b0ce-138ec5de6e06",
        authority: "https://login.microsoftonline.com/b4fbc398-16ac-4774-b3d1-ba22bdd66fd2",
        redirectUri: "http://localhost:3000"
    }
};

const loginRequest = {
    scopes: ["User.ReadWrite"]
};

const myMsal = new msal.PublicClientApplication(config);
await myMsal.initialize()
// Handle the redirect response and process tokens
myMsal.handleRedirectPromise().then((response) => {
    if (response) {
        // The response contains the tokens
        console.log("Access Token: ", response.accessToken);
        console.log("ID Token: ", response.idToken);
    }
}).catch((error) => {
    console.error("Error processing redirect: ", error);
});

// Event listener for the login button
bt.addEventListener("click", function () {
    myMsal.loginRedirect(loginRequest);
});