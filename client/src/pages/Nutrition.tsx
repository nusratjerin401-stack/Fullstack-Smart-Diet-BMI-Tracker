export function calculateBMI(
  weightPounds: number,
  feet: number,
  inches: number
): number {
  const totalInches = (feet * 12) + inches;

  if (weightPounds <= 0 || totalInches <= 0) {
    return 0;
  }

  const bmi =
    (weightPounds * 703) /
    (totalInches * totalInches);

  return Number(bmi.toFixed(1));
}

// BMI Category
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi < 25) {
    return "Healthy Weight";
  }

  if (bmi < 30) {
    return "Overweight";
  }

  return "Obesity";
}


// Activity Level
export function getActivityLevel(frequency: number): string {
  if (frequency >= 0 && frequency < 10) {
    return "Sedentary";
  }

  if (frequency >= 10 && frequency < 15) {
    return "Light";
  }

  if (frequency >= 15 && frequency < 20) {
    return "Moderate";
  }

  if (frequency >= 20) {
    return "Heavy";
  }

  return "Unknown";
}

// Daily Values Calculation

export function calculateDVPercebt(
  amountConsumed: number,
  dailyValue: number,
): number { 
  if (dailyValue <= 0) {
    return 0;

    }
    return Number(
      ((amountConsumed / dailyValue) * 100).toFixed(1)
    );
  }
