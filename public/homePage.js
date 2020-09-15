
const logoutBtn = new LogoutButton();
logoutBtn.action = () => ApiConnector.logout((response) => {
  if (response.success) {
    location.reload();
  }
});

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const currentRates = new RatesBoard();
currentRates.getRatesUpdate = () => ApiConnector.getStocks((response) => {
  if (response.success) {
    currentRates.clearTable();
    currentRates.fillTable(response.data);
  }
})
setInterval(currentRates.getRatesUpdate(), 1000);

const moneyOperations = new MoneyManager();
const favorite = new FavoritesWidget();

moneyOperations.addMoneyCallback = data => ApiConnector.addMoney(data, (response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    favorite.setMessage(response.success, response.success ? `Перевод состоялся` : response.error);
  }
});

moneyOperations.conversionMoneyCallback = data => ApiConnector.convertMoney(data, (response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    favorite.setMessage(response.success, response.success ? 'Конвертация состоялась' : response.error);
  }
});

moneyOperations.sendMoneyCallback = data => ApiConnector.transferMoney(data, (response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    favorite.setMessage(response.success, response.success ? 'Перевод состоялся': response.error);
  }
});

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    moneyOperations.updateUsersList(response.data);
  }
});

favorite.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
  if (response.success) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    moneyOperations.updateUsersList(response.data);
  } else {
    favorite.setMessage(response.success, response.error);
  }
})

favorite.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
  if (response.success) {
    favorite.clearTable();
    favorite.fillTable(response.data);
    moneyOperations.updateUsersList(response.data);
  } else {
    favorite.setMessage(response.success, response.error);
  }
})
