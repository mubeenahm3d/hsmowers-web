import { configureStore } from "@reduxjs/toolkit";
// import { alertReducer } from "./infoAlertSlice";
// import { mealPlanningReducer } from "./mealPlanningSlice";
// import { userRecipesReducer } from "./userRecipesSlice";
import { alertReducer } from "./alertSlice";
import { userReducer } from "./userSlice";
// import { modalReducer } from "./modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // alert: alertReducer,
    // userRecipes: userRecipesReducer,
    // mealPlanning: mealPlanningReducer,
    alert: alertReducer,
    // modal: modalReducer
  },
});

export default store;
