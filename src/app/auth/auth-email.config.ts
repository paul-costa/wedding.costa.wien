import { EmailAuthProvider, getAuth, isSignInWithEmailLink, reauthenticateWithCredential, signInWithEmailLink } from 'firebase/auth';

export function authEmailFirebase(): Promise<void> {
  console.log('authEmailFirebase');

  return new Promise<void>((res) => {
    const auth = getAuth();
    let email = window.localStorage.getItem('emailForSignIn');

    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
      window.localStorage.setItem('emailForSignIn', email);
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log('signInWithEmailLink', result);

          window.localStorage.removeItem('emailForSignIn');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          res();
        });
    }
  });
}

export function reAuthEmailFirebase(): Promise<void> {
  console.log('reAuthEmailFirebase');

  return new Promise<void>((res) => {
    const email = window.localStorage.getItem('emailForSignIn');
    const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);
    const auth = getAuth();
    reauthenticateWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        console.log('usercred ', usercred);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        res();
      });
  });
}
