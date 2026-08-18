import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {arrowForwardOutline} from 'ionicons/icons';
import './Login.css'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,

  IonAccordion,
  IonAccordionGroup,

  IonItem,
  IonLabel,
  IonInput,

  IonButton,

  IonIcon,

  IonList,
  IonItemGroup,
  IonItemDivider
} from '@ionic/react';
import useAuthStore from '../store/useAuthStore';


const Login = () => {
    const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
    const history = useHistory();
    const setToken = useAuthStore((state) => state.setToken);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });


    const submitLogin = async () => {
    try
    {
      const response = await fetch(
      'http://localhost:3000/login',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
    
      const data = await response.json();
      setToken(data.token);
      console.log('Saved',data);
      history.push('/home');

    } catch (error){
      console.log(error);
    }
  }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>NutriBloom</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>NutriBloom</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className='login-container'>
                    <h1 className='login-heading'>Login</h1>

                    <div className="login-card">
                        <IonList>
                            <IonItemGroup>
                                <IonItem>
                                    <IonLabel position='stacked' className='form-label'>Email:</IonLabel>
                                    <IonInput   
                                    placeholder="Enter your email"
                                    value={loginData.email} 
                                    onIonChange={(e) =>
                                        setLoginData({
                                        ...loginData,
                                        email: e.detail.value ?? ''
                                        })
                                    }
                                    ></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position='stacked' className='form-label'>Password:</IonLabel>
                                    <IonInput   
                                    placeholder="Enter your password"
                                    value={loginData.password} 
                                    onIonChange={(e) =>
                                        setLoginData({
                                        ...loginData,
                                        password: e.detail.value ?? ''
                                        })
                                    }
                                    ></IonInput>
                                </IonItem>
                            </IonItemGroup>
                        </IonList>

                        <IonButton 
                        expand="block"
                        className="login-button" 
                        onClick={submitLogin}
                        >
                            Login 
                        </IonButton>
                    </div>

                    <IonButton 
                    className="redirect-button" 
                    onClick={() => history.push('/SignUp')}>
                        <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                        New User? Sign Up! 
                    </IonButton>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default Login;
