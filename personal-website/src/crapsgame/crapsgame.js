// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const startingMoney = 1000
const startingRounds = 0
const bets = {
    even: "EVEN",
    odd: "ODD"
}

const minimumBet = 100

// Craps Dice Roll Settings
const numDiceToRoll = 2
const hideDiceDelayMs = 10000000
const processDiceResultDelayMs = 1800

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container"
const crapsBettingGridContainer = "craps-betting-grid-container"
const crapsRoundFinishMessage = "craps-round-finish-message"
const crapsRoundFinishGridContainer = "craps-round-finish-grid-container"
const crapsNextRoundButton = "craps-next-round-button"
const crapsNextRoundButtonDisabled = "craps-next-round-button-disabled"



// In-game variables
let currentMoney = startingMoney
let currentRounds = startingRounds
let currentBet = bets.even
let currentBetAmount = minimumBet
let canChangeBet = true

function setupFirstRound () {
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "block"
    document.getElementById(crapsNextRoundButtonDisabled).style.display = "none"
    document.getElementById(crapsNextRoundButton).style.display = "block"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "none"
    document.getElementById(crapsRollDiceButton).style.display = "block"
    document.getElementById(crapsBettingGridContainer).style.display = "block"
    document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
    canChangeBet = true
    setMoney(startingMoney)
    setRounds(startingRounds)
    betEven()
    setBetAmount(minimumBet)
}

function setupNextRound () {
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "none"
    document.getElementById(crapsRoundFinishGridContainer).style.display = "none"
    document.getElementById(crapsRollDiceButton).style.display = "block"
    document.getElementById(crapsBettingGridContainer).style.display = "block"
    canChangeBet = true
    setBetAmount(minimumBet)
}

function registerCrapsPlayer () {
    crapsUsername = document.getElementById(crapsUsernameInput).value

    // Username validation check
    let firstCharIsDigitRegex = /^[0-9]|[^a-zA-Z0-9_]/g
    if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)) {
        alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number")
    } else {
        removeRegistrationPane()
        showMainGameSection()
        setupFirstRound()
    }
}

function removeRegistrationPane() {
    document.getElementById(crapsRegistrationPane).style.display = "none"
}

function showMainGameSection() {
    document.getElementById(crapsMainSection).style.display = "block"
}



function setMoney(money) {
    currentMoney = money
    document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds(round) {
    currentRounds = round
    document.getElementById(crapsStatsRounds).innerHTML = round
}

function betEven () {
	chooseBet(bets.even)
}

function betOdd () {
	chooseBet(bets.odd)
}

function chooseBet (bet) {
    if (canChangeBet) {
        currentBet = bet;
        document.getElementById(bet).style.backgroundColor = "red";
        const deselectBet = bet == bets.even ? bets.odd : bets.even;
        document.getElementById(deselectBet).style.backgroundColor = "transparent";
    }
}

function increaseBet() {
    setBetAmount(Math.min(currentBetAmount + minimumBet, currentMoney))
}

function decreaseBet() {
    setBetAmount(Math.max(currentBetAmount - minimumBet, minimumBet))
}

function setBetAmount(betAmount) {
    if (canChangeBet) {
    currentBetAmount = betAmount
    document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
    }
}

function rollDice () {
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "block" // ADD THIS
    document.getElementById(crapsBettingGridContainer).style.display = "none"
    canChangeBet = false
    formatDiceScale ()
    document.getElementById(crapsRollDiceButton).style.display = "none"

    const diceRollElement = document.getElementById(crapsRollDiceAnimationContainer)

    rollADie({
        element: diceRollElement,
        numberOfDice: numDiceToRoll,
        callback: delayedProcessDiceResult,
        delay: hideDiceDelayMs
    });
}

window.addEventListener("resize", formatDiceScale);
function formatDiceScale () {
  const vw = window.innerWidth * 0.8
  const vh = window.innerHeight * 0.8
  const widthScale = Math.min(700, vw, vh)
  const heightScale = widthScale * 0.714
  const scale = heightScale / 494.6592
  document.getElementById(crapsRollDiceAnimationContainer).style.transform = "scale(" + scale + ")"
}

function processDiceResult (diceResult) {
    const sum = diceResult.reduce((partialSum, a) => partialSum + a, 0);
    let diceSumResult = sum % 2 === 0 ? bets.even : bets.odd;

    setRounds(currentRounds + 1);

    let roundFinishMessage = "";

    if (diceSumResult === currentBet) {
        roundFinishMessage = "YOU WIN!";
        setMoney(currentMoney + currentBetAmount);
    } else {
        roundFinishMessage = "YOU LOSE :(";
        setMoney(currentMoney - currentBetAmount);
    }

    if (currentMoney === 0) {
        roundFinishMessage = "YOU'RE OUT!";

        document.getElementById(crapsNextRoundButton).style.display = "none";
        document.getElementById(crapsNextRoundButtonDisabled).style.display = "block";
    }

    document.getElementById(crapsBettingGridContainer).style.display = "none";
    document.getElementById(crapsRoundFinishGridContainer).style.display = "block";
    document.getElementById(crapsRoundFinishMessage).innerHTML = roundFinishMessage;
}

function delayedProcessDiceResult (diceResult) {
	setTimeout(function() { processDiceResult(diceResult) }, processDiceResultDelayMs)
}

// Exit Game
function exitGame () {
    alert("After playing " + currentRounds + " rounds, you leave with " + currentMoney + "$")

    document.getElementById(crapsRollDiceAnimationContainer).innerHTML = ""
    document.getElementById(crapsRollDiceAnimationContainer).style.display = "none"

    hideMainGameSection()
    showRegistrationPane()
    document.getElementById(crapsUsernameInput).value = ""
}

function hideMainGameSection () {
	hideElement(crapsMainSection)
}

function hideElement (elementId) {
	document.getElementById(elementId).style.display = "none"
}

function showRegistrationPane () {
	showElement(crapsRegistrationPane)
}

function showElement (elementId) {
	document.getElementById(elementId).style.display = "block"
}
