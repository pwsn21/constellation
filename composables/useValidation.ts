export const isValidEmail = (email: string) => {
    if (!(email.length > 0)) return {valid: false, message:"Email is required"}
    if (!(email.toLowerCase().endsWith("@bcehs.ca"))) return {valid: false, message:"Must be valid BCEHS email"}
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