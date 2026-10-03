// this is our primary element
export interface FoodItem {
  // ID should be random
  id: string;
  name: string;
  category: string;
  quantity: number;
  // URL should be the image in the repo once we have that, it will be a blank string if we don't have it.
  imageUrl: string;
}
