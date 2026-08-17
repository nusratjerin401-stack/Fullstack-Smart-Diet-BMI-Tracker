import React, { useState } from 'react';

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

  IonList
} from '@ionic/react';


type Food = {
    foodName: string;
    date: string;
    quantity: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
};

const AddMeal = () => {

    const emptyFood: Food = {
        foodName: '',
        date: '',
        quantity:  '',
        calories:  '',
        protein:  '',
        carbs:  '',
        fat:  ''
    };

    const [meals, setMeals] = useState<{
        breakfast: Food[];
        lunch: Food[];
        dinner: Food[];
        snack: Food[];
    }>({
        breakfast: [{...emptyFood}],
        lunch: [{...emptyFood}],
        dinner: [{...emptyFood}],
        snack: [{...emptyFood}]
    });

    const addFood = (mealType: keyof typeof meals) => {
        const updatedMeals = {...meals};

        updatedMeals[mealType] = [
            ...updatedMeals[mealType],
            {...emptyFood}
        ];
        
        setMeals(updatedMeals);
    };



    const updateFood = (
        mealType: keyof typeof meals,
        index: number,
        field: keyof Food,
        value: string
    ) => {
        const updatedMeals = {...meals};

        updatedMeals[mealType][index] = {
            ...updatedMeals[mealType][index],
            [field]:value
        };

        setMeals(updatedMeals);
    };

    const submitMeals = async () => {
    try
    {
      const response = await fetch(
      'http://localhost:5173/meals',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(meals)
      });
  
      const data = await response.json();

      console.log('Saved',data);

    } catch (error){
      console.log(error);
    }
  };

    const MealAccordion = ({
        mealType,
        title
        }: {
            mealType: keyof typeof meals;
            title: string;
        }) => (
            <IonAccordion value={mealType}>
                
                <IonItem slot="header">
                    <IonLabel>{title}</IonLabel>
                </IonItem>

                <div className='meal-content' slot='content'>
                    {meals[mealType].map((food,index) => (
                        <div
                            className='food-card'
                            key={index}
                        >
                            
                            <IonItem>
                                <IonInput
                                    label="Food Name"
                                    value={food.foodName}
                                    onIonChange={(e) =>
                                    updateFood(
                                        mealType,
                                        index,
                                        'foodName',
                                        e.detail.value ?? ''
                                    )
                                }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="date"
                                    label="date"
                                    value={food.date}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'date',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="quantity"
                                    value={food.quantity}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'quantity',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="calories"
                                    value={food.calories}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'quantity',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="protein (g)"
                                    value={food.protein}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'protein',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="carbs (g)"
                                    value={food.carbs}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'carbs',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>

                            <IonItem>
                                <IonInput
                                    type="number"
                                    label="fat (g)"
                                    value={food.fat}
                                    onIonChange={(e) =>
                                        updateFood(
                                            mealType,
                                            index,
                                            'fat',
                                            e.detail.value ?? ''
                                        )
                                    }
                                ></IonInput>
                            </IonItem>
                        </div>
                    ))}

                    <IonButton
                    fill='clear'
                    className='add-Food-Button'
                    onClick={() => addFood(mealType)}
                    >
                        + Add Another Food
                    </IonButton>
                </div>
            </IonAccordion>
        );

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

                <h1 className='form-header'>Add Meal</h1>

                <IonAccordionGroup>
                    <MealAccordion
                    mealType='breakfast'
                    title='breakfast'>
                    </MealAccordion>
                    
                    <MealAccordion
                    mealType='lunch'
                    title='lunch'>
                    </MealAccordion>

                    <MealAccordion
                    mealType='dinner'
                    title='dinner'>
                    </MealAccordion>

                    <MealAccordion
                    mealType='snack'
                    title='snack'>
                    </MealAccordion>
                </IonAccordionGroup>

                <IonButton
                expand='block'
                onClick={submitMeals}>
                Save meals
                </IonButton>
                
            </IonContent>
        </IonPage>
    );
};

export default AddMeal;

