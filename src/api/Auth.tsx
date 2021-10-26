import axios from 'axios';
import config from '../lib/config.json';
import auth from '@react-native-firebase/auth';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const signInPhone = async phone_number => {
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
    const {identityToken, nonce} = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const userCredential = await auth().signInWithCredential(appleCredential);
    } else {
      throw new Error('Null token');
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signInGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId: '',
    });
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signInFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );
  } catch (error: any) {
    console.log(error);
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
