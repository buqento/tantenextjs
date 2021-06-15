export default (str) => {
    let duration
    switch (str) {
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