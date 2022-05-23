export const Functions = {
     isOlderThan18 : (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        const m = today.getMonth() - birthDate.getMonth();
    
        let age = today.getFullYear() - birthDate.getFullYear();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age >= 18;
    },
}