import { ICandidateConfig } from "../type";

export const CandidateConfig: { [key: string]: ICandidateConfig } = {
  A: {
    label: "Thời gian apply",
    key: "timeApply",
    column: "A",
  },
  B: {
    label: "Email",
    key: "email",
    column: "B",
  },
  C: {
    label: "Số điện thoại",
    key: "phone",
    column: "C",
  },
  D: {
    label: "Loại hình làm việc",
    key: "workType",
    column: "D",
  },
  E: {
    label: "Khu vực đi làm",
    key: "workArea",
    column: "E",
  },
  F: {
    label: "Họ và tên",
    key: "name",
    column: "F",
  },
  G: {
    label: "Ngày sinh",
    key: "dob",
    column: "G",
  },
  H: {
    label: "Giới tính",
    key: "gender",
    column: "H",
  },
  I: {
    label: "Nơi sinh",
    key: "placeOfBirth",
    column: "I",
  },
  J: {
    label: "Chiều cao / Cân nặng",
    key: "heightWeight",
    column: "J",
  },
  K: {
    label: "Biết thông tin tuyển dụng",
    key: "know",
    column: "K",
  },
  L: {
    label: "Làm việc",
    key: "time",
    column: "L",
  },
  N: {
    label: "Kinh ngiệm làm việc",
    key: "exp",
    column: "N",
  },
  P: {
    label: "Mức lương mong muốn",
    key: "desiredSalary",
    column: "P",
  },
  Q: {
    label: "Sẵn sàng luân chuyển",
    key: "ssRotate",
    column: "Q",
  },
  R: {
    label: "Linh động giờ làm",
    key: "ssWorkTime",
    column: "R",
  },
  S: {
    label: "Thương hiệu ứng tuyển",
    key: "brand",
    column: "S",
  },
  T: {
    label: "Link CV",
    key: "linkCV",
    column: "T",
  },
};

export enum StoreType {
  Outlet = "Outlet",
  Kios = "Kios",
}


export const Positions = ["Part time", "Full time", "Captain", "Store Supervisor", "Store Manager", "Acting AM", "AM"]

export const Brands = ["Chuk", "Bánh mì ơi", "Xôi"]

export const CandidateConfigLabel:any = {
  timeApply: 'Thời gian apply',
  email: 'Email',
  phone: 'Số điện thoại',
  workType: 'Loại hình làm việc',
  workArea: 'Khu vực đi làm',
  name: 'Họ và tên',
  dob: 'Ngày sinh',
  gender: 'Giới tính',
  placeOfBirth: 'Nơi sinh',
  heightWeight: 'Chiều cao / Cân nặng',
  know: 'Biết thông tin tuyển dụng',
  time: 'Làm việc',
  exp: 'Kinh ngiệm làm việc',
  desiredSalary: 'Mức lương mong muốn',
  ssRotate: 'Sẵn sàng luân chuyển',
  ssWorkTime: 'Linh động giờ làm',
  brand: 'Thương hiệu ứng tuyển',
  linkCV: 'Link CV'
}