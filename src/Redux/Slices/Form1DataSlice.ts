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
    /* initial values for Component 2 */
  },
  educationDetails: {
    /* initial values for Component 3 */
  },
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
    updateEducationalDetails(
      state,
      action: PayloadAction<EducationDetailsType>,
    ) {
      state.educationDetails = action.payload;
    },
    // updateComponent4(state, action: PayloadAction<Component4State>) {
    //   state.component4 = action.payload;
    // },
  },
});

export const {
  updatePersonalDetails,
  updateAddressDetails,
  updateEducationalDetails,
} = Form1DataSlice.actions;

export default Form1DataSlice.reducer;
