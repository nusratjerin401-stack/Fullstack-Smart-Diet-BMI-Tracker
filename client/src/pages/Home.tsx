import {
  IonButton,
  IonCard,
  IonCardContent,
  IonText,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import healthyFood from '../assets/healthy-food.jpg';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success"> 
          <IonTitle>NutriBloom</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding"> 
        <IonCard>
          <IonCardContent>

            {/* Healthy Food Image */}

            <img
            src={healthyFood}
            alt="Healthy Food"
            className="hero-image"
            />

            {/*Dashbord Title */}

            <h1>Today's Nutrion</h1>

            <h2>Track Your Meal</h2>
            
            <IonText>
              <p>
                Keep track of your meals and monitor 
                your daily nutrition in one place.
              </p>
            </IonText>
            /*Nutrition Summary */
              <div className="nutrition-summary">
              </div>

              <div className="nutrition-item">
                <h3>1,250</h3>
                <p>Calories</p>
              </div>

               <div className="nutrition-item">
                <h3>65g</h3>
                <p>Protein</p>
               </div>

                <div className="nutrition-item">
                  <h3>140g</h3>
                  <p>Carbs</p>
                </div>


                 {/* Start Assessment */}
            <IonButton
              expand="block"
              color="success"
              onClick={() => history.push('/intake')}
            >
              Start Assessment
            </IonButton>

            {/* Health Dashboard */}
            <IonButton
              expand="block"
              color="success"
              fill="outline"
              onClick={() => history.push('/dashboard')}
            >
              My Health Dashboard
            </IonButton>

            <IonButton expand="block" color="success" onClick={() => history.push('/dashboard')}>
              Dashboard
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
  };


export default Home;
            
