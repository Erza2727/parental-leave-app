import { ApplicationFormData } from './types/application'

export const defaultValues: ApplicationFormData = {
  applicant: {
    fullName: '',
    kennitala: '',
    address: '',
    email: '',
    phone: '',
  },
  employment: {
    type: 'employed',
    employerName: '',
    employmentRatio: '',
    companyName: '',
  },
  partner: {
    hasPartner: false,
    fullName: '',
    kennitala: '',
    employmentStatus: '',
  },
  leave: {
    startDate: null,
    endDate: null,
    ratio: '100',
  },
  payment: {
    bankNumber: '',
    ledger: '',
    accountNumber: '',
  },
  documents: {
    files: [],
  },
}