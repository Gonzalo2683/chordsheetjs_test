import ChordSheetJS from "chordsheetjs";
import { parse as parseChord } from "chordjs";

const chordSheet = `
Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
[C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`.substring(1);

const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const songId = document.getElementById("song");

const processChord = (item, processor) => {
  if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
    const parsedChord = parseChord(item.chords);

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
    processedLine.items = line.items.map((item) =>
      processChord(item, processor)
    );
    return processedLine;
  });

  return processedSong;
};

const transformChordSheet = (chordSheet, processor) => {
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
  const processedSong = transformSong(song, processor);
  return new ChordSheetJS.HtmlDivFormatter().format(processedSong);
};

const onlySong = (chordSheet, processor) => {
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
  const processedSong = transformSong(song, processor);
  return processedSong;
};

export const transposeUp = (chordSheet) =>
  transformChordSheet(chordSheet, (chord) => chord.transposeUp());

export const transposeDown = (chordSheet) =>
  transformChordSheet(chordSheet, (chord) => chord.transposeDown());

export const switchToSharp = (chordSheet) =>
  transformChordSheet(chordSheet, (chord) => chord.useModifier("#"));

export const switchToFlat = (chordSheet) =>
  transformChordSheet(chordSheet, (chord) => chord.useModifier("b"));

export const convertChordSheetToChordPro = (chordSheet) => {
  const parser = new ChordSheetJS.ChordSheetParser({
    preserveWhitespace: false,
  });
  const formatter = new ChordSheetJS.ChordProFormatter();
  const song = parser.parse(chordSheet);
  return formatter.format(song);
};

//const result = new ChordSheetJS.ChordProParser().parse(chordSheet);
// const transposedSheet = transposeUp(chordSheet);
const transposedSheet = onlySong(chordSheet, (chord) => chord.transposeUp());
const formatter1 = new ChordSheetJS.HtmlTableFormatter().format(
  transposedSheet
);

console.log(transposedSheet, "transposedSheet");
console.log(formatter1, "formatter1");

// parse directly works
const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
const formatter = new ChordSheetJS.HtmlTableFormatter().format(song);
console.log(song, "song");
console.log(formatter, "formatter");
