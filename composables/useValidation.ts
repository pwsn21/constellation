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
    if (!(phone.length > 15)) return {valid: false, message:"Invalid Phone ID. Must be (###) ### - ####"}
    return {valid:true, message:""}
}
export const isValidEmployeeNumber = (employeeNumber: string) => {
    if (!(employeeNumber.length > 5)) return {valid: false, message:"Invalid Employee ID. Must be ######"}
    return {valid:true, message:""}
}