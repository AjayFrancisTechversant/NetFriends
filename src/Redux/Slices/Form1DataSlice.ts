import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import {PersonalDetailsType} from '../../Components/Form1Page1';
import {AddressDetailsType} from '../../Components/Form1Page2';
import {EducationDetailsType} from '../../Components/Form1Page3';

type Form1DataSliceType = {
  personalDetails: PersonalDetailsType;
  addressDetails: AddressDetailsType;
  educationDetails: EducationDetailsType[];
  // component4: Component4State;
};

const initialState: Form1DataSliceType = {
  personalDetails: {
    name: undefined,
    email: undefined,
    phone: undefined,
    dob: undefined,
    age: undefined,
  },
  addressDetails: {
    currentAddress: undefined,
    currentCity: undefined,
    currentState: undefined,
    currentCountry: undefined,
    currentPincode: undefined,
    permanentAddress: undefined,
    permanentCity: undefined,
    permanentState: undefined,
    permanentCountry: undefined,
    permanentPincode: undefined,
  },
  educationDetails: [
    {
      id: uuid.v4() as string,
      institution: undefined,
      degree: undefined,
      fieldOfStudy: undefined,
      yearOfCompletion: undefined,
      isExtra: false,
    },
  ],
  // component4: { /* initial values for Component 4 */ },
};

const Form1DataSlice = createSlice({
  name: 'Form1Data',
  initialState,
  reducers: {
    updatePersonalDetails(state, action: PayloadAction<PersonalDetailsType>) {
      state.personalDetails = action.payload;
    },
    updateAddressDetails(state, action: PayloadAction<AddressDetailsType>) {
      state.addressDetails = action.payload;
    },
    updateEducationDetails(
      state,
      action: PayloadAction<EducationDetailsType[]>,
    ) {
      state.educationDetails = action.payload;
    },
    addEducationDetails(state) {
      state.educationDetails.push({
        id: uuid.v4() as string,
        institution: undefined,
        degree: undefined,
        fieldOfStudy: undefined,
        yearOfCompletion: undefined,
        isExtra: true,
      });
    },
    removeEducationDetail(state, action: PayloadAction<string>) {
      state.educationDetails = state.educationDetails.filter(
        detail => detail.id !== action.payload,
      );
    },
    // updateComponent4(state, action: PayloadAction<Component4State>) {
    //   state.component4 = action.payload;
    // },
  },
});

export const {
  updatePersonalDetails,
  updateAddressDetails,
  updateEducationDetails,
  addEducationDetails,
  removeEducationDetail,
} = Form1DataSlice.actions;

export default Form1DataSlice.reducer;
