class Grid {
    constructor(options) {
        this.gridArray = []
        this.numberOfRows = options.numberOfRows || 6
        this.numberOfColumns = options.numberOfColumns || 6
        this.gridContainer = document.getElementById("main")
        this.elementId = options.elementId
        this.newRows()
    }

    newRows() {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rowIndex = rowIndex
            this.rowArray = []
            this.gridArray.push(this.rowArray)
            this.rowElement = document.createElement("div")
            this.rowElement.classList.add("newDiv")
            this.gridContainer.appendChild(this.rowElement)
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                const cell = this.createCell(rowIndex, columnIndex, this.rowElement)
                this.rowArray.push(cell)
            }
        }
    }

    createCell(rowIndex, columnIndex, rowElement) {
        return new Cell(rowIndex, columnIndex, this.rowElement)
    }

    findCellByIndexes (rowIndex, columnIndex) {
        const row = this.gridArray[rowIndex] || []
        const cell = row[columnIndex]
        return (row.length && cell) ? cell : null
    }
}
class JeopardyGrid extends Grid {

    constructor (options) {
        options.numberOfColumns = options.categoryIDs.length
        super(options)
        this.categoryIDs = options.categoryIDs
        this.jServiceURL = "http://cors-anywhere.herokuapp.com/" + "http://jservice.io/api/category?id="
        this.categories = null

        this.getCategories()
        this.gridContainer.addEventListener("click", this.onClick.bind(this))
    }

    createCell(rowIndex, columnIndex, rowElement) {
        return new JeopardyCell(rowIndex, columnIndex, this.rowElement)
    }

    onClick (event) {
        if (!event.target.classList.contains("cell")) return
        const cell = event.target.instance
        if (cell.isCategoryHeader) return

        cell.showQuestion()
    }

    async getCategories () {
        const categoryPromises = this.categoryIDs.map(id => {
            return fetch(this.jServiceURL + id).then(res => res.json())
        })

        this.categories = await Promise.all(categoryPromises)
        this.CluesToCells()
    }

    CluesToCells () {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.numberOfColumns; columnIndex++) {
                const cell = this.gridArray[rowIndex][columnIndex]
                const category = this.categories[columnIndex]
                if (rowIndex === 0) {
                    cell.assignCategoryTitle(category)
                } else {
                    cell.assignClue(category.clues)
                }
            }
        }
    }
    
}