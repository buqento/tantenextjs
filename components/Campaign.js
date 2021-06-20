export const type = (types) => {
    types.splice(types.indexOf('Campur'), 1, 'Mixed')
    types.splice(types.indexOf('Putra'), 1, 'Men')
    types.splice(types.indexOf('Putri'), 1, 'Woman')
    types.splice(types.indexOf('Pasutri'), 1, 'Married Couple')
    return types.join(" · ")
}
export const duration = (durations) => {
    let duration
    switch (durations) {
        case 'Hari':
            duration = 'Day'
            break;
        case 'Minggu':
            duration = 'Week'
            break;
        case 'Bulan':
            duration = 'Month'
            break;
        default:
            duration = 'Year'
            break;
    }
    return duration
}
export const facility = (facility) => facility.join(" · ")
export default facility