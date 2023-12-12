function renderStats(stats) {
    // usersCount, orderCount, reviewsCount, productsCount, mostBought, moneyMade
    document.querySelector(".statsContainer > .statsRow > #usersCount > .statValue").innerHTML = stats.usersCount;
    document.querySelector(".statsContainer > .statsRow > #orderCount > .statValue").innerHTML = stats.ordersCount;
    document.querySelector(".statsContainer > .statsRow > #reviewsCount > .statValue").innerHTML = stats.reviewsCount;
    document.querySelector(".statsContainer > .statsRow > #productsCount > .statValue").innerHTML = stats.productsCount;
    document.querySelector(".statsContainer > .statsRow > #mostBought > .statValue").innerHTML = stats.mostBoughtProduct;
    document.querySelector(".statsContainer > .statsRow > #moneyMade > .statValue").innerHTML = stats.totalMoneySpent;
}

async function getStats() {
    const reponse = await fetch("/stats/api/getCounts");
    const counts = await reponse.json();
    console.log(counts);
    return counts;
}

setTimeout(async () => {
    const stats = await getStats();
    renderStats(stats);
}, 100);

