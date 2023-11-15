export const isValidEmail = (email: string) => {
    if (!(email.length > 0)) return {valid: false, message:"Email is required"}
    if (!(email.endsWith("@bcehs.ca") || email.endsWith("@phsa.ca"))) return {valid: false, message:"Must be valid BCEHS or PHSA email"}
    return {valid:true, message:""}
}

export const isValidPassword = (password: string) => {
    if (!(password.length > 0)) return {valid: false, message:"Password is required"}
    if (!(password.length > 5)) return {valid: false, message:"Password must be at least 6 charecters"}
    return {valid:true, message:""}
}

export const isValidPasswordConfirm = (password: string, passwordConfirm: string) => {
    if (!(passwordConfirm.length > 0)) return {valid: false, message:"Password confirmation is required"}
    if (!(password == passwordConfirm)) return {valid: false, message:"Passwords do not match"}
    return {valid: true, message:""}
}

export const isValidFirstName = (firstName: string) => {
    if (!(firstName.length > 0)) return {valid: false, message:"First name is required"}
    return {valid:true, message:""}
}

export const isValidLastName = (lastName: string) => {
    if (!(lastName.length > 0)) return {valid: false, message:"Last name is required"}
    return {valid:true, message:""}
}

export const isValidPhone = (phone: string) => {
    if (!(phone.length == 12)) return {valid: false, message:"###-###-####"}
    return {valid:true, message:""}
}
export const isValidEmployeeNumber = (employeeNumber: string) => {
    if (!(employeeNumber.length > 5)) return {valid: false, message:"Invalid Employee ID. Must be ######"}
    return {valid:true, message:""}
}
export const isValidCohort = (cohort: string) => {
    if (!(cohort.length == 6)) return {valid: false, message:"Cohort must be YYYY-#"}
    return {valid:true, message:""}
}
export const isValidAddress = (address: string) => {
    if (!(address.length > 0 && address.length < 50)) return {valid: false, message:"Address required. Must be under 50 characters"}
    return {valid:true, message:""}
}
export const isValidDate = (date: string) => {
    if(date) {if (!(date.length == 10)) return {valid: false, message:"YYYY/MM/DD"}}
    return {valid:true, message:""}
}
export const isValidDateRange = (dateRange: string) => {
    if(dateRange) {if (!(dateRange.length == 23)) return {valid: false, message:"Use Date Picker"}}
    return {valid:true, message:""}
}
export const isValidTime = (time: string) => {
    if(time) {if (!(time.length == 5)) return {valid: false, message:"HH:mm"}}
    return {valid:true, message:""}
}
export const isValidOption = (option: string) => {
    if (!(option)) return {valid: false, message:"Please select an option from dropdown"}
    return {valid:true, message:""}
}
export const isValidStation = (station: string) => {
    if (!(station.length == 3)) return {valid: false, message:"Station must be ###"}
    return {valid:true, message:""}
}
export const isValidCar = (car: string) => {
    if(car){if (!(car.length == 6)) return {valid: false, message:"Car must be ###X#X. E.g. 247A1D"}}
    return {valid:true, message:""}
}
