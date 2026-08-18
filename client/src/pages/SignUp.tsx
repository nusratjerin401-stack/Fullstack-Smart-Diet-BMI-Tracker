import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList
} from '@ionic/react';

import './SignUp.css';

const SignUp: React.FC = () => {
  const history = useHistory();

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const submitSignUp = async () => {
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: signUpData.name,
          email: signUpData.email,
          password: signUpData.password
        })
      });

      const data = await response.json();
      console.log(signUpData);
      console.log('Sign up:', data);

      if (response.ok) {
        alert('Account created successfully!');
        history.push('/login');
      } else {
        alert(data.message || 'Sign up failed.');
      }

    } catch (error) {
      console.log(error);
      alert('Unable to connect to the server.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>NutriBloom</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="signup-container">

          <h1 className="signup-heading">Create Account</h1>

          <div className="signup-card">

            <IonList>

              <IonItem>
                <IonLabel position="stacked">
                  Name
                </IonLabel>

                <IonInput
                  placeholder="Enter your name"
                  value={signUpData.name}
                  onIonChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      name: e.detail.value ?? ''
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Email
                </IonLabel>

                <IonInput
                  type="email"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onIonChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      email: e.detail.value ?? ''
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Password
                </IonLabel>

                <IonInput
                  type="password"
                  placeholder="Enter your password"
                  value={signUpData.password}
                  onIonChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      password: e.detail.value ?? ''
                    })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Confirm Password
                </IonLabel>

                <IonInput
                  type="password"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onIonChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmPassword: e.detail.value ?? ''
                    })
                  }
                />
              </IonItem>

            </IonList>

            <IonButton
              expand="block"
              color="success"
              className="signup-button"
              onClick={submitSignUp}
            >
              Sign Up
            </IonButton>

            <IonButton
              expand="block"
              fill="clear"
              className="login-redirect"
              onClick={() => history.push('/login')}
            >
              Already have an account? Sign In
            </IonButton>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;