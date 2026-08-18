import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList,IonItem, IonInput, IonRadioGroup, IonRadio, IonLabel, IonSelect, IonSelectOption, IonItemGroup, IonItemDivider, IonButton} from '@ionic/react';
import './Intake.css';
import useAuthStore from '../store/useAuthStore';


const Intake = () => {
  const token = useAuthStore((state) => state.token);
  const [FormData, setFormData] = useState({
    age: 0,
    sex: '',
    feet: '',
    inches: '',
    weight: 0,
    atype: '',
    afreq: '',
    goal: ''

  });

  const submitForm = async () => {
    try
    {
      const response = await fetch(
      'http://localhost:3000/survey',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(FormData)
      });
  
      const data = await response.json();

      console.log('Saved',data);

    } catch (error){
      console.log(error);
      console.log(token);
      console.log(FormData);
      
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

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NutriBloom</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <h1 className="form-title">Intake Form</h1>
        <div className="form-container">
          <IonList>
            <IonItemGroup>

              <IonItemDivider>
                <IonLabel className="section-header">Personal Info</IonLabel>
              </IonItemDivider>

              <IonItem>
                <IonLabel className="section-header">Age: </IonLabel>
                <IonInput  
                type="number" 
                placeholder="Enter your age"
                value={FormData.age} 
                onIonChange={(e) =>
                  setFormData({
                    ...FormData,
                    age: Number(e.detail.value)
                  })
                }
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonRadioGroup
                value={FormData.sex} 
                onIonChange={(e) =>
                  setFormData({
                    ...FormData,
                    sex: e.detail.value
                  })
                }
                >
                  <IonLabel className="section-header">Sex:</IonLabel>
                  <IonRadio value="Male">Male</IonRadio>
                  <br />
                  <IonRadio value="Female">Female</IonRadio>
                  <br />
                  <IonRadio value="Other">Other</IonRadio>
                </IonRadioGroup>
              </IonItem>
            </IonItemGroup>
            
            <IonItemGroup>

              <IonItemDivider>
                <IonLabel className="section-header">Physical Description</IonLabel>
              </IonItemDivider>

              <div className="height-row">
                <IonItem>
                  <IonLabel>Feet</IonLabel>
                  <IonSelect placeholder='Select one'
                  value={FormData.feet} 
                  onIonChange={(e) =>
                    setFormData({
                      ...FormData,
                      feet: e.detail.value
                    })
                  }
                >
                    <IonSelectOption value="3">3</IonSelectOption>
                    <IonSelectOption value="4">4</IonSelectOption>
                    <IonSelectOption value="5">5</IonSelectOption>
                    <IonSelectOption value="6">6</IonSelectOption>
                    <IonSelectOption value="7">7</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel>Inches</IonLabel>
                  <IonSelect placeholder='Select one'
                  value={FormData.inches} 
                  onIonChange={(e) =>
                    setFormData({
                      ...FormData,
                      inches: e.detail.value
                    })
                  }
                  >
                    <IonSelectOption value="0">0</IonSelectOption>
                    <IonSelectOption value="1">1</IonSelectOption>
                    <IonSelectOption value="2">2</IonSelectOption>
                    <IonSelectOption value="3">3</IonSelectOption>
                    <IonSelectOption value="4">4</IonSelectOption>
                    <IonSelectOption value="5">5</IonSelectOption>
                    <IonSelectOption value="6">6</IonSelectOption>
                    <IonSelectOption value="7">7</IonSelectOption>
                    <IonSelectOption value="8">8</IonSelectOption>
                    <IonSelectOption value="9">9</IonSelectOption>
                    <IonSelectOption value="10">10</IonSelectOption>
                    <IonSelectOption value="11">11</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>

              <IonItem>
                <IonLabel className="section-header">Weight: </IonLabel>
                <IonInput 
                type="number" 
                placeholder="Enter your weight"
                value={FormData.weight} 
                onIonChange={(e) =>
                  setFormData({
                    ...FormData,
                    weight: Number(e.detail.value)
                  })
                }
                >Pounds</IonInput>
              </IonItem>

            </IonItemGroup>
            
            <IonItemGroup>

               <IonItemDivider>
                <IonLabel className="section-header">Activity</IonLabel>
              </IonItemDivider>

              <IonItem>
                <IonLabel className="section-header">Activity Type</IonLabel>
                <IonSelect placeholder='Select one'
                value={FormData.atype} 
                onIonChange={(e) =>
                  setFormData({
                    ...FormData,
                    atype: e.detail.value
                  })
                }
                >
                  <IonSelectOption value="Cardio">Cardio (Running,Cycling,Swimming,etc)</IonSelectOption>
                  <IonSelectOption value="Strength">Strength (Weightlifting, Heavy Labor,etc)</IonSelectOption>
                  <IonSelectOption value="None">None</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonRadioGroup
                value={FormData.afreq} 
                onIonChange={(e) =>
                  setFormData({
                    ...FormData,
                    afreq: e.detail.value
                  })
                }
                >
                  <IonLabel className="section-header">Activity Frequency:</IonLabel>
                  <IonRadio value="20">None or Infrequent</IonRadio>
                  <br />
                  <IonRadio value="15">Occassionally (1-2 a Week)</IonRadio>
                  <br />
                  <IonRadio value="10">Often (3-5 a week)</IonRadio>
                  <br />
                  <IonRadio value="5">Frequently (6+ a week)</IonRadio>
                </IonRadioGroup>
              </IonItem>

              <IonItem>
                  <IonLabel className="section-header">Overall Goal</IonLabel>
                  <IonSelect placeholder='Select one'
                  value={FormData.goal} 
                  onIonChange={(e) =>
                  setFormData({
                      ...FormData,
                      goal: e.detail.value
                    })
                  }
                  >
                    <IonSelectOption value="WeightLoss">Weight Loss</IonSelectOption>
                    <IonSelectOption value="Maintenance">Maintenance</IonSelectOption>
                    <IonSelectOption value="MuscleGain">Muscle Gain</IonSelectOption>
                  </IonSelect>
              </IonItem>
            </IonItemGroup>
          </IonList>
        </div>

        <IonButton 
        expand="block"
        className="submit-button" 
        onClick={submitForm}>
          Submit
        </IonButton>

      </IonContent>

    </IonPage>
    
  );
};

export default Intake;
