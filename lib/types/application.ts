export type EmploymentType = 'employed' | 'self-employed' | 'unemployed'

export type LeaveRatio = '25' | '50' | '75' | '100'

export interface ApplicantInfo {
  fullName: string
  kennitala: string
  address: string
  email: string
  phone: string
}

export interface EmploymentInfo {
  type: EmploymentType
  employerName: string
  employmentRatio: string
  companyName: string
}

export interface PartnerInfo {
  hasPartner: boolean
  fullName: string
  kennitala: string
  employmentStatus: EmploymentType | ''
}

export interface LeaveInfo {
  startDate: Date | null
  endDate: Date | null
  ratio: LeaveRatio
}

export interface PaymentInfo {
  bankNumber: string
  ledger: string
  accountNumber: string
}

export interface DocumentsInfo {
  files: File[]
}

export interface ApplicationFormData {
  applicant: ApplicantInfo
  employment: EmploymentInfo
  partner: PartnerInfo
  leave: LeaveInfo
  payment: PaymentInfo
  documents: DocumentsInfo
}