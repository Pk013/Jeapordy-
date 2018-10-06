const categoryIDs = [780, 25, 230, 215, 155, ]

const grid = new JeopardyGrid({
    categoryIDs,
    numberOfRows: 6,
    parentContainerId: "main",
})


function Inputanswer() {
    let answerBox = document.createElement("INPUT")
    document.getElementById("answer")
    answerBox.setAttribute("type", "text")
    answerBox.setAttribute("value", "What/Who/When/Where is")
    answer.appendChild(answerBox)
}