export enum AgeGroup {
  INFANT = "INFANT", // 0-1 year
  TODDLER = "TODDLER", // 2-3 years
  CHILD = "CHILD", // 4-12 years
  ADOLESCENT = "ADOLESCENT", // 13-18 years
  ADULT = "ADULT", // 18+ years
}

export const calculateAgeGroup = (dateOfBirth: string | Date): AgeGroup => {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  if (age <= 1) {
    return AgeGroup.INFANT;
  } else if (age <= 3) {
    return AgeGroup.TODDLER;
  } else if (age <= 12) {
    return AgeGroup.CHILD;
  } else if (age <= 18) {
    return AgeGroup.ADOLESCENT;
  }
  return AgeGroup.ADULT;
};
