export default {
    currency(value) {
        const sign = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100
        
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return sign + value
    },
    amount(value) {
        return Math.round(value * 100)
    },
    date(value) {
        const splittedDate = value.split("-") 
        // 0 Year 1 Month 2 Day
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}
