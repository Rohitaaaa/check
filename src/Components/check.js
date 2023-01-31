const toDate = (date) => {
    const day1 = new Date().getTime();
    const day2 = new Date(date).getTime();
    var diff = day2 - day1
    var daydiff = diff / (1000 * 60 * 60 * 24);
    var absdatediff = Math.abs(Math.ceil(daydiff))
    if (absdatediff == 0) {
        return "Today"
    } else if (absdatediff == 1) {
        return "Yesterday"

    } else {
        return absdatediff + " days ago"
    }
}

console.log(toDate("2022-12-23T03:41:00Z"));