import ChordSheetJS, { Chord } from "chordsheetjs";

const chordSheet = `
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
[C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`.substring(1);

const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const songId = document.getElementById("song");

// const parser = new ChordSheetJS.ChordProParser();
// const song = parser.parse(chordSheet);
// console.log("SONG TOP", song);
//
// const formatter = new ChordSheetJS.HtmlTableFormatter();
// console.log(formatter, 'FORMATTER');
// const display = formatter.format(song);
//
// songId.innerHTML = display;

const processChord = (item, processor) => {
  if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
    const parsedChord = Chord.parse(item.chords);

    if (parsedChord) {
      const processedChordLyricsPair = item.clone();
      processedChordLyricsPair.chords = processor(parsedChord).toString();
      return processedChordLyricsPair;
    }
  }
  return item;
};

const transformSong = (song, processor) => {
  const processedSong = song.clone();

  processedSong.lines = song.lines.map((line) => {
    const processedLine = line.clone();
    processedLine.items = line.items.map((item) => {
      return processChord(item, processor);
    });
    return processedLine;
  });
  return processedSong;
};

const transformChordSheet = (chordSheet, processor) => {
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
  const processedSong = transformSong(song, processor);
  const formatter = new ChordSheetJS.HtmlDivFormatter();
  return formatter.format(processedSong);
};

const transposeUp = (chordSheet) => {
  return transformChordSheet(chordSheet, (chord) => chord.transposeUp());
};

upBtn.addEventListener("click", function (el) {
  const result = transposeUp(chordSheet);
  setSong(result);
});

const setSong = (data) => {
  songId.innerHTML = data;
};

const coco = () => {

};

const result = transposeUp(chordSheet);
console.log(result, 'result');
setSong(result);
