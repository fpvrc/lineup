import axios from "axios";
import config from "../lib/config.json";
import auth from "@react-native-firebase/auth";
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import Realm from "realm";

export const getData = async (uid) => {
  try {
    let res = (await axios({
      url: (config as any).GRAPH,
      method: "post",
      data: {
        query: `
          query {
            menus(query: {uid:"${uid}"}) {
              _id
              main_photo
              menu_name
              muid
              uid
              sections {
                id
                title
              }
    					items {
                id
                title
                sub_title
                price
                section
                photo
              }
            }
            my_businesses (query:{ uid: "${uid}"}){
              buid{
                buid
                name
                photo
                description
              }
            }
          }
        `,
      },
    })) as any;

    return res.data.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const connectGraph = async (user) => {
  try {
    let token = await user.getIdToken();
    const appConfig = {
      id: "application-0-opynp",
      timeout: 10000,
    };
    const app = new Realm.App(appConfig);
    const credentials = Realm.Credentials.jwt(token);
    await app.logIn(credentials);
    axios.defaults.headers.common.jwtTokenString = token;
    return;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInPhone = async (phone_number) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phone_number);
    return confirmation;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      await auth().signInWithCredential(appleCredential);
    } else {
      throw new Error("Null token");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId: "",
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );
    await auth().signInWithCredential(facebookCredential);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signInAnonymously = async () => {
  try {
    await auth().signInAnonymously();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    auth().signOut();
  } catch (error: any) {
    throw new Error(error);
  }
};
