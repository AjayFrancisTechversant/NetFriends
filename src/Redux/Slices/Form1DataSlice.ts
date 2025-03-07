import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import {PersonalDetailsType} from '../../Components/Form1Page1';
import {AddressDetailsType} from '../../Components/Form1Page2';
import {EducationDetailsType} from '../../Components/Form1Page3';
import {DocumentsDetailsType} from '../../Components/Form1Page4';
import {PageUnlockDetailsType} from '../../modules/Form1Screen';

type Form1DataSliceType = {
  personalDetails: PersonalDetailsType;
  addressDetails: AddressDetailsType;
  educationDetails: EducationDetailsType[];
  documentsDetails: DocumentsDetailsType;
  pageUnlockDetails: PageUnlockDetailsType;
  isSubmitted: boolean;
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
  documentsDetails: {
    resume: null,
    profilePic: null,
    signature: null,
  },
  pageUnlockDetails: {
    1: 'unlocked',
    2: 'locked',
    3: 'locked',
    4: 'locked',
  },
  isSubmitted: false,
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
      state.educationDetails = [
        ...state.educationDetails,
        {
          id: uuid.v4() as string,
          institution: undefined,
          degree: undefined,
          fieldOfStudy: undefined,
          yearOfCompletion: undefined,
          isExtra: true,
        },
      ];
    },
    removeEducationDetail(state, action: PayloadAction<string>) {
      state.educationDetails = state.educationDetails.filter(
        detail => detail.id !== action.payload,
      );
    },
    updateDocumentsDetails(state, action: PayloadAction<DocumentsDetailsType>) {
      state.documentsDetails = action.payload;
    },
    unlockPage(state, action: PayloadAction<keyof PageUnlockDetailsType>) {
      state.pageUnlockDetails[action.payload] = 'unlocked';
    },
    lockPagesFrom(state, action: PayloadAction<keyof PageUnlockDetailsType>) {
      const page = action.payload;
      const pageNumbers = Object.keys(state.pageUnlockDetails).map(Number);
      pageNumbers.forEach(pageNumber => {
        if (pageNumber >= page) {
          state.pageUnlockDetails[pageNumber] = 'locked';
        }
      });
    },
    submitForm1(state) {
      state.isSubmitted = true;
    },
    unsubmitForm1(state) {
      state.isSubmitted = false;
    },
    clearAllForm1Data() {
      return initialState;
    },
  },
});

export const {
  updatePersonalDetails,
  updateAddressDetails,
  updateEducationDetails,
  addEducationDetails,
  removeEducationDetail,
  updateDocumentsDetails,
  unlockPage,
  lockPagesFrom,
  submitForm1,
  unsubmitForm1,
  clearAllForm1Data,
} = Form1DataSlice.actions;

export default Form1DataSlice.reducer;
