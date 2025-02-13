const tiles = [
  "By ancient law and sacred right, we, the Council of Five, ",
  "do set forth these commands. Let all who enter here know ",
  "that justice binds both high and low beneath these stones. ",
  "First: We command that all shall honor this sacred isle, ",
  "for those who harm its bounty shall wither as it withers. ",
  "Second: We decree the sanctity of dragon-kind, ",
  "for their wisdom and might are pillars of our peace. ",
  "Third: We declare that all must aid their fellow beings, ",
  "as prosperity flows only from unity and care. ",
  "Last: We warn that those who break these bonds must face ",
  "judgment, for the isle, dragons, and people are one. ",
  "Thus, we bind these laws to stone, and may they endure. "
];

let stopDragAndDrop = false;

const correctSolution = tiles.join("");

function allowDrop(ev) {
  if (stopDragAndDrop) return;
  ev.preventDefault();
}

function drag(ev) {
  if (stopDragAndDrop) return;
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  if (stopDragAndDrop) return;
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function createTile(text, i) {
  const tile = document.createElement("div");
  tile.className = "tile";
  tile.draggable = true;
  tile.id = `tile-${i}`;
  tile.innerHTML = text;
  tile.ondragstart = drag;
  return tile;
}

function createTiles() {
  const randomTiles = [...tiles];
  randomTiles.sort(() => Math.random() - 0.5);
  randomTiles.forEach((text, i) => {
    const container = document.getElementById("grid");
    container.appendChild(createTile(text, i));
  });
}
createTiles();

let draggedElem;
const parent = document.querySelector("#grid");

parent.addEventListener("drag", (dragEvent) => {
  if (stopDragAndDrop) return;
  draggedElem = dragEvent.target.closest("#grid > [draggable]");
});

parent.addEventListener("dragover", (event) => {
  if (stopDragAndDrop) return;
  event.preventDefault();
});

parent.addEventListener("drop", (dropEvent) => {
  dropEvent.preventDefault();
  if (stopDragAndDrop) return;
  const target = dropEvent.target.closest("#grid > [draggable]");
  const temp = new Text("");
  target.before(temp);
  draggedElem.replaceWith(target);
  temp.replaceWith(draggedElem);
  isSolved();
});

const isSolved = () => {
  let solutionText = ''
  let currentTiles = document.querySelectorAll("#grid > [draggable]");
  currentTiles.forEach((tile) => {
    solutionText += tile.innerHTML;
  });
  if (solutionText === correctSolution) {
    console.log("You solved the puzzle!");
    stopDragAndDrop = true;
    document.querySelector("#grid").classList.add("solved");
  }
}